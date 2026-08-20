import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout";
import { WorldEditor } from "@/components/world/editor";

type Search = { roll?: string };

export const Route = createFileRoute("/worlds/new")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    roll: s.roll == null || s.roll === false || s.roll === "" || s.roll === "0" ? undefined : String(s.roll),
  }),
  component: NewWorld,
});

function NewWorld() {
  return (
    <Shell wide>
      <WorldEditor />
    </Shell>
  );
}
