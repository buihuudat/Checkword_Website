"use client";

import RecoverText from "@/components/RecoverText";
import TextRandom from "@/components/TextRandom";
import WordCheck from "@/components/WordCheck";
import { faker } from "@faker-js/faker";
import { useMemo, useState } from "react";

export default function Home() {
  const [text, setText] = useState(faker.word.adjective());
  const [wordToCheck, setWordToCheck] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);

  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setWordToCheck(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

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

  const similarityPercentage = useMemo(
    () => calculateSimilarity(text, wordToCheck),
    [wordToCheck, text]
  );

  const onChangeText = () => {
    const newText = faker.word.adjective();
    setText(newText);
    setWordToCheck("");
  };

  console.log(wordToCheck);

  return (
    <main className="flex items-center flex-col justify-center h-screen">
      <TextRandom text={text} onChangeText={onChangeText} />
      <RecoverText
        startSpeechRecognition={startSpeechRecognition}
        isListening={isListening}
      />
      <WordCheck
        currentWord={text}
        wordToCheck={wordToCheck}
        similarityPercentage={similarityPercentage}
      />
    </main>
  );
}
