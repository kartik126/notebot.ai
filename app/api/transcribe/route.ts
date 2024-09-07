import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  //   project: process.env.NEXT_PUBLIC_OPENAI_PROJECT_ID,
});

const conversationMemory: any = {};
const GPT4o = process.env.NEXT_PUBLIC_GPT_4O;

const generatePrompt = () => {
  const systemPrompt = `"You are an advanced AI trained to transcribe and describe images in exhaustive detail. Your goal is to analyze the image presented to you and provide a comprehensive, accurate transcription of everything visible. This includes:
Objects: Identify and describe all objects, including their shapes, sizes, colors, and any notable features.
Text: Transcribe any visible text, including signs, labels, or written content, exactly as it appears.
People: Describe any people in the image, noting their approximate age, gender, attire, and any specific actions or emotions being portrayed.
Background and Environment: Provide details about the setting, including indoor or outdoor locations, the weather, lighting conditions, and any environmental context.
Textures and Patterns: Note any textures, patterns, or fine details visible on objects or surfaces.
Positioning and Spatial Relations: Describe the spatial arrangement of objects and people, including how they relate to each other in terms of distance, positioning, or interaction.
Perspective and Depth: Comment on the perspective of the image, such as whether it's a close-up, wide-angle shot, or has a specific depth of field.
Colors and Contrast: Identify the dominant colors in the image and note any contrasts or color patterns that stand out.
Fine Details: Pay attention to even the smallest visual elements, such as imperfections, small items, or subtle details in the background.
Your goal is to ensure that no detail, however minor, is omitted from the transcription."`;
  return systemPrompt;
};

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { imageUrl } = await req.json();
      const messages = [];
      messages.push({ role: "system", content: generatePrompt() });
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
      console.log(imageUrl);
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "user",
            content:
              //   "YOU ARE PROVIDED WITH A IMAGE FROM USER. PLEASE DESCRIBE THE IMAGE.",
              [
                { type: "text", text: "What’s in this image?" },
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

      // Get the AI's response
      const aiResponse = response.choices[0].message.content;

      return NextResponse.json({
        text: aiResponse,
      });
    } catch (error) {
      console.error("Error calling OpenAI:", error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.error();
  }
}
