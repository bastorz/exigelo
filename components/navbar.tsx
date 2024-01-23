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

const Navbar = () => {
  return (
    <nav className="h-36 bg-primary pt-10">
      <div className="grid grid-cols-2 px-40">
        <Image
          src="/logo.png"
          alt=""
          width={100}
          height={100}
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
          <Dialog>
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
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
              <DialogHeader className="flex items-center">
                <DialogTitle>
                  <Image src="/man-judge.png" alt={""} width={70} height={70} />
                </DialogTitle>
                <DialogDescription className="py-4 font-bold text-black text-[22px] text-center">
                  Hemos recibido tus datos. Mientras tanto, puedes ponerte en
                  contacto con nosotros si así lo prefieres.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <div className="flex flex-col items-center">
                  <Button className="w-[350px] bg-secondary text-[18px] rounded-md py-8">
                    Whatsapp
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
