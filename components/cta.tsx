import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  title: string;
  paragraph: string;
  firstButton: string;
  secondButton: string;
  image: string;
  reverse: boolean;
}

const CTA: React.FC<Props> = ({
  firstButton,
  paragraph,
  secondButton,
  title,
  image,
  reverse,
}) => {
  return (
    <div className="grid grid-cols-2 w-full place-content-end place-items-center py-28 pl-56">
      <div
        className={cn(
          "flex flex-col space-y-8 order-0 w-full",
          reverse && "order-1"
        )}
      >
        <h2 className="font-bold text-5xl max-w-3xl">{title}</h2>
        <p className="text-[22px] max-w-2xl">{paragraph}</p>
        <div className="flex space-x-6">
          <Button className="bg-secondary text-white py-3 px-5 h-[55px] font-semibold text-[18px] hover:bg-secondary/90 border-green">
            {firstButton}
          </Button>
          <Button
            variant="outline"
            className="bg-white text-black py-3 px-5 h-[55px] font-semibold border-black text-[18px] hover:bg-white/90"
          >
            {secondButton}
          </Button>
        </div>
      </div>
      <div className="w-full">
        <Image
          src={image}
          alt={"CTA image"}
          width={800}
          height={800}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CTA;
