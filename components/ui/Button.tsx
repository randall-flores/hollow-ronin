"use client";

import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  href,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-mono tracking-widest uppercase transition-colors duration-300 font-semibold cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gold text-obsidian border border-gold hover:bg-gold-dim hover:border-gold-dim",
    outline:
      "bg-transparent text-gold border border-gold hover:bg-gold hover:text-obsidian",
    ghost:
      "bg-transparent text-bone/70 border border-bone/20 hover:border-gold hover:text-gold",
  };

  const sizes = {
    sm: "text-[10px] px-5 py-2",
    md: "text-[11px] px-7 py-3",
    lg: "text-[11px] px-10 py-4",
  };

  const classes = clsx(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
