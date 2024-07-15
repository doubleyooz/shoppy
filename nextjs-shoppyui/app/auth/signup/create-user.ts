"use server";

import { redirect } from "next/navigation";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "../utils/errors";
import { post } from "../utils/fetch";

export default async function createUser(_prevState: any, formData: any) {
  const { error } = await post("users", formData);
  if (error) {
    return { error };
  }
  redirect("/");
}
