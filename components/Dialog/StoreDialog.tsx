import React from "react";

import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import StoreForm from "../Form/StoreForm";

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const StoreDialog: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
}) => {
  const onChange = (open: boolean) => {
    if (open) {
      // onClose();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>create a store</DialogTitle>
          <DialogDescription>
            You have to create a store to continue
          </DialogDescription>
        </DialogHeader>
        <div>
          <StoreForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoreDialog;
