/**
 * Real AI Service for Assessment Analysis (Phase 4)
 * 
 * Securely calls a Supabase Edge Function to hit the Gemini API.
 */
import { supabase } from '../supabase';

export const analyzeAssessment = async (payload) => {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-assessment', {
      body: payload
    });

    if (error) {
      console.error("Supabase Edge Function error:", error);
      throw error;
    }

    return data;
  } catch (err) {
    console.error("Failed to analyze assessment:", err);
    throw err;
  }
};
