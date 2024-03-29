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
import { Combobox } from "@/components/ui/combobox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FaArrowRight, FaPhone } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  accidentTypes,
  booleans,
  days,
  injuries,
  numbers,
  vehicleDamages,
} from "@/constants";
import HealthTitle from "./formTitles/healthTitle";
import AccidentTitle from "./formTitles/accidentTitle";
import ContactTitle from "./formTitles/contactTItle";
import MultiSelect from "../ui/multiselect";
import UrgencyCallForm from "./urgency-call-form";

const formSchema = z.object({
  accidentDate: z.date(),
  accidentPlace: z.string(),
  bornDate: z.date(),
  accidentType: z.string(),
  vehicleDamage: z.string(),
  offDaysKnowledge: z.string(),
  offDaysStartingDate: z.date(),
  stillInRehabilitation: z.string(),
  rehabilitationFinishDate: z.date(),
  injuries: z.array(z.string()),
  isHospitalized: z.string(),
  hospitalizedDays: z.string(),
  isSurgicalInterventioned: z.string(),
  surgeryReceived: z.string(),
  nameAndLastName: z.string(),
  email: z.string(),
  phone: z.string(),
  terms: z.boolean().refine((value) => value === true, {
    message: "Terms must be accepted",
  }),
});

const ContactForm = ({}) => {
  const [stringDate, setStringDate] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formStep, setFormStep] = useState(1);
  const [healthForm, setHealthForm] = useState(false);
  const [contactForm, setContactForm] = useState(false);
  const [isUrgencyFormVisible, setIsUrgencyFormVisible] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accidentDate: new Date(),
      accidentPlace: "",
      bornDate: new Date(),
      accidentType: "",
      vehicleDamage: "",
      offDaysKnowledge: "",
      offDaysStartingDate: new Date(),
      stillInRehabilitation: "",
      isSurgicalInterventioned: "",
      surgeryReceived: "",
      rehabilitationFinishDate: new Date(),
      injuries: [],
      nameAndLastName: "",
      email: "",
      phone: "",
      terms: false,
    },
  });

  const handleNextStep = () => {
    setFormStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setFormStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    // Check the updated values of healthForm and contactForm after formStep changes
    if (formStep === 1) {
      setHealthForm(false);
      setContactForm(false);
    } else if (formStep === 2) {
      setHealthForm(true);
      setContactForm(false);
    } else if (formStep === 3) {
      setHealthForm(false);
      setContactForm(true);
    }
  }, [formStep]);

  const renderFormTitle = () => {
    switch (formStep) {
      case 1:
        return <AccidentTitle />;
      case 2:
        return <HealthTitle />;
      case 3:
        return <ContactTitle />;
      // Add more cases for additional steps
      default:
        return null;
    }
  };

  const handleRenderUrgencyCallForm = () => {
    setFormStep(4);
    setIsUrgencyFormVisible(true);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values:", values);
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

  const isOffDaysKnown = form.watch("offDaysKnowledge");
  const isStillInRehabilitation = form.watch("stillInRehabilitation");
  const isHospitalized = form.watch("isHospitalized");
  const isSurgicalInterventioned = form.watch("isSurgicalInterventioned");

  return (
    <>
      {!isUrgencyFormVisible && (
        <div className="bg-white p-10 flex flex-col space-y-4 rounded-xl ">
          {renderFormTitle()}

          <div
            className="flex flex-col items-start w-[1500px]"
            id="contactForm"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-10 w-full items-end px-10"
              >
                {/* Accident Form */}
                <div
                  className={cn(
                    "grid grid-cols-3 place-items-center w-full gap-y-10 px-10 pb-10",
                    healthForm && "hidden",
                    contactForm && "hidden"
                  )}
                >
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
                {/* Health Form */}
                <div
                  className={cn(
                    "grid grid-cols-3 gap-y-10 w-full place-content-center px-10 pb-10",
                    !healthForm && "hidden"
                  )}
                >
                  {/* ¿Has estado de baja? */}
                  <FormField
                    control={form.control}
                    name="offDaysKnowledge"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div>
                            <div className="font-medium flex items-center justify-between px-1 mb-4">
                              ¿Has estado de baja?
                            </div>
                            <div className="w-[280px]">
                              <Combobox
                                options={booleans.map((answer) => answer)}
                                {...field}
                              />
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* Seleccionar las fechas en que le han concedido la baja */}
                  {isOffDaysKnown === "Si" && (
                    <FormField
                      control={form.control}
                      name="offDaysStartingDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Popover>
                              <div className="font-medium flex items-center justify-between px-1 mb-4">
                                Seleccionar la fecha en que le han concedido la
                                baja
                              </div>
                              <div className="relative w-[280px]">
                                <Input
                                  className="h-10 p-4 rounded-lg border"
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
                  )}
                  {/* ¿Aún sigues en tratamiento de rehabilitación? */}
                  {isOffDaysKnown === "Si" && (
                    <FormField
                      control={form.control}
                      name="stillInRehabilitation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div className="font-medium flex items-center justify-between px-1 mb-4">
                                ¿Aún sigues en tratamiento de rehabilitación?
                              </div>
                              <div className="w-[280px]">
                                <Combobox
                                  options={booleans.map((answer) => answer)}
                                  {...field}
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* Fecha de alta de rehabilitación */}
                  {isStillInRehabilitation === "No" && (
                    <div>
                      <FormField
                        control={form.control}
                        name="rehabilitationFinishDate"
                        render={() => (
                          <FormItem>
                            <FormControl>
                              <Popover>
                                <div className="font-medium flex items-center justify-between px-1 mb-4">
                                  Fecha de alta de rehabilitación
                                </div>
                                <div className="relative w-[280px]">
                                  <Input
                                    className="h-10 p-4 rounded-lg border "
                                    type="string"
                                    placeholder="26/07/1988"
                                    value={stringDate}
                                    onChange={(e) => {
                                      setStringDate(e.target.value);
                                      const parsedDate = new Date(
                                        e.target.value
                                      );
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
                  {/* ¿Has estado hospitalizado? */}
                  {isOffDaysKnown === "Si" && (
                    <FormField
                      control={form.control}
                      name="isHospitalized"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div className="font-medium flex items-center justify-between px-1 mb-4">
                                ¿Has estado hospitalizado?
                              </div>
                              <div className="w-[280px]">
                                <Combobox
                                  options={booleans.map((answer) => answer)}
                                  {...field}
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* ¿Cuántos dias has estado hospitalizado? */}
                  {isOffDaysKnown === "Si" && isHospitalized === "Si" && (
                    <FormField
                      control={form.control}
                      name="hospitalizedDays"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div className="font-medium flex items-center justify-between px-1 mb-4">
                                ¿Cuántos dias has estado hospitalizado?
                              </div>
                              <div className="w-[280px]">
                                <Combobox
                                  options={days.map((answer) => answer)}
                                  {...field}
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* ¿Has recibido intervención quirúrjica? */}
                  {isOffDaysKnown === "Si" && (
                    <FormField
                      control={form.control}
                      name="isSurgicalInterventioned"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div>
                              <div className="font-medium flex items-center justify-between px-1 mb-4">
                                ¿Has recibido intervención quirúrjica?
                              </div>
                              <div className="w-[280px]">
                                <Combobox
                                  options={booleans.map((answer) => answer)}
                                  {...field}
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {/* ¿Cuántas intervenciones has recibido? */}
                  {isOffDaysKnown === "Si" &&
                    isSurgicalInterventioned === "Si" && (
                      <FormField
                        control={form.control}
                        name="surgeryReceived"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <div>
                                <div className="font-medium flex items-center justify-between px-1 mb-4">
                                  ¿Cuántas intervenciones has recibido?
                                </div>
                                <div className="w-[280px]">
                                  <Combobox
                                    options={numbers.map((answer) => answer)}
                                    {...field}
                                  />
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  {/* Selecciona las lesiones por las que has recibido tratamiento */}
                  {isOffDaysKnown === "Si" && (
                    <div className="col-span-3">
                      <FormField
                        control={form.control}
                        name="injuries"
                        render={({ field }) => (
                          <FormItem>
                            <div className="font-medium flex flex-col items-start">
                              <p>
                                Selecciona las lesiones por las que has recibido
                                tratamiento
                              </p>
                            </div>
                            <MultiSelect
                              selected={field.value}
                              options={injuries.map((injury) => injury)}
                              {...field}
                            />
                            <div className="flex space-x-2 items-center">
                              <span className="text-red-500">*</span>
                              <p className="text-[11px]">
                                Si no encuentra una lesión que se adecúe a su
                                caso, llame directamente
                              </p>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                {/* Contact Form */}
                <div
                  className={cn(
                    "grid grid-cols-3 place-items-center w-full gap-y-10 px-10 pb-10",
                    !contactForm && "hidden"
                  )}
                >
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
                <div className="flex items-center justify-between w-full">
                  <Button
                    onClick={handleRenderUrgencyCallForm}
                    variant="ghost"
                    className={cn(
                      "text-[18px] underline",
                      !healthForm && "hidden"
                    )}
                  >
                    <FaPhone className="mr-2" />
                    Prefiero que me llamen
                  </Button>
                  {contactForm && (
                    <FormField
                      control={form.control}
                      name="terms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                          <FormControl>
                            <Checkbox
                              className={cn("border border-black rounded-sm")}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-black">
                              He leído y acepto el aviso legal y la política de
                              privacidad.
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
                  <div></div>
                  <div className="flex space-x-4">
                    <Button
                      onClick={handleRenderUrgencyCallForm}
                      className={cn(
                        "bg-secondary text-[18px] hover:bg-secondary/90",
                        healthForm && "hidden",
                        contactForm && "hidden"
                      )}
                    >
                      <FaPhone className="mr-2" />
                      Prefiero que me llamen
                    </Button>
                    <Button
                      onClick={handlePreviousStep}
                      variant="outline"
                      className={cn(
                        "text-gray-500 text-[18px]",
                        !healthForm && "hidden"
                      )}
                    >
                      Atrás
                    </Button>
                    <Button
                      onClick={handleNextStep}
                      variant="default"
                      className={cn(
                        "text-white text-[18px] bg-secondary",
                        contactForm && "hidden"
                      )}
                    >
                      Siguiente
                      <FaArrowRight className="ml-2" />
                    </Button>
                    <Button
                      type="submit"
                      className={cn(
                        "bg-secondary text-[18px] hover:bg-secondary/90",
                        healthForm && "hidden",
                        !contactForm && "hidden"
                      )}
                    >
                      <FaPhone className="mr-2" />
                      Calcular mi indemnización
                    </Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
      {isUrgencyFormVisible && <UrgencyCallForm />}
    </>
  );
};

export default ContactForm;
