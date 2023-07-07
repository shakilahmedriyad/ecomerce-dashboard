"use client";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog/Dialog";
export default function ModalProvider() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isMounted) return null;

  return <Dialog />;
}
