import { tavily as Tavily } from "@tavily/core";

const tavily = Tavily({
  apiKey: process.env.TAVILY_API_KEY,
});

export const searchInternet = async ({ query }) => {
  try {
    const result = await tavily.search(query, {
      maxResults: 5,
      searchDepth: "advanced",
    });

    if (!result?.results?.length) {
      return "No latest information found on the internet.";
    }

    // readable response for agent
    const formattedResult = result.results
      .map((item) => item.content)
      .join("\n\n");

    return formattedResult;
  } catch (error) {
    console.error("Tavily error:", error);
    return "Error fetching latest internet information.";
  }
};