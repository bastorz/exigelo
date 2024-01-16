import Beneficios from "@/components/beneficios";
import CTA from "@/components/cta";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <Hero />
      <div className="pt-[600px]">
        <CTA
          title="¿No estás seguro de cómo Calcular tu Indemnización?"
          paragraph="Nuestra calculadora utiliza parámetros legales actualizados para proporcionarte una estimación precisa."
          firstButton="Calcular ahora"
          secondButton="Necesito ayuda"
          image="/CTA.png"
          reverse={false}
        />
        <CTA
          title="¡No te quedes con lo que te dicen las aseguradoras y reclama lo que realmente te pertenece!"
          paragraph="Las aseguradoras buscan maximizar tu beneficioso sin darte lo que realmente te pertenece."
          firstButton="Agendar una llamada"
          secondButton="Calcular ahora"
          image="/CTA2.png"
          reverse={true}
        />
      </div>
      <Beneficios />
      <FAQ />
    </React.Fragment>
  );
}
