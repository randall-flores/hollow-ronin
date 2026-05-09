"use client";
import { useState } from "react";

interface ProductCardProps {
  unit: string;
  name: string;
  price: string;
  imageSrc?: string;
  imageAlt?: string;
}

export default function ProductCard({ unit, name, price, imageSrc, imageAlt }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", aspectRatio: "3/4", overflow: "hidden",
        border: `1px solid ${hovered ? "#c0001e" : "transparent"}`,
        background: "#131313", cursor: "pointer",
        transition: "border-color 0.5s",
      }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt={imageAlt || name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          filter: hovered ? "grayscale(0) brightness(0.9)" : "grayscale(1) brightness(0.75)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "all 0.7s",
        }} />
      ) : (
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          background: "radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)",
        }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "80px", color: "rgba(240,237,230,0.05)" }}>HR</span>
        </div>
      )}

      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at center, transparent 30%, rgba(10,10,10,0.75) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(192,0,30,0.1)", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }} />

      <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", padding: "24px", background: "linear-gradient(to top, black, transparent)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "4px" }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.2em", color: "#6b6b6b", textTransform: "uppercase" }}>{unit}</p>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "#f0ede6" }}>{price}</span>
        </div>
        <div style={{ height: "1px", width: "100%", background: "#c0001e", opacity: 0.5, marginBottom: "6px" }} />
        <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "24px", color: "#f0ede6", letterSpacing: "0.02em" }}>{name}</h3>
      </div>

      <div style={{
        position: "absolute", bottom: 0, left: 0, width: "100%",
        background: "#f0ede6", padding: "16px", display: "flex", justifyContent: "center",
        transform: hovered ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s",
      }}>
        <button style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "#0a0a0a", background: "none", border: "none", cursor: "pointer" }}>
          QUICK_ADD_TO_CART
        </button>
      </div>
    </div>
  );
}
