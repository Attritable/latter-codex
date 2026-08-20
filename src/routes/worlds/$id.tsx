import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Feather, Loader2, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { WorldAtlas } from "@/components/world/atlas";
import { WorldEditor } from "@/components/world/editor";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { deleteWorld, getWorld, saveWorld } from "@/lib/server/codex";
import { writeGazetteer } from "@/lib/server/gazetteer";
import type { WorldRecord } from "@/lib/wwn/types";
import { normalizeWorld } from "@/lib/wwn/world";

export const Route = createFileRoute("/worlds/$id")({ component: WorldPage });

function WorldPage() {
  const { id } = Route.useParams();
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [record, setRecord] = useState<WorldRecord | null | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [gazing, setGazing] = useState(false);

  useEffect(() => {
    if (isPending) return;
    if (!user) {
      setRecord(null);
      return;
    }
    void getWorld({ data: id })
      .then((row) => {
        if (!row) {
          setRecord(null);
          return;
        }
        setRecord({ ...row, data: normalizeWorld(row.data) });
      })
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
        <p className="text-muted">No world by that mark in your book.</p>
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
          <Pencil className="size-4" /> {editing ? "View atlas" : "Edit"}
        </Button>
        <Button
          type="button"
          variant="ink"
          disabled={gazing}
          onClick={() => {
            setGazing(true);
            void writeGazetteer({ data: { world: record.data } })
              .then(async (res) => {
                if (!res.ok) {
                  toast.error(res.error);
                  return;
                }
                const next = { ...record.data, gazetteer: res.text };
                await saveWorld({ data: { id: record.id, data: next } });
                setRecord({ ...record, data: next });
                toast.success("Gazetteer written.");
              })
              .finally(() => setGazing(false));
          }}
        >
          {gazing ? <Loader2 className="size-4 animate-spin" /> : <Feather className="size-4" />}
          Gazetteer
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            void deleteWorld({ data: id }).then(() => {
              toast("World struck from the book.");
              navigate({ to: "/" });
            });
          }}
        >
          <Trash2 className="size-4" /> Delete
        </Button>
      </div>
      {editing ? <WorldEditor initial={record.data} recordId={record.id} /> : <WorldAtlas world={record.data} />}
    </Shell>
  );
}
