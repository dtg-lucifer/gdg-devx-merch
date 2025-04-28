import { Youtube, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { useState } from "react";
// import { cn } from "@/lib/utils";
export default function Footer() {
  const NotificationPopup = ({ message, show, onClose, duration = 3000 }: { message: string; show: boolean; onClose: () => void; duration?: number }) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(onClose, duration);
        return () => clearTimeout(timer);
      }
    }, [show, onClose, duration]);

    return (
      show && (
        <div className="notification-popup">
          {message}
        </div>
      )
    );
  };
  const [showNotification, setShowNotification] = useState(false);
  const handleNotify = () => {
    const emailInput = document.getElementById("email-input") as HTMLInputElement;
    const email = emailInput.value;
    if (email) {
      setShowNotification(true);
    }
  };
  return (
    <footer className="bg-muted/40 border-t">
      <div className="mx-auto px-4 py-12 container">
        <div className="gap-8 grid grid-cols-2 sm:grid-cols-3 ">
          <div className="lg:col-span-2">
            <h3 className="mb-4 font-bold text-xl">GDG On Campus TIU</h3>
            <p className="mb-4 max-w-md text-muted-foreground">
              Quality merchandise for every occasion. Discover our collection of
              premium products designed for comfort and style.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="https://www.youtube.com/@gdg_tiu" target="_blank" rel="noopener noreferrer">
                  <Youtube className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="https://www.instagram.com/gdgoncampus_tiu/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <a href="https://www.linkedin.com/company/google-developers-group-on-campus-techno-india-university/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-sm uppercase tracking-wider">
              Newsletter
            </h4>
            <p className="mb-4 text-muted-foreground">
              Subscribe to get special offers and updates on new arrivals.
            </p>
            <div className="flex flex-col gap-2">
              <Input placeholder="Your email address" type="email"
                id="email-input" />
              <Button onClick={() => handleNotify()}>Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex md:flex-row flex-col justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} GDG On Campus TIU. All rights
              reserved.
            </p>
          </div>
        </div>
        {showNotification && (
          <NotificationPopup
            message="Subscribed successfully!"
            show={showNotification}
            onClose={() => setShowNotification(false)}
          />
        )}
      </div>
    </footer>
  );
}
