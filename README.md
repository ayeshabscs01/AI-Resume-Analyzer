# AI Resume Analyzer

A clean, focused application to help users quickly analyze and improve their resumes using AI-powered insights.

## Features

- **Simple, Intuitive UI**: Minimal design with only essential features.
- **Resume Upload**: Support for PDF and DOCX files.
- **Optional Target Job Role**: Get tailored feedback for specific roles.
- **Key Analysis Sections**:
  - ATS Score (with visual indicator)
  - Resume Summary
  - Strengths (3-6 bullet points)
  - Areas to Improve (3-6 bullet points)
  - Missing Skills (as tags)
  - Final Recommendation
- **Beginner-Friendly Language**: All feedback uses simple English with a positive, encouraging tone.
- **Smooth Scroll Behavior**: Pages scroll to top when navigating.

## Tech Stack

### Frontend
- React (with Vite)
- React Router DOM
- Framer Motion
- Tailwind CSS
- React Icons

### Backend
- Python
- FastAPI
- OpenAI API (optional)
- spaCy
- PDF and DOCX text extraction

## Getting Started

### Prerequisites
- Node.js (for frontend)
- Python 3.8+ (for backend)
- npm or yarn
- pip or pipenv

### Installation & Setup

#### 1. Clone or download the project
```bash
cd AI-Resume-Analyzer
```

#### 2. Frontend Setup
```bash
cd frontend
npm install
```

#### 3. Backend Setup
```bash
# From project root
python -m venv venv
# Activate the virtual environment:
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r backend/requirements.txt
```

#### 4. (Optional) Set up OpenAI API Key
Create a `.env` file in the backend directory with your API key:
```
OPENAI_API_KEY=your_api_key_here
```
If no key is provided, the app will use a local fallback analyzer.

## Running the Application

### Start Backend
```bash
# From project root
uvicorn backend.main:app --reload
```
The backend will be available at `http://localhost:8000`

### Start Frontend
```bash
cd frontend
npm run dev
```
The frontend will be available at `http://localhost:5173`

## Usage

1. Go to the homepage.
2. Click "Resume Analyzer" in the navigation.
3. Upload your resume (PDF or DOCX).
4. (Optional) Enter a target job role.
5. Click "Analyze Resume".
6. Review your results!

## Project Structure
```
AI-Resume-Analyzer/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── openai_service.py    # AI analysis logic
│   ├── parser.py            # Text extraction from files
│   ├── nlp.py               # spaCy NLP processing
│   ├── schemas.py           # Pydantic models
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Context providers
│   │   ├── services/        # API calls
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

## Deployment

### Frontend (Vercel)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect the `vercel.json` and deploy your frontend!

### Backend (Render)
1. Push your code to GitHub
2. Go to [Render](https://render.com)
3. Create a new Web Service
4. Connect your repository
5. Set the build command to: `pip install -r backend/requirements.txt`
6. Set the start command to: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
6. Add your `OPENAI_API_KEY` (optional) in environment variables
7. Deploy!

**Important**: After deploying backend, update `frontend/src/services/api.js` to use your deployed backend URL!

## License

MIT
