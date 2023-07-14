import { Button } from "../ui/button";
import StoreDialog from "./StoreDialog";

interface AlertModelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const AlertModel: React.FC<AlertModelProps> = ({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}) => {
  return (
    <StoreDialog
      title="WARNING"
      description="are you sure! no fall back from now"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex space-x-3 justify-end items-end">
        <Button disabled={isLoading} variant={"outline"} onClick={onClose}>
          cancel
        </Button>
        <Button
          disabled={isLoading}
          variant={"destructive"}
          onClick={onConfirm}
        >
          continue
        </Button>
      </div>
    </StoreDialog>
  );
};

export default AlertModel;
