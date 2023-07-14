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

interface SettingsFromProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "requierd atleast 2 character" }),
});

type settingsFromValue = z.infer<typeof formSchema>;

export default function SettingsFrom({ store }: SettingsFromProps) {
  
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState();

  const form = useForm<settingsFromValue>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  const handleSubmit = (values: { name: string }) => {
    console.log(values);
  };

  return (
    <>
      <div className="flex items-center">
        <HeadingComponent
          title="Settings"
          descriptons="make changes to update on real site "
        />
        <Button variant={"destructive"} size={"sm"} className=" ml-auto">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
      <Separator className="my-2" />
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
                  <Input className=" w-auto col-start-1 col-end-2" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="ml-auto">
            save
          </Button>
        </form>
      </Form>
    </>
  );
}
