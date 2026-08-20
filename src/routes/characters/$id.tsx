import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CharacterEditor } from "@/components/character/editor";
import { CharacterSheet } from "@/components/character/sheet";
import { Shell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { deleteCharacter, getCharacter } from "@/lib/server/codex";
import type { CharacterRecord } from "@/lib/wwn/types";

export const Route = createFileRoute("/characters/$id")({ component: CharacterPage });

function CharacterPage() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [record, setRecord] = useState<CharacterRecord | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setRecord(null);
      return;
    }
    void getCharacter({ data: id })
      .then(setRecord)
      .catch(() => setRecord(null));
  }, [id, isPending, user]);

  if (isPending || record === undefined) {
    return (
      <Shell>
        <div className="h-64 animate-pulse rounded-lg bg-surface" />
      </Shell>
    );
  }
  if (!user) return <RedirectToSignIn />;
  if (!record) {
    return (
      <Shell>
        <p className="text-muted">No hero by that mark in your book.</p>
        <Link to="/" className="mt-4 inline-block text-sm text-ink hover:text-fg">
          Return to the library
        </Link>
      </Shell>
    );
  }

  return (
    <Shell wide>
      <div className="mb-6 flex flex-wrap gap-2">
        <Button type="button" variant="outline" onClick={() => setEditing((v) => !v)}>
          <Pencil className="size-4" /> {editing ? "View sheet" : "Edit"}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            void deleteCharacter({ data: id }).then(() => {
              toast("Hero struck from the book.");
              navigate({ to: "/" });
            });
          }}
        >
          <Trash2 className="size-4" /> Delete
        </Button>
      </div>
      {editing ? <CharacterEditor initial={record.data} recordId={record.id} /> : <CharacterSheet data={record.data} />}
    </Shell>
  );
}
