"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useCart } from "@/hook/use-cart";
import { Product } from "@/payload-types";

export const AddToCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addItem } = useCart();

  useEffect(() => {
    const timeIndex = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);

    return () => clearTimeout(timeIndex);
  }, [isSuccess]);

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
    >
      {isSuccess ? "Added" : "Add to Cart"}
    </Button>
  );
};
