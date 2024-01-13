import React, { useEffect, useState } from "react";
import ProductsItem from "./ProducItem";
import { relatedProduct } from "../Api/productsApi";

const RelatedProduct = ({ category, name }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getRelatedProduct = async (category, name) => {
      const res = await relatedProduct(category, name);
      if (res.success) {
        setProducts(res.products);
      } else {
        console.log("Related Products error", res.error);
      }
    };
    getRelatedProduct(category, name);
  }, [category, name]);
  console.log("Related product  category and name", category, name);
  return (
    <div className="w-full px-7 sm:px-10 max-w-[1200px] lg:px-24  ">
      <div>
        <h1 className="text-3xl sm:text-4xl  font-semibold text-[#324d67] drop-shadow-lg mb-4">
          You might also like
        </h1>
        <div className="flex flex-wrap lg:gap-2 ">
          {products.map((p) => {
            return <ProductsItem key={p._id} product={p} />;
          })}

        </div>
      </div>
    </div>
  );
};

export default RelatedProduct;
