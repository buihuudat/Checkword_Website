import { PlayCircle } from "lucide-react";
import { Button } from "./ui/button";

const WordCheck = ({
  currentWord,
  wordToCheck,
  similarityPercentage,
}: {
  currentWord: string;
  wordToCheck: string;
  similarityPercentage: number;
}) => {
  return (
    <div>
      <div>
        Current Word:{" "}
        <span className="text-xl font-semibold">{currentWord}</span>
      </div>
      <div>
        Word to Check:{" "}
        <span className="text-xl font-semibold">{wordToCheck}</span>
        {wordToCheck && (
          <Button className="bg-transparent hover:bg-transparent">
            <PlayCircle className="h-[30px] w-[30px] text-purple-500" />
          </Button>
        )}
      </div>
      <div>
        Similarity Percentage:{" "}
        <span className="text-xl font-semibold">
          {Math.floor(similarityPercentage)}%
        </span>
      </div>
    </div>
  );
};

export default WordCheck;
