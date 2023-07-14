"use client";
import * as z from "zod";
import { Store } from "@prisma/client";
import HeadingComponent from "../../../../../../components/HeadingComponent/HeadingComponent";
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

interface SettingsFromProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "requierd atleast 2 character" }),
});

type settingsFromValue = z.infer<typeof formSchema>;

export default function SettingsFrom({ store }: SettingsFromProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  const form = useForm<settingsFromValue>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const handleSubmit = async (values: { name: string }) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      setLoading(false);
    } catch (error) {
      console.log("something went wrong at updating store name");
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.push("/");
      setLoading(false);
    } catch (error) {
      console.log("something went wrong");
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
        <HeadingComponent
          title="Settings"
          descriptons="make changes to update on real site "
        />
        <Button
          disabled={loading}
          variant={"destructive"}
          size={"sm"}
          className=" ml-auto"
          onClick={() => setOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
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
                  <FormLabel>name</FormLabel>
                  <Input
                    disabled={loading}
                    className=" w-auto col-start-1 col-end-2"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            save
          </Button>
        </form>
      </Form>
    </>
  );
}
