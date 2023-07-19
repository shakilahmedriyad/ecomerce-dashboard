"use client";
import * as z from "zod";
import { Billboard, Store } from "@prisma/client";
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
import ApiAlertBar from "@/components/AlertBar/AlertBar";
import useOrigin from "@/hooks/use-Origin";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import { url } from "inspector";

interface BillBoardsProps {
  billboard: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(2, { message: "requierd atleast 2 character" }),
  imageUrl: z.string().min(1),
});
type BillBoardsValue = z.infer<typeof formSchema>;

export default function BillBoardsForm({ billboard }: BillBoardsProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const title = billboard ? "Update Billboard" : "Create Billboard";
  const descriptions = billboard
    ? "Update your bill board to reflect on the page"
    : "Create your billboard for your shop";

  const buttonText = billboard ? "save" : "create";

  const form = useForm<BillBoardsValue>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      label: "",
      imageUrl: "",
    },
  });

  const handleSubmit = async (values: { label: string }) => {
    try {
      setLoading(true);
      if (billboard) {
        await axios.patch(
          `/api/${params.storeId}/billboard/${billboard.id}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboard`, values);
      }
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
      await axios.delete(`/api/${params.storeId}/billboard/${billboard?.id}`);
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
        {billboard && (
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backround image</FormLabel>
                <ImageUploader
                  value={field.value ? [field.value] : []}
                  disabled={loading}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange("")}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid gird-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <Input
                    disabled={loading}
                    placeholder={billboard ? "update label" : "create a label"}
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
