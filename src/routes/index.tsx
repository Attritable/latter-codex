import { Link, useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Compass, Dices, Plus, ScrollText, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Shell } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { deleteCharacter, deleteWorld, listCharacters, listWorlds, saveCharacter, saveWorld } from "@/lib/server/codex";
import { formatDate } from "@/lib/utils";
import { generateCharacter } from "@/lib/wwn/character";
import { classLabel } from "@/lib/wwn/core";
import type { CharacterRecord, WorldRecord } from "@/lib/wwn/types";
import { generateWorld } from "@/lib/wwn/world";
import { consumeReturnPath } from "@/lib/drafts";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [heroes, setHeroes] = useState<CharacterRecord[] | null>(null);
  const [worlds, setWorlds] = useState<WorldRecord[] | null>(null);

  const refresh = () => {
    if (!user) {
      setHeroes([]);
      setWorlds([]);
      return;
    }
    void listCharacters()
      .then(setHeroes)
      .catch(() => setHeroes([]));
    void listWorlds()
      .then(setWorlds)
      .catch(() => setWorlds([]));
  };

  useEffect(() => {
    if (isPending) return;
    refresh();
    if (user) {
      const dest = consumeReturnPath();
      if (dest !== "/") {
        const world = /^\/worlds\/([^/?#]+)/.exec(dest);
        const hero = /^\/characters\/([^/?#]+)/.exec(dest);
        if (dest.startsWith("/worlds/new")) void navigate({ to: "/worlds/new" });
        else if (dest.startsWith("/characters/new")) void navigate({ to: "/characters/new" });
        else if (world?.[1]) void navigate({ to: "/worlds/$id", params: { id: world[1] } });
        else if (hero?.[1]) void navigate({ to: "/characters/$id", params: { id: hero[1] } });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending, user?.id]);

  const quickHero = async () => {
    const data = generateCharacter();
    if (!user) {
      toast("Sign in to keep a generated hero. Opening the workshop with a draft.");
      navigate({ to: "/characters/new", search: { roll: "1" } });
      return;
    }
    const res = await saveCharacter({ data: { data } });
    toast.success(`${data.name} is ready.`);
    navigate({ to: "/characters/$id", params: { id: res.id } });
  };

  const quickWorld = async () => {
    const data = generateWorld();
    if (!user) {
      toast("Sign in to keep a generated world. Opening the workshop with a draft.");
      navigate({ to: "/worlds/new", search: { roll: "1" } });
      return;
    }
    const res = await saveWorld({ data: { data } });
    toast.success(`${data.worldName.value} is charted.`);
    navigate({ to: "/worlds/$id", params: { id: res.id } });
  };

  return (
    <Shell>
      <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-subtle">Worlds Without Number</p>
          <h1 className="mt-2 font-display text-5xl leading-[0.95] text-fg sm:text-6xl">
            Heroes of a twilight age, and the maps they inherit.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-muted">
            Roll a legal first-level adventurer or build a campaign from world to region to kingdom. Keep both in a private library.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row lg:justify-end">
          <Button type="button" onClick={() => void quickHero()}>
            <Dices className="size-4" /> Quick hero
          </Button>
          <Button type="button" variant="outline" onClick={() => void quickWorld()}>
            <Compass className="size-4" /> Quick world
          </Button>
        </div>
      </section>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl text-fg">Heroes</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/characters/new">
                <Plus className="size-4" /> New
              </Link>
            </Button>
          </div>
          {heroes === null || isPending ? (
            <div className="h-40 animate-pulse rounded-lg bg-surface" />
          ) : heroes.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">No names in the book</CardTitle>
              </CardHeader>
              <CardBody>
                <p>Forge a warrior, expert, mage, or adventurer pairing. Guests can generate; signed-in users keep the sheet.</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/characters/new">
                    <ScrollText className="size-4" /> Open the workshop
                  </Link>
                </Button>
              </CardBody>
            </Card>
          ) : (
            <ul className="space-y-2">
              {heroes.map((h) => (
                <li key={h.id}>
                  <article className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3">
                    <Link to="/characters/$id" params={{ id: h.id }} className="min-w-0 flex-1">
                      <p className="truncate text-fg">{h.name}</p>
                      <p className="truncate text-xs text-muted">
                        {h.class_label || classLabel(h.data.classId, h.data.traditions)} · updated {formatDate(h.updated_at)}
                      </p>
                    </Link>
                    <button
                      type="button"
                      className="grid size-11 place-items-center text-subtle hover:text-danger"
                      aria-label={`Delete ${h.name}`}
                      onClick={() => {
                        void deleteCharacter({ data: h.id }).then(() => {
                          setHeroes((list) => list?.filter((x) => x.id !== h.id) ?? []);
                          toast("Hero struck from the book.");
                        });
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-3xl text-fg">Worlds</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/worlds/new">
                <Plus className="size-4" /> New
              </Link>
            </Button>
          </div>
          {worlds === null || isPending ? (
            <div className="h-40 animate-pulse rounded-lg bg-surface" />
          ) : worlds.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">No maps folded here</CardTitle>
              </CardHeader>
              <CardBody>
                <p>Build from physics down to the kingdom of first play — terrain, nations, grudges, and a schematic region.</p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/worlds/new">
                    <Compass className="size-4" /> Open the atlas
                  </Link>
                </Button>
              </CardBody>
            </Card>
          ) : (
            <ul className="space-y-2">
              {worlds.map((w) => (
                <li key={w.id}>
                  <article className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3">
                    <Link to="/worlds/$id" params={{ id: w.id }} className="min-w-0 flex-1">
                      <p className="truncate text-fg">{w.name}</p>
                      <p className="truncate text-xs text-muted">
                        {w.region} · {formatDate(w.updated_at)}
                      </p>
                    </Link>
                    <button
                      type="button"
                      className="grid size-11 place-items-center text-subtle hover:text-danger"
                      aria-label={`Delete ${w.name}`}
                      onClick={() => {
                        void deleteWorld({ data: w.id }).then(() => {
                          setWorlds((list) => list?.filter((x) => x.id !== w.id) ?? []);
                          toast("World struck from the book.");
                        });
                      }}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Shell>
  );
}
