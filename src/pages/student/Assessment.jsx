import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, BrainCircuit } from "lucide-react";
import StudentNavbar from "../../components/student/StudentNavbar";
import { assessmentQuestions } from "../../constants/assessmentData";

const Assessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedSkill = location.state?.selectedSkill;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const questionsForSkill = selectedSkill ? assessmentQuestions[selectedSkill.id] : [];
  const currentQuestion = questionsForSkill ? questionsForSkill[currentQuestionIndex] : null;
  const totalQuestions = questionsForSkill ? questionsForSkill.length : 0;

  useEffect(() => {
    if (!selectedSkill || !assessmentQuestions[selectedSkill.id]) {
      navigate("/student/assessment");
    }
  }, [selectedSkill, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        // Allow native button clicks for explicit Next/Prev/Submit buttons
        if (e.target.tagName === "BUTTON" && !e.target.hasAttribute("data-option")) {
          return;
        }

        const hasAnsweredCurrent = !!selectedAnswers[currentQuestion?.id];
        
        // If focus is on an option button and it's NOT the currently selected answer,
        // let the native click happen so the user can select it via keyboard.
        if (e.target.tagName === "BUTTON" && e.target.hasAttribute("data-option")) {
          const optionValue = e.target.getAttribute("data-option");
          if (selectedAnswers[currentQuestion?.id] !== optionValue) {
            return;
          }
        }

        // If they already have an answer, pressing Enter advances to the next question
        if (hasAnsweredCurrent && !isSubmitted) {
          e.preventDefault();
          if (currentQuestionIndex === totalQuestions - 1) {
            handleSubmit();
          } else {
            handleNext();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQuestionIndex, selectedAnswers, currentQuestion, isSubmitted, totalQuestions]);

  // Loading or redirecting state
  if (!currentQuestion) return null;

  const handleOptionSelect = (option) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    const topicPerformance = {};

    questionsForSkill.forEach((q) => {
      const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
      if (isCorrect) {
        calculatedScore += 1;
      }

      if (!topicPerformance[q.topic]) {
        topicPerformance[q.topic] = { total: 0, correct: 0 };
      }
      topicPerformance[q.topic].total += 1;
      if (isCorrect) {
        topicPerformance[q.topic].correct += 1;
      }
    });

    setIsSubmitted(true);

    // Payload prepared for future step (AI integration)
    const _payload = {
      skill: selectedSkill?.id,
      score: calculatedScore,
      totalQuestions,
      questions: questionsForSkill,
      answers: selectedAnswers,
      topicPerformance: Object.keys(topicPerformance).map(topic => ({
        topic,
        correct: topicPerformance[topic].correct,
        total: topicPerformance[topic].total
      }))
    };
    
    // Navigate to the new result page with the payload and skill
    navigate("/student/assessment/result", { 
      state: { 
        payload: _payload, 
        selectedSkill 
      } 
    });
  };

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-bg-base text-text-main px-4 sm:px-6 py-8">
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
              <BrainCircuit className="w-8 h-8 text-blue-500" />
              {selectedSkill ? `${selectedSkill.name} Skill Assessment` : "AI Skill Assessment"}
            </h1>
            <p className="text-text-muted mt-2">
              Test your technical skills to discover areas for improvement.
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-text-muted uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
              Step 2 of 2
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm font-medium text-text-muted mb-2">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-border-subtle rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-bg-card border border-border-subtle rounded-2xl p-6 sm:p-8 shadow-sm mb-6">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-border-subtle text-text-muted text-xs font-semibold uppercase tracking-wider mb-4">
                {currentQuestion.topic}
              </span>
              <h2 className="text-xl sm:text-2xl font-semibold leading-relaxed">
                {currentQuestion.question} <span className="text-red-500 ml-1 opacity-80">*</span>
              </h2>
            </div>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option;
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    data-option={option}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group ${
                      isSelected 
                        ? "border-blue-500 bg-blue-500/10 ring-1 ring-blue-500/50" 
                        : "border-border-subtle hover:border-text-muted hover:bg-bg-base"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      isSelected 
                        ? "border-blue-500" 
                        : "border-text-muted group-hover:border-blue-400"
                    }`}>
                      {isSelected && <div className="w-3 h-3 rounded-full bg-blue-500" />}
                    </div>
                    <span className={`text-base sm:text-lg ${isSelected ? "text-blue-100 font-medium" : "text-text-main"}`}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className={`px-5 py-2.5 rounded-xl border flex items-center gap-2 font-medium transition-colors ${
                currentQuestionIndex === 0 
                  ? "border-border-subtle text-text-muted opacity-50 cursor-not-allowed" 
                  : "border-border-subtle text-text-main hover:bg-bg-card"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            {currentQuestionIndex === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < totalQuestions}
                className={`px-6 py-2.5 rounded-xl font-medium transition-colors ${
                  Object.keys(selectedAnswers).length < totalQuestions
                    ? "bg-border-subtle text-text-muted cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                }`}
              >
                Submit Assessment
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl border border-border-subtle text-text-main hover:bg-bg-card flex items-center gap-2 font-medium transition-colors"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Assessment;
