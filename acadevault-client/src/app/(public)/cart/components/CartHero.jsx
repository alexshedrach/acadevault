import Container from "@/components/layout/Container";
import { ShoppingCart } from "lucide-react";
import React from "react";

export default function CartHero() {
  return (
    <Container
      as="section"
      className="relative text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 overflow-hidden shadow-md rounded-b-xl"
    >
      {/* Decorative Blur Accent */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-overlay opacity-20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-overlay opacity-20 blur-3xl animate-pulse delay-300" />

      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex justify-center items-center gap-3">
        <ShoppingCart className="w-10 h-10" />
        Your Cart
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto font-medium text-white/90">
        Review your selected academic materials before proceeding to checkout.
      </p>
    </Container>
  );
}
