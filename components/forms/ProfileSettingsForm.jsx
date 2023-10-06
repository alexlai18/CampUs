"use client"

import { useEffect, useState } from "react"
import { getLanguages } from "@/api/getLanguages"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import format from "date-fns/format"
import { CaretSortIcon, CheckIcon, CalendarIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Calendar } from "@/components/ui/calendar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "../ui/label"
import { updateUser } from "@/api/apiClient"
import { useSelector } from "react-redux"
import { Icons } from "../ui/icons"
import { useToast } from "../ui/use-toast"

export function ProfileSettingsForm() {
  const [languages, setLanguages] = useState(["Loading..."]);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast()

  const userId = useSelector((state) => state.authenticationState.value).userId;

  useEffect(() => {
    const getLang = async () => {
      setLanguages(await getLanguages());
    }
    getLang();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (newName.trim() === "") {
      await updateUser(userId, {
        email: email !== "" ? newEmail : undefined
      })
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="flex mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify({
              email: email !== "" ? newEmail : undefined
            })}</code>
          </pre>
        ),
      })
    } else {
      const name = newName.split(" ");
      await updateUser(userId, {
        details: {
          fname: name[0],
          lname: name[1]
        },
        email: email !== "" ? newEmail : undefined
      });
      toast({
        title: "These values have been updated:",
        description: (
          <pre className="mt-2 rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {
                JSON.stringify({
                  fname: name[0],
                  lname: name[1],
                  email: email !== "" ? newEmail : undefined
                }, null, 2)
              }
            </code>
          </pre>
        ),
      })
    }
    setLoading(false);
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center [&>div]:w-full",
      )}
    >
      <form onSubmit={handleSubmit} className="space-y-8 w-[50%]">
        <div>
          <h2 className="text-lg font-medium tracking-tight">Account</h2>
          <p className="text-sm text-muted-foreground">
            Update your account settings.
          </p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" onChange={(e) => setNewEmail(e.target.value)} required />
          <div className="text-muted-foreground text-sm">This is email you want to link to this account.</div>
        </div>
        <div className="w-full grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Your Name" onChange={(e) => setNewName(e.target.value)} required />
          <div className="text-muted-foreground text-sm">This is the full name that is displayed.</div>
        </div>

        {/*
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Language</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? languages.find(
                              (language) => language === field.value
                            )?.label
                          : "Select language"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] h-[300px] p-0" side="right" align="start">
                    <Command>
                      <CommandInput placeholder="Search language..." />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <ScrollArea className="flex h-[300px] flex-col" type="always">
                        <CommandGroup>
                          {languages.map((language) => (
                            <CommandItem
                              value={language}
                              key={language}
                              onSelect={() => {
                                form.setValue("language", language)
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  language === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {language}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  This is the language that will be used in the dashboard.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" side="right" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            <div>
            {fields.map((field, index) => (
              <FormField
                control={form.control}
                key={field.id}
                name={`urls.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                      URLs
                    </FormLabel>
                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                      Add links to your website, blog, or social media profiles.
                    </FormDescription>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ value: "" })}
            >
              Add URL
            </Button>
          </div>
        */}
        <Button type="submit">{loading && <Icons.spinner className="h-4 w-4 animate-spin" />}Update profile</Button>
      </form>
    </div>
  )
}