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
    light: "bg-gray-100 text-gray-900",
    gradient: "bg-gradient-to-br from-indigo-50 via-white to-pink-50",
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
