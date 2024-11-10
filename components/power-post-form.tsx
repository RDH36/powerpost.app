"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { LANGUAGE, postModes } from "@/app/dashboard/new-post/post.const";
import {
  PostSchema,
  PowerPostSchema,
} from "@/app/dashboard/new-post/post.schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { PowerPostLoader } from "./power-post-loader";

export function PostForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof PowerPostSchema>>({
    resolver: zodResolver(PowerPostSchema),
    defaultValues: {
      sourceUrl: "",
      mode: "SHORT",
      language: "English",
    },
  });

  const postMutation = useMutation({
    mutationFn: async (values: PostSchema) => {
      const result = await fetch("/api/powerpost", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (!result.ok) {
        const errorResponse = await result.json();
        throw new Error(errorResponse.error);
      }
      const json = await result.json();
      return json;
    },
  });

  return (
    <>
      {postMutation.isPending && <PowerPostLoader />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {
            postMutation.mutate(form.getValues());
          })}
          className={cn("space-y-4", postMutation.isPending && "opacity-0 h-0")}
        >
          <FormField
            control={form.control}
            name="sourceUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-post.com/how-create-website"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  The source of the post you want to process.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post mode</FormLabel>
                <FormControl>
                  <div className="flex flex-wrap gap-2">
                    {postModes.map((mode) => (
                      <Button
                        key={mode.value}
                        type="button"
                        variant={
                          field.value === mode.value ? "default" : "outline"
                        }
                        className="flex items-center gap-2"
                        onClick={() => field.onChange(mode.value)}
                      >
                        <mode.icon className="size-4" />
                        {mode.label}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(LANGUAGE).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value} {key}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Your notes will be write in this language.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {postMutation.isError && (
            <FormMessage>{postMutation.error?.message}</FormMessage>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={postMutation.isPending}
          >
            {postMutation.isPending && (
              <Loader2 className="mr-3 animate-spin" />
            )}
            Create PowerPost
          </Button>
        </form>
      </Form>
    </>
  );
}
