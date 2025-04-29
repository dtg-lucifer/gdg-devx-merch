import React, { createContext, useContext } from "react";

export interface Product {
  id: number;
  size: string;
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
    name: "Anime White DevX TShirt",
    size: "M",
    price: 369,
    image: "/products/products/tshirt_white_back.webp",
    isNew: true,
  },
  {
    id: 2,
    name: "Anime Dark DevX TShirt",
    size: "M",
    price: 369,
    originalPrice: 650,
    image: "/products/products/tshirt_black_back.webp",
    isSale: true,
  },
  {
    id: 3,
    name: "Marvel's Spiderman DevX TShirt",
    size: "M",
    price: 469,
    image: "/products/products/tshirt_marvel_back.webp",
  },
  {
    id: 4,
    name: "Marvel's Spiderman DevX TShirt with Custom Name",
    size: "M",
    price: 569,
    image: "/products/products/tshirt_marvel_name_back.webp",
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
