import axios from "axios";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export const askAI = async (userMessage) => {
  try {
    const response = await axios.post(
      GROQ_URL,
      {
        model: "llama3-8b-8192",
        temperature: 0,
        messages: [
          {
            role: "system",
            content: `
You are an AI assistant for a doctor appointment booking system.

IMPORTANT RULES:
1. Respond ONLY with valid JSON.
2. Do NOT include explanations or text outside JSON.
3. If information is missing, return null.
4. Do NOT guess values.
5. Use ONLY the allowed intents and fields.

INTENTS:
- LIST_DOCTORS
- SHOW_SLOTS
- BOOK_APPOINTMENT
- LIST_APPOINTMENTS
- CANCEL_APPOINTMENT
- UNKNOWN

ALLOWED JSON FORMAT:
{
  "intent": "",
  "doctorName": null,
  "slotDate": null,
  "slotTime": null,
  "appointmentId": null
}

EXAMPLES:
User: "Show all doctors"
→ intent: LIST_DOCTORS

User: "Show slots for Dr Sharma tomorrow"
→ intent: SHOW_SLOTS, doctorName, slotDate

User: "Book appointment with Dr Sharma tomorrow at 10"
→ intent: BOOK_APPOINTMENT, doctorName, slotDate, slotTime

User: "Cancel my appointment 65a8f9..."
→ intent: CANCEL_APPOINTMENT, appointmentId
`
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    const parsed = JSON.parse(content);

    return {
      intent: parsed.intent || "UNKNOWN",
      doctorName: parsed.doctorName || null,
      slotDate: parsed.slotDate || null,
      slotTime: parsed.slotTime || null,
      appointmentId: parsed.appointmentId || null
    };

  } catch (error) {
    console.error("askAI error:", error.message);

    
    return {
      intent: "UNKNOWN",
      doctorName: null,
      slotDate: null,
      slotTime: null,
      appointmentId: null
    };
  }
};
