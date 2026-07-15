import sys
import os

# Adjust path to import backend modules
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from backend.nlp import extract_contact_info, extract_skills_locally
from backend.openai_service import generate_local_fallback
from backend.schemas import AnalysisResult

def run_tests():
    print("=== RUNNING RESUME ANALYZER BACKEND TESTS ===")
    
    # Sample Mock Resume Text
    sample_resume = """
    SARAH JENKINS
    Email: sarah.jenkins@example.com | Phone: (555) 019-2834
    Location: San Francisco, CA
    
    OBJECTIVE
    Highly motivated Senior Software Engineer specializing in full stack architectures.
    
    EDUCATION
    University of California, Berkeley
    Master of Science in Computer Science - 2019
    
    EXPERIENCE
    Apex Cloud Services | Senior Full Stack Engineer (2021 - Present)
    - Led migration of microservices architecture to Kubernetes, improving cluster utilization by 40%.
    - Spearheaded redesign of customer web portals using Next.js/React and Tailwind CSS, increasing page conversions by 25%.
    - Architected secure, scalable APIs using FastAPI and Node.js.
    
    DevLaunch Inc. | Software Engineer (2019 - 2021)
    - Developed responsive SaaS dashboard modules using React.
    
    SKILLS
    Languages: Python, JavaScript, SQL, HTML, CSS
    Frameworks: React, Next.js, FastAPI, Django
    Tools: Docker, Kubernetes, Git, AWS
    """
    
    # Test 1: Contact Extraction
    print("\n[Test 1] Testing Contact Details Parsing...")
    contact = extract_contact_info(sample_resume)
    print(f"  Parsed Name:     {contact.get('name')}")
    print(f"  Parsed Email:    {contact.get('email')}")
    print(f"  Parsed Phone:    {contact.get('phone')}")
    print(f"  Parsed Location: {contact.get('location')}")
    
    assert contact['name'] == 'SARAH JENKINS', f"Expected SARAH JENKINS, got {contact['name']}"
    assert contact['email'] == 'sarah.jenkins@example.com', f"Expected email, got {contact['email']}"
    assert contact['phone'] == '(555) 019-2834', f"Expected phone, got {contact['phone']}"
    print("  ✓ Contact Details Parsing Successful!")

    # Test 2: Local Skills Matching
    print("\n[Test 2] Testing Local Skills Dictionary Extraction...")
    skills = extract_skills_locally(sample_resume)
    skill_names = [s['skill'].lower() for s in skills]
    print(f"  Extracted Skills ({len(skills)}): {', '.join([s['skill'] for s in skills])}")
    
    assert 'react' in skill_names, "Expected React to be identified"
    assert 'python' in skill_names, "Expected Python to be identified"
    assert 'fastapi' in skill_names, "Expected FastAPI to be identified"
    print("  ✓ Skills Extraction Successful!")

    # Test 3: Local Fallback Report Generator
    print("\n[Test 3] Testing High-Fidelity Local Fallback Report...")
    job_desc = "Looking for a React developer with Python, FastAPI, and Docker experience. Familiarity with AWS and CI/CD a plus."
    analysis_report = generate_local_fallback(sample_resume, job_desc)
    
    print(f"  Overall Score:    {analysis_report.overall_score}%")
    print(f"  Skills Score:     {analysis_report.skills_score}%")
    print(f"  Experience Score: {analysis_report.experience_score}%")
    print(f"  Missing Skills:   {', '.join(analysis_report.missing_skills)}")
    print(f"  Strengths Count:  {len(analysis_report.strengths)}")
    print(f"  Weakness Count:   {len(analysis_report.weaknesses)}")
    print(f"  Improvements:     {len(analysis_report.bullet_point_improvements)} rephrasings generated")
    
    assert isinstance(analysis_report, AnalysisResult), "Analysis report must match AnalysisResult schema"
    assert analysis_report.overall_score > 0, "Score should be calculated"
    print("  ✓ Fallback Report Structure Successful!")
    
    print("\n=== ALL INTEGRATION TESTS PASSED SUCCESSFULLY ===")

if __name__ == "__main__":
    try:
        run_tests()
    except Exception as e:
        print(f"\n❌ Test validation failed: {e}", file=sys.stderr)
        sys.exit(1)
