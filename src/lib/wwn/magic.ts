import type { TraditionId } from "./types";

export interface SpellDef {
  id: string;
  name: string;
  level: number;
  tradition: "high-magic" | "elementalist" | "necromancer";
  summary: string;
}

export interface ArtDef {
  id: string;
  name: string;
  tradition: TraditionId;
  summary: string;
}

export const SPELLS: SpellDef[] = [
  {
    id: "apprehending-the-arcane-form",
    name: "Apprehending the Arcane Form",
    level: 1,
    tradition: "high-magic",
    summary: "See magic for 15 minutes per level, and see in the dark.",
  },
  {
    id: "cognitive-supersession",
    name: "Cognitive Supersession of the Inferior Orders",
    level: 1,
    tradition: "high-magic",
    summary: "Telepathically bond with an animal. It obeys, but will not fight.",
  },
  {
    id: "coruscating-coffin",
    name: "The Coruscating Coffin",
    level: 1,
    tradition: "high-magic",
    summary: "1d8 damage per level to a visible target, save for half. 1 HD foes die.",
  },
  {
    id: "damnation-of-the-sense",
    name: "Damnation of the Sense",
    level: 1,
    tradition: "high-magic",
    summary: "On a failed save, seize one sense of a target for a scene.",
  },
  {
    id: "decree-of-ligneous-dissolution",
    name: "Decree of Ligneous Dissolution",
    level: 1,
    tradition: "high-magic",
    summary: "Destroy all non-magic plant-derived matter in the target area.",
  },
  {
    id: "excellent-transpicuous-transformation",
    name: "The Excellent Transpicuous Transformation",
    level: 1,
    tradition: "high-magic",
    summary: "Turn one target per level invisible for an hour per caster level.",
  },
  {
    id: "imperceptible-cerebral-divulgence",
    name: "Imperceptible Cerebral Divulgence",
    level: 1,
    tradition: "high-magic",
    summary: "Read surface thoughts and pry answers from a target.",
  },
  {
    id: "ineluctable-shackles-of-volition",
    name: "Ineluctable Shackles of Volition",
    level: 1,
    tradition: "high-magic",
    summary: "Enslave a mind. The victim is visibly dazed but obedient.",
  },
  {
    id: "long-amber-moment",
    name: "The Long Amber Moment",
    level: 1,
    tradition: "high-magic",
    summary: "Put a willing creature into temporary invulnerable stasis.",
  },
  {
    id: "phantasmal-mimesis",
    name: "Phantasmal Mimesis",
    level: 1,
    tradition: "high-magic",
    summary: "Create an independently-functional illusion in the target area.",
  },
  {
    id: "velocitous-imbuement",
    name: "Velocitous Imbuement",
    level: 1,
    tradition: "high-magic",
    summary: "Augment movement speed and options of one target per level.",
  },
  {
    id: "wardpact-invocation",
    name: "Wardpact Invocation",
    level: 1,
    tradition: "high-magic",
    summary: "Make a target partly weapon-immune, or render a weapon useless.",
  },
  {
    id: "wind-of-the-final-repose",
    name: "The Wind of the Final Repose",
    level: 1,
    tradition: "high-magic",
    summary: "Put living targets of 4 HD or less to sleep in the area.",
  },
  {
    id: "elemental-weapon",
    name: "Elemental Weapon",
    level: 1,
    tradition: "elementalist",
    summary: "Sheathe a weapon in an element. Bonus damage and a rider (burn, frost, shock, or crush).",
  },
  {
    id: "mantle-of-elements",
    name: "Mantle of Elements",
    level: 1,
    tradition: "elementalist",
    summary: "Cloak an ally in flame, frost, stone, or storm for a scene.",
  },
  {
    id: "summon-the-lesser-element",
    name: "Summon the Lesser Element",
    level: 1,
    tradition: "elementalist",
    summary: "Call a small obedient elemental that cannot fight but can labor or scout.",
  },
  {
    id: "voice-of-the-deep-earth",
    name: "Voice of the Deep Earth",
    level: 1,
    tradition: "elementalist",
    summary: "Speak with stone, flame, wind, or water about what it has witnessed.",
  },
  {
    id: "query-the-skull",
    name: "Query the Skull",
    level: 1,
    tradition: "necromancer",
    summary: "Compel a corpse or skull to answer a handful of questions truthfully.",
  },
  {
    id: "smite-the-dead",
    name: "Smite the Dead",
    level: 1,
    tradition: "necromancer",
    summary: "Deal 1d8/level to an undead or spirit, or command a lesser one.",
  },
  {
    id: "unquiet-servant",
    name: "Unquiet Servant",
    level: 1,
    tradition: "necromancer",
    summary: "Animate a single corpse as a clumsy laborer or watchman for a day.",
  },
  {
    id: "pallid-mask",
    name: "The Pallid Mask",
    level: 1,
    tradition: "necromancer",
    summary: "Appear as a recently-dead corpse. The living overlook you; the dead accept you.",
  },
];

export const ARTS: ArtDef[] = [
  {
    id: "arcane-lexicon",
    name: "Arcane Lexicon",
    tradition: "high-mage",
    summary: "Commit Effort for the scene to read any unencoded script.",
  },
  {
    id: "counter-magic",
    name: "Counter Magic",
    tradition: "high-mage",
    summary: "Commit Effort for the day as Instant to oppose and fizzle a visible spell.",
  },
  {
    id: "empowered-sorcery",
    name: "Empowered Sorcery",
    tradition: "high-mage",
    summary: "Commit Effort for the day as Instant to reroll a spell's variable dice.",
  },
  {
    id: "hang-sorcery",
    name: "Hang Sorcery",
    tradition: "high-mage",
    summary: "Hang a just-cast spell and release it later as On Turn.",
  },
  {
    id: "inexorable-effect",
    name: "Inexorable Effect",
    tradition: "high-mage",
    summary: "Force an enemy to reroll a successful save, once per scene.",
  },
  {
    id: "iron-resolution",
    name: "Iron Resolution",
    tradition: "high-mage",
    summary: "Physical save to ignore disruption from injury when casting.",
  },
  {
    id: "preparatory-countermagic",
    name: "Preparatory Countermagic",
    tradition: "high-mage",
    summary: "Unaffected by a spell you have prepared, including your own area effects.",
  },
  {
    id: "psychic-conversion",
    name: "Psychic Conversion",
    tradition: "high-mage",
    summary: "Once per day, spend a slot to drop 1 System Strain and heal 2 HP/level.",
  },
  {
    id: "restrained-casting",
    name: "Restrained Casting",
    tradition: "high-mage",
    summary: "Cast a High Magic spell silently, without gestures.",
  },
  {
    id: "retain-sorcery",
    name: "Retain Sorcery",
    tradition: "high-mage",
    summary: "Once per day, a just-cast spell does not consume a slot.",
  },
  {
    id: "sense-magic",
    name: "Sense Magic",
    tradition: "high-mage",
    summary: "While Effort is committed, see magic and read standing effects in one sentence.",
  },
  {
    id: "suppress-magic",
    name: "Suppress Magic",
    tradition: "high-mage",
    summary: "Suppress a known magical effect as Extirpate Arcana for 1d6 + level rounds.",
  },
  {
    id: "swift-casting",
    name: "Swift Casting",
    tradition: "high-mage",
    summary: "Once per scene, turn a Main Action spell into an On Turn action.",
  },
  {
    id: "ward-allies",
    name: "Ward Allies",
    tradition: "high-mage",
    summary: "Omit up to six allies from an area-effect spell you cast.",
  },
  {
    id: "wizards-grandeur",
    name: "Wizard's Grandeur",
    tradition: "high-mage",
    summary: "Stay clean, unrumpled, and comfortable in any normal climate.",
  },
  {
    id: "elemental-blast",
    name: "Elemental Blast",
    tradition: "elementalist",
    summary: "Commit Effort for the scene to hurl an elemental bolt as a Main Action.",
  },
  {
    id: "elemental-resilience",
    name: "Elemental Resilience",
    tradition: "elementalist",
    summary: "Commit Effort to ignore mundane heat, cold, smoke, or drowning.",
  },
  {
    id: "shape-element",
    name: "Shape Element",
    tradition: "elementalist",
    summary: "Sculpt a nearby quantity of an element for a scene.",
  },
  {
    id: "elemental-ward",
    name: "Elemental Ward",
    tradition: "elementalist",
    summary: "Commit Effort for the day to grant an ally resistance to one element.",
  },
  {
    id: "ride-the-current",
    name: "Ride the Current",
    tradition: "elementalist",
    summary: "Move with wind, flame-leap, stone-step, or water-walk for a scene.",
  },
  {
    id: "command-the-dead",
    name: "Command the Dead",
    tradition: "necromancer",
    summary: "Commit Effort to cow or briefly command lesser undead.",
  },
  {
    id: "grave-sense",
    name: "Grave Sense",
    tradition: "necromancer",
    summary: "Perceive recent deaths, unmarked graves, and unquiet spirits nearby.",
  },
  {
    id: "life-tap",
    name: "Life Tap",
    tradition: "necromancer",
    summary: "On a hit, steal 1d6 HP from a living target. Commit Effort for the scene.",
  },
  {
    id: "pallor-of-the-tomb",
    name: "Pallor of the Tomb",
    tradition: "necromancer",
    summary: "Appear as one of the dead. Living beasts and lesser undead ignore you.",
  },
  {
    id: "unquiet-counsel",
    name: "Unquiet Counsel",
    tradition: "necromancer",
    summary: "Ask a question of a known dead person; the answer is a whisper, not a guarantee.",
  },
  {
    id: "healing-touch",
    name: "Healing Touch",
    tradition: "healer",
    summary: "Main Action: heal 1d6 + Heal + level HP. Adds 1 System Strain to the target.",
  },
  {
    id: "empowered-healer",
    name: "Empowered Healer",
    tradition: "healer",
    summary: "Healing Touch adds your level again, or affects two adjacent targets.",
  },
  {
    id: "purge-affliction",
    name: "Purge Affliction",
    tradition: "healer",
    summary: "Commit Effort for the day to neutralize a poison, disease, or curse of mortal origin.",
  },
  {
    id: "restore-vitality",
    name: "Restore Vitality",
    tradition: "healer",
    summary: "Spend ten minutes and Effort for the day to remove 1 System Strain from an ally.",
  },
  {
    id: "far-healer",
    name: "Far Healer",
    tradition: "healer",
    summary: "Healing Touch and purge arts may be used at short range, not only by touch.",
  },
  {
    id: "merciful-hands",
    name: "Merciful Hands",
    tradition: "healer",
    summary: "Stabilize a Mortally Wounded ally as an Instant action, once per scene.",
  },
  {
    id: "unarmed-adept",
    name: "Unarmed Adept",
    tradition: "vowed",
    summary: "Unarmed attacks use Punch and deal 1d6. You may Shock as a light weapon.",
  },
  {
    id: "iron-skin",
    name: "Iron Skin",
    tradition: "vowed",
    summary: "While unarmored, AC is 15 + half level. Dexterity still applies.",
  },
  {
    id: "leap-of-the-crane",
    name: "Leap of the Crane",
    tradition: "vowed",
    summary: "Commit Effort for the scene to jump, fall, or climb as if Exert-2.",
  },
  {
    id: "inner-force",
    name: "Inner Force",
    tradition: "vowed",
    summary: "Commit Effort for the day to add Punch to damage on an unarmed hit.",
  },
  {
    id: "still-mind",
    name: "Still Mind",
    tradition: "vowed",
    summary: "Reroll a failed Mental save once per scene.",
  },
  {
    id: "diamond-fist",
    name: "Diamond Fist",
    tradition: "vowed",
    summary: "Unarmed attacks count as magical and ignore 4 points of AC from armor.",
  },
];

export function spellsForTraditions(ids: TraditionId[]): SpellDef[] {
  const allowHigh = ids.some((t) => t === "high-mage" || t === "elementalist" || t === "necromancer");
  return SPELLS.filter((s) => {
    if (s.tradition === "high-magic") return allowHigh;
    if (s.tradition === "elementalist") return ids.includes("elementalist");
    if (s.tradition === "necromancer") return ids.includes("necromancer");
    return false;
  });
}

export function artsForTradition(id: TraditionId): ArtDef[] {
  return ARTS.filter((a) => a.tradition === id);
}

export function spellById(id: string): SpellDef | undefined {
  return SPELLS.find((s) => s.id === id);
}

export function artById(id: string): ArtDef | undefined {
  return ARTS.find((a) => a.id === id);
}

export function startingSpellCount(opts: {
  fullCaster: boolean;
  dualCaster: boolean;
}): number {
  if (opts.dualCaster) return 4;
  if (opts.fullCaster) return 4;
  return 2;
}

export function startingArtCount(opts: { full: boolean; tradition: TraditionId }): number {
  if (opts.tradition === "healer" || opts.tradition === "vowed") return 2;
  return opts.full ? 2 : 1;
}
