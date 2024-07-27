import getMe from "./get-me";
import getProducts from "./products/actions/get-product";
import CreateProductFab from "./products/create-product/create-product-fab";
import Products from "./products/products";

export default async function Home() {
  return (
    <>
      <Products />
      <CreateProductFab />
    </>
  );
}
