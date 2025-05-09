import { useParams } from "react-router";
import { useState } from "react";
import { useNavigate } from "react-router";
import ImageZoomer from "@/components/single-product/image_zoomer";
import { ShieldCheck } from "lucide-react";
import { HeadphonesIcon } from "lucide-react";
import { Product, useProducts } from "@/context/ProductContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
const SingleProduct = () => {
  const { productId } = useParams();
  const { products } = useProducts();
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState<number>(1);
  const [sName, setSName] = useState<string>();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(productId));

  if (!product) {
    return <p>Product not found.</p>;
  }

  const discount = product.originalPrice
    ? Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100,
    )
    : 0;
  function sendTshirtData() {
    const data = {
      size: selectedSize,
      instructions: sName,
      productId: productId,
      productName: (product as Product).name,
      productPrice: (product as Product).price,
    };
    return data;
  }
  const handleSizeClick = (size: string) => {
    setSelectedSize(size); // Update the selected size
  };

  return (
    <>
      <div className="gap-12 grid grid-cols-1 md:grid-cols-2 py-12 content-container main-content container">
        <div className="flex justify-center items-center">
          <div className="relative w-full max-w-lg aspect-square overflow-hidden">
            <ImageZoomer
              src={`${product.image || "product_placeholder.webp"}?`}
              width={1000}
              alt={product.name}
              className="rounded-lg img"
              id="img-zoomed"
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

        <div className="flex items-center overflow-scroll sm:overflow-scroll">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-extrabold text-primary text-3xl">
                {product.name}
              </h1>
              <ul className="flex flex-wrap gap-2 list-none sizes">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <li
                    key={size}
                    className={`border rounded p-1 min-w-10 text-center cursor-pointer ${
                      selectedSize === size
                        ? "bg-green-950 text-white"
                        : "border-green-950"
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap items-center gap-2 scroll-smooth">
                <div className="items-center content-center bg-gray-950/5 p-5 border-2 border-green-950 border-dashed rounded-2xl w-40 h-26 container">
                  <div className="flex flex-col items-center gap-2">
                    <HeadphonesIcon className="w-6 h-6 text-primary" />
                    <p className="font-bold text-muted-foreground text-sm text-center">
                      Support 24/7
                    </p>
                  </div>
                </div>
                <div className="items-center content-center bg-gray-950/5 p-5 border-2 border-green-950 border-dashed rounded-2xl w-40 h-26 container">
                  <div className="flex flex-col items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-primary" />
                    <p className="font-bold text-muted-foreground text-sm text-center">
                      Secured Payments
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="font-semibold text-primary text-3xl">
                ₹{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-muted-foreground text-xl line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {(productId === "4") && (
              <Input
                value={sName}
                onChange={(e) => setSName(e.target.value)}
                type="text"
                className="border-2 border-b-green-950 rounded w-full"
                id="instructions"
                placeholder="Enter Custom Name"
              />
            )}

            <div className="flex items-center gap-2">
              <span className="font-bold text-muted-foreground text-sm">
                Quantity:
              </span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="p-2 border border-green-950 rounded w-16"
              />
            </div>
            <div className="flex md:flex-row flex-col gap-4">
              <Button
                size="lg"
                className="bg-primary md:w-auto text-black"
                onClick={() => {
                  const data = sendTshirtData();
                  navigate("/payment", {
                    state: {
                      products: [product],
                      totalAmount: product.price,
                      quantity: quantity,
                      productData: { ...data },
                    },
                  });
                }}
              >
                Buy Now
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="border border-primary md:w-auto text-primary"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    size: selectedSize,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
