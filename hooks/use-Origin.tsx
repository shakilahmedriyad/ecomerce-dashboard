"use client";
import { useState, useEffect } from "react";

export default function useOrigin() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return "";

  const origin =
    typeof window !== null && window.location.origin
      ? window.location.origin
      : "";

  return origin;
}
