import React, { createContext, useContext } from "react";

interface Product {
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

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

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
  {
    id: 4,
    name: "Limited Edition Sneakers",
    price: 89.99,
    image: "/product_placeholder.webp?height=400&width=400",
    isNew: true,
  },
  {
    id: 5,
    name: "Embroidered Sweatshirt",
    price: 54.99,
    originalPrice: 74.99,
    image: "/product_placeholder.webp?height=400&width=400",
    isSale: true,
  },
  {
    id: 6,
    name: "Canvas Tote Bag",
    price: 19.99,
    image: "/product_placeholder.webp?height=400&width=400",
  },
  {
    id: 7,
    name: "Minimalist Watch",
    price: 119.99,
    image: "/product_placeholder.webp?height=400&width=400",
  },
  {
    id: 8,
    name: "Wool Beanie",
    price: 24.99,
    originalPrice: 34.99,
    image: "/product_placeholder.webp?height=400&width=400",
    isSale: true,
  },
];

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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