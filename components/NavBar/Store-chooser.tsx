"use client";
import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useStoreModal } from "@/hooks/store-hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
} from "../ui/command";
type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwithcerProps extends PopoverTriggerProps {
  items: Store[];
}
export default function StoreSwithcer({
  className,
  items = [],
}: StoreSwithcerProps) {
  const [open, setOpen] = useState(false);
  const storeModel = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formatedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const currentStore = formatedItems.find(
    (item) => item.value === params.storeId
  );
  const storeSelectHandler = (store: { label: string; value: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          aria-expanded={true}
          aria-label="select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className=" mr-2 shrink-0 opacity-70 w-4 h-4" />
          {currentStore?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="store ..." />
            <CommandEmpty>No store by that name</CommandEmpty>
            <CommandGroup heading="store">
              {formatedItems?.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => storeSelectHandler(store)}
                >
                  <p>{store.label}</p>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4 ",
                      store.value === currentStore?.value
                        ? "opacity-70"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => storeModel.onOpen()}>
                <p className="text-sm cursor-pointer">create store</p>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
