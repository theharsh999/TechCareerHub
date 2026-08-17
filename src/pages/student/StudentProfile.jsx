import { useEffect, useMemo, useState } from "react";
import { FileText, Save, UserRound, X } from "lucide-react";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import StudentNavbar from "../../components/student/StudentNavbar";

const proficiencyOptions = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Advanced", value: "advanced" },
];

const getProficiencyLabel = (value) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : "";

const StudentProfile = () => {
    const { user, profile } = useAuth();

    const [form, setForm] = useState({
        roll_no: "",
        branch: "",
        academic_year: "",
        cgpa: "",
        location: "",
        bio: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const [skillsLoading, setSkillsLoading] = useState(true);
    const [skillActionLoading, setSkillActionLoading] = useState(false);
    const [removingSkillId, setRemovingSkillId] = useState(null);
    const [allSkills, setAllSkills] = useState([]);
    const [studentSkills, setStudentSkills] = useState([]);
    const [skillSearch, setSkillSearch] = useState("");
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedProficiency, setSelectedProficiency] = useState("");
    const [skillsMessage, setSkillsMessage] = useState("");
    const [skillsError, setSkillsError] = useState("");

    const [resume, setResume] = useState(null);
    const [resumeUploading, setResumeUploading] = useState(false);
    const [resumeMessage, setResumeMessage] = useState("");

    useEffect(() => {
        const loadStudentProfile = async () => {
            if (!user) return;

            const { data, error } = await supabase
                .from("students")
                .select("*")
                .eq("id", user.id)
                .maybeSingle();

            if (error) {
                setError(error.message);
            }

            if (data) {
                setForm({
                    roll_no: data.roll_no || "",
                    branch: data.branch || "",
                    academic_year: data.academic_year || "",
                    cgpa: data.cgpa || "",
                    location: data.location || "",
                    bio: data.bio || "",
                });

                setResume(data.resume_url || null);
            }

            setLoading(false);
        };

        loadStudentProfile();
    }, [user]);

    useEffect(() => {
        const loadSkills = async () => {
            if (!user) return;

            setSkillsLoading(true);
            setSkillsError("");

            const [skillsResponse, studentSkillsResponse] = await Promise.all([
                supabase
                    .from("skills")
                    .select("id,name,category")
                    .order("name", { ascending: true }),
                supabase
                    .from("student_skills")
                    .select("skill_id,proficiency,skills(id,name,category)")
                    .eq("student_id", user.id),
            ]);

            if (skillsResponse.error) {
                console.error(skillsResponse.error);
                setSkillsError(
                    "Unable to load skills. Please verify your Supabase permissions and refresh."
                );
            } else {
                setAllSkills(skillsResponse.data || []);
            }

            if (studentSkillsResponse.error) {
                console.error(studentSkillsResponse.error);
                setSkillsError(
                    (prev) =>
                        prev ||
                        "Unable to load your skills. Please verify your Supabase permissions and refresh."
                );
            } else if (studentSkillsResponse.data) {
                setStudentSkills(
                    studentSkillsResponse.data.map((item) => ({
                        ...item,
                        skill: item.skills ?? null,
                    }))
                );
            }

            setSkillsLoading(false);
        };

        loadSkills();
    }, [user]);

    const filteredSkillOptions = useMemo(() => {
        const query = skillSearch.trim().toLowerCase();

        if (!query) {
            return [];
        }

        return allSkills
            .filter((skill) => skill.name.toLowerCase().includes(query))
            .slice(0, 6);
    }, [allSkills, skillSearch]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSkillSearchChange = (e) => {
        setSkillSearch(e.target.value);
        setSelectedSkill(null);
        setSkillsError("");
        setSkillsMessage("");
    };

    const handleSelectSkill = (skill) => {
        setSelectedSkill(skill);
        setSkillSearch(skill.name);
        setSkillsError("");
        setSkillsMessage("");
    };

    const handleAddSkill = async () => {
        if (!user) return;

        setSkillsMessage("");
        setSkillsError("");

        if (!selectedSkill) {
            setSkillsError("Please select a skill from the list.");
            return;
        }

        if (!selectedProficiency) {
            setSkillsError("Please choose a proficiency level.");
            return;
        }

        if (studentSkills.some((item) => item.skill_id === selectedSkill.id)) {
            setSkillsError("This skill is already added to your profile.");
            return;
        }

        setSkillActionLoading(true);

        const { error } = await supabase.from("student_skills").insert({
            student_id: user.id,
            skill_id: selectedSkill.id,
            proficiency: selectedProficiency,
        });

        setSkillActionLoading(false);

        if (error) {
            console.error(error);
            setSkillsError(`Unable to add skill: ${error.message}`);
            return;
        }

        setStudentSkills((current) => [
            ...current,
            {
                skill_id: selectedSkill.id,
                proficiency: selectedProficiency,
                skill: selectedSkill,
            },
        ]);
        setSkillsMessage(`${selectedSkill.name} added successfully.`);
        setSelectedSkill(null);
        setSkillSearch("");
        setSelectedProficiency("");
    };

    const handleRemoveSkill = async (skillId) => {
        if (!user) return;

        setSkillsMessage("");
        setSkillsError("");
        setRemovingSkillId(skillId);

        const { error } = await supabase
            .from("student_skills")
            .delete()
            .eq("student_id", user.id)
            .eq("skill_id", skillId);

        setRemovingSkillId(null);

        if (error) {
            console.error(error);
            setSkillsError(`Unable to remove skill: ${error.message}`);
            return;
        }

        setStudentSkills((current) => current.filter((item) => item.skill_id !== skillId));
        setSkillsMessage("Skill removed successfully.");
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file || !user) return;

        if (file.type !== "application/pdf") {
            setResumeMessage("Please upload a PDF file only.");
            return;
        }

        setResumeUploading(true);
        setResumeMessage("");

        const filePath = `${user.id}/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
            .from("resumes")
            .upload(filePath, file);

        if (uploadError) {
            setResumeMessage(`Upload failed: ${uploadError.message}`);
            setResumeUploading(false);
            return;
        }

        const { data } = supabase.storage
            .from("resumes")
            .getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from("students")
            .update({
                resume_url: data.publicUrl,
            })
            .eq("id", user.id);

        if (updateError) {
            setResumeMessage(`Unable to save resume: ${updateError.message}`);
        } else {
            setResume(data.publicUrl);
            setResumeMessage("Resume uploaded successfully!");
        }

        setResumeUploading(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!user) return;

        setSaving(true);
        setMessage("");
        setError("");

        const { error } = await supabase
            .from("students")
            .upsert({
                id: user.id,
                roll_no: form.roll_no ? form.roll_no.trim() : null,
                branch: form.branch,
                academic_year: form.academic_year,
                cgpa: form.cgpa ? Number(form.cgpa) : null,
                location: form.location,
                bio: form.bio,
            });

        if (error) {
            setError(error.message);
        } else {
            setMessage("Profile updated successfully!");
        }

        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-bg-base text-text-muted flex items-center justify-center">
                Loading profile...
            </div>
        );
    }

    return (
        <>
            <StudentNavbar />
            <div className="min-h-screen px-6 py-10">
                <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                            <UserRound size={24} />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold">
                                Student Profile
                            </h1>

                            <p className="text-text-muted mt-1">
                                Keep your profile updated to get better opportunities.
                            </p>
                        </div>
                    </div>
                </div>

                <Card>
                    <form onSubmit={handleSave} className="space-y-6">

                        {/* Account Information */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Account Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        value={profile?.full_name || ""}
                                        disabled
                                        className="w-full rounded-lg border border-border-subtle bg-bg-hover/60 px-3 py-2.5 text-text-muted"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Email
                                    </label>

                                    <input
                                        value={profile?.email || ""}
                                        disabled
                                        className="w-full rounded-lg border border-border-subtle bg-bg-hover/60 px-3 py-2.5 text-text-muted"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Resume */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Resume
                            </h2>

                            <div className="rounded-xl border border-border-subtle bg-bg-card p-5">
                                <div className="flex flex-wrap items-center gap-4">

                                    <label className="cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-medium hover:bg-indigo-500">
                                        <span className="flex items-center gap-2">
                                            <FileText size={17} />
                                            {resumeUploading ? "Uploading..." : "Upload Resume"}
                                        </span>

                                        <input
                                            type="file"
                                            accept=".pdf,application/pdf"
                                            onChange={handleResumeUpload}
                                            disabled={resumeUploading}
                                            className="hidden"
                                        />
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            window.open(
                                                "https://resume-edge-ai.vercel.app/builder",
                                                "_blank"
                                            )
                                        }
                                        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-medium"
                                    >
                                        Build Resume
                                    </button>

                                    {resume && (
                                        <a
                                            href={resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-indigo-400 hover:text-indigo-300"
                                        >
                                            View Resume
                                        </a>
                                    )}

                                </div>

                                {resumeMessage && (
                                    <p className="mt-3 text-sm text-text-muted">
                                        {resumeMessage}
                                    </p>
                                )}

                                {resume && (
                                    <div className="mt-4">
                                        <iframe
                                            src={resume}
                                            title="Resume Preview"
                                            className="w-full h-[600px] rounded-lg border border-border-subtle"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Academic Information */}
                        <div>
                            <h2 className="text-lg font-semibold mb-4">
                                Academic Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Roll Number
                                    </label>

                                    <input
                                        name="roll_no"
                                        value={form.roll_no}
                                        onChange={handleChange}
                                        placeholder="e.g. 21BCE1010"
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Branch
                                    </label>

                                    <input
                                        name="branch"
                                        value={form.branch}
                                        onChange={handleChange}
                                        placeholder="e.g. Information Technology"
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Academic Year
                                    </label>

                                    <select
                                        name="academic_year"
                                        value={form.academic_year}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500"
                                    >
                                        <option value="">Select year</option>
                                        <option value="1st Year">1st Year</option>
                                        <option value="2nd Year">2nd Year</option>
                                        <option value="3rd Year">3rd Year</option>
                                        <option value="4th Year">4th Year</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        CGPA
                                    </label>

                                    <input
                                        type="number"
                                        name="cgpa"
                                        value={form.cgpa}
                                        onChange={handleChange}
                                        min="0"
                                        max="10"
                                        step="0.01"
                                        placeholder="e.g. 8.75"
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Location
                                    </label>

                                    <input
                                        name="location"
                                        value={form.location}
                                        onChange={handleChange}
                                        placeholder="e.g. Mumbai"
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500"
                                    />
                                </div>

                            </div>
                        </div>

                        {/* Bio */}
                        <div>
                            <label className="block text-sm text-text-muted mb-2">
                                About You
                            </label>

                            <textarea
                                name="bio"
                                value={form.bio}
                                onChange={handleChange}
                                rows="4"
                                placeholder="Tell companies a little about yourself..."
                                className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500 resize-none"
                            />
                        </div>

                        {/* Skills & Expertise */}
                        <div>
                            <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold mb-1">
                                        Skills & Expertise
                                    </h2>
                                    <p className="text-sm text-text-muted">
                                        Showcase your strongest skills so recruiters can spot your expertise quickly.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 grid gap-3 md:grid-cols-[1.8fr_1fr_auto]">
                                <div className="relative">
                                    <label className="block text-sm text-text-muted mb-2">
                                        Search skills
                                    </label>

                                    <input
                                        value={skillSearch}
                                        onChange={handleSkillSearchChange}
                                        placeholder="Search skills..."
                                        disabled={!!skillsError}
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
                                    />

                                    {selectedSkill && (
                                        <p className="mt-2 text-sm text-text-muted">
                                            Selected skill: <span className="font-medium text-slate-100">{selectedSkill.name}</span>
                                        </p>
                                    )}

                                    {skillSearch && !selectedSkill && filteredSkillOptions.length > 0 && (
                                        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-2xl border border-border-subtle bg-slate-950/95 shadow-xl">
                                            {filteredSkillOptions.map((skill) => (
                                                <button
                                                    key={skill.id}
                                                    type="button"
                                                    onClick={() => handleSelectSkill(skill)}
                                                    className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left text-sm text-text-main transition-colors hover:bg-bg-hover"
                                                >
                                                    <span>{skill.name}</span>
                                                    <span className="text-text-main0">{skill.category}</span>
                                                </button>
                                            ))}
                                            {allSkills.filter((skill) => skill.name.toLowerCase().includes(skillSearch.trim().toLowerCase())).length > 6 && (
                                                <div className="px-3 py-2 text-xs text-text-main0">
                                                    Showing top 6 results. Keep typing to narrow the list.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {!skillsLoading && skillSearch && filteredSkillOptions.length === 0 && !skillsError && (
                                        <div className="absolute z-10 mt-1 w-full rounded-2xl border border-border-subtle bg-slate-950/95 px-3 py-3 text-sm text-text-muted">
                                            No matching skills found. Try another keyword.
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm text-text-muted mb-2">
                                        Proficiency
                                    </label>

                                    <select
                                        value={selectedProficiency}
                                        onChange={(e) => setSelectedProficiency(e.target.value)}
                                        className="w-full rounded-lg border border-border-subtle bg-bg-card px-3 py-2.5 outline-none focus:border-indigo-500"
                                    >
                                        <option value="">Select proficiency</option>
                                        {proficiencyOptions.map((level) => (
                                            <option key={level.value} value={level.value}>
                                                {level.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        disabled={skillActionLoading}
                                        onClick={handleAddSkill}
                                        className="w-full"
                                    >
                                        {skillActionLoading ? "Adding..." : "Add Skill"}
                                    </Button>
                                </div>
                            </div>

                            {skillsError && (
                                <p className="mt-3 text-sm text-red-400">
                                    {skillsError}
                                </p>
                            )}

                            {skillsMessage && (
                                <p className="mt-3 text-sm text-green-400">
                                    {skillsMessage}
                                </p>
                            )}

                            <div className="mt-6">
                                {skillsLoading ? (
                                    <div className="rounded-2xl border border-border-subtle bg-slate-950/80 p-5 text-sm text-text-muted">
                                        Loading skills...
                                    </div>
                                ) : studentSkills.length === 0 ? (
                                    <div className="rounded-2xl border border-border-subtle bg-slate-950/80 p-5 text-sm text-text-muted">
                                        You haven’t added any skills yet. Start by searching for a skill and selecting your proficiency.
                                    </div>
                                ) : (
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        {studentSkills.map((item) => (
                                            <div
                                                key={item.skill_id}
                                                className="rounded-2xl border border-border-subtle bg-slate-950/80 p-4"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="font-semibold text-slate-100">
                                                            {item.skill?.name || "Unknown skill"}
                                                        </p>
                                                        <p className="text-sm text-text-main0">
                                                            {item.skill?.category || "General"}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveSkill(item.skill_id)}
                                                        disabled={removingSkillId === item.skill_id}
                                                        className="rounded-lg border border-border-subtle bg-bg-card px-2.5 py-2 text-text-muted transition-colors hover:border-red-400 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-60"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-bg-card/70 px-3 py-3">
                                                    <span className="text-sm text-text-muted">{getProficiencyLabel(item.proficiency)}</span>
                                                    <span className="rounded-full bg-indigo-500/10 px-2.5 py-1 text-xs uppercase tracking-[0.15em] text-indigo-300">
                                                        {getProficiencyLabel(item.proficiency)}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-400">
                                {error}
                            </p>
                        )}

                        {message && (
                            <p className="text-sm text-green-400">
                                {message}
                            </p>
                        )}

                        <div className="flex justify-end">
                            <Button type="submit" disabled={saving}>
                                <span className="flex items-center gap-2">
                                    <Save size={17} />
                                    {saving ? "Saving..." : "Save Profile"}
                                </span>
                            </Button>
                        </div>

                    </form>
                </Card>
            </div>
            </div>
        </>
    );
};

export default StudentProfile;