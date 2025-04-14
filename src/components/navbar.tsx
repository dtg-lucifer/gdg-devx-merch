import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "./theme/theme-toggle";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className="top-0 z-50 sticky bg-background border-b w-full">
      <div className="flex justify-between items-center mx-auto px-4 h-16 container">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
          <Link to="/" className="flex items-center font-bold text-xl">
            <img
              src="https://storage.googleapis.com/leaderboard-pfp/assets/gdg_logo.jpeg"
              alt=""
              className="mr-2 rounded-full w-8 h-8"
            />
            <span>GDG TIU</span>
          </Link>
        </div>

        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link
            to="/"
            className="font-medium hover:text-primary text-sm transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="font-medium hover:text-primary text-sm transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/collections"
            className="font-medium hover:text-primary text-sm transition-colors"
          >
            Collections
          </Link>
          <Link
            to="/about"
            className="font-medium hover:text-primary text-sm transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="font-medium hover:text-primary text-sm transition-colors"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 border rounded-md md:w-full md:max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <Button variant="ghost" size="icon">
            <User className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => (navigate('/cart'))}
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="top-1 right-1 absolute flex justify-center items-center bg-primary rounded-full w-4 h-4 font-medium text-[10px] text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden top-16 z-50 fixed inset-0 bg-background">
          <nav className="flex flex-col gap-4 mx-auto p-4 container">
            <Link
              to="/"
              className="flex items-center border-b h-10 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="flex items-center border-b h-10 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="flex items-center border-b h-10 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="flex items-center border-b h-10 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="flex items-center border-b h-10 font-medium text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-2 mt-4 px-3 py-2 border rounded-md w-full">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="p-0 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
