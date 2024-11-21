"use client";
import * as z from "zod";
import { Size } from "@prisma/client";
import HeadingComponent from "@/components/HeadingComponent/HeadingComponent";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModel from "@/components/Dialog/Alert-Model";

interface SizesProps {
  size: Size | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "requierd atleast 2 character" }),
  value: z.string().min(1),
});
type SizesValue = z.infer<typeof formSchema>;

export default function SizesForm({ size }: SizesProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = size ? "Update Size" : "Create Size";
  const descriptions = size
    ? "Update your bill board to reflect on the page"
    : "Create your size for your shop";

  const buttonText = size ? "save" : "create";

  const form = useForm<SizesValue>({
    resolver: zodResolver(formSchema),
    defaultValues: size || {
      name: "",
      value: "",
    },
  });

  const handleSubmit = async (values: SizesValue) => {
    try {
      setLoading(true);
      if (size && params.sizeId !== "new") {
        await axios.patch(`/api/${params.storeId}/size/${size.id}`, values);
      } else {
        await axios.post(`/api/${params.storeId}/size`, values);
      }
      router.push(`/${params.storeId}/sizes`);
      router.refresh();
    } catch (error) {
      console.log("something went wrong at updating size name");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/size/${size?.id}`);
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log("something went wrong");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModel
        isOpen={open}
        isLoading={loading}
        onConfirm={handleDelete}
        onClose={() => setOpen(false)}
      />
      <div className="flex items-center">
        <HeadingComponent title={title} descriptons={descriptions} />
        {size && (
          <Button
            disabled={loading}
            variant={"destructive"}
            size={"sm"}
            className=" ml-auto"
            onClick={() => setOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator className="my-6" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full "
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    disabled={loading}
                    placeholder={size ? "update size" : "create a size"}
                    className=" w-auto col-start-1 col-end-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>value</FormLabel>
                  <Input
                    disabled={loading}
                    placeholder={size ? "update value" : "create a value"}
                    className=" w-auto col-start-1 col-end-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {buttonText}
          </Button>
        </form>
      </Form>
      <Separator className="my-6" />
    </>
  );
}
