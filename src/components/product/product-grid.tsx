import ProductCard from "@/components/product/product-card";
import { useProducts } from "@/context/ProductContext";

export default function ProductGrid() {
  const { products } = useProducts();

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
