"use client";

import { generatePageMetadata } from "@/utils/generatePageMetadata";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  HelpCircle,
  BookOpen,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "@/components/header/Navbar";
import Loader from "@/components/ui/Loader";
import Container from "@/components/layout/Container";
import Image from "next/image";
import { AlertBox } from "@/components/ui/AlertBox";

// export const metadata = generatePageMetadata({
//   title: "Cart - Acadavault",
//   description:
//     "Review and manage your academic materials in your Acadavault cart before proceeding to checkout.",
//   slug: "cart",
//   image: "https://acadevault.com/images/cart-og.jpg",
// });

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Placeholder data for demo
  const fallbackCartItems = [
    {
      id: "item1",
      title: "Advanced Calculus Lecture Notes",
      price: 15.99,
      quantity: 1,
      vendor: "Dr. Ngozi Adebayo",
      thumbnail: "/thumbnails/calculus.jpg",
    },
    {
      id: "item2",
      title: "Machine Learning Study Guide",
      price: 12.5,
      quantity: 2,
      vendor: "Prof. James Okeke",
      thumbnail: "/thumbnails/ml.jpg",
    },
  ];

  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to load cart");
        const data = await res.json();
        setCartItems(data.items || []);
      } catch (err) {
        console.warn("API failed, using fallback data.");
        setError("Showing demo cart data.");
        setCartItems(fallbackCartItems);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    // TODO: Update cart in backend (e.g., PATCH /api/cart)
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    // TODO: Remove item from backend (e.g., DELETE /api/cart/:id)
  };

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateTax = (subtotal) => subtotal * 0.05; // 5% tax rate (placeholder)

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax;
  };

  return (
    <>
      <Navbar showSearch showCategories />
      <CartHeroSection />
      {cartItems.length === 0 && !loading ? (
        <EmptyCartSection />
      ) : (
        <>
          <CartItemsSection
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            loading={loading}
            error={error}
          />
          <OrderSummarySection
            subtotal={calculateSubtotal()}
            tax={calculateTax(calculateSubtotal())}
            total={calculateTotal()}
          />
          <SuggestedMaterialsSection />
        </>
      )}
      <SupportSection />
      <CallToActionSection />
    </>
  );
}

const CartHeroSection = () => (
  <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12">
    <Container className="text-center">
      <h1 className="text-4xl font-bold mb-4 flex justify-center items-center gap-2">
        <ShoppingCart className="w-8 h-8" />
        Your Cart
      </h1>
      <p className="text-lg max-w-2xl mx-auto">
        Review your selected academic materials before proceeding to checkout.
      </p>
    </Container>
  </section>
);

const CartItemsSection = ({
  cartItems,
  updateQuantity,
  removeItem,
  loading,
  error,
}) => (
  <section className="py-16">
    <Container className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Cart Items</h2>
      {loading && (
        <Loader
          type="spinner"
          size="md"
          color="blue-600"
          text="Loading cart..."
          className="mx-auto mt-10"
        />
      )}
      {error && <AlertBox variant="error">{error}</AlertBox>}
      {!loading && cartItems.length > 0 && (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 bg-white p-6 rounded-lg shadow-md"
            >
              <Image
                src={item.thumbnail || "/placeholder-thumbnail.jpg"}
                alt={item.title}
                width={24}
                height={24}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">By {item.vendor}</p>
                <p className="text-base font-medium text-gray-800">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-base w-8 text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-600 hover:text-red-800"
                aria-label={`Remove ${item.title} from cart`}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Container>
  </section>
);

const OrderSummarySection = ({ subtotal, tax, total }) => (
  <section className="py-16 bg-gray-100">
    <Container className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Order Summary</h2>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <div className="flex justify-between text-base text-gray-700 mb-2">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base text-gray-700 mb-2">
          <span>Tax (5%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-semibold text-gray-800 border-t pt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="block mt-4 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-center hover:bg-blue-700 transition duration-300"
          aria-label="Proceed to checkout"
        >
          Proceed to Checkout
        </Link>
      </div>
    </Container>
  </section>
);

const SuggestedMaterialsSection = () => {
  const suggestedItems = [
    {
      id: "sug1",
      title: "Organic Chemistry Study Guide",
      price: 10.99,
      vendor: "Dr. Sarah Patel",
      thumbnail: "/thumbnails/chemistry.jpg",
    },
    {
      id: "sug2",
      title: "Data Structures Notes",
      price: 8.5,
      vendor: "Prof. David Lee",
      thumbnail: "/thumbnails/ds.jpg",
    },
  ];

  return (
    <section className="py-16">
      <Container className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Suggested Materials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {suggestedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-lg shadow-md flex gap-4"
            >
              <Image
                src={item.thumbnail || "/placeholder-thumbnail.jpg"}
                alt={item.title}
                width={20}
                height={20}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">By {item.vendor}</p>
                <p className="text-base font-medium text-gray-800">
                  ${item.price.toFixed(2)}
                </p>
                <Link
                  href={`/materials/${item.id}`}
                  className="mt-2 inline-block text-blue-600 hover:underline"
                  aria-label={`View ${item.title}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

const EmptyCartSection = () => (
  <section className="py-16 bg-gray-100">
    <Container className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">
        Your Cart is Empty
      </h2>
      <p className="text-base text-gray-600 max-w-md mx-auto">
        Start exploring our collection of academic materials to find what you
        need.
      </p>
      <Link
        href="/materials"
        className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        aria-label="Browse materials"
      >
        Browse Materials
      </Link>
    </Container>
  </section>
);

const SupportSection = () => (
  <section className="py-16">
    <Container className="text-center space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        Need Help?
      </h2>
      <p className="text-base text-gray-600 max-w-md mx-auto">
        Contact our support team for assistance with your cart or checkout
        process.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
        >
          Contact Support
        </Link>
        <a
          href="mailto:support@acadevault.com"
          className="bg-green-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-500 transition duration-300"
        >
          Email Us
        </a>
      </div>
    </Container>
  </section>
);

const CallToActionSection = () => (
  <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
    <Container className="text-center space-y-6">
      <h2 className="text-3xl font-bold flex justify-center items-center gap-2">
        <BookOpen className="w-8 h-8" />
        Continue Your Academic Journey
      </h2>
      <p className="text-lg max-w-2xl mx-auto">
        Explore more academic resources, sell your materials, or hire expert
        writers with Acadavault.
      </p>
      <Link
        href="/materials"
        className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-yellow-500 transition duration-300"
        aria-label="Explore materials"
      >
        Explore Materials
      </Link>
    </Container>
  </section>
);
