"use server";

import { revalidateTag } from "next/cache";
import { getHeaders, post } from "@/app/common/utils/fetch";
import { API_URL } from "@/app/common/constants/api";
import { IMAGES } from "@/app/common/constants/images";

export default async function createProduct(formData: FormData) {
  const response = await post("products", formData);
  const productImages = formData.getAll(IMAGES);
  if (
    Array.isArray(productImages) &&
    productImages.every((file) => file instanceof File) &&
    !response.error
  ) {
    console.log("upload images");
    await uploadProductImage(response.data.id, productImages);
  }
  revalidateTag("products");
  return response;
}

async function uploadProductImage(productId: number, files: File[]) {
  const formData = new FormData();
  for (const file of files) {
    formData.append(IMAGES, file);
  }
  await fetch(API_URL + "/images/" + productId, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}
