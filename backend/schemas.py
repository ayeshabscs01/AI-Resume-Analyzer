from pydantic import BaseModel, Field
from typing import List, Optional

class ContactInfo(BaseModel):
    name: Optional[str] = Field(None, description="Candidate's full name")
    email: Optional[str] = Field(None, description="Candidate's email address")
    phone: Optional[str] = Field(None, description="Candidate's phone number")
    location: Optional[str] = Field(None, description="Candidate's current location")

class EducationItem(BaseModel):
    institution: Optional[str] = Field(None, description="Name of school, college, or university")
    degree: Optional[str] = Field(None, description="Degree or certification obtained")
    year: Optional[str] = Field(None, description="Graduation year or dates")

class ExperienceItem(BaseModel):
    company: Optional[str] = Field(None, description="Name of company or organization")
    role: Optional[str] = Field(None, description="Job title")
    duration: Optional[str] = Field(None, description="Dates or length of employment")
    responsibilities: List[str] = Field(default_factory=list, description="Key duties or bullet points")

class SkillMatch(BaseModel):
    skill: str = Field(..., description="Name of the skill")
    category: str = Field(..., description="Category (e.g., Languages, Frameworks, Soft Skills, Tools)")
    level: str = Field(..., description="Candidate's proficiency level: Expert, Intermediate, Beginner")
    matched: bool = Field(..., description="Whether this skill is matched against the job description requirements")

class ProjectItem(BaseModel):
    name: Optional[str] = Field(None, description="Name of the project")
    technologies: List[str] = Field(default_factory=list, description="Technologies and libraries used")
    description: List[str] = Field(default_factory=list, description="Description details or accomplishment bullet points")

class BulletPointImprovement(BaseModel):
    original: str = Field(..., description="The original bullet point from the resume")
    improved: str = Field(..., description="Proposed rewrite of the bullet point to be more achievement-oriented")
    reason: str = Field(..., description="The reasoning behind the suggested improvement")

class ExperienceRewrite(BaseModel):
    company: str = Field(..., description="Company name")
    role: str = Field(..., description="Job role")
    original_bullets: List[str] = Field(..., description="Original weak bullet points from the resume")
    rewritten_bullets: List[str] = Field(..., description="Proposed rewritten high-impact bullet points")
    explanation: str = Field(..., description="Why these rewrites are better and how they show impact")

class DetailedEvaluations(BaseModel):
    ats_compatibility: str = Field(..., description="Evaluation of ATS compatibility")
    resume_length: str = Field(..., description="Evaluation of resume length (e.g. word count, page count)")
    formatting: str = Field(..., description="Evaluation of resume formatting, layout, fonts, and hierarchy")
    keywords: str = Field(..., description="Evaluation of keyword density and presence")
    soft_skills: str = Field(..., description="Evaluation of soft skills demonstrated in the resume")
    technical_skills: str = Field(..., description="Evaluation of technical skills demonstrated in the resume")
    action_verbs: str = Field(..., description="Evaluation of action verbs and impact-oriented language")
    achievements: str = Field(..., description="Evaluation of key achievements and metrics")
    education: str = Field(..., description="Evaluation of the education section")
    experience: str = Field(..., description="Evaluation of experience depth and relevance")
    projects: str = Field(..., description="Evaluation of project listings")
    certifications: str = Field(..., description="Evaluation of certifications and credentials")
    leadership: str = Field(..., description="Evaluation of leadership and initiative")
    communication: str = Field(..., description="Evaluation of communication style and clarity")
    grammar: str = Field(..., description="Evaluation of spelling, punctuation, and grammar")
    professional_tone: str = Field(..., description="Evaluation of the resume's tone and style")

class AnalysisResult(BaseModel):
    contact_info: ContactInfo
    education: List[EducationItem] = Field(default_factory=list)
    experience: List[ExperienceItem] = Field(default_factory=list)
    projects: List[ProjectItem] = Field(default_factory=list, description="Projects details listed in the resume")
    achievements: List[str] = Field(default_factory=list, description="Awards, achievements, or honors")
    certifications: List[str] = Field(default_factory=list, description="Certifications, licenses, or professional training")
    skills: List[SkillMatch] = Field(default_factory=list)
    missing_skills: List[str] = Field(default_factory=list, description="Important skills from the job description that are missing from the resume")
    
    # Analysis metrics (backward compatibility)
    overall_score: int = Field(..., ge=0, le=100, description="Overall match score from 0 to 100")
    skills_score: int = Field(..., ge=0, le=100, description="Skills alignment score from 0 to 100")
    experience_score: int = Field(..., ge=0, le=100, description="Experience alignment score from 0 to 100")
    readability_score: int = Field(..., ge=0, le=100, description="Readability, structure, and formatting score from 0 to 100")
    
    # Advanced AI Analysis scores
    ats_score: int = Field(..., ge=0, le=100, description="ATS Compatibility score from 0 to 100")
    resume_score: int = Field(..., ge=0, le=100, description="Overall resume score from 0 to 100")
    strength_score: int = Field(..., ge=0, le=100, description="Strength score from 0 to 100")
    weakness_score: int = Field(..., ge=0, le=100, description="Weakness score from 0 to 100")
    interview_readiness_score: int = Field(..., ge=0, le=100, description="Interview readiness score from 0 to 100")

    # Textual details
    strengths: List[str] = Field(default_factory=list, description="Key strengths found in the resume")
    weaknesses: List[str] = Field(default_factory=list, description="Areas of weakness or concerns relative to requirements")
    recommendations: List[str] = Field(default_factory=list, description="Actionable general tips for improvement")
    bullet_point_improvements: List[BulletPointImprovement] = Field(default_factory=list, description="Specific recommendations for bullet points")
    
    # Advanced AI Suggestions & Checklists
    improvement_checklist: List[str] = Field(default_factory=list, description="Actionable checklist items to improve the resume")
    recommended_skills: List[str] = Field(default_factory=list, description="Skills recommended to acquire or add")
    recommended_certifications: List[str] = Field(default_factory=list, description="Recommended professional certifications")
    recommended_projects: List[str] = Field(default_factory=list, description="Recommended projects to work on")
    suggested_resume_summary: str = Field("", description="Suggested optimized professional summary/objective")
    suggested_experience_rewrite: List[ExperienceRewrite] = Field(default_factory=list, description="Proposed rewrites for experience sections")
    suggested_skills_section: List[str] = Field(default_factory=list, description="Suggested skills section layout/formatting")

    # Detailed section audits & specific feedback
    grammar_issues: List[str] = Field(default_factory=list, description="Spelling, syntax, or grammar problems")
    formatting_issues: List[str] = Field(default_factory=list, description="Layout, padding, fonts, or styling issues")
    projects_feedback: str = Field("", description="Review of project listings and tech stack representations")
    experience_feedback: str = Field("", description="Assessment of work duration, title relevance, and responsibility phrasing")
    education_feedback: str = Field("", description="Feedback on degree relevance and completeness")
    summary_feedback: str = Field("", description="Review of header summary or career objective statement")
    resume_rating: str = Field("Fair", description="Overall verbal rating: Excellent, Good, Fair, Needs Work")
    career_tips: List[str] = Field(default_factory=list, description="Strategic tips for career growth and next-step actions")
    
    # All 16 evaluation dimensions
    evaluations: DetailedEvaluations = Field(..., description="Evaluation of the 16 key resume and professional dimensions")

class AnalyzeRequest(BaseModel):
    job_description: Optional[str] = Field(None, description="The job description to analyze the resume against")

