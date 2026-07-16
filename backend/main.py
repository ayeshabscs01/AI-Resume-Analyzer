import os
import logging
from typing import Optional
from fastapi import FastAPI, File, UploadFile, Form, Header, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Load env files
load_dotenv()

from parser import extract_text
from openai_service import analyze_resume_ai
from nlp import get_nlp
from schemas import AnalysisResult

# Configure Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Resume Analyzer API",
    description="Backend API for extracting, mining, and reviewing resumes with spaCy and OpenAI",
    version="1.0.0"
)

# Enable CORS for local Vite development and static deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("Initializing NLP components...")
    # Trigger spaCy model loading/downloading on startup
    try:
        nlp_engine = get_nlp()
        logger.info(f"Loaded spaCy language model successfully: {nlp_engine.meta['name']}")
    except Exception as e:
        logger.error(f"Error loading spaCy during startup: {e}")

@app.get("/api/health", status_code=status.HTTP_200_OK)
def health_check():
    """Simple API status checker."""
    has_api_key = bool(os.getenv("OPENAI_API_KEY"))
    return {
        "status": "healthy",
        "spacy_loaded": get_nlp() is not None,
        "openai_configured": has_api_key
    }

@app.post("/api/analyze", response_model=AnalysisResult)
async def analyze_resume(
    file: UploadFile = File(...),
    job_role: Optional[str] = Form(None),
    x_openai_key: Optional[str] = Header(None)
):
    """
    Uploads, parses, and analyzes a resume document.
    Optionally evaluates matching against a target job role.
    Supports a custom client OpenAI key passed as 'X-OpenAI-Key' header.
    """
    logger.info(f"Received resume analysis request: {file.filename}")
    
    # 1. Read file bytes
    try:
        file_bytes = await file.read()
    except Exception as e:
        logger.error(f"Failed to read file stream: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Could not read upload file stream: {str(e)}"
        )
        
    # 2. Extract plain text content
    try:
        extracted_text = extract_text(file_bytes, file.filename)
    except ValueError as ve:
        logger.warning(f"File validation failed: {ve}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve)
        )
    except Exception as e:
        logger.error(f"Text extraction failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error extracting text from document: {str(e)}"
        )
        
    if not extracted_text.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded resume contains no readable text. Please check the file formatting."
        )
        
    # 3. Perform AI/NLP Analysis
    try:
        analysis = analyze_resume_ai(
            resume_text=extracted_text,
            job_role=job_role,
            api_key_override=x_openai_key
        )
        return analysis
    except Exception as e:
        logger.error(f"Analysis process failed: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Analysis pipeline crashed: {str(e)}"
        )
