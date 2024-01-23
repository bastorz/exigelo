"use client";

import Image from "next/image";
import { FaArrowRight, FaPhone } from "react-icons/fa6";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // const router = useRouter();

  // const reloadWindow = () => {
  //   router.reload;
  // };

  return (
    <nav className="h-36 bg-primary pt-10">
      <div className="grid grid-cols-2 px-40">
        <Image
          src="/logo.png"
          alt=""
          width={100}
          height={100}
          // onClick={reloadWindow}
          className="pt-3"
        />
        <div className="flex space-x-4 w-full items-center justify-end">
          <Button
            variant="outline"
            className="border border-white text-white bg-primary text-[18px] h-14 w-48 hover:bg-primary/90"
          >
            <FaPhone className="mr-2" />
            Te llamamos
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#CA3C3C] h-14 w-80 pl-20 relative">
                <div className="absolute bg-[#FFD8CF] h-14 w-20 flex items-center justify-center left-0 shape pr-5 text-[26px] rounded-l-xl">
                  <Image
                    src="/moneybag.png"
                    alt="money bag emoji"
                    width={40}
                    height={40}
                  />
                </div>
                <p className="text-[16px] font-semibold">
                  Acabo de tener un accidente
                </p>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px] flex flex-col items-center">
              <DialogHeader className="flex items-center">
                <DialogTitle>
                  <Image src="/man-judge.png" alt={""} width={70} height={70} />
                </DialogTitle>
                <DialogDescription className="py-4 font-bold text-black text-[22px] text-center">
                  ¿Has tenido un accidente de tráfico o atropello recientemente?
                </DialogDescription>
                <DialogDescription className="flex flex-col py-4 ">
                  <p className="text-black text-[22px] text-center leading-8">
                    Ahora tienes mayores probabilidades de recibir una
                    indemnización por tu accidente.
                    <span className="font-bold ml-2">¿Cómo lo hacemos?</span>
                  </p>
                  <div className="flex flex-col py-8 space-y-10">
                    <div className="flex items-center space-x-4">
                      <div className="bg-secondary px-[14px] py-2 text-white text-[18px] rounded-full">
                        1
                      </div>
                      <p className="font-semibold text-black text-[18px]">
                        Registramos tus datos para calcular tu indemnización.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-secondary px-[14px] py-2 text-white text-[18px] rounded-full">
                        2
                      </div>
                      <p className="font-semibold text-black text-[18px]">
                        Analizamos tu caso para maximizar tu indemnización.
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="bg-secondary px-[14px] py-2 text-white text-[18px] rounded-full">
                        3
                      </div>
                      <p className="font-semibold text-black text-[18px]">
                        Garantizamos tu indemnización gracias a nuestro equipo
                        legal, que reclamará por ti.
                      </p>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex flex-col items-center">
                  <Button
                    type="submit"
                    className="w-[550px] bg-secondary text-[18px] rounded-md py-8"
                    onClick={() => setOpen(false)}
                  >
                    Empezar ahora
                    <FaArrowRight className="ml-2" />
                  </Button>
                  <p className="font-bold text-[22px] pt-8">Exígelo</p>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
