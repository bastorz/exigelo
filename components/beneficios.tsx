import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { IoMdArrowDown } from "react-icons/io";
import { Button } from "./ui/button";

const Beneficios = () => {
  return (
    <div className="grid grid-cols-2 bg-primary py-40 px-56 gap-x-10">
      <div className="flex flex-col py-10 space-y-10">
        <h2 className="font-bold text-white text-5xl">Beneficios de Exígelo</h2>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <span className="bg-secondary rounded-full">
              <FaCheck className="w-14 h-14 p-4" color="white" />
            </span>
            <p className="text-white text-[22px] font-semibold">
              Abogados especialistas te acompañan en cada paso del proceso
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <span className="bg-secondary rounded-full">
              <FaCheck className="w-14 h-14 p-4" color="white" />
            </span>
            <p className="text-white text-[22px] font-semibold">
              Calculadora precisa: basada en un algoritmo de análisis legal
              profundo
            </p>
          </div>
        </div>
        <div className="flex flex-col space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <span className="bg-secondary rounded-full">
              <FaCheck className="w-14 h-14 p-4" color="white" />
            </span>
            <p className="text-white text-[22px] font-semibold">
              Miles de clientes satisfechos nos avalan
            </p>
          </div>
        </div>
        <div className="flex space-x-8">
          <Button
            variant="default"
            className="bg-secondary text-white font-semibold h-[66px] px-[60px] py-10 text-[20px] hover:bg-secondary/90"
          >
            Calcular ahora
          </Button>
          <Button
            variant="outline"
            className="bg-primary font-semibold h-[66px] px-[60px] py-10 text-white text-[20px] hover:bg-primary/90"
          >
            Necesito ayuda
          </Button>
        </div>
      </div>
      <div>
        <Image
          src={"/beneficios.png"}
          alt={"Beneficios"}
          width={800}
          height={800}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Beneficios;
