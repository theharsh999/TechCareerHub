import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrainCircuit, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw, ChevronLeft, Target, BarChart2, PlayCircle, ExternalLink } from "lucide-react";
import StudentNavbar from "../../components/student/StudentNavbar";
import { analyzeAssessment } from "../../lib/ai/assessmentAI";

const COURSE_RECOMMENDATIONS = {
  "javascript": "https://youtu.be/EerdGm-ehJQ?si=psmGSlU-JfBWYUFi",
  "react": "https://youtu.be/3LRZRSIh_KE?si=cWHkD5VDizKjzgrK",
  "nodejs": "https://youtu.be/Oe421EPjeBE?si=QFReVOtK0fGdkgyY",
  "java": "https://youtu.be/eIrMbAQSU34?si=SSibu0SEfW-q3haC",
  "python": "https://youtu.be/UrsmFxEIp5k?si=Y2a6ETpE9TWm8KSc",
  "sql": "https://youtu.be/hlGoQC332VM?si=GtAESDylwx2r6Nq5",
  "htmlcss": "https://youtu.be/G3e-cpL7ofc?si=73ZC0jkUSkgrWH4u"
};

const AssessmentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const payload = location.state?.payload;
  const selectedSkill = location.state?.selectedSkill;

  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!payload || !selectedSkill) {
      navigate("/student/assessment");
      return;
    }

    const fetchAnalysis = async () => {
      setLoading(true);
      try {
        const result = await analyzeAssessment({
          skill: payload.skill,
          questions: payload.questions,
          answers: payload.answers,
          score: payload.score,
          totalQuestions: payload.totalQuestions
        });
        setAiAnalysis(result);
        setError(false);
      } catch (error) {
        console.error("Failed to fetch AI analysis", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [payload, selectedSkill, navigate]);

  if (!payload || !selectedSkill) return null;

  const { score, totalQuestions } = payload;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceLabel = (pct) => {
    if (pct >= 90) return { label: "Excellent", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" };
    if (pct >= 75) return { label: "Strong", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    if (pct >= 60) return { label: "Good", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
    if (pct >= 40) return { label: "Needs Improvement", color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" };
    return { label: "Beginner", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
  };

  const performance = getPerformanceLabel(percentage);

  const showRecommendation = score < 8;
  const recommendedCourseUrl = COURSE_RECOMMENDATIONS[payload?.skill];

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-bg-base text-text-main px-4 sm:px-6 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Header Section */}
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
              <div className="text-center md:text-left">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-border-subtle text-text-muted text-sm font-semibold uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Assessment Complete
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {selectedSkill.name} Skill Assessment
                </h1>
                <p className="text-text-muted">
                  You've successfully completed the assessment. Here is your detailed performance breakdown.
                </p>
              </div>

              {/* Circular Score */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="relative w-36 h-36 flex items-center justify-center rounded-full border-8 border-bg-base bg-bg-card shadow-xl">
                  <div className={`absolute inset-0 rounded-full border-4 ${performance.border} m-1`}></div>
                  <div className="text-center">
                    <span className="text-4xl font-bold">{percentage}%</span>
                    <p className="text-text-muted text-sm font-medium mt-1">{score} / {totalQuestions}</p>
                  </div>
                </div>
                <div className={`mt-4 px-4 py-1.5 rounded-full border font-semibold text-sm ${performance.bg} ${performance.border} ${performance.color}`}>
                  {performance.label}
                </div>
              </div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-5">
              <div className="text-text-muted text-sm font-semibold uppercase mb-1">Score</div>
              <div className="text-2xl font-bold">{score}/{totalQuestions}</div>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-5">
              <div className="text-text-muted text-sm font-semibold uppercase mb-1">Accuracy</div>
              <div className="text-2xl font-bold">{percentage}%</div>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-5">
              <div className="text-green-500/80 text-sm font-semibold uppercase mb-1">Correct</div>
              <div className="text-2xl font-bold text-green-400">{score}</div>
            </div>
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-5">
              <div className="text-red-500/80 text-sm font-semibold uppercase mb-1">Incorrect</div>
              <div className="text-2xl font-bold text-red-400">{totalQuestions - score}</div>
            </div>
          </div>

          {/* AI Skill Analysis Section */}
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-subtle">
              <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-blue-400">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold">AI Skill Analysis</h2>
                <p className="text-text-muted text-sm">Personalized insights based on your answers.</p>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 text-text-muted animate-pulse">
                <BrainCircuit className="w-10 h-10 mb-4 opacity-50" />
                <p>Analyzing your performance...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12 text-center text-text-muted">
                <AlertTriangle className="w-10 h-10 mb-4 text-orange-400 opacity-80" />
                <h3 className="text-lg font-semibold text-text-main mb-2">Analysis Unavailable</h3>
                <p>AI analysis is temporarily unavailable. Please check your score summary above.</p>
              </div>
            ) : aiAnalysis ? (
              <div className="space-y-8">
                {/* Overall */}
                <div>
                  <h3 className="text-base font-semibold flex items-center gap-2 mb-2 text-text-main">
                    <BarChart2 className="w-4 h-4 text-blue-400" />
                    Overall Analysis
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed bg-bg-base p-4 rounded-xl border border-border-subtle">
                    {aiAnalysis.summary}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div>
                    <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-text-main">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Strengths
                    </h3>
                    <ul className="space-y-1">
                      {aiAnalysis.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-bg-base transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-text-muted leading-relaxed">{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas to Improve */}
                  <div>
                    <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-text-main">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      Areas to Improve
                    </h3>
                    <ul className="space-y-1">
                      {aiAnalysis.weaknesses.map((weak, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-bg-base transition-colors">
                          <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span className="text-sm text-text-muted leading-relaxed">{weak}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h3 className="text-base font-semibold flex items-center gap-2 mb-3 text-text-main">
                    <Target className="w-4 h-4 text-purple-400" />
                    Recommended Next Steps
                  </h3>
                  <div className="flex flex-col gap-1">
                    {aiAnalysis.recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-bg-base transition-colors group border border-transparent hover:border-border-subtle">
                        <ArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform shrink-0" />
                        <span className="text-sm text-text-muted">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Learning Recommendation */}
          {showRecommendation && recommendedCourseUrl && (
            <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-muted mb-1.5">Recommended for You</h3>
                <h2 className="text-lg font-bold mb-1">Strengthen your {selectedSkill.name} fundamentals</h2>
                <p className="text-sm text-text-muted max-w-xl">
                  Your assessment score suggests that revisiting some core concepts could help improve your performance.
                </p>
              </div>
              <a
                href={recommendedCourseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 flex items-center gap-2 px-5 py-2.5 bg-bg-base hover:bg-border-subtle/50 border border-border-subtle rounded-xl text-sm font-semibold transition-all"
              >
                <PlayCircle className="w-5 h-5 text-red-500" />
                Watch Course
                <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
              </a>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={() => navigate("/student/dashboard")}
              className="px-6 py-3 rounded-xl border border-border-subtle hover:bg-bg-card transition-colors font-medium flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Dashboard
            </button>
            <button
              onClick={() => navigate("/student/assessment/quiz", { state: { selectedSkill } })}
              className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 transition-all font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Retry Assessment
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default AssessmentResult;
