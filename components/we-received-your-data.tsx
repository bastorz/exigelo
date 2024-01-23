import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

export function DialogDemo() {
  const asdas = "";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="bg-secondary text-white font-semibold text-[18px]"
        >
          Solicitar llamada
          <FaArrowRight className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-[1000px] flex flex-col items-center">
        <DialogHeader className="flex items-center">
          <DialogTitle>
            <Image src="/man-judge.png" alt={""} width={70} height={70} />
          </DialogTitle>
          <DialogDescription className="py-4 font-bold text-black text-[18px] text-center">
            Hemos recibido tus datos. Mientras tanto, puedes ponerte en contacto
            con nosotros si así lo prefieres.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-col items-center">
            <Button className="w-[350px] bg-secondary text-[18px] rounded-md py-8">
              Whatsapp
              <FaArrowRight className="ml-2" />
            </Button>
            <p className="font-bold text-[18px] pt-8">Exígelo</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
