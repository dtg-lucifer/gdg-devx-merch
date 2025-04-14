import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";


interface Product {
      id: number;
      name: string;
      price: number;
      originalPrice?: number;
      image: string;
      isNew?: boolean;
      isSale?: boolean;
    }

const PaymentPage = () => {
  const location = useLocation();
  const { products, totalAmount } = location.state || { products: [], totalAmount: 0 };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    upiId: "",
  });
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Uploaded Image:", uploadedImage);
    console.log("Products:", products);
    console.log("Total Amount:", totalAmount);
    // Add logic to handle payment submission
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Payment Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-lg shadow-md border"
        >
          <div>
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="upiId" className="block font-medium mb-2">
              UPI ID
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={formData.upiId}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md"
              placeholder="Enter your UPI ID"
            />
          </div>
          <div>
            <label htmlFor="uploadImage" className="block font-medium mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="uploadImage"
              onChange={handleImageUpload}
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <Button type="submit" className="w-full bg-primary text-white">
            Submit Payment
          </Button>
        </form>

        {/* Right: Payment Summary */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md border">
          <h2 className="text-xl font-bold">Payment Summary</h2>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Number of Products:</span>
            <span>{products.length}</span>
          </div>
          <div className="mt-6">
            <h3 className="font-medium mb-2">Products:</h3>
            <ul className="list-disc pl-6">
              {products.map((product: Product) => (
                  <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="font-medium mb-2">QR Code</h3>
            <div className="w-48 h-48 border rounded-md flex items-center justify-center bg-gray-100">
              <img
                src="/qr-code-placeholder.png"
                alt="QR Code"
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;