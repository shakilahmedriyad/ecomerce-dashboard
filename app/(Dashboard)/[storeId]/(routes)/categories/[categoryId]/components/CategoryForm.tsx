"use client";
import * as z from "zod";
import { Category } from "@prisma/client";
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

interface CategoriesProps {
  category: Category | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "requierd atleast 2 character" }),
});
type BillBoardsValue = z.infer<typeof formSchema>;

export default function BillBoardsForm({ category }: CategoriesProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const title = category ? "Update Category" : "Create Category";
  const descriptions = category
    ? "Update your Category to reflect on the page"
    : "Create your Category for your shop";

  const buttonText = category ? "save" : "create";

  const form = useForm<BillBoardsValue>({
    resolver: zodResolver(formSchema),
    defaultValues: category || {
      name: "",
    },
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      setLoading(true);
      if (category && params.billboardId !== "new") {
        await axios.patch(
          `/api/${params.storeId}/category/${category.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/category`, values);
      }
      router.push(`/${params.storeId}/categories`);
      router.refresh();
    } catch (error) {
      console.log("something went wrong at updating category name");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/category/${category?.id}`);
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
        {category && (
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
          <div className="grid gird-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    disabled={loading}
                    placeholder={category ? "update label" : "create a label"}
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
