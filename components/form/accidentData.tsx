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
import { Combobox } from "@/components/ui/combobox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FaArrowRight, FaCheck, FaPhone } from "react-icons/fa6";
import React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { BiSolidUserDetail } from "react-icons/bi";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";
import { accidentTypes, vehicleDamages } from "@/constants";

interface AccidentDataProps {
  step: number;
  handleNextStep: () => void;
  handleRenderUrgencyCallForm: () => void;
}

const formSchema = z.object({
  accidentDate: z.date(),
  accidentPlace: z.string(),
  bornDate: z.date(),
  accidentType: z.string(),
  vehicleDamage: z.string(),
});

const accidentData: React.FC<AccidentDataProps> = ({
  handleNextStep,
  step,
  handleRenderUrgencyCallForm,
}) => {
  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accidentDate: new Date(),
      accidentPlace: "",
      bornDate: new Date(),
      accidentType: "",
      vehicleDamage: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
    handleNextStep();
    // try {
    //   const response = await fetch("/api/submitForm", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(values),
    //   });
    // } catch (error) {
    //   console.error("Error submitting form:", error);
    // }
  }

  return (
    <div className="bg-white p-10 flex flex-col space-y-4 rounded-xl">
      <h2 className="font-semibold text-3xl">
        Ingresa los datos del accidente
      </h2>
      <p className="text-xl max-w-5xl">
        Recuerda que los menores de 13 años también tienen derecho a recibir
        indemnización, incluso si son considerados culpables.
      </p>
      <div className="flex items-center justify-center py-10">
        <span className="bg-secondary rounded-full">
          <FaCheck className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-slate-200 rounded-full">
          <BiSolidUserDetail className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-slate-200 w-48"></div>
        <span className="bg-slate-200 rounded-full">
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
              {/* Fecha del accidente */}
              <FormField
                control={form.control}
                name="accidentDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Fecha del accidente
                        </div>
                        <div className="relative w-[280px]">
                          <Input
                            className="h-10 p-4 rounded-md border"
                            type="string"
                            placeholder="12/01/2024"
                            {...field}
                            value={stringDate}
                            onChange={(e) => {
                              setStringDate(e.target.value);
                              const parsedDate = new Date(e.target.value);
                              if (parsedDate.toString() === "Invalid Date") {
                                setErrorMessage("Invalid Date");
                                setDate(undefined);
                              } else {
                                setErrorMessage("");
                                setDate(parsedDate);
                              }
                            }}
                          />
                          {errorMessage !== "" && (
                            <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
                              {errorMessage}
                            </div>
                          )}
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none h-10",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                        </div>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              if (!selectedDate) return;
                              setDate(selectedDate);
                              setStringDate(format(selectedDate, "dd/MM/yyyy"));
                              setErrorMessage("");
                            }}
                            defaultMonth={date}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Lugar del accidente */}
              <FormField
                control={form.control}
                name="accidentPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="w-[280px]">
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Lugar del accidente
                        </div>
                        <Input
                          className="h-10 p-4 rounded-lg border"
                          placeholder="Santa Cruz de Tenerife"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Fecha de nacimiento */}
              <FormField
                control={form.control}
                name="bornDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Fecha de nacimiento
                        </div>
                        <div className="relative w-[280px]">
                          <Input
                            className="h-10 p-4 rounded-lg border "
                            type="string"
                            placeholder="26/07/1988"
                            {...field}
                            value={stringDate}
                            onChange={(e) => {
                              setStringDate(e.target.value);
                              const parsedDate = new Date(e.target.value);
                              if (parsedDate.toString() === "Invalid Date") {
                                setErrorMessage("Invalid Date");
                                setDate(undefined);
                              } else {
                                setErrorMessage("");
                                setDate(parsedDate);
                              }
                            }}
                          />
                          {errorMessage !== "" && (
                            <div className="absolute bottom-[-1.75rem] left-0 text-red-400 text-sm">
                              {errorMessage}
                            </div>
                          )}
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "font-normal absolute right-0 translate-y-[-50%] top-[50%] rounded-l-none h-10",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                        </div>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(selectedDate) => {
                              if (!selectedDate) return;
                              setDate(selectedDate);
                              setStringDate(format(selectedDate, "dd/MM/yyyy"));
                              setErrorMessage("");
                            }}
                            defaultMonth={date}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* He tenido un accidente grave (Botón) */}
              <div>
                <div className="feont-medium flex items-center justify-betwen px-1 mb-4 h-7"></div>
                <Button
                  onClick={handleRenderUrgencyCallForm}
                  variant="outline"
                  className="text-gray-500 w-[280px] py-4 border border-black/20 rounded-md hover:bg-black/5"
                >
                  He tenido un accidente grave
                </Button>
              </div>
              {/* Tipo de accidente */}
              <FormField
                control={form.control}
                name="accidentType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Tipo de accidente
                        </div>
                        <div className="w-[280px]">
                          <Combobox
                            options={accidentTypes.map(
                              (accidentType) => accidentType
                            )}
                            {...field}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Daño al vehículo */}
              <FormField
                control={form.control}
                name="vehicleDamage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div>
                        <div className="font-medium flex items-center justify-between px-1 mb-4">
                          Daños al vehículo
                        </div>
                        <div className="w-[280px]">
                          <Combobox
                            options={vehicleDamages.map(
                              (vehicleDamage) => vehicleDamage
                            )}
                            {...field}
                          />
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Tipo de accidente */}
            </div>
            {/* Submit button */}
            <div className="flex items-center gap-x-6 px-8">
              <Button
                onClick={handleRenderUrgencyCallForm}
                className="bg-secondary text-[18px] hover:bg-secondary/90"
              >
                <FaPhone className="mr-2" />
                Prefiero que me llamen
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="text-gray-500 text-[18px]"
              >
                Siguiente
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
