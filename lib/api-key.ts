import axios from "axios";

import type { ApiKey } from "./apikey.models";
export const updateApiKeys = async (
  provider: "gemini" | "claude" | "openai",
  apiKey: string,
): Promise<boolean> => {
  const { data } = await axios.post("http://localhost:8000/api/key/update", {
    provider: provider,
    apiKey: apiKey,
  });
  return data.message;
};

export const retrieveApiKeys = async (provider: string): Promise<ApiKey[]> => {
  const { data } = await axios.post(
    "https://quackback-xwhd.onrender.com/api/key/retrieve",
    {
      provider: provider,
    },
  );

  return data.map((key: ApiKey) => ({
    ...key,
    updated_at: key.updated_at ?? key.created_at,
    active: key.active,
  }));
};

export const toggleKey = async (
  key_id: number,
  val: boolean,
): Promise<boolean> => {
  const { data } = await axios.post(
    "https://quackback-xwhd.onrender.com/api/key/toggle",
    {
      key_id: key_id,
      val: val,
    },
  );
  return data.message;
};
