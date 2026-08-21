import "jsr:@supabase/functions-js/edge-runtime.d.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { skill, questions, answers, score, totalQuestions } = await req.json();

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    const prompt = `
You are a technical skill evaluator for a student career platform.
Evaluate the student's performance in the selected skill: ${skill}.

Here is the student's assessment data:
Total Score: ${score} out of ${totalQuestions}
Questions and Answers:
${questions.map((q: any) => `
Topic: ${q.topic}
Question: ${q.question}
Correct Answer: ${q.correctAnswer}
Student's Answer: ${answers[q.id] || "No answer provided"}
`).join('\n')}

Analyze the actual questions, correct answers and student's answers.
Do not invent weaknesses that are not supported by the answers.
Identify specific concepts where the student made mistakes (e.g., if they failed Promises, mention asynchronous JavaScript).

Return concise, actionable feedback.

Limit:
- strengths: maximum 3
- weaknesses: maximum 3
- recommendations: maximum 3
- summary: 2-4 sentences

Return ONLY a raw JSON object with this exact structure (no markdown tags):
{
  "summary": "String",
  "strengths": ["String", "String"],
  "weaknesses": ["String", "String"],
  "recommendations": ["String", "String"]
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error(`Gemini API failed with status ${response.status}`);
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    const resultJson = JSON.parse(resultText);

    return new Response(JSON.stringify(resultJson), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Function Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
