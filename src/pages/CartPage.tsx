import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const CartPage = () => {
  const { cart, removeFromCart, totalAmount, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mx-auto px-6 py-12 min-h-screen container">
      <h1 className="mb-8 font-bold text-3xl">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-muted-foreground">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center pb-4 border-b"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="rounded-md w-16 h-16 object-cover"
                />
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-muted-foreground">
                  ₹{item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex justify-between items-center pt-4 border-t">
            <h2 className="font-bold text-xl">
              Total: ₹{totalAmount.toFixed(2)}
            </h2>
            <div className="flex gap-4">
              <Button variant="secondary" onClick={clearCart}>
                Clear Cart
              </Button>
              <Button
                onClick={() =>
                  navigate("/payment", {
                    state: { products: cart, totalAmount, quantity: cart.length },
                  })
                }
                className="bg-primary text-black"
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
