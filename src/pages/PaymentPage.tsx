import React, { useState } from "react";
import { useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import { Product } from "@/context/ProductContext";
import axios, { AxiosError } from "axios";

const PaymentPage = () => {
  const location = useLocation();
  const [, setError] = useState<string | null>(null);

  const { products, totalAmount, quantity, productData } = location.state || {
    products: [],
    totalAmount: 0,
    quantity: 0,
    productData: {},
  };
  console.log("product data:", productData);
  const constructProductsArray=()=>{
    return products.map((x : {id: number, image: string, name: string, price: number, quantity: number, size: string})=>{
      return `${x.name}:${x.size}:${x.quantity || quantity}`
    })
  }
  const productsArray = (constructProductsArray()).toString();
  console.log("products:",productsArray)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    upiId: "",
    studentId: 0
  });
  console.log("formData studentID:", formData.studentId);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Uploaded Image:", uploadedImage);
    console.log("Products:", products);
    console.log("Total Amount:", totalAmount);

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("phone", formData.phone);
    fd.append("email", formData.email);
    fd.append("upiId", formData.upiId);
    if (uploadedImage) {
      fd.append("ss", uploadedImage);
    }
    fd.append("products", productsArray);
    fd.append("totalAmount", totalAmount.toString());
    fd.append("specialName", "none");

    try {
      const res = await axios.post<{
        message: string;
        status: string;
        data: Record<string, unknown>;
      }>("https://gdg-leaderboard-server-1019775793519.us-central1.run.app/api/v1/payment/upload", fd, { data: fd });
      console.log("res:", res.data.data.confirmationSS);
      console.log("type of res:", typeof res.data.data.confirmationSS);
      
      try {
        const payload = {
          studentId: parseInt(formData.studentId.toString()),
          orderId: res.data.data.orderId as string,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          upiId: formData.upiId,
          amount: parseFloat(totalAmount.toString()),
          items: productsArray, // Make sure productsArray is already an array, otherwise JSON.stringify it
          status: "CONFIRMED",
          confirmationSS: res.data.data.confirmationSS as string,
        };
      
        console.log("Payload:", payload);
      
        const result = await axios.post<{
          data: Record<string, unknown>;
        }>(
          "https://gdg-leaderboard-email-service-1019775793519.asia-east1.run.app/api/receipt/send",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      
        console.log(result.data);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(JSON.stringify(e.toJSON()));
        console.error("Error submitting payment:", e.response?.data);
      } else {
        console.error("error submitting payment:", e);
        setError((e as Error).message);
      }
    }

    console.log(fd.entries());
  };

  return (
    <div className="mx-auto px-6 py-12 min-h-screen container">
      <h1 className="mb-8 font-bold text-3xl">Payment Page</h1>
      <div className="gap-8 grid grid-cols-1 md:grid-cols-2">
        {/* Left: Payment Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-blend-darken shadow-md p-6 border rounded-lg"
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
            <label htmlFor="studentId" className="block mb-2 font-medium">
              Student ID
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              value={formData.studentId}
              onChange={handleInputChange}
              required
              className="px-4 py-2 border rounded-md w-full"
              placeholder="Enter your Student ID"
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
          <Button type="submit" className="bg-blend-darken w-full text-black">
            Submit Payment
          </Button>
        </form>

        {/* Right: Payment Summary */}
        <div className="space-y-6 bg-blend-darken shadow-md p-6 border rounded-lg">
          <h2 className="font-bold text-xl">Payment Summary</h2>
          <div className="flex justify-between">
            <span className="font-medium">Total Amount:</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Number of Products:</span>
            {/* <span>{products.length}</span> */}
            <span>{quantity}</span>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 font-medium">Products:</h3>
            <ul className="pl-6 list-disc">
              {products.map((product: Product) => (
                <li key={product.id}>{product.name} : {product.size}</li>
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
