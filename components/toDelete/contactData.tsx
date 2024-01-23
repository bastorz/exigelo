"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface AccidentDataProps {
  step: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

const formSchema = z.object({
  nameAndLastName: z.string(),
  email: z.string(),
  phone: z.string(),
  terms: z.boolean().refine((value) => value === true, {
    message: "Terms must be accepted",
  }),
});

const accidentData: React.FC<AccidentDataProps> = ({ handlePreviousStep }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameAndLastName: "",
      email: "",
      phone: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
  }

  return (
    <div className="bg-white p-10 flex flex-col space-y-4 rounded-xl">
      <h2 className="font-semibold text-3xl">
        Último paso: ¡tus datos de contacto!
      </h2>
      <p className="text-xl max-w-5xl">
        Casi listo. Solo necesitamos tu información de contacto para
        proporcionarle tu estimación personalizada de indemnización.
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
            onSubmit={form.handleSubmit(onSubmit)}
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
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 w-[280px]">
                    <FormControl>
                      <Checkbox
                        className={cn(
                          "border border-black rounded-sm p-2",
                          field.value && "p-0"
                        )}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        He leído y acepto el aviso legal y la política de
                        privacidad.
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {/* Submit button */}
            <div className="flex items-center gap-x-6 px-8">
              <Button
                type="submit"
                variant="outline"
                className="text-gray-500 text-[18px]"
                onClick={handlePreviousStep}
              >
                Atrás
              </Button>
              <Button
                type="submit"
                className="bg-secondary text-[18px] hover:bg-secondary/90"
              >
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

export default accidentData;
