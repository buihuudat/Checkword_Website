"use client";

import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const RecoverText = ({ setWord }: { setWord: (word: string) => void }) => {
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setRecognizedText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };
  setWord(recognizedText);
  console.log(recognizedText);

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
