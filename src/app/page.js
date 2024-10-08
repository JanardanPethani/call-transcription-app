"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Upload, Mic, Trash2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [file, setFile] = useState(null);
  const [currentUtterances, setCurrentUtterances] = useState(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedHistory = localStorage.getItem("transcriptionHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setIsTranscribing(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (!data.utterances || data.utterances.length === 0) {
        throw new Error("No transcript received from the API.");
      }
      setCurrentUtterances(data.utterances);

      const newHistoryItem = {
        id: Date.now(), // Add a unique id for each history item
        fileName: file.name,
        utterances: data.utterances,
        timestamp: new Date().toISOString(),
      };
      const updatedHistory = [newHistoryItem, ...history];
      setHistory(updatedHistory);
      localStorage.setItem(
        "transcriptionHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleDelete = (id) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem(
      "transcriptionHistory",
      JSON.stringify(updatedHistory)
    );
  };

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Call Transcription App
      </h1>
      <Tabs defaultValue="transcribe" className="mb-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transcribe">Transcribe</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="transcribe">
          <Card>
            <CardHeader>
              <CardTitle>Transcribe Audio</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="file" className="flex-shrink-0">
                    <div className="bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium cursor-pointer">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose File
                    </div>
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    accept="audio/*"
                    className="hidden"
                  />
                  <span className="text-sm text-gray-500">
                    {file ? file.name : "No file chosen"}
                  </span>
                </div>
                <Button
                  type="submit"
                  disabled={!file || isTranscribing}
                  className="w-full"
                >
                  {isTranscribing ? (
                    <>
                      <Mic className="mr-2 h-4 w-4 animate-pulse" />
                      Transcribing...
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-4 w-4" />
                      Transcribe
                    </>
                  )}
                </Button>
              </form>
              {isTranscribing && (
                <div className="mt-4">
                  <Progress value={null} className="mt-2" />
                </div>
              )}
              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {currentUtterances && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Current Transcript:
                  </h3>
                  <Card>
                    <CardContent className="pt-6">
                      {renderUtterances(currentUtterances)}
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Transcription History</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-center text-gray-500">
                  No transcription history yet.
                </p>
              ) : (
                history.map((item, index) => (
                  <div key={item.id} className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg">{item.fileName}</h3>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      Transcribed on:{" "}
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                    <Card>
                      <CardContent className="pt-6">
                        {renderUtterances(item.utterances)}
                      </CardContent>
                    </Card>
                    {index < history.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}

function renderUtterances(utterances) {
  return utterances?.map((utterance, index) => (
    <div key={index} className="mb-2">
      <span className="font-bold text-primary">{`Speaker ${utterance.speaker}: `}</span>
      <span>{utterance.text}</span>
    </div>
  ));
}
