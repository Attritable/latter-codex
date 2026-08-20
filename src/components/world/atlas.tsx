import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { scopeLabel, val } from "@/lib/wwn/world";
import type { Cell, WorldData } from "@/lib/wwn/types";
import { RegionMap } from "./map";
import { TagChip } from "./tag-chip";

function Note({ cell }: { cell?: Cell<string | number> }) {
  if (!cell?.notes) return null;
  return <p className="text-xs italic text-subtle">{cell.notes}</p>;
}

function Line({ label, cell }: { label?: string; cell: Cell }) {
  return (
    <div className="space-y-1">
      <p>
        {label ? <span className="text-fg">{label} </span> : null}
        {cell.value}
      </p>
      <Note cell={cell} />
    </div>
  );
}

export function WorldAtlas({ world }: { world: WorldData }) {
  return (
    <div className="space-y-6">
      <header className="border-b border-border pb-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-subtle">{scopeLabel(val(world.scope))}</p>
        <h1 className="mt-1 font-display text-4xl text-fg sm:text-5xl">{val(world.worldName) || "Unnamed world"}</h1>
        <p className="mt-2 text-muted">
          Region of first play: <span className="text-fg">{val(world.regionName)}</span>
        </p>
        <Note cell={world.worldName} />
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Region sketch</CardTitle>
        </CardHeader>
        <CardBody className="p-0">
          <RegionMap world={world} className="w-full" />
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>The world</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2">
            <Line label="Physics." cell={world.physics} />
            <Line label="Cosmology." cell={world.cosmology} />
            <Line label="Distant power." cell={world.empires} />
            <Line label="Travel." cell={world.interconnected} />
            <Line label="Recently." cell={world.recentEvent} />
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Gods of the region</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {world.gods.map((g) => (
              <div key={g.id} className="space-y-1">
                <p>
                  <span className="text-fg">{val(g.name)}</span> — {val(g.portfolio)}. {val(g.note)}
                </p>
                <p className="text-xs text-subtle">
                  {val(g.origin)} · {val(g.function)} · wants {val(g.want)}
                </p>
                <Note cell={g.note} />
              </div>
            ))}
          </CardBody>
        </Card>
      </div>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-fg">Terrain</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {world.features.map((f) => (
            <Card key={f.id}>
              <CardHeader>
                <CardTitle className="text-xl">{val(f.name)}</CardTitle>
              </CardHeader>
              <CardBody className="space-y-1">
                <Line cell={f.description} />
                <Line label="Danger:" cell={f.danger} />
                <Line label="Use:" cell={f.use} />
                <Line label="Last:" cell={f.lastEvent} />
                <Line label="People:" cell={f.population} />
                <Line label="Foe:" cell={f.antagonist} />
                <Line label="Quirk:" cell={f.quirk} />
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-fg">Nations</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {world.nations.map((n) => (
            <Card key={n.id}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-xl">{val(n.name)}</CardTitle>
                  <TagChip name={val(n.theme)} />
                </div>
              </CardHeader>
              <CardBody className="space-y-2">
                <Line cell={n.themeNote.value ? n.themeNote : n.blurb} />
                {(n.values ?? []).length > 0 && (
                  <div>
                    <p className="text-xs uppercase tracking-[0.12em] text-subtle">Values they esteem</p>
                    <ul className="mt-1 list-disc space-y-1 pl-4">
                      {n.values.map((v) => (
                        <li key={v.id}>
                          {v.value}
                          {v.notes ? <span className="block text-xs italic text-subtle">{v.notes}</span> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Line label="Wants" cell={n.wants} />
                <ul className="list-disc space-y-1 pl-4">
                  {n.history.map((h) => (
                    <li key={h.id}>
                      {h.value}
                      {h.notes ? <span className="block text-xs italic text-subtle">{h.notes}</span> : null}
                    </li>
                  ))}
                </ul>
                {val(n.dispute) ? <Line label="Dispute:" cell={n.dispute} /> : null}
                {val(n.tie) ? <Line label="Tie:" cell={n.tie} /> : null}
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Relationships</CardTitle>
        </CardHeader>
        <CardBody>
          <ul className="space-y-2">
            {world.relationships.map((r) => (
              <li key={r.id}>
                <span className="text-fg">
                  {val(r.from)} → {val(r.to)}.
                </span>{" "}
                {val(r.text)}
                <Note cell={r.text} />
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      <section className="space-y-3">
        <h2 className="font-display text-3xl text-fg">Kingdom of first play — {val(world.kingdom.name)}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Rule</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2">
              <p>
                <span className="text-fg">{val(world.kingdom.ruler)}.</span> {val(world.kingdom.rulerStyle)}
              </p>
              <Note cell={world.kingdom.ruler} />
              <Line label="Form." cell={world.kingdom.formOfRule} />
              <Line label="Who rules." cell={world.kingdom.rulerCount} />
              <Line label="Drawn from." cell={world.kingdom.rulingClass} />
              <Line label="Legitimacy." cell={world.kingdom.legitimacy} />
              <Line label="Enforced by." cell={world.kingdom.enforcers} />
              <Line label="Density." cell={world.kingdom.density} />
              <Line label="Stability." cell={world.kingdom.stability} />
              <Line label="Struggle." cell={world.kingdom.struggle} />
              <Line label="Enemy." cell={world.kingdom.enemy} />
              <Line label="Tongue." cell={world.kingdom.language} />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Society</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2">
              <Line label="Organized as." cell={world.kingdom.organization} />
              <Line label="Look." cell={world.kingdom.aesthetic} />
              <Line cell={world.kingdom.society} />
              <Line cell={world.kingdom.ethnicNotes} />
              {(world.kingdom.values ?? []).length > 0 && (
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] text-subtle">Values they esteem</p>
                  <ul className="mt-1 list-disc space-y-1 pl-4">
                    {world.kingdom.values.map((v) => (
                      <li key={v.id}>{v.value}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>This season</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2">
            <Line label="Fortune." cell={world.kingdom.fortune} />
            <ul className="list-disc space-y-1 pl-4">
              {world.kingdom.problems.map((p) => (
                <li key={p.id}>
                  {p.value}
                  {p.notes ? <span className="block text-xs italic text-subtle">{p.notes}</span> : null}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
          </CardHeader>
          <CardBody>
            <ol className="list-decimal space-y-1 pl-5">
              {world.kingdom.history.map((h) => (
                <li key={h.id}>
                  {h.value}
                  {h.notes ? <span className="block text-xs italic text-subtle">{h.notes}</span> : null}
                </li>
              ))}
            </ol>
          </CardBody>
        </Card>
        <div className="grid gap-3 md:grid-cols-3">
          {world.kingdom.cities.map((c) => (
            <Card key={c.id}>
              <CardHeader>
                <CardTitle className="text-xl">{val(c.name)}</CardTitle>
                <p className="text-xs uppercase tracking-[0.12em] text-subtle">{val(c.size)}</p>
              </CardHeader>
              <CardBody>
                <div className="mb-2 flex flex-wrap gap-1">
                  {c.tags.map((t) => (
                    <TagChip key={t.id} name={t.value} />
                  ))}
                </div>
                <Line cell={c.note} />
              </CardBody>
            </Card>
          ))}
        </div>
        {(world.kingdom.courts ?? []).length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {world.kingdom.courts.map((court) => (
              <Card key={court.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{val(court.name)}</CardTitle>
                  <p className="text-xs uppercase tracking-[0.12em] text-subtle">{val(court.type)}</p>
                </CardHeader>
                <CardBody className="space-y-2">
                  <Line cell={court.theme} />
                  <div className="flex flex-wrap gap-1">
                    {court.tags.map((t) => (
                      <TagChip key={t.id} name={t.value} />
                    ))}
                  </div>
                  <ul className="space-y-1 text-sm">
                    {court.figures.map((fig) => (
                      <li key={fig.id}>
                        <span className="text-fg">{val(fig.name)}</span> — {val(fig.role)}. {val(fig.power)}
                      </li>
                    ))}
                  </ul>
                  <Line label="Inside:" cell={court.internalConflict} />
                  <Line label="Outside:" cell={court.externalConflict} />
                  <Line cell={court.note} />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        {world.kingdom.localGods.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Local gods</CardTitle>
            </CardHeader>
            <CardBody className="space-y-2">
              {world.kingdom.localGods.map((g) => (
                <p key={g.id}>
                  <span className="text-fg">{val(g.name)}</span> — {val(g.portfolio)}. {val(g.note)}
                </p>
              ))}
            </CardBody>
          </Card>
        )}
        {(world.kingdom.ruins ?? []).length > 0 && (
          <div className="grid gap-3 md:grid-cols-2">
            {world.kingdom.ruins.map((ruin) => (
              <Card key={ruin.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{val(ruin.name)}</CardTitle>
                  <p className="text-xs uppercase tracking-[0.12em] text-subtle">{val(ruin.kind)}</p>
                </CardHeader>
                <CardBody className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {ruin.tags.map((t) => (
                      <TagChip key={t.id} name={t.value} />
                    ))}
                  </div>
                  <Line cell={ruin.note} />
                </CardBody>
              </Card>
            ))}
          </div>
        )}
        <Card>
          <CardHeader>
            <CardTitle>Wastelands</CardTitle>
          </CardHeader>
          <CardBody>
            <ul className="list-disc space-y-1 pl-4">
              {world.kingdom.wastelands.map((w) => (
                <li key={w.id}>
                  {w.value}
                  {w.notes ? <span className="block text-xs italic text-subtle">{w.notes}</span> : null}
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </section>

      {world.gazetteer && (
        <Card>
          <CardHeader>
            <CardTitle>Gazetteer</CardTitle>
          </CardHeader>
          <CardBody>
            <div className="space-y-3 whitespace-pre-wrap text-pretty leading-relaxed text-muted">{world.gazetteer}</div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
