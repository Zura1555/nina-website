import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/Checkbox";

interface TodoBlockProps {
  checked: boolean;
  text: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function TodoBlock({
  checked,
  text,
  onChange,
  className,
}: TodoBlockProps) {
  return (
    <div className={cn("py-1", className)}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        label={text}
      />
    </div>
  );
}
