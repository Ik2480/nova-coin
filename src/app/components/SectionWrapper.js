// src/components/SectionWrapper.js
"use client";

export default function SectionWrapper({
  id,
  children,
  className = "",
  variant = "default", // options: default | dark | light | gradient
}) {
  const baseClasses =
    "w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-16 md:py-24";

  const variantClasses = {
    default: "bg-transparent text-white",
    dark: "bg-gray-950 text-white",
    light: "bg-gray-100 text-gray-900",
    gradient: "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white",
  };

  return (
    <section
      id={id}
      className={`${baseClasses} ${variantClasses[variant] || ""} ${className}`}
    >
      {children}
    </section>
  );
}
