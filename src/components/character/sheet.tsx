import { Badge } from "@/components/ui/badge";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { ALL_SKILLS, ATTRIBUTE_LABELS, ATTRIBUTES, formatMod } from "@/lib/wwn/core";
import { derive } from "@/lib/wwn/character";
import { backgroundById } from "@/lib/wwn/backgrounds";
import { classById, traditionById } from "@/lib/wwn/classes";
import { focusById } from "@/lib/wwn/foci";
import { artById, spellById } from "@/lib/wwn/magic";
import type { CharacterData } from "@/lib/wwn/types";

export function CharacterRail({ data }: { data: CharacterData }) {
  const d = derive(data);
  return (
    <aside className="rounded-lg border border-border bg-surface p-4">
      <p className="font-display text-2xl leading-none text-fg">{data.name || "Unnamed"}</p>
      <p className="mt-1 text-xs text-muted">{d.label}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-center">
        <div>
          <p className="font-mono text-2xl text-fg">{data.hp}</p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">HP</p>
        </div>
        <div>
          <p className="font-mono text-2xl text-fg">{d.ac}</p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">AC</p>
        </div>
        <div>
          <p className="font-mono text-2xl text-fg">{d.attack >= 0 ? `+${d.attack}` : d.attack}</p>
          <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">Atk</p>
        </div>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
        <div className="flex justify-between gap-2">
          <dt className="text-subtle">Physical</dt>
          <dd className="font-mono text-fg">{d.saves.physical}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-subtle">Evasion</dt>
          <dd className="font-mono text-fg">{d.saves.evasion}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-subtle">Mental</dt>
          <dd className="font-mono text-fg">{d.saves.mental}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-subtle">Luck</dt>
          <dd className="font-mono text-fg">{d.saves.luck}</dd>
        </div>
      </dl>
      {d.effort !== null && (
        <p className="mt-3 text-sm text-muted">
          Effort {d.effort}
          {d.castPerDay ? ` · prep ${d.prepared} · cast ${d.castPerDay}` : ""}
        </p>
      )}
      <ul className="mt-3 space-y-0.5 text-xs text-muted">
        {Object.entries(data.skills)
          .filter(([, v]) => v !== undefined)
          .map(([k, v]) => (
            <li key={k}>
              {k}-{v}
            </li>
          ))}
      </ul>
    </aside>
  );
}

export function CharacterSheet({ data }: { data: CharacterData }) {
  const d = derive(data);
  const bg = backgroundById(data.backgroundId);
  const cls = classById(data.classId);

  return (
    <div className="space-y-5">
      <header className="border-b border-border pb-5">
        <p className="text-[11px] uppercase tracking-[0.22em] text-subtle">First-level hero</p>
        <h1 className="mt-1 font-display text-4xl text-fg sm:text-5xl">{data.name || "Unnamed"}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge>{d.label}</Badge>
          <Badge>{bg?.name ?? data.backgroundId}</Badge>
          <Badge>
            HP {data.hp} · AC {d.ac} · Atk {d.attack >= 0 ? `+${d.attack}` : d.attack}
          </Badge>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {ATTRIBUTES.map((a) => (
          <div key={a} className="rounded-md border border-border bg-surface px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.16em] text-subtle">{ATTRIBUTE_LABELS[a]}</p>
            <p className="mt-1 font-mono text-2xl text-fg">
              {data.attributes[a]}{" "}
              <span className="text-base text-muted">{formatMod(d.modifiers[a])}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Combat</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2 text-fg">
            <p>
              Hit points {data.hp} <span className="text-muted">({d.hitDie} + Con, min 1)</span>
            </p>
            <p>Armor Class {d.ac} — {data.armorName}{data.shieldBonus ? `, shield +${data.shieldBonus}` : ""}</p>
            <p>System Strain {d.systemStrain}</p>
            <div className="grid grid-cols-2 gap-2 pt-2 text-sm">
              <span>Physical {d.saves.physical}</span>
              <span>Evasion {d.saves.evasion}</span>
              <span>Mental {d.saves.mental}</span>
              <span>Luck {d.saves.luck}</span>
            </div>
            {d.weapons.length > 0 && (
              <ul className="mt-3 space-y-1 border-t border-border pt-3">
                {d.weapons.map((w) => (
                  <li key={w.name}>
                    <span className="text-fg">{w.name}</span>{" "}
                    <span className="text-muted">
                      hit {w.hit}, {w.damage}
                      {w.shock ? `, Shock ${w.shock}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Class</CardTitle>
          </CardHeader>
          <CardBody className="space-y-2">
            <p className="text-fg">{cls.blurb}</p>
            {cls.abilities.map((a) => (
              <p key={a.name}>
                <span className="text-fg">{a.name}.</span> {a.text}
              </p>
            ))}
            {data.traditions.map((id) => {
              const t = traditionById(id);
              return t ? (
                <p key={id}>
                  <span className="text-fg">{t.name}.</span> {t.restriction}
                </p>
              ) : null;
            })}
            {d.effort !== null && (
              <p className="text-fg">
                Effort {d.effort}
                {d.castPerDay ? ` · prepare ${d.prepared}, cast ${d.castPerDay}/day` : " · arts only"}
              </p>
            )}
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3">
            {ALL_SKILLS.map((s) => {
              const lv = data.skills[s];
              return (
                <div key={s} className={lv === undefined ? "text-subtle" : "text-fg"}>
                  {s} <span className="font-mono">{lv === undefined ? "—" : lv}</span>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Foci</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            {data.foci.map((f, i) => {
              const def = focusById(f.id);
              const text = def?.levels.find((l) => l.level === f.level)?.text;
              return (
                <p key={`${f.id}-${i}`}>
                  <span className="text-fg">
                    {def?.name ?? f.id} {f.level}
                    {f.notes ? ` (${f.notes})` : ""}
                  </span>
                  {text ? ` — ${text}` : ""}
                </p>
              );
            })}
          </CardBody>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Purpose</CardTitle>
          </CardHeader>
          <CardBody className="space-y-3">
            <p>
              <span className="text-fg">Goal.</span> {data.goal || "—"}
            </p>
            <p>
              <span className="text-fg">Ties.</span> {data.ties || "—"}
            </p>
            <p>
              <span className="text-fg">Languages.</span> {data.languages.join(", ")}
            </p>
          </CardBody>
        </Card>
      </div>

      {(data.spells.length > 0 || data.arts.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.spells.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Spells known</CardTitle>
              </CardHeader>
              <CardBody className="space-y-2">
                {data.spells.map((id) => {
                  const s = spellById(id);
                  return (
                    <p key={id}>
                      <span className="text-fg">{s?.name ?? id}.</span> {s?.summary}
                    </p>
                  );
                })}
              </CardBody>
            </Card>
          )}
          {data.arts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Arts</CardTitle>
              </CardHeader>
              <CardBody className="space-y-2">
                {data.arts.map((id) => {
                  const a = artById(id);
                  return (
                    <p key={id}>
                      <span className="text-fg">{a?.name ?? id}.</span> {a?.summary}
                    </p>
                  );
                })}
              </CardBody>
            </Card>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Kit</CardTitle>
        </CardHeader>
        <CardBody>
          <p className="mb-2 text-fg">{data.silver} silver pieces</p>
          <ul className="columns-1 gap-6 sm:columns-2">
            {data.gear.map((g) => (
              <li key={g} className="break-inside-avoid">
                {g}
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
    </div>
  );
}
