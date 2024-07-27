"use server";

import { post } from "../../common/utils/fetch";

export default async function createProduct(formData: FormData) {
  return post("products", formData);
}
