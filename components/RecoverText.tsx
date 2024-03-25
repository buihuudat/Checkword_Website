"use client";

import { Mic } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type Props = {
  startSpeechRecognition: () => void;
  isListening: boolean;
};

const RecoverText = ({ startSpeechRecognition, isListening }: Props) => {
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
