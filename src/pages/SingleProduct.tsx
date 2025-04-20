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
    <div className="gap-12 grid grid-cols-1 md:grid-cols-2 mx-auto px-6 py-12 w-[80%] container">
      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-lg">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="shadow-lg rounded-lg w-full object-cover"
          />
          {product.isNew && (
            <Badge className="top-4 left-4 absolute bg-green-500 px-3 py-1 rounded-md text-white">
              New
            </Badge>
          )}
          {product.isSale && (
            <Badge className="top-4 right-4 absolute bg-red-500 px-3 py-1 rounded-md text-white">
              -{discount}%
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-extrabold text-primary text-3xl">
              {product.name}
            </h1>
            <p className="text-muted-foreground text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, vel?
            </p>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-primary text-4xl">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-muted-foreground text-xl line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex md:flex-row flex-col gap-4">
            <Button
              size="lg"
              className="bg-primary w-full md:w-auto text-white"
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
              className="border border-primary w-full md:w-auto text-primary"
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
