import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { Button } from "./ui/button";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-primary px-40 pt-20 ">
      <div className="grid grid-cols-8 pb-40 ">
        <div className="col-span-4 space-y-4">
          <Image src="/logo.png" alt="" width={160} height={160} />
          <div className="space-x-4">
            <Button
              variant="default"
              className="bg-secondary hover:bg-secondary/90 py-6"
            >
              <Link href="https://github.com/nextui-org/nextui" color="primary">
                <FaFacebookF className="w-8 h-8" />
              </Link>
            </Button>
            <Button
              variant="default"
              className="bg-secondary hover:bg-secondary/90 py-6"
            >
              <Link href="https://github.com/nextui-org/nextui" color="primary">
                <FaInstagram className="w-8 h-8" />
              </Link>
            </Button>
            <Button
              variant="default"
              className="bg-secondary hover:bg-secondary/90 py-6"
            >
              <Link href="https://github.com/nextui-org/nextui" color="primary">
                <FaLinkedinIn className="w-8 h-8" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-semibold text-2xl pb-4">
            Sobre nosotros
          </h4>
          <Link href="/" className="text-gray-300 cursor-pointer text-xl">
            Equipo
          </Link>
          <Link href="/" className="text-gray-300 cursor-pointer text-xl">
            Quienes somos
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <h4 className="text-white font-semibold text-2xl pb-4">Exígelo</h4>
          <Link href="/" className="text-gray-300 cursor-pointer text-xl">
            Terminos y condiciones
          </Link>
          <Link href="/" className="text-gray-300 cursor-pointer text-xl">
            Política de privacidad
          </Link>
        </div>
        <div className="flex flex-col space-y-4 pl-10">
          <h4 className="text-white font-semibold text-2xl pb-4">
            Contáctanos
          </h4>
          <Link href="/" className="text-gray-300 cursor-pointer text-xl">
            Contacto
          </Link>
          <Link href="/" className="text-gray-300 cursor-pointer text-xl">
            Email
          </Link>
        </div>
      </div>
      <div className="h-[1px] bg-white/80"></div>
      <div className="flex items-center justify-center space-x-2">
        <p className="text-white text-lg text-center py-10">
          Copyright © 2023 Exígelo | Todos los derechos reservados |
        </p>
        <Link
          href="/"
          className="text-white text-lg text-center py-10 underline cursor-default"
        >
          <p className="cursor-pointer">Terms and Conditions</p>
        </Link>
        <p className="text-white text-lg text-center py-10">|</p>
        <Link
          href="/"
          className="text-white text-lg text-center py-10 underline cursor-default"
        >
          <p className="cursor-pointer"> Privacy Policy</p>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
