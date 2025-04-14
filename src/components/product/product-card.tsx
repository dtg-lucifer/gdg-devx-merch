import { Link } from "react-router";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isNew?: boolean;
    isSale?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-background hover:shadow-md p-2 border rounded-lg overflow-hidden transition-all">
      <div className="relative mb-2 rounded-md aspect-square overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="top-2 right-2 absolute flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
          )}
          {product.isSale && product.originalPrice && (
            <Badge className="bg-red-500 hover:bg-red-600">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 flex justify-center items-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full w-9 h-9"
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
              })
            }
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-1 p-1">
        <Link to={`/${product.id}`}>
          <h3 className="font-medium group-hover:text-primary leading-tight transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
