import { pick, pickN, uid } from "@/lib/utils";
import type {
  Cell,
  City,
  Court,
  CourtFigure,
  God,
  Kingdom,
  Nation,
  Relationship,
  Ruin,
  TerrainFeature,
  WorldData,
  WorldSection,
} from "./types";
import {
  AESTHETICS,
  ANTAGONISTS,
  CITY_SIZES,
  COMMUNITY_TAGS,
  COSMOLOGY,
  COURT_EXTERNAL,
  COURT_FIGURE_ROLES,
  COURT_INTERNAL,
  COURT_TAG_NAMES,
  COURT_THEMES,
  COURT_TYPES,
  COURT_POWERS,
  DANGER,
  DENSITIES,
  DISPUTES,
  EMPIRES,
  ENEMIES,
  ENFORCERS,
  FORTUNES,
  FORMS_OF_RULE,
  GOD_FUNCTIONS,
  GOD_ORIGINS,
  GOD_WANTS,
  HISTORY,
  INTERCONNECT,
  LAST_EVENTS,
  LEGITIMACY,
  NATION_THEMES,
  ORGANIZATIONS,
  PHYSICS,
  POPULATION,
  PROBLEMS,
  QUIRKS,
  RECENT_EVENTS,
  RUIN_KINDS,
  RUIN_TAG_NAMES,
  RULER_COUNTS,
  RULER_STYLES,
  RULING_CLASSES,
  SCOPES,
  SOCIETIES,
  STABILITIES,
  STRUGGLES,
  TERRAIN,
  TIES,
  USES,
  VALUES,
  WANTS,
} from "./world-tables";
import { TONGUES, godName, personName, placeName, regionName, worldName, type Tongue } from "./names";

export function cell<T>(value: T, prev?: Partial<Cell<T>>): Cell<T> {
  return {
    id: prev?.id ?? uid(),
    value,
    locked: prev?.locked ?? false,
    notes: prev?.notes ?? "",
  };
}

export function keep<T>(prev: Cell<T> | undefined, roll: () => T): Cell<T> {
  if (prev?.locked) return prev;
  return cell(roll(), { id: prev?.id, notes: prev?.notes, locked: false });
}

export function setCellValue<T>(prev: Cell<T>, value: T): Cell<T> {
  return { ...prev, value };
}

export function toggleLock<T>(prev: Cell<T>): Cell<T> {
  return { ...prev, locked: !prev.locked };
}

export function setNotes<T>(prev: Cell<T>, notes: string): Cell<T> {
  return { ...prev, notes };
}

export function val<T>(c: Cell<T> | T | undefined | null, fallback?: T): T {
  if (c && typeof c === "object" && "value" in c) return (c as Cell<T>).value;
  if (c === undefined || c === null) return fallback as T;
  return c as T;
}

function isCellLike(x: unknown): x is Cell<unknown> {
  return Boolean(x) && typeof x === "object" && x !== null && "value" in x;
}

function asCell(x: unknown, fallback = ""): Cell {
  if (isCellLike(x)) {
    return {
      id: typeof x.id === "string" ? x.id : uid(),
      value: x.value == null ? fallback : String(x.value),
      locked: Boolean(x.locked),
      notes: typeof x.notes === "string" ? x.notes : "",
    };
  }
  if (typeof x === "string") return cell(x);
  return cell(fallback);
}

function asNumCell(x: unknown, fallback: number): Cell<number> {
  if (isCellLike(x)) {
    const n = typeof x.value === "number" ? x.value : Number(x.value);
    return {
      id: typeof x.id === "string" ? x.id : uid(),
      value: Number.isFinite(n) ? n : fallback,
      locked: Boolean(x.locked),
      notes: typeof x.notes === "string" ? x.notes : "",
    };
  }
  if (typeof x === "number" && Number.isFinite(x)) return cell(x);
  return cell(fallback);
}

function asCellList(x: unknown, fallback: string[] = []): Cell[] {
  if (!Array.isArray(x)) return fallback.map((v) => cell(v));
  return x.map((item) => (typeof item === "string" ? cell(item) : asCell(item)));
}

export function formatHistory(entry: { name: string; note: string } = pick(HISTORY)): string {
  return `${entry.name} — ${entry.note}`;
}

export const rolls = {
  physics: () => pick(PHYSICS),
  cosmology: () => pick(COSMOLOGY),
  empires: () => pick(EMPIRES),
  interconnected: () => pick(INTERCONNECT),
  recentEvent: () => pick(RECENT_EVENTS),
  danger: () => pick(DANGER),
  use: () => pick(USES),
  lastEvent: () => pick(LAST_EVENTS),
  population: () => pick(POPULATION),
  antagonist: () => pick(ANTAGONISTS),
  quirk: () => pick(QUIRKS),
  wants: () => pick(WANTS),
  dispute: () => pick(DISPUTES),
  tie: () => pick(TIES),
  history: () => formatHistory(pick(HISTORY)),
  rulerStyle: () => pick(RULER_STYLES),
  rulerCount: () => pick(RULER_COUNTS),
  rulingClass: () => pick(RULING_CLASSES),
  legitimacy: () => pick(LEGITIMACY),
  enforcers: () => pick(ENFORCERS),
  struggle: () => pick(STRUGGLES),
  enemy: () => pick(ENEMIES),
  problems: () => pick(PROBLEMS),
  fortune: () => pick(FORTUNES),
  society: () => pick(SOCIETIES),
  origin: () => pick(GOD_ORIGINS),
  function: () => pick(GOD_FUNCTIONS),
  want: () => pick(GOD_WANTS),
  communityTag: () => pick(COMMUNITY_TAGS),
  courtTag: () => pick(COURT_TAG_NAMES),
  ruinTag: () => pick(RUIN_TAG_NAMES),
  citySize: () => pick(CITY_SIZES),
  terrain: () => pick(TERRAIN),
  theme: () => pick(NATION_THEMES),
  value: () => pick(VALUES),
  organization: () => pick(ORGANIZATIONS),
  aesthetic: () => pick(AESTHETICS),
  density: () => pick(DENSITIES),
  stability: () => pick(STABILITIES),
  formOfRule: () => pick(FORMS_OF_RULE),
  courtType: () => pick(COURT_TYPES),
  courtTheme: () => pick(COURT_THEMES),
  courtRole: () => pick(COURT_FIGURE_ROLES),
  courtPower: () => pick(COURT_POWERS),
  courtInternal: () => pick(COURT_INTERNAL),
  courtExternal: () => pick(COURT_EXTERNAL),
  ruinKind: () => pick(RUIN_KINDS),
  oceans: () => (Math.random() < 0.25 ? 4 : 1 + Math.floor(Math.random() * 3)),
  rivers: () => 2 + Math.floor(Math.random() * 4),
  lakes: () => 1 + Math.floor(Math.random() * 3),
  worldName: () => worldName(),
  person: (tongue: Tongue) => personName(tongue),
  place: (tongue: Tongue) => placeName(tongue),
  region: (tongue: Tongue) => regionName(tongue),
};

export function tongueOf(world?: WorldData): Tongue {
  const name = world ? val(world.kingdom.language, "") : "";
  return TONGUES.find((t) => t.name === name) ?? pick(TONGUES);
}

export function secondTongue(primary: Tongue): Tongue {
  return pick(TONGUES.filter((t) => t.id !== primary.id));
}

function rollHistory(): string {
  return formatHistory(pick(HISTORY));
}

function twoValues(prev?: Cell[]): Cell[] {
  const picked = pickN(VALUES, 2);
  return [
    keep(prev?.[0], () => picked[0] ?? pick(VALUES)),
    keep(prev?.[1], () => {
      const first = prev?.[0]?.locked ? prev[0].value : picked[0];
      return picked.find((v) => v !== first) ?? pick(VALUES.filter((v) => v !== first));
    }),
  ];
}

export function rollTerrainFeature(tongue: Tongue, prev?: TerrainFeature): TerrainFeature {
  if (prev?.locked) return prev;
  const picked = prev?.terrainId.locked
    ? (TERRAIN.find((t) => t.id === prev.terrainId.value || t.name === prev.terrainId.value) ?? pick(TERRAIN))
    : pick(TERRAIN);
  const terrainId = keep(prev?.terrainId, () => picked.name);
  const used = TERRAIN.find((t) => t.id === terrainId.value || t.name === terrainId.value) ?? picked;
  return {
    id: prev?.id ?? uid(),
    locked: false,
    terrainId,
    name: keep(prev?.name, () => `${used.name} of ${placeName(tongue)}`),
    description: keep(prev?.description, () => used.note),
    danger: keep(prev?.danger, () => pick(DANGER)),
    use: keep(prev?.use, () => pick(USES)),
    lastEvent: keep(prev?.lastEvent, () => pick(LAST_EVENTS)),
    population: keep(prev?.population, () => pick(POPULATION)),
    antagonist: keep(prev?.antagonist, () => pick(ANTAGONISTS)),
    quirk: keep(prev?.quirk, () => pick(QUIRKS)),
  };
}

export function rollNation(tongue: Tongue, others: string[], prev?: Nation): Nation {
  if (prev?.locked) return prev;
  const theme = prev?.theme.locked
    ? (NATION_THEMES.find((t) => t.name === prev.theme.value) ?? pick(NATION_THEMES))
    : pick(NATION_THEMES);
  const themeCell = keep(prev?.theme, () => theme.name);
  const used = NATION_THEMES.find((t) => t.name === themeCell.value) ?? theme;
  const name = keep(prev?.name, () => placeName(tongue));
  const neighbor = others.filter((n) => n !== name.value);
  return {
    id: prev?.id ?? uid(),
    locked: false,
    name,
    theme: themeCell,
    themeNote: keep(prev?.themeNote, () => used.note),
    blurb: keep(prev?.blurb, () => used.note),
    history: [keep(prev?.history?.[0], rollHistory), keep(prev?.history?.[1], rollHistory)],
    wants: keep(prev?.wants, () => pick(WANTS)),
    dispute: keep(prev?.dispute, () => (neighbor.length ? `${pick(DISPUTES)} (${pick(neighbor)})` : pick(DISPUTES))),
    tie: keep(prev?.tie, () => (neighbor.length ? `${pick(TIES)} (${pick(neighbor)})` : pick(TIES))),
    values: twoValues(prev?.values),
  };
}

export function rollGod(tongue: Tongue, prev?: God): God {
  if (prev?.locked) return prev;
  const named = godName(tongue);
  return {
    id: prev?.id ?? uid(),
    locked: false,
    name: keep(prev?.name, () => named.name),
    portfolio: keep(prev?.portfolio, () => named.portfolio),
    origin: keep(prev?.origin, () => pick(GOD_ORIGINS)),
    function: keep(prev?.function, () => pick(GOD_FUNCTIONS)),
    want: keep(prev?.want, () => pick(GOD_WANTS)),
    note: keep(prev?.note, () =>
      pick([
        "Honored under three local names.",
        "A newer cult with money and no manners.",
        "Officially dead. Still answered in the hills.",
        "State cult. Taxes pay the incense.",
        "Hill shrines and old grudges.",
      ]),
    ),
  };
}

export function rollCity(tongue: Tongue, size: string, prev?: City): City {
  if (prev?.locked) return prev;
  const tags = pickN(COMMUNITY_TAGS, 2);
  return {
    id: prev?.id ?? uid(),
    locked: false,
    name: keep(prev?.name, () => placeName(tongue)),
    size: keep(prev?.size, () => size),
    tags: [keep(prev?.tags?.[0], () => tags[0] ?? pick(COMMUNITY_TAGS)), keep(prev?.tags?.[1], () => tags[1] ?? pick(COMMUNITY_TAGS))],
    note: keep(prev?.note, () =>
      pick([
        "Sits on the main river. Imports grain and exports law.",
        "A day's ride from something it would rather not name.",
        "Port or ford-town that thinks it should be the capital.",
        "Grew around a Working that still functions, mostly.",
        "The walls are older than the kingdom and better kept.",
      ]),
    ),
  };
}

export function rollFigure(tongue: Tongue, prev?: CourtFigure): CourtFigure {
  if (prev?.locked) return prev;
  return {
    id: prev?.id ?? uid(),
    locked: false,
    name: keep(prev?.name, () => personName(tongue)),
    role: keep(prev?.role, () => pick(COURT_FIGURE_ROLES)),
    power: keep(prev?.power, () => pick(COURT_POWERS)),
  };
}

export function rollCourt(tongue: Tongue, prev?: Court): Court {
  if (prev?.locked) return prev;
  const tags = pickN(COURT_TAG_NAMES, 2);
  return {
    id: prev?.id ?? uid(),
    locked: false,
    name: keep(prev?.name, () => `${pick(["House", "Court", "Circle", "Table", "Seat"])} ${placeName(tongue)}`),
    type: keep(prev?.type, () => pick(COURT_TYPES)),
    theme: keep(prev?.theme, () => pick(COURT_THEMES)),
    tags: [keep(prev?.tags?.[0], () => tags[0] ?? pick(COURT_TAG_NAMES)), keep(prev?.tags?.[1], () => tags[1] ?? pick(COURT_TAG_NAMES))],
    figures: [
      rollFigure(tongue, prev?.figures?.[0]),
      rollFigure(tongue, prev?.figures?.[1]),
      rollFigure(tongue, prev?.figures?.[2]),
    ],
    internalConflict: keep(prev?.internalConflict, () => pick(COURT_INTERNAL)),
    externalConflict: keep(prev?.externalConflict, () => pick(COURT_EXTERNAL)),
    note: keep(prev?.note, () =>
      pick([
        "Meets after dusk in a hall that used to be a temple.",
        "Everyone pretends the books are in order.",
        "Their livery is recognized three kingdoms away.",
        "A feast is scheduled; half the invitations are threats.",
      ]),
    ),
  };
}

export function rollRuin(tongue: Tongue, prev?: Ruin): Ruin {
  if (prev?.locked) return prev;
  const tags = pickN(RUIN_TAG_NAMES, 2);
  const kind = prev?.kind.locked ? prev.kind.value : pick(RUIN_KINDS);
  return {
    id: prev?.id ?? uid(),
    locked: false,
    name: keep(prev?.name, () => `${placeName(tongue)} ${pick(["Vault", "Fall", "Hollow", "Keep", "Deep"])}`),
    kind: keep(prev?.kind, () => kind),
    tags: [keep(prev?.tags?.[0], () => tags[0] ?? pick(RUIN_TAG_NAMES)), keep(prev?.tags?.[1], () => tags[1] ?? pick(RUIN_TAG_NAMES))],
    note: keep(prev?.note, () =>
      pick([
        "Locals will guide you to the first door and no further.",
        "Officially sealed. The seal has been broken twice.",
        "Something still keeps a household in the upper works.",
        "Maps of it are sold in the capital. None of them match.",
      ]),
    ),
  };
}

function rollRelationship(from: string, to: string, text: string, prev?: Relationship): Relationship {
  if (prev?.locked) return prev;
  return {
    id: prev?.id ?? uid(),
    locked: false,
    from: keep(prev?.from, () => from),
    to: keep(prev?.to, () => to),
    text: keep(prev?.text, () => text),
  };
}

function rollKingdom(tongue: Tongue, second: Tongue, nations: Nation[], features: TerrainFeature[], prev?: Kingdom): Kingdom {
  const capitalName = val(nations[0]?.name, placeName(tongue));
  const cities = [
    rollCity(tongue, "Capital", prev?.cities?.[0]),
    rollCity(tongue, "Second city", prev?.cities?.[1]),
    rollCity(second, "Market town", prev?.cities?.[2]),
    ...(prev?.cities?.slice(3).map((c) => rollCity(tongue, val(c.size, "Market town"), c)) ?? []),
  ];
  if (!prev?.cities?.[0]?.name.locked) {
    cities[0] = { ...cities[0]!, name: keep(prev?.cities?.[0]?.name, () => `Great ${capitalName}`) };
  }
  const courts = mapUnlocked(prev?.courts, Math.max(prev?.courts?.length ?? 1, 1), (_, prior) => rollCourt(tongue, prior));
  const ruins = mapUnlocked(prev?.ruins, Math.max(prev?.ruins?.length ?? 2, 2), (_, prior) => rollRuin(tongue, prior));
  return {
    name: keep(prev?.name, () => capitalName),
    language: keep(prev?.language, () => tongue.name),
    history: [
      keep(prev?.history?.[0], rollHistory),
      keep(prev?.history?.[1], rollHistory),
      keep(prev?.history?.[2], rollHistory),
      keep(prev?.history?.[3], rollHistory),
    ],
    ruler: keep(prev?.ruler, () => personName(tongue)),
    rulerStyle: keep(prev?.rulerStyle, () => pick(RULER_STYLES)),
    rulerCount: keep(prev?.rulerCount, () => pick(RULER_COUNTS)),
    rulingClass: keep(prev?.rulingClass, () => pick(RULING_CLASSES)),
    legitimacy: keep(prev?.legitimacy, () => pick(LEGITIMACY)),
    enforcers: keep(prev?.enforcers, () => pick(ENFORCERS)),
    struggle: keep(prev?.struggle, () => pick(STRUGGLES)),
    enemy: keep(prev?.enemy, () => pick(ENEMIES)),
    problems: [keep(prev?.problems?.[0], () => pick(PROBLEMS)), keep(prev?.problems?.[1], () => pick(PROBLEMS))],
    fortune: keep(prev?.fortune, () => pick(FORTUNES)),
    society: keep(prev?.society, () => pick(SOCIETIES)),
    ethnicNotes: keep(
      prev?.ethnicNotes,
      () =>
        `The ${tongue.name}-speaking majority share the valleys with a ${second.name} minority in the hills. Relations are civil until harvest.`,
    ),
    values: twoValues(prev?.values),
    organization: keep(prev?.organization, () => pick(ORGANIZATIONS)),
    aesthetic: keep(prev?.aesthetic, () => pick(AESTHETICS)),
    density: keep(prev?.density, () => pick(DENSITIES)),
    stability: keep(prev?.stability, () => pick(STABILITIES)),
    formOfRule: keep(prev?.formOfRule, () => pick(FORMS_OF_RULE)),
    localGods: [
      rollGod(tongue, prev?.localGods?.[0]),
      rollGod(second, prev?.localGods?.[1]),
      ...(prev?.localGods?.slice(2).map((g) => rollGod(tongue, g)) ?? []),
    ],
    cities,
    wastelands: [
      keep(
        prev?.wastelands?.[0],
        () => `The empty country between ${val(cities[0]!.name)} and ${val(cities[1]!.name)} — no road worth the name.`,
      ),
      keep(
        prev?.wastelands?.[1],
        () =>
          features[0]
            ? `${val(features[0].name)}: officially claimed, practically ungoverned.`
            : "A nameless arratu on the inland border.",
      ),
    ],
    courts,
    ruins,
  };
}

function mapUnlocked<T extends { id: string; locked: boolean }>(
  prev: T[] | undefined,
  count: number,
  make: (index: number, prior?: T) => T,
): T[] {
  const existing = prev ?? [];
  const result: T[] = [];
  let unlockedIndex = 0;
  for (const item of existing) {
    if (item.locked) {
      result.push(item);
    } else {
      result.push(make(unlockedIndex, item));
      unlockedIndex += 1;
    }
  }
  while (result.length < count) {
    result.push(make(unlockedIndex));
    unlockedIndex += 1;
  }
  return result;
}

export function generateWorld(prev?: WorldData, section: WorldSection = "all"): WorldData {
  const all = section === "all";
  const doWorld = all || section === "world";
  const doRegion = all || section === "region";
  const doTerrain = all || section === "terrain";
  const doNations = all || section === "nations";
  const doGods = all || section === "gods";
  const doRels = all || section === "relationships";
  const doKingdom = all || section === "kingdom";

  const tongue = doKingdom && !prev?.kingdom?.language?.locked ? pick(TONGUES) : tongueOf(prev);
  const second = secondTongue(tongue);

  const scope = doWorld ? keep(prev?.scope, () => pick(SCOPES).id) : (prev?.scope ?? cell(SCOPES[0]!.id));
  const worldNameCell = doWorld ? keep(prev?.worldName, () => worldName()) : (prev?.worldName ?? cell(worldName()));
  const physics = doWorld ? keep(prev?.physics, () => pick(PHYSICS)) : (prev?.physics ?? cell(PHYSICS[0]!));
  const cosmology = doWorld ? keep(prev?.cosmology, () => pick(COSMOLOGY)) : (prev?.cosmology ?? cell(COSMOLOGY[0]!));
  const empires = doWorld ? keep(prev?.empires, () => pick(EMPIRES)) : (prev?.empires ?? cell(EMPIRES[4]!));
  const interconnected = doWorld
    ? keep(prev?.interconnected, () => pick(INTERCONNECT))
    : (prev?.interconnected ?? cell(INTERCONNECT[0]!));
  const recentEvent = doWorld
    ? keep(prev?.recentEvent, () => pick(RECENT_EVENTS))
    : (prev?.recentEvent ?? cell(RECENT_EVENTS[0]!));

  const regionNameCell = doRegion
    ? keep(prev?.regionName, () => regionName(tongue))
    : (prev?.regionName ?? cell(regionName(tongue)));
  const oceanSides = doRegion
    ? keep(prev?.oceanSides, () => (Math.random() < 0.25 ? 4 : 1 + Math.floor(Math.random() * 3)))
    : (prev?.oceanSides ?? cell(1));
  const riverCount = doRegion ? keep(prev?.riverCount, () => 2 + Math.floor(Math.random() * 4)) : (prev?.riverCount ?? cell(3));
  const lakeCount = doRegion ? keep(prev?.lakeCount, () => 1 + Math.floor(Math.random() * 3)) : (prev?.lakeCount ?? cell(1));

  const features = doTerrain
    ? mapUnlocked(prev?.features, Math.max(prev?.features.length ?? 6, 6), (_, prior) => rollTerrainFeature(tongue, prior))
    : (prev?.features ?? Array.from({ length: 6 }, () => rollTerrainFeature(tongue)));

  const nations = doNations
    ? (() => {
        const next = mapUnlocked(prev?.nations, Math.max(prev?.nations.length ?? 6, 6), (i, prior) =>
          rollNation(i % 2 === 0 ? tongue : second, [], prior),
        );
        const names = next.map((n) => n.name.value);
        return next.map((n, i) => {
          if (n.locked) return n;
          const others = names.filter((name) => name !== n.name.value);
          return rollNation(i % 2 === 0 ? tongue : second, others, n);
        });
      })()
    : (prev?.nations ?? []);

  const gods = doGods
    ? mapUnlocked(prev?.gods, Math.max(prev?.gods.length ?? 3, 3), (i, prior) =>
        rollGod(i % 2 === 0 ? tongue : second, prior),
      )
    : (prev?.gods ?? Array.from({ length: 3 }, (_, i) => rollGod(i % 2 === 0 ? tongue : second)));

  const relationships = doRels
    ? (() => {
        const list = nations.length ? nations : (prev?.nations ?? []);
        return list.map((n, i) => {
          const other = list[(i + 1) % list.length];
          const prior = prev?.relationships[i];
          const text = i % 2 === 0 ? n.dispute.value : n.tie.value;
          return rollRelationship(n.name.value, other?.name.value ?? n.name.value, text, prior);
        });
      })()
    : (prev?.relationships ?? []);

  const kingdom = doKingdom
    ? rollKingdom(tongue, second, nations.length ? nations : (prev?.nations ?? []), features, prev?.kingdom)
    : (prev?.kingdom ?? rollKingdom(tongue, second, nations, features));

  return {
    scope,
    worldName: worldNameCell,
    physics,
    cosmology,
    empires,
    interconnected,
    recentEvent,
    regionName: regionNameCell,
    oceanSides,
    features,
    riverCount,
    lakeCount,
    nations,
    gods,
    relationships,
    kingdom,
    gazetteer: prev?.gazetteer,
  };
}

export function blankWorld(): WorldData {
  return generateWorld();
}

export function rerollSection(world: WorldData, section: WorldSection): WorldData {
  return generateWorld(world, section);
}

export function addTerrainFeature(world: WorldData): WorldData {
  return { ...world, features: [...world.features, rollTerrainFeature(tongueOf(world))] };
}

export function addNation(world: WorldData): WorldData {
  const tongue = tongueOf(world);
  const others = world.nations.map((n) => n.name.value);
  return { ...world, nations: [...world.nations, rollNation(tongue, others)] };
}

export function addGod(world: WorldData, local = false): WorldData {
  const g = rollGod(tongueOf(world));
  if (local) {
    return { ...world, kingdom: { ...world.kingdom, localGods: [...world.kingdom.localGods, g] } };
  }
  return { ...world, gods: [...world.gods, g] };
}

export function addCity(world: WorldData): WorldData {
  return {
    ...world,
    kingdom: {
      ...world.kingdom,
      cities: [...world.kingdom.cities, rollCity(tongueOf(world), pick(CITY_SIZES))],
    },
  };
}

export function addCourt(world: WorldData): WorldData {
  return {
    ...world,
    kingdom: {
      ...world.kingdom,
      courts: [...(world.kingdom.courts ?? []), rollCourt(tongueOf(world))],
    },
  };
}

export function addRuin(world: WorldData): WorldData {
  return {
    ...world,
    kingdom: {
      ...world.kingdom,
      ruins: [...(world.kingdom.ruins ?? []), rollRuin(tongueOf(world))],
    },
  };
}

function normalizeGod(raw: unknown): God {
  if (raw && typeof raw === "object") {
    const g = raw as Record<string, unknown>;
    return {
      id: typeof g.id === "string" ? g.id : uid(),
      locked: Boolean(g.locked),
      name: asCell(g.name),
      portfolio: asCell(g.portfolio),
      origin: asCell(g.origin, GOD_ORIGINS[0]),
      function: asCell(g.function, GOD_FUNCTIONS[0]),
      want: asCell(g.want, GOD_WANTS[0]),
      note: asCell(g.note),
    };
  }
  return rollGod(pick(TONGUES));
}

function normalizeFeature(raw: unknown): TerrainFeature {
  if (!raw || typeof raw !== "object") return rollTerrainFeature(pick(TONGUES));
  const f = raw as Record<string, unknown>;
  const name = asCell(f.name);
  const terrain =
    TERRAIN.find((t) => name.value.toLowerCase().includes(t.name.split(" ")[0]!.toLowerCase())) ?? TERRAIN[0]!;
  return {
    id: typeof f.id === "string" ? f.id : uid(),
    locked: Boolean(f.locked),
    terrainId: asCell(f.terrainId, terrain.id),
    name,
    description: asCell(f.description, terrain.note),
    danger: asCell(f.danger),
    use: asCell(f.use),
    lastEvent: asCell(f.lastEvent),
    population: asCell(f.population),
    antagonist: asCell(f.antagonist),
    quirk: asCell(f.quirk),
  };
}

function normalizeNation(raw: unknown): Nation {
  if (!raw || typeof raw !== "object") return rollNation(pick(TONGUES), []);
  const n = raw as Record<string, unknown>;
  const values = asCellList(n.values);
  return {
    id: typeof n.id === "string" ? n.id : uid(),
    locked: Boolean(n.locked),
    name: asCell(n.name),
    blurb: asCell(n.blurb),
    theme: asCell(n.theme),
    themeNote: asCell(n.themeNote),
    history: asCellList(n.history),
    wants: asCell(n.wants),
    dispute: asCell(n.dispute),
    tie: asCell(n.tie),
    values: values.length >= 2 ? values : twoValues(values),
  };
}

function normalizeCity(raw: unknown): City {
  if (!raw || typeof raw !== "object") return rollCity(pick(TONGUES), "Market town");
  const c = raw as Record<string, unknown>;
  return {
    id: typeof c.id === "string" ? c.id : uid(),
    locked: Boolean(c.locked),
    name: asCell(c.name),
    size: asCell(c.size, "Market town"),
    tags: asCellList(c.tags),
    note: asCell(c.note),
  };
}

function normalizeFigure(raw: unknown): CourtFigure {
  if (!raw || typeof raw !== "object") return rollFigure(pick(TONGUES));
  const f = raw as Record<string, unknown>;
  return {
    id: typeof f.id === "string" ? f.id : uid(),
    locked: Boolean(f.locked),
    name: asCell(f.name),
    role: asCell(f.role, COURT_FIGURE_ROLES[0]),
    power: asCell(f.power, COURT_POWERS[0]),
  };
}

function normalizeCourt(raw: unknown): Court {
  if (!raw || typeof raw !== "object") return rollCourt(pick(TONGUES));
  const c = raw as Record<string, unknown>;
  const figures = Array.isArray(c.figures) ? c.figures.map(normalizeFigure) : [];
  return {
    id: typeof c.id === "string" ? c.id : uid(),
    locked: Boolean(c.locked),
    name: asCell(c.name),
    type: asCell(c.type, COURT_TYPES[0]),
    theme: asCell(c.theme, COURT_THEMES[0]),
    tags: asCellList(c.tags),
    figures: figures.length ? figures : [rollFigure(pick(TONGUES)), rollFigure(pick(TONGUES)), rollFigure(pick(TONGUES))],
    internalConflict: asCell(c.internalConflict, COURT_INTERNAL[0]),
    externalConflict: asCell(c.externalConflict, COURT_EXTERNAL[0]),
    note: asCell(c.note),
  };
}

function normalizeRuin(raw: unknown): Ruin {
  if (!raw || typeof raw !== "object") return rollRuin(pick(TONGUES));
  const r = raw as Record<string, unknown>;
  return {
    id: typeof r.id === "string" ? r.id : uid(),
    locked: Boolean(r.locked),
    name: asCell(r.name),
    kind: asCell(r.kind, RUIN_KINDS[0]),
    tags: asCellList(r.tags),
    note: asCell(r.note),
  };
}

export function normalizeWorld(raw: unknown): WorldData {
  if (!raw || typeof raw !== "object") return generateWorld();
  const w = raw as Record<string, unknown>;
  const kingdomRaw = (w.kingdom && typeof w.kingdom === "object" ? w.kingdom : {}) as Record<string, unknown>;
  const features = Array.isArray(w.features) ? w.features.map(normalizeFeature) : [];
  const nations = Array.isArray(w.nations) ? w.nations.map(normalizeNation) : [];
  const gods = Array.isArray(w.gods) ? w.gods.map(normalizeGod) : [];
  const relationships = Array.isArray(w.relationships)
    ? w.relationships.map((r) => {
        const row = (r && typeof r === "object" ? r : {}) as Record<string, unknown>;
        return {
          id: typeof row.id === "string" ? row.id : uid(),
          locked: Boolean(row.locked),
          from: asCell(row.from),
          to: asCell(row.to),
          text: asCell(row.text),
        };
      })
    : [];

  const legacyCourt = kingdomRaw.court && typeof kingdomRaw.court === "object" ? [normalizeCourt(kingdomRaw.court)] : [];
  const courts = Array.isArray(kingdomRaw.courts)
    ? kingdomRaw.courts.map(normalizeCourt)
    : legacyCourt;
  const ruins = Array.isArray(kingdomRaw.ruins) ? kingdomRaw.ruins.map(normalizeRuin) : [];
  const values = asCellList(kingdomRaw.values);

  const base: WorldData = {
    scope: asCell(w.scope, SCOPES[0]!.id),
    worldName: asCell(w.worldName),
    physics: asCell(w.physics, PHYSICS[0]),
    cosmology: asCell(w.cosmology, COSMOLOGY[0]),
    empires: asCell(w.empires, EMPIRES[4]),
    interconnected: asCell(w.interconnected, INTERCONNECT[0]),
    recentEvent: asCell(w.recentEvent, RECENT_EVENTS[0]),
    regionName: asCell(w.regionName),
    oceanSides: asNumCell(w.oceanSides, 1),
    features,
    riverCount: asNumCell(w.riverCount, 3),
    lakeCount: asNumCell(w.lakeCount, 1),
    nations,
    gods,
    relationships,
    kingdom: {
      name: asCell(kingdomRaw.name),
      language: asCell(kingdomRaw.language, TONGUES[0]!.name),
      history: asCellList(kingdomRaw.history),
      ruler: asCell(kingdomRaw.ruler),
      rulerStyle: asCell(kingdomRaw.rulerStyle, RULER_STYLES[0]),
      rulerCount: asCell(kingdomRaw.rulerCount, RULER_COUNTS[0]),
      rulingClass: asCell(kingdomRaw.rulingClass, RULING_CLASSES[0]),
      legitimacy: asCell(kingdomRaw.legitimacy, LEGITIMACY[0]),
      enforcers: asCell(kingdomRaw.enforcers, ENFORCERS[0]),
      struggle: asCell(kingdomRaw.struggle, STRUGGLES[0]),
      enemy: asCell(kingdomRaw.enemy),
      problems: asCellList(kingdomRaw.problems),
      fortune: asCell(kingdomRaw.fortune, FORTUNES[0]),
      society: asCell(kingdomRaw.society, SOCIETIES[0]),
      ethnicNotes: asCell(kingdomRaw.ethnicNotes),
      values: values.length >= 2 ? values : twoValues(values),
      organization: asCell(kingdomRaw.organization, ORGANIZATIONS[0]),
      aesthetic: asCell(kingdomRaw.aesthetic, AESTHETICS[0]),
      density: asCell(kingdomRaw.density, DENSITIES[0]),
      stability: asCell(kingdomRaw.stability, STABILITIES[0]),
      formOfRule: asCell(kingdomRaw.formOfRule, FORMS_OF_RULE[0]),
      localGods: Array.isArray(kingdomRaw.localGods) ? kingdomRaw.localGods.map(normalizeGod) : [],
      cities: Array.isArray(kingdomRaw.cities) ? kingdomRaw.cities.map(normalizeCity) : [],
      wastelands: asCellList(kingdomRaw.wastelands),
      courts,
      ruins,
    },
    gazetteer: typeof w.gazetteer === "string" ? w.gazetteer : undefined,
  };

  if (!base.features.length || !base.nations.length) {
    return generateWorld(base);
  }
  if (!base.kingdom.courts.length || !base.kingdom.ruins.length) {
    const tongue = tongueOf(base);
    const second = secondTongue(tongue);
    return {
      ...base,
      kingdom: {
        ...base.kingdom,
        courts: base.kingdom.courts.length ? base.kingdom.courts : [rollCourt(tongue)],
        ruins: base.kingdom.ruins.length ? base.kingdom.ruins : [rollRuin(tongue), rollRuin(second)],
      },
    };
  }
  return base;
}

export function lockedCount(world: WorldData): number {
  let n = 0;
  const visit = (c?: Cell<unknown> | Cell) => {
    if (c?.locked) n += 1;
  };
  visit(world.scope);
  visit(world.worldName);
  visit(world.physics);
  visit(world.cosmology);
  visit(world.empires);
  visit(world.interconnected);
  visit(world.recentEvent);
  visit(world.regionName);
  visit(world.oceanSides);
  visit(world.riverCount);
  visit(world.lakeCount);
  for (const f of world.features) {
    if (f.locked) n += 1;
    visit(f.terrainId);
    visit(f.name);
    visit(f.description);
    visit(f.danger);
    visit(f.use);
    visit(f.lastEvent);
    visit(f.population);
    visit(f.antagonist);
    visit(f.quirk);
  }
  for (const nation of world.nations) {
    if (nation.locked) n += 1;
    visit(nation.name);
    visit(nation.theme);
    visit(nation.wants);
    visit(nation.dispute);
    visit(nation.tie);
    nation.history.forEach(visit);
    (nation.values ?? []).forEach(visit);
  }
  for (const g of world.gods) {
    if (g.locked) n += 1;
    visit(g.name);
    visit(g.portfolio);
    visit(g.origin);
    visit(g.function);
    visit(g.want);
    visit(g.note);
  }
  for (const r of world.relationships) {
    if (r.locked) n += 1;
    visit(r.text);
  }
  const k = world.kingdom;
  visit(k.name);
  visit(k.language);
  visit(k.ruler);
  visit(k.rulerStyle);
  visit(k.rulerCount);
  visit(k.rulingClass);
  visit(k.legitimacy);
  visit(k.enforcers);
  visit(k.struggle);
  visit(k.enemy);
  visit(k.fortune);
  visit(k.society);
  visit(k.ethnicNotes);
  visit(k.organization);
  visit(k.aesthetic);
  visit(k.density);
  visit(k.stability);
  visit(k.formOfRule);
  k.history.forEach(visit);
  k.problems.forEach(visit);
  k.wastelands.forEach(visit);
  (k.values ?? []).forEach(visit);
  for (const g of k.localGods) {
    if (g.locked) n += 1;
    visit(g.name);
  }
  for (const c of k.cities) {
    if (c.locked) n += 1;
    visit(c.name);
    c.tags.forEach(visit);
  }
  for (const court of k.courts ?? []) {
    if (court.locked) n += 1;
    visit(court.name);
    visit(court.type);
    court.tags.forEach(visit);
    for (const fig of court.figures) {
      visit(fig.name);
      visit(fig.role);
    }
  }
  for (const ruin of k.ruins ?? []) {
    if (ruin.locked) n += 1;
    visit(ruin.name);
    ruin.tags.forEach(visit);
  }
  return n;
}

export function scopeLabel(id: string): string {
  return SCOPES.find((s) => s.id === id)?.name ?? id;
}

export { SCOPES, TERRAIN };
