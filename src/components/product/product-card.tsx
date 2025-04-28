import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";

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
  return (
    <Link to={`/${product.id}`}>
      <div className="group relative bg-background hover:shadow-md p-2 border rounded-lg overflow-hidden transition-all">
        <div className="relative mb-2 rounded-md aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover group-hover:scale-105 transition-transform duration-300 image"
          />
          <div className="top-2 right-2 absolute flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-green-500 hover:bg-green-600">New</Badge>
            )}
            {product.isSale && product.originalPrice && (
              <Badge className="bg-red-500 hover:bg-red-600">
                -
                {Math.round(
                  ((product.originalPrice - product.price) /
                    product.originalPrice) *
                    100
                )}
                %
              </Badge>
            )}
          </div>
          <div className="absolute inset-0 flex justify-center items-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
        </div>
        <div className="space-y-1 p-1">
          <h3 className="font-medium group-hover:text-primary leading-tight transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="font-semibold">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through">
                ₹{product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
