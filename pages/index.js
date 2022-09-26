import { useState } from "react";
import { getData } from "../utils/fetchData";
import Head from "next/head";
import ProductItem from "../components/ProductItem";

const Home = (props) => {
  const [products, setProducts] = useState(props.productProps);

  return (
    <div className="products">
      <Head>
        <title>Home Page</title>
      </Head>

      {products.length === 0 ? (
        <h2>No Products</h2>
      ) : (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await getData("product");

  return {
    props: {
      productProps: res.products,
      result: res.result,
    },
  };
}

export default Home;
