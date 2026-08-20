import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout";
import { CharacterEditor } from "@/components/character/editor";

type Search = { roll?: string };

export const Route = createFileRoute("/characters/new")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    roll: s.roll == null || s.roll === false || s.roll === "" || s.roll === "0" ? undefined : String(s.roll),
  }),
  component: NewCharacter,
});

function NewCharacter() {
  const { roll } = Route.useSearch();
  return (
    <Shell wide>
      <CharacterEditor roll={Boolean(roll)} />
    </Shell>
  );
}
