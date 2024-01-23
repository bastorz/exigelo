import { BiSolidUserDetail } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";

const AccidentTitle = () => {
  return (
    <div className="flex flex-col p-4">
      <h2 className="font-semibold text-3xl">
        Ingresa los datos del accidente
      </h2>
      <p className="text-xl max-w-5xl">
        Recuerda que los menores de 13 años también tienen derecho a recibir
        indemnización, incluso si son considerados culpables.
      </p>
      <div className="flex items-center justify-center py-10">
        <span className="bg-secondary rounded-full">
          <FaCheck className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-secondary w-48"></div>
        <span className="bg-slate-200 rounded-full">
          <BiSolidUserDetail className="w-16 h-16 p-4" />
        </span>
        <div className="h-[8px] bg-slate-200 w-48"></div>
        <span className="bg-slate-200 rounded-full">
          <HiMiniClipboardDocumentCheck className="w-16 h-16 p-4" />
        </span>
      </div>
    </div>
  );
};

export default AccidentTitle;
