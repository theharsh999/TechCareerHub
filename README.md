# TechCareerHub 🚀

> An interactive career and placement platform built for students, companies, and Training & Placement Officers.

TechCareerHub is a centralized platform designed to simplify the college placement ecosystem by connecting **Students, Companies, and TPOs** through a single professional portal.

It combines placement management with intelligent career-development features such as **AI-powered skill assessment, personalized weakness detection, learning recommendations, placement risk alerts, and drive management.**

---

## ✨ Key Features

### 👨‍🎓 Student Portal
- Student dashboard with placement overview
- Complete and manage student profile
- Browse available jobs and internships
- Apply for opportunities
- Track application status
- View company opportunities and eligibility
- **AI Skill Assessment**
  - Choose from popular technical skills
  - Skill-specific MCQ assessment
  - Automatic score calculation
  - AI-powered performance analysis
  - Strength detection
  - Weakness detection
  - Personalized improvement suggestions
  - Recommended learning resources based on performance
- Placement risk insights
- Drive invitations and updates

### 🏢 Company Portal
- Company profile management
- Create and manage job/internship opportunities
- Define eligibility criteria
- Specify required technical skills
- View applicants
- Review candidate applications
- Verified Talent Match insights
- Campus drive slot booking
- Online Assessment and interview scheduling support

### 🎓 TPO Portal
- Placement dashboard
- Monitor student placement activities
- Manage registered students
- Track applications
- Manage company opportunities
- Drive request management
- Placement risk monitoring
- Identify students who may need intervention
- Risk-based student insights and alerts
- Broadcast notifications

---

## 🤖 AI Skill Assessment

One of the core features of TechCareerHub is the AI-powered skill assessment system.

### Flow

```text
Select Skill
     ↓
Skill-specific Assessment
     ↓
10 Technical Questions
     ↓
Score Calculation
     ↓
AI Performance Analysis
     ↓
Strengths + Weaknesses
     ↓
Personalized Improvement Suggestions
     ↓
Learning Resource Recommendation

```

The assessment currently supports:

* JavaScript
* React
* Node.js
* Java
* Python
* SQL
* HTML & CSS

The AI analysis evaluates the student’s actual answers and generates personalized insights instead of showing only a numerical score.

---

## ⚠️ Placement Risk Detection

TechCareerHub also provides intelligent placement-risk insights.

The system can identify students who may require additional attention based on placement-related indicators and surface them to the TPO through a dedicated risk dashboard.

This allows the placement team to move from simply tracking placement data to proactively identifying students who may need support.

---

## 🛠️ Tech Stack

**Frontend**
* React
* Vite
* Tailwind CSS
* React Router
* Lucide React

**Backend & Database**
* Supabase
* Supabase Authentication
* PostgreSQL
* Supabase Edge Functions

**AI**
* Google Gemini API
* Supabase Edge Functions for secure AI requests

**Development**
* JavaScript
* Git & GitHub

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │    TechCareerHub    │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
         👨‍🎓 Student       🏢 Company        🎓 TPO
           Portal            Portal          Portal
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                         ┌────────────┐
                         │  Supabase  │
                         │ Auth + DB  │
                         └─────┬──────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
             Placement Logic        AI Assessment
                                      │
                                      ▼
                                  Gemini API
```

---

## 📂 Project Structure

```text
TechCareerHub/
│
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── company/
│   │   ├── layout/
│   │   ├── student/
│   │   └── tpo/
│   │
│   ├── constants/
│   │   ├── assessmentData.js
│   │   ├── companyMockData.js
│   │   ├── riskConfig.js
│   │   └── RiskAlerts/
│   │
│   ├── hooks/
│   │   ├── useStudentRiskData.js
│   │   └── useTPODashboardData.js
│   │
│   ├── lib/
│   │   ├── ai/
│   │   │   └── assessmentAI.js
│   │   ├── driveEngine.js
│   │   └── riskEngine.js
│   │
│   ├── pages/
│   │   ├── student/
│   │   │   ├── Assessment.jsx
│   │   │   ├── AssessmentResult.jsx
│   │   │   ├── SkillSelection.jsx
│   │   │   └── StudentDashboard.jsx
│   │   ├── company/
│   │   └── tpo/
│   │
│   └── App.jsx
│
├── supabase/
│   └── functions/
│       └── analyze-assessment/
│           └── index.ts
│
├── package.json
└── README.md
```

---

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/theharsh999/TechCareerHub.git
   cd TechCareerHub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
   *Gemini API credentials are handled securely through Supabase Edge Functions and should not be exposed in the frontend.*

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The application will be available at: `http://localhost:5173`

---

## 🔐 Security

* Role-based protected routes
* Supabase authentication
* Secure server-side AI requests through Edge Functions
* Gemini API key stored as a Supabase secret
* Sensitive API credentials are not exposed to the frontend

---

## 🎯 Project Vision

Traditional college placement systems mainly focus on job listings, applications, and placement statistics.

TechCareerHub aims to go beyond that by creating a platform that helps students identify their skill gaps, improve their technical readiness, and become more placement-ready, while giving TPOs actionable insights to support students who may be at risk.

The goal:

> **Don’t just manage placements. Help students become placement-ready.**

---

## 🔮 Future Scope

* AI-powered resume analysis
* AI mock interviews
* Personalized learning roadmaps
* Skill-to-job matching
* Automated candidate shortlisting
* Advanced placement prediction
* Company-specific preparation paths
* Interview performance tracking
* Student career progress analytics

---

## 👥 User Roles

| Role | Purpose |
|------|---------|
| 👨‍🎓 Student | Discover opportunities, apply, assess skills and improve |
| 🏢 Company | Post opportunities and manage candidates |
| 🎓 TPO | Manage placements and monitor student progress |

---

## 📌 Status

**Active Development**

TechCareerHub is continuously being improved with new placement intelligence and AI-powered career features.

---

## 📄 License

This project is developed for educational and hackathon purposes.

