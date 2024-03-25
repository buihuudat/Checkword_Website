"use server";

import axios from "axios";

export const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: process.env.NEXT_PUBLIC_ASSEMBLYAI_KEY,
    "content-type": "application/json",
    "transfer-encoding": "chunked",
  },
});
