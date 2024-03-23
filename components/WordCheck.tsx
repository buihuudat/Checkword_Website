import React, { useEffect } from "react";

const WordCheck = ({
  currentWord,
  wordToCheck,
}: {
  currentWord: string;
  wordToCheck: string;
}) => {
  const calculateSimilarity = (word1: string, word2: string) => {
    const maxLength = Math.max(word1.length, word2.length);
    let similarity = 0;
    for (let i = 0; i < maxLength; i++) {
      if (word1[i] && word2[i] && word1[i] === word2[i]) {
        similarity++;
      }
    }
    return (similarity / maxLength) * 100;
  };

  const similarityPercentage = calculateSimilarity(currentWord, wordToCheck);

  return (
    <div>
      <div>
        Current Word:{" "}
        <span className="text-xl font-semibold">{currentWord}</span>
      </div>
      <div>
        Word to Check:{" "}
        <span className="text-xl font-semibold">{wordToCheck}</span>
      </div>
      <div>
        Similarity Percentage:{" "}
        <span className="text-xl font-semibold">{similarityPercentage}%</span>
      </div>
    </div>
  );
};

export default WordCheck;
