import re
import spacy
from typing import Dict, List, Tuple, Any

# Global NLP engine holder
nlp = None

def get_nlp():
    """Lazy load and check for model installation."""
    global nlp
    if nlp is not None:
        return nlp
    try:
        nlp = spacy.load("en_core_web_sm")
    except OSError:
        # Automatically download spacy model if not found
        import subprocess
        import sys
        subprocess.check_call([sys.executable, "-m", "spacy", "download", "en_core_web_sm"])
        nlp = spacy.load("en_core_web_sm")
    return nlp

# Precompiled regexes for contact extraction
EMAIL_REG = re.compile(r'[\w\.-]+@[\w\.-]+\.\w+')
PHONE_REG = re.compile(r'(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}')

# Predefined common technical skills dictionary for local fallback extraction
TECH_SKILLS_DB = {
    "Languages": ["python", "javascript", "typescript", "c++", "c#", "java", "ruby", "php", "go", "rust", "swift", "kotlin", "sql", "html", "css", "bash"],
    "Frameworks": ["react", "vue", "angular", "next.js", "nuxt", "svelte", "django", "flask", "fastapi", "spring boot", "laravel", "express", "nest.js", "asp.net"],
    "Tools & Platforms": ["git", "github", "docker", "kubernetes", "aws", "gcp", "azure", "jenkins", "gitlab ci", "terraform", "ansible", "npm", "yarn", "pip", "vite", "webpack"],
    "Databases": ["postgresql", "mysql", "mongodb", "redis", "sqlite", "elasticsearch", "mariadb", "firebase", "cassandra", "dynamodb"],
    "Concepts": ["rest api", "graphql", "grpc", "ci/cd", "microservices", "unit testing", "agile", "scrum", "oop", "mvc", "data structures", "machine learning", "deep learning", "nlp"]
}

def extract_contact_info(text: str) -> Dict[str, Any]:
    """Extracts email, phone, location, and candidate name from text."""
    emails = EMAIL_REG.findall(text)
    email = emails[0] if emails else None

    phones = PHONE_REG.findall(text)
    phone = phones[0] if phones else None

    # Name extraction using spaCy NER or first lines fallback
    name = None
    location = None
    
    _nlp = get_nlp()
    doc = _nlp(text[:2000]) # Scan first 2000 chars for speed
    
    for ent in doc.ents:
        if ent.label_ == "PERSON" and not name:
            # Simple check to avoid email domain elements or general words
            candidate = ent.text.strip().replace("\n", " ")
            if len(candidate.split()) >= 2 and "@" not in candidate:
                name = candidate
        elif ent.label_ in ["GPE", "LOC"] and not location:
            location = ent.text.strip().replace("\n", " ")

    # Fallback name: first non-empty line of the text (often the header)
    if not name:
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        if lines:
            # Use the first line as name if it's short and doesn't contain contact details
            first_line = lines[0]
            if len(first_line) < 50 and not any(char in first_line for char in ["@", "/", ":"]):
                name = first_line

    return {
        "name": name or "John Doe",
        "email": email or "candidate@example.com",
        "phone": phone or "N/A",
        "location": location or "N/A"
    }

def extract_skills_locally(text: str) -> List[Dict[str, Any]]:
    """Simple dictionary-based matching of skills using lower-case tokenization."""
    matched_skills = []
    text_lower = text.lower()
    
    for category, skills in TECH_SKILLS_DB.items():
        for skill in skills:
            # Word boundary check for accuracy
            pattern = r'\b' + re.escape(skill) + r'\b'
            if re.search(pattern, text_lower):
                matched_skills.append({
                    "skill": skill.capitalize() if len(skill) > 3 else skill.upper(),
                    "category": category,
                    "level": "Intermediate", # Default for local match
                    "matched": True
                })
    return matched_skills
