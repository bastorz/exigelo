import * as React from "react";
import { cn } from "@/lib/utils";

import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { HiChevronUpDown } from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { injuries } from "@/constants";

export type OptionType = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  options: OptionType[];
  selected: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
  className?: string;
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    const updatedSelected = selected
      .reduce((acc, val: any) => acc.concat(val), [])
      .filter((i) => i !== item);
    onChange(updatedSelected);
  };

  console.log("selected", selected);
  return (
    <>
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${
              selected.length > 1 ? "h-full" : "h-10"
            }`}
            onClick={() => setOpen(!open)}
          >
            Elige las lesiones...
            <HiChevronUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <Command className={className}>
            <CommandGroup className="max-h-64 overflow-auto">
              {injuries.map((injury) => (
                <CommandItem
                  key={injury.value}
                  onSelect={() => {
                    onChange(
                      selected.includes(injury.value)
                        ? selected.filter((item) => item !== injury.value)
                        : [...selected, injury.value]
                    );
                    setOpen(true);
                  }}
                >
                  <FaCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(injury.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {injury.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex w-full items-center justify-center space-x-4">
        {selected.length > 0 &&
          selected.map((item) => (
            <Badge
              variant="secondary"
              key={item}
              className="mr-1 mb-1 bg-gray-100 rounded-lg w-full flex items-center justify-center p-3"
              onClick={() => handleUnselect(item)}
            >
              {item}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 "
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUnselect(item);
                  }
                }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() => handleUnselect(item)}
              >
                <RxCross1 className="h-3 w-3 text-muted-foreground hover:tºext-foreground" />
              </button>
            </Badge>
          ))}
      </div>
    </>
  );
}

export default MultiSelect;
