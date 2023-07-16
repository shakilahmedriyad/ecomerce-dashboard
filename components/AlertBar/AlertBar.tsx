"use client";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Copy, Server } from "lucide-react";
import { Button } from "../ui/button";
import { Badge, BadgeProps } from "../ui/badge";
import { toast } from "react-hot-toast";

interface AlertBarProps {
  title: string;
  descriptions: string;
  variant: "admin" | "public";
}

const textMap: Record<AlertBarProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<AlertBarProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlertBar: React.FC<AlertBarProps> = ({
  title,
  descriptions,
  variant,
}) => {
  const handleCopy = () => {
    window.navigator.clipboard.writeText(descriptions);
    toast.success("copied to clipboard");
  };

  return (
    <Alert>
      <AlertTitle className="flex  items-center space-x-3">
        <Server className="h-4 w-4 opacity-75" />
        <p className="uppercase">{title}</p>
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex justify-between items-center mt-3">
        <code className="font-mono ml-6 rounded text-sm font-semibold relative bg-muted px-[0.3rem] py-[.2rem]">
          {descriptions}
        </code>
        <Button variant={"secondary"} onClick={handleCopy} size={"icon"}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlertBar;
