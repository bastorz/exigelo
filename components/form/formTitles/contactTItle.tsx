import { BiSolidUserDetail } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";

const ContactTitle = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-3xl">
        Último paso: ¡tus datos de contacto!
      </h2>
      <p className="text-xl max-w-5xl">
        Casi listo. Solo necesitamos tu información de contacto para
        proporcionarle tu estimación personalizada de indemnización.
      </p>
      <div className="flex items-center justify-center py-10">
        <span className="bg-secondary rounded-full">
          <FaCheck className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-secondary rounded-full">
          <BiSolidUserDetail className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-secondary rounded-full">
          <HiMiniClipboardDocumentCheck className="w-16 h-16 p-4" />
        </span>
      </div>
    </div>
  );
};

export default ContactTitle;
