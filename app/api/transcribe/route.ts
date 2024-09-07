import { NextRequest, NextResponse } from "next/server";
import { GPTUtils } from "@/utils/GPTUtils/GPTUtils";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { imageUrl } = await req.json();
      const gpt = new GPTUtils();

      const response = await gpt.transcribeImage(imageUrl);

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
