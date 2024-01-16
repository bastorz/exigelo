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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { RxCross1 } from "react-icons/rx";

interface HealthDataProps {
  step: number;
  handlePreviousStep: () => void;
  handleNextStep: () => void;
  handleRenderUrgencyCallForm: () => void;
}

type Checked = DropdownMenuCheckboxItemProps["checked"];

const formSchema = z.object({
  offDaysKnowledge: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  offDaysStartingDate: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  stillInRehabilitation: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  rehabilitationFinishDate: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  injuries: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const HealthData: React.FC<HealthDataProps> = ({
  handleNextStep,
  step,
  handlePreviousStep,
  handleRenderUrgencyCallForm,
}) => {
  const [stringDate, setStringDate] = React.useState<string>("");
  const [date, setDate] = React.useState<Date>();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [openOffDaysKnowledge, setOpenOffDaysKnowledge] = React.useState(false);
  const [valueOffDaysKnowledge, setValueOffDaysKnowledge] = React.useState("");
  const [openStillInRehabilitation, setOpenStillInRehabilitation] =
    React.useState(false);
  const [valueStillInRehabilitation, setValueStillInRehabilitation] =
    React.useState("");
  const [showFirstInjurie, setShowFirstInjurie] =
    React.useState<Checked>(false);
  const [showSecondInjurie, setShowSecondInjurie] =
    React.useState<Checked>(false);
  const [showThirdInjurie, setShowThirdInjurie] =
    React.useState<Checked>(false);
  const [showFourthInjurie, setShowFourthInjurie] =
    React.useState<Checked>(false);
  const [showFifthInjurie, setShowFifthInjurie] =
    React.useState<Checked>(false);
  const [showSixthInjurie, setShowSixthInjurie] =
    React.useState<Checked>(false);
  const [showSeventhInjurie, setShowSeventhInjurie] =
    React.useState<Checked>(false);

  const [selectedInjuries, setSelectedInjuries] = React.useState<string[]>([]);

  const handleInjurySelection = (injury: string) => {
    // Toggle the selected injury
    setSelectedInjuries((prevSelected) =>
      prevSelected.includes(injury)
        ? prevSelected.filter((selected) => selected !== injury)
        : [...prevSelected, injury]
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      offDaysKnowledge: "",
      offDaysStartingDate: "",
      stillInRehabilitation: "",
      rehabilitationFinishDate: "",
      injuries: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof formSchema>,
    e: React.FormEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    console.log("values:", values);
  };

  const yesAndNoValues = [
    {
      value: "si",
      label: "si",
    },
    {
      value: "no",
      label: "no",
    },
  ];

  const injuries = [
    {
      value: "Daño cervical",
      label: "Daño cervical",
    },
    {
      value: "Fractura del femur",
      label: "Fractura del femur",
    },
    {
      value: "Conmoción cerebral",
      label: "Conmoción cerebral",
    },
    {
      value: "Traumatismo torácico",
      label: "Traumatismo torácico",
    },
    {
      value: "Fractura de clavícula",
      label: "Fractura de clavícula",
    },
    {
      value: "Otras lesiones",
      label: "Otras lesiones",
    },
    {
      value: "Por el momento no tengo claridad sobre las lesiones",
      label: "Por el momento no tengo claridad sobre las lesiones",
    },
  ];

  return (
    <div className="bg-white p-10 flex flex-col space-y-4 rounded-xl">
      <h2 className="font-semibold text-3xl">
        Complete su información de salud
      </h2>
      <p className="text-xl max-w-5xl">
        Detalle su estado de salud después del accidente o atropello y obtenga
        un estimado de tu indemnización
      </p>
      <div className="flex items-center justify-center py-10">
        <span className="bg-secondary rounded-full">
          <FaCheck className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-secondary rounded-full">
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
            className="flex flex-col space-y-10"
          >
            <div className="grid grid-cols-3 gap-y-10">
              {/* ¿Sabes cuántos días estarás de baja? */}
              <Popover
                open={openOffDaysKnowledge}
                onOpenChange={setOpenOffDaysKnowledge}
              >
                <div>
                  <div className="font-medium flex items-center justify-between px-1 mb-4">
                    ¿Sabes cuántos días estarás de baja?
                  </div>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openOffDaysKnowledge}
                      className="w-[280px] justify-between h-10 p-4 rounded-md border"
                    >
                      {valueOffDaysKnowledge
                        ? yesAndNoValues.find(
                            (answer) => answer.value === valueOffDaysKnowledge
                          )?.label
                        : "Selecciona una respuesta"}
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
                      {yesAndNoValues.map((answer) => (
                        <CommandItem
                          key={answer.value}
                          value={answer.value}
                          onSelect={(currentValue) => {
                            setValueOffDaysKnowledge(
                              currentValue === valueOffDaysKnowledge
                                ? ""
                                : currentValue
                            );
                            setOpenOffDaysKnowledge(false);
                          }}
                        >
                          {answer.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              valueOffDaysKnowledge === answer.value
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
              {/* Seleccionar las fechas en que le han concedido la baja */}
              {valueOffDaysKnowledge === "si" && (
                <FormField
                  control={form.control}
                  name="offDaysStartingDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Popover>
                          <div className="font-medium flex items-center justify-between px-1 mb-4">
                            Seleccionar las fechas en que le han concedido la
                            baja
                          </div>
                          <div className="relative w-[420px]">
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
                                setStringDate(
                                  format(selectedDate, "dd/MM/yyyy")
                                );
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
              )}
              <Popover
                open={openStillInRehabilitation}
                onOpenChange={setOpenStillInRehabilitation}
              >
                <div>
                  <div className="font-medium flex items-center justify-between px-1 mb-4">
                    ¿Aún sigues en tratamiento de rehabilitación?
                  </div>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openStillInRehabilitation}
                      className="w-[350px] justify-between h-10 p-4 rounded-md border"
                    >
                      {valueStillInRehabilitation
                        ? yesAndNoValues.find(
                            (answer) =>
                              answer.value === valueStillInRehabilitation
                          )?.label
                        : "Selecciona una respuesta"}
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
                      {yesAndNoValues.map((answer) => (
                        <CommandItem
                          key={answer.value}
                          value={answer.value}
                          onSelect={(currentValue) => {
                            setValueStillInRehabilitation(
                              currentValue === valueStillInRehabilitation
                                ? ""
                                : currentValue
                            );
                            setOpenStillInRehabilitation(false);
                          }}
                        >
                          {answer.label}
                          <CheckIcon
                            className={cn(
                              "ml-auto h-4 w-4",
                              valueStillInRehabilitation === answer.value
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
              {/* Fecha de alta de rehabilitación */}
              {valueStillInRehabilitation === "no" && (
                <div className="">
                  <FormField
                    control={form.control}
                    name="rehabilitationFinishDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Popover>
                            <div className="font-medium flex items-center justify-between px-1 mb-4">
                              Fecha de alta de rehabilitación
                            </div>
                            <div className="relative w-[300px]">
                              <Input
                                className="h-10 p-4 rounded-lg border "
                                type="string"
                                placeholder="26/07/1988"
                                value={stringDate}
                                onChange={(e) => {
                                  setStringDate(e.target.value);
                                  const parsedDate = new Date(e.target.value);
                                  if (
                                    parsedDate.toString() === "Invalid Date"
                                  ) {
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
                                  setStringDate(
                                    format(selectedDate, "dd/MM/yyyy")
                                  );
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
                </div>
              )}
              {/* Selecciona las lesiones por las que has recibido tratamiento */}
              <div className="col-span-3">
                <FormField
                  control={form.control}
                  name="injuries"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div
                          className={cn(
                            "w-[1125px]",
                            valueOffDaysKnowledge === "si" && "w-[1150px]"
                          )}
                        >
                          <div className="font-medium flex items-center justify-between px-1 mb-4">
                            Selecciona las lesiones por las que has recibido
                            tratamiento
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="outline"
                                className="rounded-lg border w-full justify-start"
                              >
                                Selecciona las secuelas
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              className={cn(
                                "w-[1125px]",
                                valueOffDaysKnowledge === "si" && "w-[1150px]"
                              )}
                            >
                              {injuries.map((injury) => (
                                <DropdownMenuCheckboxItem
                                  key={injury.value}
                                  checked={selectedInjuries.includes(
                                    injury.value
                                  )}
                                  onCheckedChange={() =>
                                    handleInjurySelection(injury.value)
                                  }
                                >
                                  {injury.label}
                                </DropdownMenuCheckboxItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex mt-4 gap-x-4 ">
                  {selectedInjuries.map((selectedInjury) => (
                    <div
                      key={selectedInjury}
                      className="bg-slate-100 rounded-lg px-4 py-2 flex items-center justify-between"
                    >
                      {selectedInjury}
                      <button
                        className="ml-2 cursor-pointer "
                        onClick={() =>
                          setSelectedInjuries((prevSelected) =>
                            prevSelected.filter(
                              (selected) => selected !== selectedInjury
                            )
                          )
                        }
                      >
                        <RxCross1 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Submit button */}
            <div className="grid grid-cols-6 place-items-start">
              <div className="flex flex-col col-span-5">
                <button
                  className="text-gray-500 text-[18px] flex space-x-2 items-center hover:text-black duration-300"
                  onClick={handleRenderUrgencyCallForm}
                >
                  <FaPhone className="mr-2" />
                  Prefiero que me llamen
                </button>
                <div className="h-[2px] bg-black mt-1"></div>
              </div>
              <div className="flex space-x-4 ">
                <Button
                  variant="outline"
                  className="text-black text-[18px]"
                  onClick={handlePreviousStep}
                >
                  Atrás
                </Button>
                <Button
                  variant="outline"
                  className="bg-secondary text-white text-[18px] hover:bg-secondary/90"
                  onClick={handleNextStep}
                >
                  Siguiente
                  <FaArrowRight className="ml-2" />
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default HealthData;
