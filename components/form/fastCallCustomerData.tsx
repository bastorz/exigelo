"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Combobox } from "@/components/ui/combobox";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FaArrowRight, FaCheck, FaPhone } from "react-icons/fa6";
import React, { useEffect } from "react";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";

interface fastCallCustomerDataProps {
  handleFastCallCustomerDataForm: () => void;
}

const formSchema = z.object({
  nameAndLastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const FastCallCustomerData: React.FC<fastCallCustomerDataProps> = ({
  handleFastCallCustomerDataForm,
}) => {
  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAccidentType, setOpenAccidentType] = React.useState(false);
  const [valueAccidentType, setValueAccidentType] = React.useState("");
  const [openVehicleDamage, setOpenVehicleDamage] = React.useState(false);
  const [valueVehicleDamage, setValueVehicleDamage] = React.useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameAndLastName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log("values:", values);
  };

  return (
    <div className="bg-white p-10 flex flex-col space-y-4 rounded-xl">
      <h2 className="font-semibold text-3xl">
        ¡Nosotros te Llamamos en 5 minutos!
      </h2>
      <p className="text-xl max-w-5xl">
        Completa el formulario de contacto y el equipo de Exígelo se pondrá en
        contacto contigo para calcular y gestionar su indemnización.
      </p>
      <div className="flex items-center justify-center py-10">
        <span className="bg-secondary rounded-full">
          <FaCheck className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-secondary rounded-full">
          <BiSolidUserDetail className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-secondary rounded-full">
          <HiMiniClipboardDocumentCheck className="w-16 h-16 p-4" />
        </span>
      </div>

      <div className="flex flex-col items-start ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((e) => onSubmit)}
            className="flex flex-col space-y-10 w-full items-end"
          >
            <div className="grid grid-cols-3 place-items-center w-full gap-y-10">
              {/* Nombre y apellidos */}
              <FormField
                control={form.control}
                name="nameAndLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-[280px]">
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Nombre y apellidos
                        </div>
                        <Input
                          className="h-10 p-4 rounded-lg border"
                          placeholder="Marcos Silva"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Correo electrónico */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-[280px]">
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Correo electrónico
                        </div>
                        <Input
                          className="h-10 p-4 rounded-lg border"
                          placeholder="nombre@email.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Teléfono de contacto */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-[280px]">
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Teléfono de contacto
                        </div>
                        <Input
                          className="h-10 p-4 rounded-lg border"
                          placeholder="+34 655 555 555"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Submit button */}
            <div className="flex items-center gap-x-6">
              <Button className="bg-secondary text-[18px] hover:bg-secondary/90">
                Calcular mi indemnización
                <FaArrowRight className="ml-2" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FastCallCustomerData;
