"use client";

import { Mic } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const RecoverText = () => {
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const startSpeechRecognition = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const recorder = new MediaRecorder(stream);
      let audioChunks: Blob[] = [];

      recorder.addEventListener("dataavailable", (event) => {
        audioChunks.push(event.data);
        setIsListening(true);
      });

      recorder.addEventListener("stop", async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });

        const audioFile = new File([audioBlob], "recording.wav", {
          lastModified: Date.now(),
        });

        const transcription = await openai.audio.transcriptions.create({
          file: audioFile,
          model: "whisper-1",
          response_format: "text",
        });

        setRecognizedText(transcription.text);
        setIsListening(false);
      });

      recorder.start();

      setTimeout(() => {
        recorder.stop();
      }, 5000);
    } catch (error) {
      console.error("Error capturing audio:", error);
      setIsListening(false); // Ensure to set isListening to false in case of error
    }
  };

  useEffect(() => {
    console.log(recognizedText);
  }, [recognizedText]); // Log recognizedText when it changes

  return (
    <Button
      className="rounded-full h-[60px] w-[60px] bg-sky-400 hover:bg-sky-600 m-5"
      onClick={startSpeechRecognition}
      disabled={isListening}
    >
      <Mic />
    </Button>
  );
};

export default RecoverText;
