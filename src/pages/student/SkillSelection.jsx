import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BrainCircuit, ArrowRight, FileCode, Atom, Server, Coffee, Terminal, Database, Code2 } from "lucide-react";
import StudentNavbar from "../../components/student/StudentNavbar";

const skills = [
  {
    id: "javascript",
    name: "JavaScript",
    icon: FileCode,
    description: "Test your core JavaScript concepts and problem-solving knowledge."
  },
  {
    id: "react",
    name: "React",
    icon: Atom,
    description: "Test your understanding of React fundamentals and modern patterns."
  },
  {
    id: "nodejs",
    name: "Node.js",
    icon: Server,
    description: "Test your backend and Node.js fundamentals."
  },
  {
    id: "java",
    name: "Java",
    icon: Coffee,
    description: "Test your Java programming and OOP fundamentals."
  },
  {
    id: "python",
    name: "Python",
    icon: Terminal,
    description: "Test your Python programming fundamentals."
  },
  {
    id: "sql",
    name: "SQL",
    icon: Database,
    description: "Test your database and SQL fundamentals."
  },
  {
    id: "htmlcss",
    name: "HTML & CSS",
    icon: Code2,
    description: "Test your frontend markup and styling fundamentals."
  }
];

const SkillSelection = () => {
  const navigate = useNavigate();
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const handleStartAssessment = () => {
    if (selectedSkillId) {
      const selectedSkill = skills.find(s => s.id === selectedSkillId);
      // Remove icon from state to prevent DataCloneError on history.pushState
      const { icon, ...skillData } = selectedSkill;
      navigate("/student/assessment/quiz", { state: { selectedSkill: skillData } });
    }
  };

  return (
    <>
      <StudentNavbar />
      <div className="min-h-screen bg-bg-base text-text-main px-4 sm:px-6 py-10">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 rounded-2xl mb-4 border border-blue-500/20">
              <BrainCircuit className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">AI Skill Assessment</h1>
            <p className="text-text-muted text-lg max-w-2xl mx-auto">
              Choose a skill to assess your current technical knowledge.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-text-muted uppercase tracking-widest">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
              Step 1 of 2
            </div>
          </div>

          {/* Skill Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
            {skills.map((skill) => {
              const Icon = skill.icon;
              const isSelected = selectedSkillId === skill.id;

              return (
                <button
                  key={skill.id}
                  onClick={() => setSelectedSkillId(skill.id)}
                  className={`relative flex flex-col items-start p-6 rounded-2xl border text-left transition-all duration-200 group ${
                    isSelected 
                      ? "border-blue-500 bg-blue-500/10 shadow-[0_0_15px_rgba(59,130,246,0.1)] ring-1 ring-blue-500/50 scale-[1.02]" 
                      : "border-border-subtle bg-bg-card hover:border-text-muted hover:bg-bg-base"
                  }`}
                >
                  <div className={`p-3 rounded-xl mb-4 transition-colors ${
                    isSelected ? "bg-blue-600 text-white" : "bg-bg-base text-text-main group-hover:text-blue-400"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 ${isSelected ? "text-blue-100" : "text-text-main"}`}>
                    {skill.name}
                  </h3>
                  
                  <p className={`text-sm leading-relaxed ${isSelected ? "text-blue-200/80" : "text-text-muted"}`}>
                    {skill.description}
                  </p>

                  {/* Selection Indicator */}
                  <div className={`absolute top-5 right-5 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? "border-blue-500 bg-blue-500" : "border-border-subtle group-hover:border-text-muted"
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Footer */}
          <div className="flex justify-center">
            <button
              onClick={handleStartAssessment}
              disabled={!selectedSkillId}
              className={`px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-3 transition-all duration-300 ${
                !selectedSkillId
                  ? "bg-border-subtle text-text-muted cursor-not-allowed opacity-70"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:scale-105"
              }`}
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default SkillSelection;
