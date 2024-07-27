import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, formData: FormData) => {
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
  const parsedRes = await res.json();
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  }
  return { error: "", data: parsedRes };
};

export const get = async <T>(path: string, tags?: string[]): Promise<T> => {
  const url = `${API_URL}/${path}`;
  const headers = getHeaders();

  const response = await fetch(url, { headers, next: { tags } });

  try {
    return (await response.json()) as T;
  } catch (error) {
    throw new Error(`Failed to parse response from ${url}: ${error}`);
  }
};
