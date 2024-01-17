import Image from "next/image";
import { FaPhone } from "react-icons/fa6";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-2 place-content-center place-items-start h-20 bg-primary px-40 pt-10">
      <Image src="/logo.png" alt="" width={100} height={100} />
      <div className="flex space-x-4 w-full items-center justify-end">
        <Button
          variant="outline"
          className="border border-white text-white bg-primary text-[18px] h-14 w-48 hover:bg-primary/90"
        >
          <FaPhone className="mr-2" />
          Te llamamos
        </Button>
        <div className="w-48"></div>
      </div>
    </nav>
  );
};

export default Navbar;
