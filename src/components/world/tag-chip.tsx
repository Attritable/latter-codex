import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { tagBlurb } from "@/lib/wwn/tags";

export function TagChip({ name, className }: { name: string; className?: string }) {
  const blurb = tagBlurb(name);
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <span className={cn("group relative inline-flex max-w-full", className)}>
      <button
        type="button"
        className="inline-flex max-w-full items-center rounded-sm border border-line bg-raised px-2 py-0.5 text-left text-[11px] uppercase tracking-[0.12em] text-muted hover:border-ink hover:text-fg"
        aria-describedby={blurb ? id : undefined}
        onClick={() => blurb && setOpen((v) => !v)}
        onBlur={() => setOpen(false)}
      >
        <span className="truncate">{name}</span>
      </button>
      {blurb ? (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "absolute left-0 top-full z-30 mt-1 w-64 rounded-md border border-line bg-raised px-3 py-2 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-muted shadow-[var(--shadow-border)]",
            open ? "visible opacity-100" : "invisible opacity-0 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100",
          )}
        >
          {blurb}
        </span>
      ) : null}
    </span>
  );
}
