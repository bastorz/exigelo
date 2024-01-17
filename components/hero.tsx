"use client";

import { IoMdArrowDown } from "react-icons/io";
import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import ContactForm from "./form/contactForm";

interface FormData {
  accidentDate?: string;
  accidentPlace?: string;
}

const Hero = () => {
  return (
    <>
      <div className="bg-primary pt-32  w-full grid grid-cols-1 place-items-center space-y-20 ">
        <h1 className="text-5xl font-bold text-white max-w-[75rem] text-center leading-[66px]">
          ¿Has tenido un accidente de tráfico o un atropello? ¡Calcula tu
          indemnización!
        </h1>
        <div className="flex space-x-4">
          <Button
            variant="default"
            className="bg-secondary text-white font-semibold h-[66px] px-[24px] py-4 text-[20px] flex items-center hover:bg-secondary/90"
          >
            Calcular ahora online
            <IoMdArrowDown className="w-6 h-6 ml-2" />
          </Button>
          <Button
            variant="default"
            className="bg-white text-black font-semibold h-[66px] px-[24px] py-4 text-[20px] flex space-x-8 items-center hover:bg-white/90"
          >
            <Image
              src="/small_logo.png"
              alt="Exígelo logo"
              width={28}
              height={28}
              className="mr-2"
            />
            Calculamos tu indeminización por ti
          </Button>
        </div>
        <ContactForm />
        <h2 className="text-5xl font-bold text-white max-w-[75rem] text-center leading-[66px] pt-10">
          Si lo prefieres programa tu cita con nosotros
        </h2>
      </div>
    </>
  );
};

export default Hero;
