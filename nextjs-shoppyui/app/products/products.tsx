import Grid from "@mui/material/Unstable_Grid2";
import getProducts from "./actions/get-product";
import Product from "./product";

export default async function Products() {
  const products = await getProducts();
  console.log(products);
  if (products.length === 0) return <p>No Products Found</p>;
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} sm={6} lg={4} xs={12}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
