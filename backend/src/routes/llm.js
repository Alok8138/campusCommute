// // D:\Om\campusCommute\backend\src\routes\llm.js
// const express = require("express");
// const axios = require("axios");
// const router = express.Router();

// router.post("/api/chat", async (req, res) => {
//   console.log("==== /api/chat endpoint hit ====");

//   const { question, systemPrompt } = req.body || {};

//   if (!question || !question.toString().trim()) {
//     return res.status(400).json({ error: "Missing question in request body" });
//   }

//   // We no longer call Hugging Face from Node. Forward the request to the Python LLM service.
//   const PYTHON_SERVICE_URL = process.env.PYTHON_LLM_SERVICE || "http://localhost:8000";

//   const payload = {
//     question,
//     systemPrompt: systemPrompt || "You are a helpful assistant."
//   };

//   try {
//     const response = await axios.post(`${PYTHON_SERVICE_URL}/generate`, payload, {
//       headers: { "Content-Type": "application/json" },
//       timeout: 30000,
//     });

//     console.log("✅ Response received from Python LLM service:", response.data);

//     // Expect the Python service to return { answer: string, conversation_id?: string }
//     const answer = response.data?.answer;
//     if (!answer) {
//       console.warn("Python LLM service returned unexpected shape:", response.data);
//       return res.status(502).json({ error: "Invalid response from LLM service", details: response.data });
//     }

//     return res.json({ answer });
//   } catch (err) {
//     console.error("❌ Error forwarding to Python LLM service:", err.response?.data || err.message);
//     const details = err.response?.data || err.message;
//     return res.status(502).json({ error: "LLM service error", details });
//   }
// });

// module.exports = router;










// // // D:\Om\campusCommute\backend\src\routes\llm.js
// // const express = require("express");
// // const axios = require("axios");
// // const router = express.Router();

// // router.post("/api/chat", async (req, res) => {
// //   console.log("==== /api/chat endpoint hit ====");

// //   const { question, systemPrompt } = req.body || {};
// //   console.log("Incoming body:", req.body);

// //   if (!question || !question.toString().trim()) {
// //     console.error("❌ Missing question in request body");
// //     return res.status(400).json({ error: "Missing question in request body" });
// //   }

// //   const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_HUB_API_TOKEN;
// //   console.log("HUGGINGFACE_API_KEY present?", !!HUGGINGFACE_API_KEY);
// //   console.log("HUGGINGFACE_API_KEY (masked):", HUGGINGFACE_API_KEY?.slice(0, 10) + "****");

// //   if (!HUGGINGFACE_API_KEY) {
// //     console.error("❌ No HUGGINGFACE_API_KEY in environment variables");
// //     return res.status(500).json({ error: "HUGGINGFACE_API_KEY not configured on the server" });
// //   }

// //   const TARGET_MODEL = process.env.HF_MODEL || "gpt2";
// //   console.log("Using model:", TARGET_MODEL);

// //   // Build prompt
// //   const prompt = `${systemPrompt || ""}\n\nUser: ${question}\nAssistant:`.trim();
// //   console.log("Generated prompt:", prompt);

// //   // Headers
// //   const headers = {
// //     Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
// //     "Content-Type": "application/json",
// //     "X-Task": "text-generation",
// //     "X-Wait-For-Model": "true",
// //     "X-Use-Cache": "false",
// //   };
// //   console.log("Request headers:", headers);

// //   const payload = {
// //     inputs: prompt,
// //     // parameters: {
// //     //   max_new_tokens: 256,
// //     //   temperature: 0.2,
// //     //   return_full_text: false,
// //     // },
// //   };
// //   console.log("Payload:", JSON.stringify(payload, null, 2));

// //   try {
// //     const primaryUrl = `https://api-inference.huggingface.co/models/${TARGET_MODEL}`;
// //     console.log("Calling primary model URL:", primaryUrl);

// //     let resp = await axios.post(primaryUrl, payload, {
// //       headers,
// //       timeout: 120000,
// //       validateStatus: () => true,
// //     });

// //     console.log("Primary HF API status:", resp.status);
// //     console.log("Primary HF API response data:", JSON.stringify(resp.data, null, 2));

// //     // Retry logic if failed
// //     if (resp.status !== 200) {
// //       console.error("❌ Primary model call failed with status:", resp.status);

// //       const fallbackModel = "gpt2";
// //       if (TARGET_MODEL !== fallbackModel) {
// //         console.log("Trying fallback model:", fallbackModel);

// //         const fbUrl = `https://api-inference.huggingface.co/models/${fallbackModel}`;
// //         console.log("Fallback URL:", fbUrl);

// //         const fb = await axios.post(fbUrl, payload, {
// //           headers,
// //           timeout: 120000,
// //           validateStatus: () => true,
// //         });

// //         console.log("Fallback HF status:", fb.status);
// //         console.log("Fallback HF data:", JSON.stringify(fb.data, null, 2));

// //         if (fb.status === 200) {
// //           const answer = extractTextGen(fb.data, prompt);
// //           console.log("✅ Extracted fallback answer:", answer);
// //           return res.json({ answer });
// //         } else {
// //           console.error("❌ Fallback model also failed");
// //         }
// //       }

// //       console.error("❌ HF API error response:", resp.data);
// //       return res.status(500).json({
// //         error: `HF API error ${resp.status}`,
// //         details: typeof resp.data === "string" ? resp.data : (resp.data?.error || resp.data),
// //       });
// //     }

// //     // Successful response
// //     const answer = extractTextGen(resp.data, prompt);
// //     console.log("✅ Extracted primary answer:", answer);
// //     return res.json({ answer });

// //   } catch (err) {
// //     console.error("❌ Exception caught in try/catch:", err);
// //     const status = err.response?.status;
// //     console.error("Error status:", status);
// //     console.error("Error response data:", err.response?.data);

// //     if (status === 401) {
// //       return res.status(500).json({ error: "Invalid Hugging Face API key.", details: err.response?.data });
// //     }
// //     if (status === 404) {
// //       return res.status(500).json({
// //         error: "Model not found or not accessible. Check model id and access permissions.",
// //         details: err.response?.data,
// //       });
// //     }
// //     return res.status(500).json({
// //       error: "LLM request failed",
// //       details: err.response?.data?.error || err.message,
// //     });
// //   }
// // });

// // // Helper: Parse Hugging Face text-generation responses
// // function extractTextGen(data, prompt) {
// //   console.log("🧩 extractTextGen() called");
// //   console.log("Raw data to extract from:", JSON.stringify(data, null, 2));

// //   if (Array.isArray(data) && data[0]?.generated_text) {
// //     const full = data[0].generated_text;
// //     console.log("Extracted generated_text from array:", full);
// //     return (full?.startsWith(prompt) ? full.slice(prompt.length) : full)?.trim() || full || "No output";
// //   }

// //   if (data?.generated_text) {
// //     const full = data.generated_text;
// //     console.log("Extracted generated_text from object:", full);
// //     return (full?.startsWith(prompt) ? full.slice(prompt.length) : full)?.trim() || full || "No output";
// //   }

// //   if (data?.choices?.[0]?.text) {
// //     const txt = data.choices[0].text.trim();
// //     console.log("Extracted OpenAI-style text:", txt);
// //     return txt;
// //   }

// //   console.warn("⚠️ Could not extract text. Raw data returned.");
// //   return typeof data === "string" ? data : JSON.stringify(data);
// // }

// // module.exports = router;







// // // backend/src/routes/llm.js
// // const express = require("express");
// // const axios = require("axios");
// // const router = express.Router();

// // router.post("/api/chat", async (req, res) => {
// //   const { question, systemPrompt } = req.body || {};
// //   if (!question || !question.toString().trim()) {
// //     return res.status(400).json({ error: "Missing question in request body" });
// //   }

// //   const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
// //   console.log("HUGGINGFACE_API_KEY:", HUGGINGFACE_API_KEY);

// //   if (!HUGGINGFACE_API_KEY) {
// //     return res.status(500).json({ error: "HUGGINGFACE_API_KEY not configured on the server" });
// //   }

// //   // Start with a public, always-available text-generation model to validate end-to-end
// //   // You can switch to meta-llama/Llama-3.3-70B-Instruct after your account has access.
// //   const TARGET_MODEL = process.env.HF_MODEL || "gpt2";

// //   // Build a single prompt (text-generation task)
// //   const prompt = `${systemPrompt || ""}\n\nUser: ${question}\nAssistant:`.trim();

// //   // Shared request options
// //   const headers = {
// //     Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
// //     "Content-Type": "application/json",
// //     // Use text-generation task; "conversational" is deprecated in client and not needed here
// //     // for plain text prompts. This helps routing on some providers.
// //     "X-Task": "text-generation",
// //     "X-Wait-For-Model": "true",
// //     "X-Use-Cache": "false",
// //   };

// //   const payload = {
// //     inputs: prompt,
// //     parameters: {
// //       max_new_tokens: 256,
// //       temperature: 0.2,
// //       // return_full_text=false makes parsing easier when supported by backend
// //       return_full_text: false
// //     }
// //   };

// //   try {
// //     // Try target model first (may be gated)
// //     const primaryUrl = `https://api-inference.huggingface.co/models/${TARGET_MODEL}`;
// //     let resp = await axios.post(primaryUrl, payload, {
// //       headers,
// //       timeout: 120000,
// //       validateStatus: () => true,
// //     });

// //     // If gated/not found, retry once with a public fallback
// //     if (resp.status !== 200) {
// //       const fallbackModel = "gpt2";
// //       console.error("HF API full error:", resp.data);

// //       if (TARGET_MODEL !== fallbackModel) {
// //         const fbUrl = `https://api-inference.huggingface.co/models/${fallbackModel}`;
// //         const fb = await axios.post(fbUrl, payload, {
// //           headers,
// //           timeout: 120000,
// //           validateStatus: () => true,
// //         });
// //         if (fb.status === 200) {
// //           const answer = extractTextGen(fb.data, prompt);
// //           return res.json({ answer });
// //         }
// //       }
// //       return res.status(500).json({
// //         error: `HF API error ${resp.status}`,
// //         details: typeof resp.data === "string" ? resp.data : (resp.data?.error || resp.data),
// //       });
// //     }

// //     const answer = extractTextGen(resp.data, prompt);
// //     return res.json({ answer });
// //   } catch (err) {
// //     const status = err.response?.status;
// //     if (status === 401) {
// //       return res.status(500).json({ error: "Invalid Hugging Face API key.", details: err.response?.data });
// //     }
// //     if (status === 404) {
// //       return res.status(500).json({
// //         error: "Model not found or not accessible. Check model id and access permissions.",
// //         details: err.response?.data,
// //       });
// //     }
// //     return res.status(500).json({
// //       error: "LLM request failed",
// //       details: err.response?.data?.error || err.message,
// //     });
// //   }
// // });

// // // Parse common HF Inference API shapes for text-generation
// // function extractTextGen(data, prompt) {
// //   // Typical: [{ generated_text: "..." }]
// //   if (Array.isArray(data) && data[0]?.generated_text) {
// //     const full = data[0].generated_text;
// //     // If backend returned full text, remove prompt echo
// //     return (full?.startsWith(prompt) ? full.slice(prompt.length) : full)?.trim() || full || "No output";
// //   }
// //   // Some providers: { generated_text: "..." }
// //   if (data?.generated_text) {
// //     const full = data.generated_text;
// //     return (full?.startsWith(prompt) ? full.slice(prompt.length) : full)?.trim() || full || "No output";
// //   }
// //   // OpenAI-ish: { choices: [ { text: "..." } ] }
// //   if (data?.choices?.[0]?.text) {
// //     return data.choices[0].text.trim();
// //   }
// //   // Fallback
// //   return typeof data === "string" ? data : JSON.stringify(data);
// // }

// // module.exports = router;








// // // // D:\Om\campusCommute\backend\src\routes\llm.js
// // const express = require("express");
// // const axios = require("axios");
// // const router = express.Router();

// // router.post("/api/chat", async (req, res) => {
// //   const { question, systemPrompt } = req.body || {};
// //   if (!question || !question.toString().trim()) {
// //     return res.status(400).json({ error: "Missing question in request body" });
// //   }

// //   const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
// //   console.log("HUGGINGFACE_API_KEY:", HUGGINGFACE_API_KEY);

// //   if (!HUGGINGFACE_API_KEY) {
// //     return res.status(500).json({ error: "HUGGINGFACE_API_KEY not configured on the server" });
// //   }

// //   // Use public sanity model first if your target is gated/unreliable
// //   const configuredModel = process.env.HF_MODEL;
// //   const fallbackModel = "gpt2";
// //   const model = configuredModel || fallbackModel;

// //   const prompt = `${systemPrompt || ""}\n\nUser: ${question}\nAssistant:`.trim();

// //   try {
// //     const url = "https://api-inference.huggingface.co/models/meta-llama/Llama-3.3-70B-Instruct";
// //     const payload = { inputs: prompt };
// //     const resp = await axios.post(url, payload, {
// //       headers: {
// //         Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
// //         "Content-Type": "application/json",
// //         "X-Wait-For-Model": "true",
// //         "X-Use-Cache": "false",
// //         "X-Task": "conversational",
// //       },
// //       timeout: 120000,
// //       validateStatus: () => true,
// //     });

// //     if (resp.status !== 200) {
// //       // If target model fails (e.g., gated 404), try fallback once
// //       if (model !== fallbackModel) {
// //         const fbUrl = `https://api-inference.huggingface.co/models/${fallbackModel}`;
// //         const fb = await axios.post(fbUrl, payload, {
// //           headers: {
// //             Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
// //             "Content-Type": "application/json",
// //             "X-Wait-For-Model": "true",
// //             "X-Use-Cache": "false",
// //             "X-Task": "conversational",
// //           },
// //           timeout: 120000,
// //           validateStatus: () => true,
// //         });
// //         if (fb.status === 200) {
// //           const out = Array.isArray(fb.data) ? fb.data[0]?.generated_text : fb.data?.generated_text || "";
// //           const answer = out?.slice(prompt.length).trim() || out || "No output";
// //           return res.json({ answer });
// //         }
// //       }
// //       return res.status(500).json({
// //         error: `HF API error ${resp.status}`,
// //         details: typeof resp.data === "string" ? resp.data : (resp.data?.error || resp.data),
// //       });
// //     }

// //     const data = resp.data;
// //     let answer = "";
// //     if (typeof data === "string") {
// //       answer = data;
// //     } else if (Array.isArray(data) && data[0]?.generated_text) {
// //       const full = data[0].generated_text;
// //       answer = full.slice(prompt.length).trim() || full;
// //     } else if (data?.generated_text) {
// //       answer = data.generated_text;
// //     } else if (data?.choices?.[0]?.text) {
// //       answer = data.choices[0].text;
// //     } else {
// //       answer = JSON.stringify(data);
// //     }

// //     return res.json({ answer });
// //   } catch (err) {
// //     const status = err.response?.status;
// //     if (status === 401) {
// //       return res.status(500).json({ error: "Invalid Hugging Face API key.", details: err.response?.data });
// //     }
// //     if (status === 404) {
// //       return res.status(500).json({
// //         error: "Model not found or not accessible. Check model id and access permissions.",
// //         details: err.response?.data,
// //       });
// //     }
// //     return res.status(500).json({ error: "LLM request failed", details: err.response?.data?.error || err.message });
// //   }
// // });

// // module.exports = router;

















// // const express = require("express");
// // const axios = require("axios");
// // const router = express.Router();

// // // POST /api/chat
// // // Body: { question: string, systemPrompt?: string }
// // router.post("/api/chat", async (req, res) => {
// //   try {
// //     const { question, systemPrompt } = req.body || {};

// //     if (!question || !question.toString().trim()) {
// //       return res.status(400).json({ error: "Missing question in request body" });
// //     }

// //     const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;
// //     if (!HUGGINGFACE_API_KEY) {
// //       return res
// //         .status(500)
// //         .json({ error: "HUGGINGFACE_API_KEY not configured on the server" });
// //     }

// //     // Use a more reliable default model (publicly available)
// //     const model = process.env.HF_MODEL || "facebook/opt-350m";  // Smaller, public model that's reliable

// //     // Log request details for debugging
// //     console.log("LLM Request:", {
// //       model,
// //       questionLength: question.length,
// //       hasSystemPrompt: !!systemPrompt
// //     });

// //     // Build a simple prompt combining optional systemPrompt and the user question.
// //     const prompt = `${systemPrompt || ""}\n\nUser: ${question}\nAssistant:`.trim();

// //     const payload = {
// //       inputs: prompt,
// //       parameters: {
// //         max_new_tokens: 256,
// //         temperature: 0.2,
// //       },
// //     };

// //     const resp = await axios.post(
// //       `https://api-inference.huggingface.co/models/${model}`,
// //       payload,
// //       {
// //         headers: {
// //           Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
// //           "Content-Type": "application/json",
// //         },
// //         timeout: 120000,
// //       }
// //     );

// //     let answer = "";
// //     // Common response shapes from HF Inference API
// //     if (typeof resp.data === "string") {
// //       answer = resp.data;
// //     } else if (Array.isArray(resp.data) && resp.data[0]?.generated_text) {
// //       answer = resp.data[0].generated_text;
// //     } else if (resp.data?.generated_text) {
// //       answer = resp.data.generated_text;
// //     } else if (resp.data?.choices?.[0]?.text) {
// //       answer = resp.data.choices[0].text;
// //     } else {
// //       // Fallback: stringify the response (useful for debugging)
// //       answer = JSON.stringify(resp.data);
// //     }

// //     return res.json({ answer });
// //   } catch (err) {
// //     // Enhanced error logging
// //     console.error("LLM route error:", {
// //       error: err.message,
// //       status: err.response?.status,
// //       statusText: err.response?.statusText,
// //       data: err.response?.data,
// //       model: process.env.HF_MODEL || "google/flan-t5-base"
// //     });

// //     // Check for specific error types
// //     if (err.response?.status === 401) {
// //       return res.status(500).json({ 
// //         error: "Invalid Hugging Face API key. Please check your HUGGINGFACE_API_KEY environment variable.",
// //         details: err.response.data
// //       });
// //     }
    
// //     if (err.response?.status === 404) {
// //       return res.status(500).json({ 
// //         error: "Model not found or not accessible. Please check the model name and your access permissions.",
// //         details: err.response.data
// //       });
// //     }

// //     return res.status(500).json({ 
// //       error: "LLM request failed", 
// //       details: err.response?.data?.error || err.message,
// //       model: process.env.HF_MODEL || "google/flan-t5-base"
// //     });
// //   }
// // });

// // module.exports = router;
