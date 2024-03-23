"use client";

import RecoverText from "@/components/RecoverText";
import RecoverText2 from "@/components/RecoverText2";
import TextRandom from "@/components/TextRandom";
import WordCheck from "@/components/WordCheck";
import { faker } from "@faker-js/faker";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState(faker.word.adjective());
  const [wordToCheck, setWordToCheck] = useState<string>("");

  const onTalk = () => {};

  const onChangeText = () => {
    const newText = faker.word.adjective();
    setText(newText);
  };

  console.log(wordToCheck);

  return (
    <main className="flex items-center flex-col justify-center h-screen">
      <TextRandom text={text} onChangeText={onChangeText} />
      <RecoverText setWord={setWordToCheck} />
      <WordCheck currentWord={text} wordToCheck={wordToCheck} />
    </main>
  );
}
