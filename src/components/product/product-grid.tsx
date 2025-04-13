import ProductCard from "@/components/product/product-card";

const products = [
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

export default function ProductGrid() {
  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
