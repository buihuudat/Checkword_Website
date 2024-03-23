import { PlayCircle, RefreshCcw } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const TextRandom = ({
  text,
  onChangeText,
  dictionary,
  currentAudio,
}: {
  text: string;
  onChangeText: () => void;
  dictionary: string;
  currentAudio?: string;
}) => {
  const playAudio = () => {
    if (!currentAudio) return;
    const audioUrl = currentAudio;
    const audio = new Audio(audioUrl);
    audio.play();
  };
  return (
    <div className="flex space-x-2">
      <div className="flex flex-col">
        <span className="text-6xl font-semibold">{text}</span>
        <span className="text-xl italic text-gray-700">{dictionary}</span>
      </div>
      {currentAudio && (
        <Button
          onClick={playAudio}
          className="bg-transparent hover:bg-transparent"
        >
          <PlayCircle className="h-[30px] w-[30px] text-purple-500" />
        </Button>
      )}
      <Button className="rounded-full" onClick={onChangeText}>
        <RefreshCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TextRandom;
