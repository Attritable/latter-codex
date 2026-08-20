import { pick, pickN, rollDie, rollDice, sum } from "@/lib/utils";
import { BACKGROUNDS, backgroundById } from "./backgrounds";
import { CLASSES, TRADITIONS, allowedTraditions, classById, traditionById } from "./classes";
import {
  ALL_SKILLS,
  ARRAY_SCORES,
  COMBAT_SKILLS,
  applySkillGain,
  attributeModifier,
  baseAttack,
  classLabel,
  effortScore,
  emptyAttributes,
  hitDieExpr,
  isExpertLike,
  isMageLike,
  isWarriorLike,
  languageSlots,
  savingThrows,
} from "./core";
import { applyPackage, packageById, suggestedPackage } from "./equipment";
import { FOCI, focusById } from "./foci";
import { ARTS, SPELLS, artsForTradition, spellsForTraditions, startingArtCount, startingSpellCount } from "./magic";
import { GOALS, TIES, personName, randomTongue } from "./names";
import type {
  Attribute,
  CharacterData,
  ClassId,
  SkillLevel,
  SkillName,
  TraditionId,
} from "./types";
import { ATTRIBUTES } from "./types";

const PHYSICAL: Attribute[] = ["strength", "dexterity", "constitution"];
const MENTAL: Attribute[] = ["intelligence", "wisdom", "charisma"];

export function rollAttributes(): { scores: Record<Attribute, number>; rolled: number[] } {
  const rolled = ATTRIBUTES.map(() => sum(rollDice(3, 6)));
  const scores = emptyAttributes();
  ATTRIBUTES.forEach((a, i) => {
    scores[a] = rolled[i] ?? 10;
  });
  return { scores, rolled };
}

export function arrayAttributes(order: Attribute[] = [...ATTRIBUTES]): Record<Attribute, number> {
  const scores = emptyAttributes();
  order.forEach((a, i) => {
    scores[a] = ARRAY_SCORES[i] ?? 10;
  });
  return scores;
}

function resolveSkillToken(token: string): SkillName | "any" | "combat" | null {
  if (token === "Any Skill") return "any";
  if (token === "Any Combat") return "combat";
  if ((ALL_SKILLS as string[]).includes(token)) return token as SkillName;
  return null;
}

export function gainSkill(
  skills: Partial<Record<SkillName, number>>,
  token: string,
  prefer?: SkillName,
): Partial<Record<SkillName, number>> {
  const kind = resolveSkillToken(token);
  if (!kind) return skills;
  if (kind === "any") {
    const choice =
      prefer && (skills[prefer] ?? -1) < 1
        ? prefer
        : pick(ALL_SKILLS.filter((s) => (skills[s] ?? -1) < 1));
    return applySkillGain(skills, choice);
  }
  if (kind === "combat") {
    const choice =
      prefer && COMBAT_SKILLS.includes(prefer) && (skills[prefer] ?? -1) < 1
        ? prefer
        : pick(COMBAT_SKILLS.filter((s) => (skills[s] ?? -1) < 1) || COMBAT_SKILLS);
    return applySkillGain(skills, choice);
  }
  return applySkillGain(skills, kind);
}

export function applyGrowthBonus(
  attrs: Record<Attribute, number>,
  entry: string,
): Record<Attribute, number> {
  const next = { ...attrs };
  const bump = (pool: Attribute[], total: number) => {
    if (total === 1) {
      const a = pick(pool);
      next[a] = Math.min(18, next[a] + 1);
      return;
    }
    if (Math.random() < 0.5) {
      const a = pick(pool);
      next[a] = Math.min(18, next[a] + 2);
    } else {
      const [a, b] = pickN(pool, 2);
      if (a) next[a] = Math.min(18, next[a] + 1);
      if (b) next[b] = Math.min(18, next[b] + 1);
    }
  };
  if (entry === "+1 Any Stat") bump(ATTRIBUTES as unknown as Attribute[], 1);
  else if (entry === "+2 Physical") bump(PHYSICAL, 2);
  else if (entry === "+2 Mental") bump(MENTAL, 2);
  return next;
}

export function applyBackgroundSkills(
  data: CharacterData,
  method: CharacterData["skillMethod"],
  learningPicks?: string[],
  growthChoices?: string[],
): CharacterData {
  const bg = backgroundById(data.backgroundId);
  if (!bg) return data;
  let skills: Partial<Record<SkillName, number>> = {};
  let attrs = { ...data.attributes };
  const growthRolls: string[] = [];
  const picks: string[] = [];

  skills = gainSkill(skills, bg.freeSkill);

  if (method === "quick") {
    for (const s of bg.quickSkills) skills = gainSkill(skills, s);
  } else if (method === "pick") {
    const chosen = (learningPicks ?? pickN(bg.learning.filter((l) => l !== "Any Skill"), 2)).slice(0, 2);
    for (const s of chosen) {
      skills = gainSkill(skills, s);
      picks.push(s);
    }
  } else {
    const rolls = growthChoices ?? [
      Math.random() < 0.5 ? `growth:${pick(bg.growth)}` : `learn:${pick(bg.learning)}`,
      Math.random() < 0.5 ? `growth:${pick(bg.growth)}` : `learn:${pick(bg.learning)}`,
      Math.random() < 0.5 ? `growth:${pick(bg.growth)}` : `learn:${pick(bg.learning)}`,
    ];
    for (const r of rolls) {
      growthRolls.push(r);
      const [kind, value] = r.split(":") as [string, string];
      if (kind === "growth") {
        if (value.startsWith("+")) attrs = applyGrowthBonus(attrs, value);
        else skills = gainSkill(skills, value);
      } else {
        skills = gainSkill(skills, value);
      }
    }
  }

  return { ...data, attributes: attrs, skills: skills as CharacterData["skills"], skillMethod: method, growthRolls, learningPicks: picks };
}

function applyFocusSkill(skills: Partial<Record<SkillName, number>>, bonus?: string): Partial<Record<SkillName, number>> {
  if (!bonus) return skills;
  if (bonus === "Perform or Sneak") return gainSkill(skills, pick(["Perform", "Sneak"] as SkillName[]));
  if (bonus === "Punch or Stab") return gainSkill(skills, pick(["Punch", "Stab"] as SkillName[]));
  return gainSkill(skills, bonus);
}

export function applyTraditionSkills(data: CharacterData): CharacterData {
  let skills = { ...data.skills };
  for (const id of data.traditions) {
    const t = traditionById(id);
    if (t) skills = gainSkill(skills, t.bonusSkill);
  }
  return { ...data, skills };
}

export function rollHitPoints(classId: ClassId, con: number, extra = 0): { roll: number; hp: number } {
  const raw = rollDie(6);
  let bonus = 0;
  if (classId === "warrior" || classId === "adventurer-ew" || classId === "adventurer-mw") bonus = 2;
  else if (classId === "mage" || classId === "adventurer-mm") bonus = -1;
  const roll = raw + bonus;
  const hp = Math.max(1, roll + attributeModifier(con) + extra);
  return { roll, hp };
}

export function blankCharacter(): CharacterData {
  const data: CharacterData = {
    name: "",
    goal: "",
    ties: "",
    level: 1,
    attributes: emptyAttributes(),
    usedArray: false,
    boostedAttribute: null,
    backgroundId: "peasant",
    skillMethod: "quick",
    skills: {},
    classId: "expert",
    traditions: [],
    foci: [],
    spells: [],
    arts: [],
    hpRoll: 4,
    hp: 4,
    equipmentMethod: "package",
    packageId: "rogue",
    silver: 0,
    gear: [],
    armorName: "Unarmored",
    armorBase: 10,
    shieldBonus: 0,
    weapons: [],
    languages: ["Native tongue", "Trade cant"],
  };
  return applyBackgroundSkills(data, "quick");
}

export function generateCharacter(partial?: Partial<CharacterData>): CharacterData {
  const usedArray = partial?.usedArray ?? Math.random() < 0.35;
  let attributes: Record<Attribute, number>;
  let rolledOrder: number[] | undefined;
  let boostedAttribute: Attribute | null = null;

  if (usedArray) {
    const order = pickN([...ATTRIBUTES], 6);
    attributes = arrayAttributes(order);
  } else {
    const rolled = rollAttributes();
    attributes = rolled.scores;
    rolledOrder = rolled.rolled;
    if (partial?.boostedAttribute) {
      boostedAttribute = partial.boostedAttribute;
      attributes[boostedAttribute] = 14;
    } else {
      const below = ATTRIBUTES.filter((a) => attributes[a] < 14);
      if (below.length) {
        boostedAttribute = below.reduce((a, b) => (attributes[a] <= attributes[b] ? a : b));
        attributes[boostedAttribute] = 14;
      }
    }
  }

  const backgroundId = partial?.backgroundId ?? pick(BACKGROUNDS).id;
  const classId = (partial?.classId ?? pick(CLASSES).id) as ClassId;
  const allowed = allowedTraditions(classId);
  const traditions: TraditionId[] =
    partial?.traditions ??
    (classId === "adventurer-mm" && allowed.length
      ? pickN(allowed.filter((t) => traditionById(t)?.casts), 2)
      : allowed.length
        ? [pick(allowed)]
        : []);

  let data: CharacterData = {
    ...blankCharacter(),
    ...partial,
    attributes,
    rolledOrder,
    usedArray,
    boostedAttribute,
    backgroundId,
    classId,
    traditions,
    skillMethod: partial?.skillMethod ?? (Math.random() < 0.4 ? "quick" : "roll"),
  };

  data = applyBackgroundSkills(data, data.skillMethod);
  data = applyTraditionSkills(data);

  const anyPicks = 1;
  const expertPicks = isExpertLike(classId) ? 1 : 0;
  const warriorPicks = isWarriorLike(classId) ? 1 : 0;
  const foci: CharacterData["foci"] = [];

  const combatFoci = FOCI.filter((f) => f.kind === "combat" || f.kind === "either");
  const noncombatFoci = FOCI.filter((f) => f.kind === "noncombat" || f.kind === "either");

  if (expertPicks) foci.push({ id: pick(noncombatFoci).id, level: 1 });
  if (warriorPicks) foci.push({ id: pick(combatFoci).id, level: 1 });
  const remaining = FOCI.filter((f) => !foci.some((x) => x.id === f.id));
  for (let i = 0; i < anyPicks; i += 1) {
    const f = pick(remaining);
    foci.push({ id: f.id, level: 1 });
  }
  data.foci = partial?.foci ?? foci;

  let skills = { ...data.skills };
  for (const f of data.foci) {
    const def = focusById(f.id);
    if (def?.bonusSkill) skills = applyFocusSkill(skills, def.bonusSkill);
  }

  const freeSkill = partial?.freeSkill ?? pick(ALL_SKILLS.filter((s) => (skills[s] ?? -1) < 1));
  skills = gainSkill(skills, freeSkill);
  data.skills = skills as CharacterData["skills"];
  data.freeSkill = freeSkill;

  const fullCaster = classId === "mage";
  const dualCaster = classId === "adventurer-mm" && traditions.every((t) => traditionById(t)?.casts);
  const castingTraditions = traditions.filter((t) => traditionById(t)?.casts);
  if (castingTraditions.length) {
    const pool = spellsForTraditions(traditions).filter((s) => s.level === 1);
    const n = startingSpellCount({ fullCaster, dualCaster });
    data.spells = partial?.spells ?? pickN(pool, Math.min(n, pool.length)).map((s) => s.id);
  }

  const arts: string[] = [];
  for (const t of traditions) {
    const n = startingArtCount({ full: fullCaster, tradition: t });
    const pool = artsForTradition(t);
    arts.push(...pickN(pool, Math.min(n, pool.length)).map((a) => a.id));
  }
  data.arts = partial?.arts ?? arts;

  const dieHard = data.foci.some((f) => f.id === "die-hard") ? 2 : 0;
  const hp = rollHitPoints(classId, data.attributes.constitution, dieHard);
  data.hpRoll = hp.roll;
  data.hp = hp.hp;

  const pkgId = partial?.packageId ?? suggestedPackage(classId);
  const pkg = packageById(pkgId);
  if (pkg) {
    const applied = applyPackage(pkg);
    data.packageId = pkgId;
    data.equipmentMethod = "package";
    data.gear = applied.gear;
    data.weapons = applied.weapons;
    data.armorName = applied.armorName;
    data.armorBase = applied.armorBase;
    data.shieldBonus = applied.shieldBonus;
    data.silver = applied.silver;
  } else {
    data.equipmentMethod = "silver";
    data.silver = sum(rollDice(3, 6)) * 10;
    data.gear = ["Ordinary clothing", "Belt knife", "Waterskin"];
  }

  const tongue = randomTongue();
  data.name = partial?.name || personName(tongue);
  data.goal = partial?.goal || pick(GOALS);
  data.ties = partial?.ties || pick(TIES);
  data.languages = languageList(data.skills);

  return data;
}

export function languageList(skills: Partial<Record<SkillName, number>>): string[] {
  const n = languageSlots(skills);
  const extras = ["Trade cant", "Old Imperial", "Temple liturgical", "Outsider pidgin", "Thieves' signs"];
  const langs = ["Native tongue"];
  for (let i = 1; i < n; i += 1) langs.push(extras[i - 1] ?? `Local dialect ${i}`);
  return langs;
}

export interface DerivedCharacter {
  label: string;
  modifiers: Record<Attribute, number>;
  saves: ReturnType<typeof savingThrows>;
  attack: number;
  ac: number;
  effort: number | null;
  prepared: number;
  castPerDay: number;
  hitDie: string;
  systemStrain: number;
  weapons: {
    name: string;
    hit: string;
    damage: string;
    shock?: string;
  }[];
}

export function derive(data: CharacterData): DerivedCharacter {
  const mods = { ...emptyAttributes() } as Record<Attribute, number>;
  for (const a of ATTRIBUTES) mods[a] = attributeModifier(data.attributes[a]);
  const developed = data.foci.filter((f) => f.id === "developed-attribute");
  for (const pickFocus of developed) {
    const named = pickFocus.notes && (ATTRIBUTES as readonly string[]).includes(pickFocus.notes)
      ? (pickFocus.notes as Attribute)
      : ATTRIBUTES.reduce((acc, a) => (mods[a] > mods[acc] ? a : acc), "strength" as Attribute);
    mods[named] = Math.min(3, mods[named] + 1);
  }

  const dex = mods.dexterity;
  const ac = data.armorBase + dex + data.shieldBonus;
  const attack = baseAttack(data.classId, data.level);
  const magicSkill = data.skills.Magic ?? -1;
  const partial = data.classId !== "mage" && isMageLike(data.classId);
  const effort =
    data.traditions.length > 0
      ? effortScore(Math.max(0, magicSkill), mods.intelligence, mods.charisma, partial)
      : null;

  const full = data.classId === "mage";
  const dual = data.classId === "adventurer-mm";
  const prepared = dual ? 3 : full ? 3 : data.traditions.some((t) => traditionById(t)?.casts) ? 2 : 0;
  const castPerDay = data.traditions.some((t) => traditionById(t)?.casts) ? 1 : 0;

  const weapons = data.weapons.map((w) => {
    const skillLv = data.skills[w.skill];
    const skillBonus = skillLv === undefined ? -2 : skillLv;
    const attr = Math.max(...w.attributes.map((a) => mods[a]));
    const hit = attack + skillBonus + attr;
    const punchBonus = w.skill === "Punch" ? (skillLv ?? 0) : 0;
    const killing = data.classId === "warrior" ? 1 : 0;
    return {
      name: w.name,
      hit: hit >= 0 ? `+${hit}` : String(hit),
      damage: `${w.damage}${attr + punchBonus + killing >= 0 ? "+" : ""}${attr + punchBonus + killing || ""}`.replace(
        /\+$/,
        "",
      ),
      shock: w.shock,
    };
  });

  return {
    label: classLabel(data.classId, data.traditions),
    modifiers: mods,
    saves: savingThrows(data),
    attack,
    ac,
    effort,
    prepared,
    castPerDay,
    hitDie: hitDieExpr(data.classId),
    systemStrain: data.attributes.constitution,
    weapons,
  };
}

export function skillLevelLabel(level: SkillLevel | number | undefined): string {
  if (level === undefined || level < 0) return "—";
  return String(level);
}

export { CLASSES, TRADITIONS, FOCI, BACKGROUNDS, SPELLS, ARTS };
