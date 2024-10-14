"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prevStage) => (prevStage + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-b from-blue-100 to-white flex flex-col justify-between">
      <div className="text-center pt-8 z-10">
        <h1 className="text-4xl font-bold mb-2">Call Transcription App</h1>
        <p className="text-xl">
          Upload your audio. Get accurate transcriptions.
        </p>
      </div>

      <div className="flex-grow relative">
        <AudioFileAnimation isActive={stage === 0} />
        <UploadAnimation isActive={stage === 1} />
        <ProcessingAnimation isActive={stage === 2} />
        <TranscriptionAnimation isActive={stage === 3} />
      </div>

      <motion.div
        className="pb-8 flex justify-center z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Button asChild size="lg" className="text-lg px-8 py-6">
          <Link href="/transcribe">Let&apos;s Transcribe</Link>
        </Button>
      </motion.div>
    </div>
  );
}

function AudioFileAnimation({ isActive }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        initial={{ scale: 0.5 }}
        animate={{ scale: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <motion.rect
          x="40"
          y="40"
          width="120"
          height="120"
          rx="20"
          fill="#3b82f6"
        />
        <motion.circle cx="100" cy="100" r="30" fill="white" />
        <motion.path d="M90 85 L90 115 L115 100 Z" fill="#3b82f6" />
      </motion.svg>
    </motion.div>
  );
}

function UploadAnimation({ isActive }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        initial={{ y: 100 }}
        animate={{ y: isActive ? 0 : 100 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <motion.path
          d="M60 100 L100 60 L140 100"
          stroke="#3b82f6"
          strokeWidth="8"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.line
          x1="100"
          y1="60"
          x2="100"
          y2="140"
          stroke="#3b82f6"
          strokeWidth="8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: isActive ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </motion.svg>
    </motion.div>
  );
}

function ProcessingAnimation({ isActive }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.svg
        width="200"
        height="100"
        viewBox="0 0 200 100"
        initial={{ scale: 0.5 }}
        animate={{ scale: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={40 * i + 10}
            y="50"
            width="20"
            height="20"
            fill="#3b82f6"
            initial={{ y: 50 }}
            animate={{ y: isActive ? [50, 20, 50] : 50 }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "loop",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.svg>
    </motion.div>
  );
}

function TranscriptionAnimation({ isActive }) {
  const words = ["Hello,", "this", "is", "your", "transcription."];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-lg p-6 shadow-lg w-3/4 max-w-2xl">
        {words.map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-2 text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}
