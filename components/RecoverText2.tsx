import MicRecorder from "mic-recorder-to-mp3";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Check, Mic, MicOff } from "lucide-react";
import { AssemblyAI } from "assemblyai";

const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_KEY,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});

type Props = {
  startSpeechRecognition: () => void;
  setText?: (text: string) => void;
};

const RecoverText2 = ({ startSpeechRecognition, setText }: Props) => {
  const recorder = useRef(null);
  const audioPlayer = useRef(null);
  const [blobURL, setBlobUrl] = useState<string | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  useEffect(() => {
    recorder.current = new MicRecorder({ bitRate: 128 });
  }, []);

  const startRecording = () => {
    recorder.current?.start().then(() => {
      setIsRecording(true);
    });
    setAudioFile(null);
    startSpeechRecognition();
  };

  const stopRecording = () => {
    recorder.current
      ?.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "audio.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        const newBlobUrl = URL.createObjectURL(blob);
        setBlobUrl(newBlobUrl);
        setIsRecording(false);
        setAudioFile(file);
      })
      .catch((e: any) => console.log(e));
  };

  const [uploadURL, setUploadURL] = useState("");
  const [transcriptID, setTranscriptID] = useState("");
  const [transcriptData, setTranscriptData] = useState<any>("");
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (audioFile) {
      assembly
        .post("/upload", audioFile)
        .then((res) => setUploadURL(res.data.upload_url))
        .catch((err) => console.error(err));
    }
  }, [audioFile]);

  const submitTranscriptionHandler = () => {
    assembly
      .post("/transcript", {
        audio_url: uploadURL,
      })
      .then((res) => {
        setTranscriptID(res.data.id);

        checkStatusHandler();
      })
      .catch((err) => console.error(err));
  };

  const checkStatusHandler = async () => {
    const client = new AssemblyAI({
      apiKey: process.env.NEXT_PUBLIC_ASSEMBLYAI_KEY!,
    });
    try {
      await assembly.get(`/transcript/${transcriptID}`).then((res) => {
        setTranscriptData(res.data);
      });
      const transc = await client.transcripts.transcribe({
        audio_url: uploadURL,
      });
      if (transc.text !== "") setText(transc.text!);
      setIsLoading(true);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(transcriptData);

  useEffect(() => {
    const interval = setInterval(() => {
      if (transcriptData.status !== "completed" && isLoading) {
        checkStatusHandler();
      } else {
        setIsLoading(false);
        setTranscript(transcriptData.text);
        clearInterval(interval);
        if (transcriptData.text && transcriptData.text !== "")
          setText(transcriptData.text);
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="p-5">
      {audioFile && (
        <div>
          <audio ref={audioPlayer} src={blobURL!} controls />
          <h5 className="italic text-gray-400">Listen again</h5>
        </div>
      )}
      <div>
        <Button
          className="rounded-full h-[60px] w-[60px] bg-sky-400 hover:bg-sky-600 m-5"
          disabled={isRecording}
          onClick={startRecording}
        >
          <Mic />
        </Button>
        <Button
          className="rounded-full h-[60px] w-[60px] bg-yellow-400 hover:bg-yellow-600 m-5"
          disabled={!isRecording}
          onClick={stopRecording}
        >
          <MicOff />
        </Button>
        <Button
          className="rounded-full h-[60px] w-[60px] bg-green-400 hover:bg-green-600 m-5"
          disabled={isRecording}
          onClick={submitTranscriptionHandler}
        >
          <Check />
        </Button>
      </div>
      {transcriptData.status === "completed" ? <p>{transcript}</p> : null}
    </div>
  );
};

export default RecoverText2;
