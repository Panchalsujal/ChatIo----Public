import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {
  HumanMessage,
  SystemMessage,
  AIMessage,
  tool,
  createAgent,
} from "langchain";

import { ChatMistralAI } from "@langchain/mistralai";
import * as z from "zod";

import { searchInternet } from "./internet.server.js";


// models

const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});


// tool definition

const searchInternetTool = tool(searchInternet, {
  name: "searchInternet",
  description:
    "Search latest real-time information from the internet. Use when user asks about news, latest updates, current events, or recent information.",
  schema: z.object({
    query: z.string(),
  }),
});


// agent creation

const agent = createAgent({
  model: geminiModel,
  tools: [searchInternetTool],
});


// AI main response function

export async function aigenrateResponse(messages) {
  try {
    const formattedMessages = messages
      .map((msg) => {
        if (msg.role === "user") {
          return new HumanMessage(msg.content);
        }

        if (msg.role === "ai") {
          return new AIMessage(msg.content);
        }

        return null;
      })
      .filter(Boolean);

    const response = await agent.invoke({
      messages: [
        new SystemMessage(`
You are a smart assistant.

IMPORTANT:
If user asks anything about:
- latest news
- today updates
- recent events
- real-time info
- current status

ALWAYS use searchInternet tool before answering and give infotmation deeply.
`),

        ...formattedMessages,
      ],
    });

    return response.messages.at(-1).text;
  } catch (error) {
    console.error("Agent error:", error);

    return "Something went wrong while generating response.";
  }
}


// title generator

export async function mistralResponse(message) {
  try {
    const response = await mistralModel.invoke([
      new SystemMessage(`
Generate a short chat title (max 5 words).
Title must clearly represent conversation topic.
`),

      new HumanMessage(message),
    ]);

    return response.text;
  } catch (error) {
    console.error("Title generator error:", error);

    return "Chat Title";
  }
}