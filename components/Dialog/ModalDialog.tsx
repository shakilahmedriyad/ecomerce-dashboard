"use client";

import { useStoreModal } from "@/hooks/store-hooks";
import StoreDialog from "./StoreDialog";
import StoreForm from "../Form/StoreForm";

export default function Dialog() {
  const useStore = useStoreModal();

  return (
    <StoreDialog
      isOpen={useStore.isOpen}
      onClose={useStore.onClose}
      title="Create a new Store"
      description="Just create it ."
    >
      <StoreForm />
    </StoreDialog>
  );
}
