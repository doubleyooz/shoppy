"use server";

import { redirect } from "next/navigation";
import { post } from "../../utils/fetch";
import { FormError } from "@/app/common/form-error.interface";

export default async function createUser(_prevState: FormError, formData: any) {
  const { error } = await post("users", formData);
  if (error) {
    return { error };
  }
  redirect("/");
}
