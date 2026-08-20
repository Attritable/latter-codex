import { Dices, Lock, LockOpen, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Cell } from "@/lib/wwn/types";
import { setCellValue, setNotes, toggleLock } from "@/lib/wwn/world";

function IconBtn({
  label,
  onClick,
  disabled,
  active,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative grid size-11 place-items-center rounded-md text-subtle transition-colors",
        "hover:bg-raised hover:text-fg disabled:pointer-events-none disabled:opacity-30",
        active && "text-ink",
      )}
    >
      {children}
    </button>
  );
}

export function RollField<T extends string | number>({
  label,
  cell,
  onChange,
  onRoll,
  multiline,
  table,
  options,
  hint,
}: {
  label: string;
  cell: Cell<T>;
  onChange: (next: Cell<T>) => void;
  onRoll?: () => void;
  multiline?: boolean;
  table?: readonly string[];
  options?: readonly { value: string; label: string }[];
  hint?: string;
}) {
  const numeric = typeof cell.value === "number";
  const selectOptions = options ?? table?.map((row) => ({ value: row, label: row }));
  return (
    <div
      className={cn(
        "rounded-md border bg-surface p-3 shadow-[var(--shadow-border)] transition-[box-shadow,border-color]",
        cell.locked ? "border-ink/40" : "border-border",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted">{label}</span>
        <div className="-mr-1 flex">
          <IconBtn
            label={cell.locked ? "Unlock" : "Lock"}
            active={cell.locked}
            onClick={() => onChange(toggleLock(cell))}
          >
            {cell.locked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
          </IconBtn>
          {onRoll ? (
            <IconBtn label={`Reroll ${label}`} disabled={cell.locked} onClick={onRoll}>
              <Dices className="size-4" />
            </IconBtn>
          ) : null}
        </div>
      </div>
      {selectOptions ? (
        <select
          className="mb-2 h-11 w-full rounded-md border border-line bg-raised px-3 text-sm text-fg"
          value={String(cell.value)}
          disabled={cell.locked}
          onChange={(e) => onChange(setCellValue(cell, e.target.value as T))}
        >
          {!selectOptions.some((row) => row.value === String(cell.value)) && (
            <option value={String(cell.value)}>{String(cell.value)}</option>
          )}
          {selectOptions.map((row) => (
            <option key={row.value} value={row.value}>
              {row.label}
            </option>
          ))}
        </select>
      ) : null}
      {multiline ? (
        <textarea
          value={String(cell.value)}
          disabled={cell.locked && !onRoll}
          onChange={(e) => onChange(setCellValue(cell, e.target.value as T))}
          rows={3}
          className="min-h-20 w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      ) : (
        <input
          type={numeric ? "number" : "text"}
          value={cell.value}
          disabled={cell.locked && numeric}
          onChange={(e) => {
            const next = numeric ? (Number(e.target.value) as T) : (e.target.value as T);
            onChange(setCellValue(cell, next));
          }}
          className="h-11 w-full rounded-md border border-line bg-raised px-3 text-sm text-fg placeholder:text-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        />
      )}
      {hint ? <p className="mt-2 text-xs leading-relaxed text-muted">{hint}</p> : null}
      <input
        type="text"
        value={cell.notes}
        onChange={(e) => onChange(setNotes(cell, e.target.value))}
        placeholder="Notes"
        className="mt-2 w-full border-0 bg-transparent px-0 text-xs text-muted placeholder:text-subtle focus-visible:outline-none"
      />
    </div>
  );
}

export function EntityShell({
  title,
  locked,
  onToggleLock,
  onReroll,
  onRemove,
  children,
}: {
  title: string;
  locked: boolean;
  onToggleLock: () => void;
  onReroll: () => void;
  onRemove?: () => void;
  children: ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border bg-surface p-4 shadow-[var(--shadow-border)]",
        locked ? "border-ink/40" : "border-border",
      )}
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-display text-xl text-fg">{title}</h3>
        <div className="-mr-1 flex">
          <IconBtn label={locked ? "Unlock this entry" : "Lock this entry"} active={locked} onClick={onToggleLock}>
            {locked ? <Lock className="size-4" /> : <LockOpen className="size-4" />}
          </IconBtn>
          <IconBtn label="Reroll unlocked fields" disabled={locked} onClick={onReroll}>
            <Dices className="size-4" />
          </IconBtn>
          {onRemove ? (
            <IconBtn label="Remove" onClick={onRemove}>
              <Trash2 className="size-4" />
            </IconBtn>
          ) : null}
        </div>
      </header>
      <div className="grid gap-3 md:grid-cols-2">{children}</div>
    </section>
  );
}

export function SectionBar({
  title,
  onReroll,
  extra,
}: {
  title: string;
  onReroll: () => void;
  extra?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <h2 className="font-display text-3xl text-fg">{title}</h2>
      <div className="flex flex-wrap gap-2">
        {extra}
        <button
          type="button"
          onClick={onReroll}
          className="inline-flex h-11 items-center gap-2 rounded-md border border-line px-3 text-sm text-fg hover:bg-raised"
        >
          <Dices className="size-4" />
          Reroll unlocked
        </button>
      </div>
    </div>
  );
}
