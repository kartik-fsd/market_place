'use client'

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/payload-types';
import { toast } from 'sonner';

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addItem, items } = useCart();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSuccess) {
      timeout = setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [isSuccess]);

  const handleAddToCart = (product: Product) => {
    const isProductInCart = items.some((item) => item.product.id === product.id);

    if (!isProductInCart) {
      addItem(product);
      setIsSuccess(true);
      toast.success('Item added to cart');
    } else {
      toast.error('This item is already in the cart!');
    }
  };

  return (
    <Button
      onClick={() => handleAddToCart(product)}
      size='lg'
      className='w-full'
      disabled={isSuccess}
    >
      {isSuccess ? 'Added!' : 'Add to cart'}
    </Button>
  );
};

export default AddToCartButton;