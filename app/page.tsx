"use client";

import Means from "@/components/Means";
import RecoverText from "@/components/RecoverText";
import TextRandom from "@/components/TextRandom";
import WordCheck from "@/components/WordCheck";
import { faker } from "@faker-js/faker";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState(faker.word.adjective());
  const [wordToCheck, setWordToCheck] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [dictionary, setDictionary] = useState<string>("");
  const [audio, setAudio] = useState("");
  const [means, setMeans] = useState([]);

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

  const similarityPercentage = calculateSimilarity(
    text
      .toLocaleLowerCase()
      .trim()
      .replace(/[.,\/]/g, ""),
    wordToCheck
      .toLocaleLowerCase()
      .trim()
      .replace(/[.,\/]/g, "")
  );

  const onChangeText = () => {
    const newText = faker.word.adjective();
    setText(newText);
    setWordToCheck("");
    dictionaryApi(newText);
  };

  const dictionaryApi = (text: string) => {
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setDictionary(result[0]?.phonetic);
        setAudio(result[0].phonetics[0].audio ?? []);
        setMeans(result[0].meanings ?? []);
        console.log(result[0]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <main className="flex items-center flex-col justify-center h-screen">
      <TextRandom
        text={text}
        onChangeText={onChangeText}
        dictionary={dictionary}
        currentAudio={audio}
      />
      <RecoverText
        startSpeechRecognition={startSpeechRecognition}
        isListening={isListening}
      />
      <WordCheck
        currentWord={text}
        wordToCheck={wordToCheck}
        similarityPercentage={similarityPercentage}
      />
      <div className="border-t-2 mt-4">
        {means && means.length ? <Means means={means} /> : null}
      </div>
    </main>
  );
}
