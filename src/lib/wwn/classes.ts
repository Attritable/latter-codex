import type { ClassId, TraditionId } from "./types";

export interface ClassDef {
  id: ClassId;
  name: string;
  kind: "full" | "adventurer";
  blurb: string;
  hitDie: string;
  attack: number;
  foci: { any: number; expert: number; warrior: number };
  abilities: { name: string; text: string }[];
  mageSlots: number;
  notes: string;
}

export const CLASSES: ClassDef[] = [
  {
    id: "warrior",
    name: "Warrior",
    kind: "full",
    blurb: "A hero born to the blade — more hit points, a better attack, and the luck of veterans.",
    hitDie: "1d6+2",
    attack: 1,
    foci: { any: 1, expert: 0, warrior: 1 },
    abilities: [
      {
        name: "Killing Blow",
        text: "Add half your level, rounded up, to all damage and Shock you inflict.",
      },
      {
        name: "Veteran's Luck",
        text: "Once per scene, turn a miss you rolled into a hit, or a hit against you into a miss.",
      },
    ],
    mageSlots: 0,
    notes: "Best at surviving and ending fights. Reckless steel still kills novices.",
  },
  {
    id: "expert",
    name: "Expert",
    kind: "full",
    blurb: "Master of non-combat skills — thieves, diplomats, healers, scholars, and explorers.",
    hitDie: "1d6",
    attack: 0,
    foci: { any: 1, expert: 1, warrior: 0 },
    abilities: [
      {
        name: "Masterful Expertise",
        text: "Once per scene, reroll any failed non-combat skill check as an Instant action.",
      },
      {
        name: "Quick Learner",
        text: "Each level, gain an extra skill point usable only on non-combat skills or attributes.",
      },
    ],
    mageSlots: 0,
    notes: "Learns fastest and succeeds when others fail. Still a capable combatant.",
  },
  {
    id: "mage",
    name: "Mage",
    kind: "full",
    blurb: "Wielder of a single arcane tradition. Frail, few spells, and indispensable when planned.",
    hitDie: "1d6−1",
    attack: 0,
    foci: { any: 1, expert: 0, warrior: 0 },
    abilities: [
      {
        name: "Arcane Tradition",
        text: "Pick one tradition. You gain its bonus skill, arts, Effort, and (if it casts) spells.",
      },
    ],
    mageSlots: 1,
    notes: "Full specialists never match a Warrior in a melee or an Expert at mundane work.",
  },
  {
    id: "adventurer-ew",
    name: "Adventurer · Expert / Warrior",
    kind: "adventurer",
    blurb: "Assassin, scout-captain, or duelist who mixes skill and steel.",
    hitDie: "1d6+2",
    attack: 1,
    foci: { any: 1, expert: 1, warrior: 1 },
    abilities: [
      { name: "Quick Learner", text: "As the Expert — extra non-combat skill point each level." },
      {
        name: "Partial Warrior",
        text: "Improved hit die and attack. No Killing Blow or Veteran's Luck.",
      },
    ],
    mageSlots: 0,
    notes: "Three Focus picks at first level. Lacks the signature class tricks of either parent.",
  },
  {
    id: "adventurer-em",
    name: "Adventurer · Expert / Mage",
    kind: "adventurer",
    blurb: "Grifting mountebank-wizard, temple physician, or scholar-thief.",
    hitDie: "1d6",
    attack: 0,
    foci: { any: 1, expert: 1, warrior: 0 },
    abilities: [
      { name: "Quick Learner", text: "As the Expert." },
      { name: "Partial Mage", text: "A reduced tradition — fewer arts, spells, and Effort." },
    ],
    mageSlots: 1,
    notes: "No Masterful Expertise. Tradition limits still apply (no armor for High Mages).",
  },
  {
    id: "adventurer-mw",
    name: "Adventurer · Mage / Warrior",
    kind: "adventurer",
    blurb: "Spell-slinging swordsman or battle-healer who will never be either specialist.",
    hitDie: "1d6+2",
    attack: 1,
    foci: { any: 1, expert: 0, warrior: 1 },
    abilities: [
      { name: "Partial Warrior", text: "Improved hit die and attack. No Killing Blow or Veteran's Luck." },
      { name: "Partial Mage", text: "A reduced tradition — fewer arts, spells, and Effort." },
    ],
    mageSlots: 1,
    notes: "Wear armor only if the tradition or Armored Magic allows it.",
  },
  {
    id: "adventurer-mm",
    name: "Adventurer · Dual Mage",
    kind: "adventurer",
    blurb: "Two traditions — wider arts and prepared spells, never the highest magics.",
    hitDie: "1d6−1",
    attack: 0,
    foci: { any: 1, expert: 0, warrior: 0 },
    abilities: [
      {
        name: "Dual Tradition",
        text: "Use the dual-spellcaster table if both traditions cast. Each keeps its own Effort.",
      },
    ],
    mageSlots: 2,
    notes: "At 1st level: prepare 3, cast 1, max spell level 1. Pick arts from both lists.",
  },
];

export interface TraditionDef {
  id: TraditionId;
  name: string;
  casts: boolean;
  bonusSkill: "Magic" | "Heal" | "Punch";
  blurb: string;
  restriction: string;
  spellsKnownFull: number;
  spellsKnownPartial: number;
  artsFull: number;
  artsPartial: number;
}

export const TRADITIONS: TraditionDef[] = [
  {
    id: "high-mage",
    name: "High Mage",
    casts: true,
    bonusSkill: "Magic",
    blurb: "Orthodox inheritor of ancient High Magic — few spells, molded with specialist arts.",
    restriction: "Cannot cast or use arts in anything heavier than normal clothing, or with a shield.",
    spellsKnownFull: 4,
    spellsKnownPartial: 2,
    artsFull: 2,
    artsPartial: 1,
  },
  {
    id: "elementalist",
    name: "Elementalist",
    casts: true,
    bonusSkill: "Magic",
    blurb: "New Magic of flame, frost, stone, and storm, plus the High Magic corpus.",
    restriction: "Cannot cast or use arts while armored or bearing a shield.",
    spellsKnownFull: 4,
    spellsKnownPartial: 2,
    artsFull: 2,
    artsPartial: 1,
  },
  {
    id: "necromancer",
    name: "Necromancer",
    casts: true,
    bonusSkill: "Magic",
    blurb: "Death, undeath, and the unquiet. Often unwelcome in civilized lands.",
    restriction: "Cannot cast or use arts while armored. Social hostility is common.",
    spellsKnownFull: 4,
    spellsKnownPartial: 2,
    artsFull: 2,
    artsPartial: 1,
  },
  {
    id: "healer",
    name: "Healer",
    casts: false,
    bonusSkill: "Heal",
    blurb: "Magically gifted physician. Partial Mage only — arts, not High Magic slots.",
    restriction: "A Healer is always a Partial Mage path, never a full Mage class.",
    spellsKnownFull: 0,
    spellsKnownPartial: 0,
    artsFull: 0,
    artsPartial: 2,
  },
  {
    id: "vowed",
    name: "Vowed",
    casts: false,
    bonusSkill: "Punch",
    blurb: "Ascetic unarmed adept. Partial Mage only — body arts, not spells.",
    restriction: "A Vowed is always a Partial Mage path. Many vows forbid armor or indulgence.",
    spellsKnownFull: 0,
    spellsKnownPartial: 0,
    artsFull: 0,
    artsPartial: 2,
  },
];

export function classById(id: ClassId): ClassDef {
  return CLASSES.find((c) => c.id === id) ?? CLASSES[0]!;
}

export function traditionById(id: TraditionId): TraditionDef | undefined {
  return TRADITIONS.find((t) => t.id === id);
}

export function allowedTraditions(classId: ClassId): TraditionId[] {
  if (classId === "warrior" || classId === "expert" || classId === "adventurer-ew") return [];
  if (classId === "mage") return ["high-mage", "elementalist", "necromancer"];
  return ["high-mage", "elementalist", "necromancer", "healer", "vowed"];
}
