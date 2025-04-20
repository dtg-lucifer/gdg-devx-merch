import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Product } from "@/context/ProductContext";

const PaymentPage = () => {
  const location = useLocation();
  const { products, totalAmount } = location.state || {
    products: [],
    totalAmount: 0,
  };

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
    <div className="mx-auto px-6 py-12 min-h-screen container">
      <h1 className="mb-8 font-bold text-3xl">Payment Page</h1>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* Left: Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-md p-6 border rounded-lg"
        >
          <div>
            <label htmlFor="name" className="block mb-2 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="upiId" className="block mb-2 font-medium">
              UPI ID
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={formData.upiId}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Enter your UPI ID"
            />
          </div>
          <div>
            <label htmlFor="uploadImage" className="block mb-2 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              id="uploadImage"
              onChange={handleImageUpload}
              className="px-4 py-2 border rounded-md w-full"
            />
          </div>
          <Button type="submit" className="bg-primary w-full text-white">
            Submit Payment
          </Button>
        </form>

        {/* Right: Payment Summary */}
        <div className="space-y-6 bg-white shadow-md p-6 border rounded-lg">
          <h2 className="font-bold text-xl">Payment Summary</h2>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Number of Products:</span>
            <span>{products.length}</span>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 font-medium">Products:</h3>
            <ul className="pl-6 list-disc">
              {products.map((product: Product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 font-medium">QR Code</h3>
            <div className="flex justify-center items-center bg-gray-100 border rounded-md w-48 h-48">
              <img
                src="/qr-code-placeholder.png"
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
