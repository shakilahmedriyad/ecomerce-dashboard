"use client";
import * as z from "zod";
import { Billboard, Category } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModel from "@/components/Dialog/Alert-Model";

interface CategoriesProps {
  category: Category | null;
  billboards: Billboard[] | null;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "requierd atleast 2 character" }),
  billboardId: z.string(),
});
type BillBoardsValue = z.infer<typeof formSchema>;

export default function BillBoardsForm({
  category,
  billboards,
}: CategoriesProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  console.log(billboards);
  console.log(category);
  const title = category ? "Update Category" : "Create Category";
  const descriptions = category
    ? "Update your Category to reflect on the page"
    : "Create your Category for your shop";

  const buttonText = category ? "save" : "create";

  const form = useForm<BillBoardsValue>({
    resolver: zodResolver(formSchema),
    defaultValues: category || {
      name: "",
      billboardId: "",
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
          <div className="grid grid-cols-4 w-full gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    disabled={loading}
                    placeholder={category ? "update name" : "create a name"}
                    className=" w-auto  col-start-1 col-end-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboards</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Billboard" />
                    </SelectTrigger>
                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
