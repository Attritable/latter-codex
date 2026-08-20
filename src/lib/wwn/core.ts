import type { Attribute, CharacterData, ClassId, SkillName } from "./types";
import { ATTRIBUTES } from "./types";

export const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  strength: "Strength",
  dexterity: "Dexterity",
  constitution: "Constitution",
  intelligence: "Intelligence",
  wisdom: "Wisdom",
  charisma: "Charisma",
};

export const ATTRIBUTE_HINTS: Record<Attribute, string> = {
  strength: "Lifting, melee, carrying gear",
  dexterity: "Speed, evasion, initiative",
  constitution: "Hardiness, poisons, endurance",
  intelligence: "Memory, reasoning, scholarship",
  wisdom: "Notice, judgment, intuition",
  charisma: "Charm, loyalty, force of presence",
};

export function attributeModifier(score: number): number {
  if (score <= 3) return -2;
  if (score <= 7) return -1;
  if (score <= 13) return 0;
  if (score <= 17) return 1;
  return 2;
}

export function formatMod(mod: number): string {
  return mod >= 0 ? `+${mod}` : String(mod);
}

export const ALL_SKILLS: SkillName[] = [
  "Administer",
  "Connect",
  "Convince",
  "Craft",
  "Exert",
  "Heal",
  "Know",
  "Lead",
  "Magic",
  "Notice",
  "Perform",
  "Pray",
  "Punch",
  "Ride",
  "Sail",
  "Shoot",
  "Sneak",
  "Stab",
  "Survive",
  "Trade",
  "Work",
];

export const COMBAT_SKILLS: SkillName[] = ["Punch", "Stab", "Shoot"];

export const SKILL_BLURBS: Record<SkillName, string> = {
  Administer: "Run organizations, logistics, records, and staff.",
  Connect: "Find useful people and call on organizations.",
  Convince: "Persuade a listener that something is true.",
  Craft: "Make or repair goods appropriate to your background.",
  Exert: "Run, climb, swim, labor, and throw.",
  Heal: "Treat wounds, disease, poison, and stabilize the dying.",
  Know: "History, geography, sciences, and scholarly lore.",
  Lead: "Inspire followers and keep them loyal under strain.",
  Magic: "Cast, analyze, and recall notable magics.",
  Notice: "Spot ambushes, hidden things, and subtle cues.",
  Perform: "Sing, act, dance, orate, or compose.",
  Pray: "Rites, gods, taboos, and the state of local faiths.",
  Punch: "Unarmed fighting and grappling.",
  Ride: "Mounts, carts, and beast-care.",
  Sail: "Ships, weather, navigation, and crew.",
  Shoot: "Bows, crossbows, and thrown missiles.",
  Sneak: "Stealth, locks, traps, disguise, and security.",
  Stab: "Melee weapons and thrown blades.",
  Survive: "Hunt, navigate, and endure the wilds.",
  Trade: "Buy, sell, value goods, and find black markets.",
  Work: "A catch-all profession from your background.",
};

export const ARRAY_SCORES = [14, 12, 11, 10, 9, 7] as const;

export function emptyAttributes(): Record<Attribute, number> {
  return {
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
  };
}

export function applySkillGain(
  skills: Partial<Record<SkillName, SkillLevelish>>,
  skill: SkillName,
): Partial<Record<SkillName, number>> {
  const current = skills[skill] ?? -1;
  if (current < 0) return { ...skills, [skill]: 0 };
  if (current === 0) return { ...skills, [skill]: 1 };
  return skills;
}

type SkillLevelish = number;

export function isWarriorLike(classId: ClassId): boolean {
  return classId === "warrior" || classId === "adventurer-ew" || classId === "adventurer-mw";
}

export function isExpertLike(classId: ClassId): boolean {
  return classId === "expert" || classId === "adventurer-ew" || classId === "adventurer-em";
}

export function isMageLike(classId: ClassId): boolean {
  return (
    classId === "mage" ||
    classId === "adventurer-em" ||
    classId === "adventurer-mw" ||
    classId === "adventurer-mm"
  );
}

export function classLabel(classId: ClassId, traditions: string[] = []): string {
  const trad = traditions
    .map((t) =>
      t
        .split("-")
        .map((w) => w[0]?.toUpperCase() + w.slice(1))
        .join(" "),
    )
    .join(" / ");
  switch (classId) {
    case "warrior":
      return "Warrior";
    case "expert":
      return "Expert";
    case "mage":
      return trad ? `Mage (${trad})` : "Mage";
    case "adventurer-ew":
      return "Adventurer · Expert / Warrior";
    case "adventurer-em":
      return trad ? `Adventurer · Expert / ${trad}` : "Adventurer · Expert / Mage";
    case "adventurer-mw":
      return trad ? `Adventurer · ${trad} / Warrior` : "Adventurer · Mage / Warrior";
    case "adventurer-mm":
      return trad ? `Adventurer · ${trad}` : "Adventurer · Dual Mage";
    default:
      return "Adventurer";
  }
}

export function hitDieExpr(classId: ClassId): string {
  switch (classId) {
    case "warrior":
    case "adventurer-ew":
    case "adventurer-mw":
      return "1d6+2";
    case "mage":
    case "adventurer-mm":
      return "1d6−1";
    default:
      return "1d6";
  }
}

export function baseAttack(classId: ClassId, level = 1): number {
  if (level !== 1) {
    /* Level 1 creator — tables exist for later use */
  }
  switch (classId) {
    case "warrior":
    case "adventurer-ew":
    case "adventurer-mw":
      return 1;
    default:
      return 0;
  }
}

export function savingThrows(data: Pick<CharacterData, "attributes">) {
  const m = (a: Attribute) => attributeModifier(data.attributes[a]);
  return {
    physical: 15 - Math.max(m("strength"), m("constitution")),
    evasion: 15 - Math.max(m("intelligence"), m("dexterity")),
    mental: 15 - Math.max(m("wisdom"), m("charisma")),
    luck: 15,
  };
}

export function systemStrain(con: number): number {
  return con;
}

export function effortScore(
  magicSkill: number,
  intMod: number,
  chaMod: number,
  partial: boolean,
): number {
  const raw = 1 + magicSkill + Math.max(intMod, chaMod) - (partial ? 1 : 0);
  return Math.max(1, raw);
}

export function languageSlots(skills: Partial<Record<SkillName, number>>): number {
  const extra = (name: SkillName) => {
    const lv = skills[name];
    if (lv === 0) return 1;
    if (lv && lv >= 1) return 2;
    return 0;
  };
  return 2 + extra("Connect") + extra("Know");
}

export { ATTRIBUTES };
