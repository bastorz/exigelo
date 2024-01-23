"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "./ui/button";
import { accordionData } from "@/constants";

const FAQ = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-2 py-40 px-56 gap-x-10">
        <div className="flex flex-col space-y-10 py-40 px-24 bg-secondary rounded-xl">
          <h3 className="text-5xl font-semibold text-primary">
            Calcula tu indemnización online
          </h3>
          <p className="text-[22px] text-primary max-w-xl font-semibold">
            ¿Listo para iniciar tu reclamación? ¡Estamos aquí para ayudarte en
            cada paso!
          </p>
          <Button className="bg-primary text-white text-[22px] p-8 w-56">
            Calcular ahora
          </Button>
        </div>
        <div className="flex flex-col space-y-10 py-40 px-16 border border-black/30 rounded-xl">
          <h3 className="text-5xl font-semibold text-primary">
            ¿Tienes más preguntas? Agenda una cita gratuita
          </h3>
          <p className="text-[22px] text-primary max-w-xl font-semibold">
            ¿Tienes más preguntas? Estamos aquí para ayudarte. Contáctanos a
            través de nuestro WhatsApp.
          </p>
          <div className="flex space-x-8">
            <Button className="bg-secondary text-white text-[22px] p-8 w-56 font-semibold hover:bg-secondary/90">
              Virtual
            </Button>
            <Button
              variant="outline"
              className=" text-black text-[22px] p-8 w-56 border-black font-semibold hover:bg-white/90"
            >
              Presencial
            </Button>
            <Button
              variant="outline"
              className=" text-black text-[22px] p-8 w-56 border-black font-semibold hover:bg-white/90"
            >
              Telefónico
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-10 px-56 pb-20 items-center justify-center w-full">
        <h2 className="text-4xl font-bold text-center">Preguntas frecuentes</h2>
        <p className="text-3xl text-gray-500 text-center max-w-[80rem]">
          Encuentra respuestas rápidas a las inquietudes más comunes que
          nuestros clientes tienen. Estamos aquí para ayudarte en cada paso del
          camino.
        </p>
        <Accordion
          type="single"
          defaultValue="item-1"
          collapsible
          className=" w-full"
        >
          {accordionData.map((acc) => (
            <AccordionItem value={acc.id} key={acc.id}>
              <AccordionTrigger>{acc.title}</AccordionTrigger>
              <AccordionContent>{acc.paragraph}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export default FAQ;
