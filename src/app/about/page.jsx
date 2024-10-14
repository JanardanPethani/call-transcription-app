import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function About() {
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle>About Us</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Call Transcription App is a cutting-edge solution for transcribing
          audio files with ease and accuracy. Our AI-powered technology ensures
          high-quality transcriptions for various industries, including
          journalism, legal services, and market research.
        </p>
        <p className="mt-4">
          Founded in 2024, we aim to revolutionize the way people work with
          audio content, making it more accessible and easier to analyze.
        </p>
      </CardContent>
    </Card>
  );
}
