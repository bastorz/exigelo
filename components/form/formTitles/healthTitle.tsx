import { BiSolidUserDetail } from "react-icons/bi";
import { FaCheck } from "react-icons/fa6";
import { HiMiniClipboardDocumentCheck } from "react-icons/hi2";

const HealthTitle = () => {
  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-3xl">
        Complete su información de salud
      </h2>
      <p className="text-xl max-w-5xl">
        Detalle su estado de salud después del accidente o atropello y obtenga
        un estimado de tu indemnización
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
        <span className="bg-slate-200 rounded-full">
          <HiMiniClipboardDocumentCheck className="w-16 h-16 p-4" />
        </span>
      </div>
    </div>
  );
};

export default HealthTitle;
