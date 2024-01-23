"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FaArrowRight, FaCheck, FaPhone } from "react-icons/fa6";
import React from "react";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

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

const UrgencyCallForm = ({}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameAndLastName: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
  }

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
            </div>
            {/* Submit button */}
            <div className="flex items-center gap-x-6 px-8">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    type="submit"
                    variant="default"
                    className="bg-secondary text-white font-semibold text-[18px]"
                  >
                    Solicitar llamada
                    <FaArrowRight className="ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
                  <DialogHeader className="flex items-center">
                    <DialogTitle>
                      <Image
                        src="/man-judge.png"
                        alt={""}
                        width={70}
                        height={70}
                      />
                    </DialogTitle>
                    <DialogDescription className="py-4 font-bold text-black text-[22px] text-center">
                      Hemos recibido tus datos. Mientras tanto, puedes ponerte
                      en contacto con nosotros si así lo prefieres.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <div className="flex flex-col items-center">
                      <Button className="w-[350px] bg-secondary text-[18px] rounded-md py-8">
                        Whatsapp
                        <FaArrowRight className="ml-2" />
                      </Button>
                      <p className="font-bold text-[22px] pt-8">Exígelo</p>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UrgencyCallForm;
