import { RefreshCcw } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const TextRandom = ({
  text,
  onChangeText,
}: {
  text: string;
  onChangeText: () => void;
}) => {
  return (
    <div className="flex space-x-2">
      <span className="text-6xl font-semibold">{text}</span>
      <Button className="rounded-full" onClick={onChangeText}>
        <RefreshCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default TextRandom;
