// recording

const startRecording = (
  recorder: any,
  setIsRecording: (arg: boolean) => void
) => {
  recorder.current &&
    recorder.current.start().then(() => {
      setIsRecording(true);
    });
  startRecording(recorder, setIsRecording);
};

const stopRecording = ({
  recorder,
  setIsRecording,
  setBlobUrl,
  setAudioFile,
}: {
  recorder: any;
  setIsRecording: (arg: boolean) => void;
  setBlobUrl: (arg: string | null) => void;
  setAudioFile: (file: File | null) => void;
}) => {
  recorder.current &&
    recorder.current
      .stop()
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
        stopRecording({
          recorder,
          setBlobUrl,
          setAudioFile,
          setIsRecording,
        });
      })
      .catch((e: any) => console.log(e));
};

const calculateSimilarity = (
  word1: string,
  word2: string,
  dictionary: string
) => {
  const maxLength = Math.max(word1.length, word2.length);
  let similarity = 0;
  for (let i = 0; i < maxLength; i++) {
    if (word1[i] && word2[i] && word1[i] === word2[i]) {
      similarity++;
    }
  }
  const inDictionary = (word: string) => dictionary?.includes(word);

  if (!inDictionary(word1) || !inDictionary(word2)) {
    similarity *= 1;
  }

  return (similarity / maxLength) * 100;
};

const dictionaryApi = ({
  text,
  setDictionary,
  setAudio,
  setMeans,
}: {
  text: string;
  setDictionary: (arg: string) => void;
  setAudio: (arg: string) => void;
  setMeans: (arg: any[]) => void;
}) => {
  let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${text}`;
  fetch(url)
    .then((res) => res.json())
    .then((result) => {
      setDictionary(result[0]?.phonetic);
      setAudio(result[0].phonetics[0].audio ?? "");
      setMeans(result[0].meanings ?? []);
    })
    .catch((err) => console.log(err));
};

const submitTranscriptionHandler = ({
  assembly,
  uploadURL,
  setTranscriptID,
}: {
  assembly: any;
  uploadURL: any;
  setTranscriptID: any;
}) => {
  assembly
    .post("/transcript", {
      audio_url: uploadURL,
    })
    .then((res) => {
      setTranscriptID(res.data.id);
    })
    .catch((err: any) => console.error(err));
};

const checkStatusHandler = async ({
  assembly,
  transcriptID,
  setTranscriptData,
  setTranscript,
  transcriptData,
}: {
  assembly: any;
  transcriptID: any;
  setTranscriptData: any;
  setTranscript: any;
  transcriptData: any;
}) => {
  try {
    await assembly.get(`/transcript/${transcriptID}`).then((res: any) => {
      setTranscriptData(res.data);
      setTranscript(transcriptData.text);
    });
  } catch (err) {
    console.error(err);
  }
};

export { startRecording, stopRecording, calculateSimilarity, dictionaryApi };
