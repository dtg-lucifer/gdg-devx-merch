import React, { createContext, useContext } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductContextProps {
  products: Product[];
}

const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);

const products: Product[] = [
  {
    id: 1,
    name: "Classic Logo T-Shirt",
    price: 24.99,
    image: "/product_placeholder.webp?height=400&width=400",
    isNew: true,
  },
  {
    id: 2,
    name: "Vintage Graphic Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    image: "/product_placeholder.webp?height=400&width=400",
    isSale: true,
  },
  {
    id: 3,
    name: "Premium Denim Cap",
    price: 29.99,
    image: "/product_placeholder.webp?height=400&width=400",
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
