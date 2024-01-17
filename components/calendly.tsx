"use client";

import { useEffect } from "react";

const Calendly = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget min-w-[100rem] h-[750px] overflow-hidden custom-gradient"
      data-url="https://calendly.com/exigelo/reclama-tu-indemnizacion-con-nuestra-ayuda"
    ></div>
  );
};

export default Calendly;
