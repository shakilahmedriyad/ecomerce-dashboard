"use client";
import * as z from "zod";
import { Category, Color, Image, Product, Size } from "@prisma/client";
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
import { Checkbox } from "@/components/ui/checkbox";
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

import ImageUploader from "@/components/ImageUploader/ImageUploader";

interface ProductsProps {
  product:
    | (Product & {
        image: Image[];
        size: Size;
        color: Color;
        category: Category;
      })
    | null;
  category: Category[];
  size: Size[];
  color: Color[];
}

const formSchema = z.object({
  name: z.string().min(2, { message: "requierd atleast 2 character" }),
  price: z.string(),
  size: z.string().min(3),
  isFeatured: z.boolean(),
  isArchived: z.boolean(),
  color: z.string().min(3),
  category: z.string().min(3),
  images: z.object({ url: z.string() }).array(),
});
type ProductsValue = z.infer<typeof formSchema>;

export default function ProductsForm({
  product,
  category,
  color,
  size,
}: ProductsProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const title = product ? "Update Product" : "Create Product";
  const descriptions = product
    ? "Update your product to reflect on the page"
    : "Create your product for your shop";

  const buttonText = product ? "save" : "create";

  const form = useForm<ProductsValue>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          name: product.name,
          price: product.price.toString(),
          size: product.size.id,
          isFeatured: false,
          isArchived: false,
          color: product.color.id,
          category: product.category.id,
          images: product.image,
        }
      : {
          name: "",
          price: "",
          size: "",
          isFeatured: false,
          isArchived: false,
          color: "",
          category: "",
          images: [],
        },
  });

  const handleSubmit = async (values: ProductsValue) => {
    try {
      setLoading(true);
      if (product && params.productId !== "new") {
        await axios.patch(
          `/api/${params.storeId}/product/${product.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/product`, values);
      }
      router.push(`/${params.storeId}/products`);
      router.refresh();
    } catch (error) {
      console.log("something went wrong at updating store name");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/product/${product?.id}`);
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
        {product && (
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
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backround image</FormLabel>
                <ImageUploader
                  value={field.value.map((image) => image.url)}
                  disabled={loading}
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) =>
                    field.onChange([
                      ...field.value.filter((value) => value.url != url),
                    ])
                  }
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    disabled={loading}
                    placeholder={
                      product ? "update product" : "create a product"
                    }
                    className=" w-auto col-start-1 col-end-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {size.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {color.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {category.map((item) => (
                        <SelectItem value={item.id} key={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <Input
                    disabled={loading}
                    type="number"
                    placeholder={product ? "update price" : "create a price"}
                    className=" w-auto col-start-1 col-end-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured</FormLabel>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms1"
                    />
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      want to feature this product?
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archived</FormLabel>
                  <div className="flex items-center gap-3">
                    <Checkbox
                      name="isArchived"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="terms2"
                    />
                    <label
                      htmlFor="terms2"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      want to archived this product?
                    </label>
                  </div>
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
