import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const SingleProduct = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <p>Product not found.</p>;
  }

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  return (
    <div className="container w-[80%] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="rounded-lg shadow-lg object-cover w-full"
          />
          {product.isNew && (
            <Badge className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-md">
              New
            </Badge>
          )}
          {product.isSale && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md">
              -{discount}%
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl font-extrabold text-primary">{product.name}</h1>
            <p className="text-muted-foreground text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, vel?
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-4xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-xl line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <Button
              size="lg"
              className="w-full md:w-auto bg-primary text-white"
              onClick={() =>
                navigate("/payment", {
                  state: { products: [product], totalAmount: product.price },
                })
              }
            >
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full md:w-auto border border-primary text-primary"
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
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;