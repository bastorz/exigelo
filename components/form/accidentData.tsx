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

interface AccidentDataProps {
  step: number;
  handleNextStep: () => void;
  handleFastCallCustomerDataForm: () => void;
}

const accidentData: React.FC<AccidentDataProps> = ({
  handleNextStep,
  handleFastCallCustomerDataForm,
  step,
}) => {
  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openAccidentType, setOpenAccidentType] = React.useState(false);
  const [valueAccidentType, setValueAccidentType] = React.useState("");
  const [openVehicleDamage, setOpenVehicleDamage] = React.useState(false);
  const [valueVehicleDamage, setValueVehicleDamage] = React.useState("");

  const form = useForm({
    defaultValues: {
      accidentDate: "",
      accidentPlace: "",
      bornDate: "",
      accidentType: "",
      vehicleDamage: "",
    },
  });

  const onSubmit = async (
    values: any,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log("values:", values);
  };

  const accidentTypes = [
    {
      value: "tipo a",
      label: "tipo a",
    },
    {
      value: "tipo b",
      label: "tipo b",
    },
  ];

  const vehicleDamages = [
    {
      value: "siniestro total",
      label: "siniestro total",
    },
    {
      value: "grandes",
      label: "grandes",
    },
    {
      value: "leves",
      label: "leves",
    },
    {
      value: "no lo se",
      label: "no lo se",
    },
  ];

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
            onSubmit={form.handleSubmit((e) => onSubmit)}
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
                  onClick={handleFastCallCustomerDataForm}
                  variant="outline"
                  className="text-gray-500 w-[280px] py-4 border border-black/20 rounded-md hover:bg-black/5"
                >
                  He tenido un accidente grave
                </Button>
              </div>
              {/* Tipo de accidente */}
              <Popover
                open={openAccidentType}
                onOpenChange={setOpenAccidentType}
              >
                <div>
                  <div className="font-medium flex items-center justify-between px-1 mb-4">
                    Tipo de accidente
                  </div>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openAccidentType}
                      className="w-[280px] justify-between h-10 p-4 rounded-md border"
                    >
                      {valueAccidentType
                        ? accidentTypes.find(
                            (accidentType) =>
                              accidentType.value === valueAccidentType
                          )?.label
                        : "Elige el tipo de accidente"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-[280px] p-0">
                  <Command>
                    <CommandEmpty>
                      No has seleccionado un tipo de accidente
                    </CommandEmpty>
                    <CommandGroup>
                      {accidentTypes.map((accidentType) => (
                        <CommandItem
                          key={accidentType.value}
                          value={accidentType.value}
                          onSelect={(currentValue) => {
                            setValueAccidentType(
                              currentValue === valueAccidentType
                                ? ""
                                : currentValue
                            );
                            setOpenAccidentType(false);
                          }}
                        >
                          {accidentType.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              valueAccidentType === accidentType.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* Daño al vehículo */}
              <Popover
                open={openVehicleDamage}
                onOpenChange={setOpenVehicleDamage}
              >
                <div>
                  <div className="font-medium flex items-center justify-between px-1 mb-4">
                    Daño al vehículo
                  </div>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openVehicleDamage}
                      className="w-[280px] justify-between h-10 p-4 rounded-md border"
                    >
                      {valueVehicleDamage
                        ? vehicleDamages.find(
                            (vehicleDamage) =>
                              vehicleDamage.value === valueVehicleDamage
                          )?.label
                        : "Elige el daño al vehículo"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                </div>
                <PopoverContent className="w-[280px] p-0">
                  <Command>
                    <CommandEmpty>
                      No has seleccionado un daño del vehículo
                    </CommandEmpty>
                    <CommandGroup>
                      {vehicleDamages.map((vehicleDamage) => (
                        <CommandItem
                          key={vehicleDamage.value}
                          value={vehicleDamage.value}
                          onSelect={(currentValue) => {
                            setValueVehicleDamage(
                              currentValue === valueVehicleDamage
                                ? ""
                                : currentValue
                            );
                            setOpenVehicleDamage(false);
                          }}
                        >
                          {vehicleDamage.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              valueVehicleDamage === vehicleDamage.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            {/* Submit button */}
            <div className="flex items-center gap-x-6">
              <Button className="bg-secondary text-[18px] hover:bg-secondary/90">
                <FaPhone className="mr-2" />
                Prefiero que me llamen
              </Button>
              <Button
                type="submit"
                variant="outline"
                className="text-gray-500 text-[18px]"
                onClick={handleNextStep}
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
