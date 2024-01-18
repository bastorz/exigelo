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
    const updatedSelected = selected.filter((i) => i !== item);
    onChange(updatedSelected);
  };

  const asda = selected;

  console.log("asda", asda);

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
        <PopoverContent className="w-full p-0">
          <Command className={className}>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    const updatedSelected = selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value];
                    onChange(updatedSelected);
                  }}
                >
                  <FaCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      selected.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {selected.map((item) => item.length > 0) && (
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => (
            <Badge
              variant="secondary"
              key={item}
              className="mr-1 mb-1"
              onClick={() => handleUnselect(item)}
            >
              {item}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
      )}
    </>
  );
}

export default MultiSelect;
