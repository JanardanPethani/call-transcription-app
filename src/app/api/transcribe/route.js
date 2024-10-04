import { NextResponse } from "next/server";
import { AssemblyAI } from "assemblyai";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_AI_API_KEY,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const transcript = await client.transcripts.transcribe({
      audio: buffer,
      speaker_labels: true,
      speech_model: "best",
      language_detection: true,
    });
    console.log("🚀 ~ POST ~ transcript:", transcript);

    return NextResponse.json({ utterances: transcript.utterances });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to transcribe audio" },
      { status: 500 }
    );
  }
}
