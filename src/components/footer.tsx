import { Link } from "react-router";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="mx-auto px-4 py-12 container">
        <div className="gap-8 grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-bold text-xl">GDG On Campus TIU</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Quality merchandise for every occasion. Discover our collection of
              premium products designed for comfort and style.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/collections/new"
                  className="text-muted-foreground hover:text-foreground"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/bestsellers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/sale"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Sale
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/all"
                  className="text-muted-foreground hover:text-foreground"
                >
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="mb-4 text-muted-foreground">
              Subscribe to get special offers and updates on new arrivals.
            </p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Your email address" type="email" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GDG On Campus TIU. All rights
              reserved.
            </p>
            <div className="flex gap-4 text-muted-foreground text-sm">
              <Link to="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
              <Link to="/shipping" className="hover:text-foreground">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
