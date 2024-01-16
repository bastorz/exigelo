"use client";

import { IoMdArrowDown } from "react-icons/io";
import Image from "next/image";
import { Button } from "./ui/button";
import AccidentData from "./form/accidentData";
import { useState } from "react";
import HealthData from "./form/healthData";
import ContactData from "./form/contactData";
import FastCallCustomerData from "./form/fastCallCustomerData";

interface FormData {
  accidentDate?: string;
  accidentPlace?: string;
}

const Hero = () => {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    accidentDate: "",
    accidentPlace: "",
  });
  const [renderUrgencyCallForm, setRenderUrgencyCallForm] = useState(false);

  const handleNextStep = () => {
    setFormStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setFormStep((prevStep) => prevStep - 1);
  };

  const handleRenderUrgencyCallForm = () => {
    setRenderUrgencyCallForm(true);
  };

  const renderNextContactForm = () => {
    switch (formStep) {
      case 1:
        return (
          <AccidentData
            step={formStep}
            handleNextStep={handleNextStep}
            handleRenderUrgencyCallForm={handleRenderUrgencyCallForm}
          />
        );
      case 2:
        return (
          <HealthData
            step={formStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
            handleRenderUrgencyCallForm={handleRenderUrgencyCallForm}
          />
        );
      case 3:
        return (
          <ContactData
            step={formStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />
        );
      // Add more cases for additional steps
      default:
        return null;
    }
  };

  return (
    <div className="bg-primary py-32 w-full grid grid-cols-1 place-items-center space-y-20">
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
      {renderUrgencyCallForm ? (
        <FastCallCustomerData />
      ) : (
        renderNextContactForm()
      )}

      <h2 className="text-5xl font-bold text-white max-w-[75rem] text-center leading-[66px] pt-32">
        Si lo prefieres programa tu cita con nosotros
      </h2>
      <div className="text-white">TODO: CALENDLY</div>
    </div>
  );
};

export default Hero;
