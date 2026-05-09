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
    "inline-flex items-center justify-center font-ui tracking-widest uppercase transition-all duration-300 font-semibold cursor-pointer";

  const variants = {
    primary:
      "bg-red text-offwhite hover:bg-offwhite hover:text-black border border-red",
    outline:
      "bg-transparent text-offwhite border border-offwhite hover:bg-offwhite hover:text-black",
    ghost:
      "bg-transparent text-gray-lt border border-gray-mid hover:border-red hover:text-red",
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
