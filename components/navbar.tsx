import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { Button } from "./ui/button";

const Navbar = () => {
  const moneyBag = "\u{1F4B0}";

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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
