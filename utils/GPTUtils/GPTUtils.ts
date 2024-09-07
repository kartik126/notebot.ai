import OpenAI from "openai";
export class GPTUtils {
  openaiClient = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });

  constructor() {
    this.openaiClient = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    });
  }

  generatePrompt() {
    const systemPrompt = `"You are an advanced AI trained to transcribe and describe images in exhaustive detail. Your goal is to analyze the image presented to you and provide a comprehensive, accurate transcription of everything visible.`;
    return systemPrompt;
  }
  async transcribeImage(imageUrl: string) {
    const messages = [];
    messages.push({ role: "system", content: this.generatePrompt() });
    messages.push({
      role: "user",
      content: [
        {
          type: "text",
          text: "YOU ARE PROVIDED WITH A IMAGE FROM USER. PLEASE TRANSCRIBE THE IMAGE.",
        },
        {
          type: "image_url",
          image_url: {
            url: imageUrl,
          },
        },
      ],
    });
    const response = await this.openaiClient.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content:
            //   "YOU ARE PROVIDED WITH A IMAGE FROM USER. PLEASE DESCRIBE THE IMAGE.",
            [
              { type: "text", text: "Please transcribe this image" },
              {
                type: "image_url",
                image_url: {
                  url: imageUrl,
                },
              },
            ],
        },
      ],
    });
    return response;
  }
}
