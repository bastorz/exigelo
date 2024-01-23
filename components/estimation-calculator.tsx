import Image from "next/image";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EstimationCalculator = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 space-y-6 w-full">
      <h4 className="font-semibold text-[24px] max-w-lg text-center text-primary">
        NO cobramos si tú no cobras y tampoco te vamos a cobrar nada por
        adelantado
      </h4>
      <p className="text-center text-[18px] font-primary font-semibold">
        Marcos, tu estimación de indemnización es:
      </p>
      <div className="relative py-4">
        <div className="absolute right-[-70px] top-[-10px] bg-secondary p-1 rounded-full cursor-pointer hover:bg-secondary/90 duration-300">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                type="submit"
                variant="default"
                className="bg-secondary font-bold text-[22px] "
              >
                ?
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] min-w-[1000px] flex flex-col items-start">
              <DialogHeader className="flex items-center">
                <DialogTitle className="flex flex-col space-y-5 w-full items-start text-primary">
                  <p>Maximiza tu indemnización con nosotros:</p>
                  <div className="bg-primary h-[1px] w-full px-4"></div>
                </DialogTitle>
                <DialogDescription className="py-4 text-primary text-[18px] font-medium leading-8">
                  Maximiza tu indemnización con nosotros: En Exígelo, no solo
                  gestionamos tu caso, sino que revisamos minuciosamente cada
                  detalle de tus lesiones. Nuestro objetivo es maximizar tu
                  indemnización y te acompañamos durante todo el proceso de
                  curación.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <p className="font-bold text-[18px] font-primary">
                  ¡Con Exígelo, no tienes que preocuparte por nada!
                </p>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <p className="text-[50px] font-semibold text-primary">3400 - 5435 €</p>
      </div>
      <Button
        variant="default"
        className="bg-secondary py-10 px-20 text-[22px] font-semibold hover:bg-secondary/90 "
      >
        Reclamamos por ti
        <FaArrowRight className="ml-2" />
      </Button>
      <Image src="/two-persons.png" alt={""} width={300} height={300} />
      <p className="font-bold text-[22px] pt-8">Exígelo</p>
    </div>
  );
};

export default EstimationCalculator;
