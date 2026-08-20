import type { FocusKind, SkillName } from "./types";

export interface FocusDef {
  id: string;
  name: string;
  kind: FocusKind;
  maxLevel: 1 | 2;
  bonusSkill?: SkillName | "Any Combat" | "Any Skill" | "Perform or Sneak" | "Punch or Stab";
  restricted?: "mage-only-armor" | "not-mage" | "expert-only" | "lucky" | "repeatable";
  repeatable?: boolean;
  blurb: string;
  levels: { level: 1 | 2; text: string }[];
}

export const FOCI: FocusDef[] = [
  {
    id: "alert",
    name: "Alert",
    kind: "either",
    maxLevel: 2,
    bonusSkill: "Notice",
    blurb: "Virtually impossible to take unaware.",
    levels: [
      {
        level: 1,
        text: "Cannot be surprised; immune to Execution Attacks. +1 side initiative, or roll twice.",
      },
      { level: 2, text: "Always act first unless another combatant is also this Alert." },
    ],
  },
  {
    id: "armored-magic",
    name: "Armored Magic",
    kind: "noncombat",
    maxLevel: 2,
    restricted: "mage-only-armor",
    blurb: "Channel spells through conventional armor.",
    levels: [
      { level: 1, text: "Cast in armor of Encumbrance 2 or less. May use a shield if one hand is free." },
      { level: 2, text: "Cast in any armor, even with both hands full (but not bound)." },
    ],
  },
  {
    id: "armsmaster",
    name: "Armsmaster",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Stab",
    blurb: "Unusual competence with melee and thrown weapons.",
    levels: [
      {
        level: 1,
        text: "Ready a stowed melee/thrown weapon as Instant. Add Stab to damage and Shock.",
      },
      { level: 2, text: "Your Shock treats targets as AC 10. +1 to hit with melee or thrown attacks." },
    ],
  },
  {
    id: "artisan",
    name: "Artisan",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Craft",
    blurb: "Remarkable crafter who can improvise even outside their trade.",
    levels: [
      { level: 1, text: "Craft counts +1 (max 5) for mods. Mods need one fewer salvage. Any mundane craft." },
      { level: 2, text: "First mod on an item: no Maintenance, half silver. Auto-succeed at masterwork." },
    ],
  },
  {
    id: "assassin",
    name: "Assassin",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Sneak",
    blurb: "Practiced at sudden murder and Execution Attacks.",
    levels: [
      {
        level: 1,
        text: "Conceal a knife-sized object. Surprise-round point-blank attacks with it cannot miss.",
      },
      { level: 2, text: "Take a Move on the same round as an Execution Attack, split before and after." },
    ],
  },
  {
    id: "authority",
    name: "Authority",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Lead",
    blurb: "People instinctively follow your instructions.",
    levels: [
      { level: 1, text: "Once per day, Cha/Lead vs. an NPC's Morale for a non-harmful request." },
      { level: 2, text: "Followers gain your Lead to Morale and hit rolls, and +1 on skill checks." },
    ],
  },
  {
    id: "close-combatant",
    name: "Close Combatant",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Any Combat",
    blurb: "Desperate close-in fighting and shock evasion.",
    levels: [
      {
        level: 1,
        text: "Throw knives in melee. Ignore melee Shock (disrupts spellcasting that round).",
      },
      { level: 2, text: "Your Shock treats targets as AC 10. Fighting Withdrawal is On Turn." },
    ],
  },
  {
    id: "connected",
    name: "Connected",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Connect",
    blurb: "Wherever you go, you know somebody useful.",
    levels: [
      { level: 1, text: "After a week in a place, one modestly-illegal favor per day from contacts." },
      { level: 2, text: "Once per session, meet someone you know who will do modest favors." },
    ],
  },
  {
    id: "cultured",
    name: "Cultured",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Connect",
    blurb: "Wide experience of regional customs, laws, and languages.",
    levels: [
      { level: 1, text: "Speak the region's common tongues. Learn a language in a week. One minor favor/day." },
      { level: 2, text: "Once per session, reroll a failed social skill check." },
    ],
  },
  {
    id: "die-hard",
    name: "Die Hard",
    kind: "either",
    maxLevel: 2,
    blurb: "Surprisingly hard to kill.",
    levels: [
      { level: 1, text: "+2 maximum HP per level. Automatically stabilize if Mortally Wounded." },
      { level: 2, text: "First time each day you hit 0 HP, survive at 1 HP instead." },
    ],
  },
  {
    id: "deadeye",
    name: "Deadeye",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Shoot",
    blurb: "A gift with bows and other ranged weapons.",
    levels: [
      { level: 1, text: "Ready a ranged weapon Instantly. Add Shoot to damage. Fire in melee at −4." },
      { level: 2, text: "Reload as On Turn. No melee penalty. Once/scene, auto-hit an inanimate target." },
    ],
  },
  {
    id: "dealmaker",
    name: "Dealmaker",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Trade",
    blurb: "Sniff out traders and force a bargain.",
    levels: [
      { level: 1, text: "In half an hour, find a buyer or seller for anything the community trades." },
      { level: 2, text: "Once per session, a sentient not trying to kill you will name a price for a request." },
    ],
  },
  {
    id: "developed-attribute",
    name: "Developed Attribute",
    kind: "either",
    maxLevel: 1,
    restricted: "not-mage",
    repeatable: true,
    blurb: "One attribute's modifier is unusually developed.",
    levels: [
      { level: 1, text: "Choose an attribute; its modifier increases by +1, to a maximum of +3." },
    ],
  },
  {
    id: "diplomatic-grace",
    name: "Diplomatic Grace",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Convince",
    blurb: "Uncanny personal negotiation.",
    levels: [
      { level: 1, text: "Speak regional languages. Reroll 1s on negotiation checks." },
      { level: 2, text: "Once per day, consecrate a specific bargain; Mental save to break it." },
    ],
  },
  {
    id: "gifted-chirurgeon",
    name: "Gifted Chirurgeon",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Heal",
    blurb: "Unusual gift for saving the Mortally Wounded.",
    levels: [
      { level: 1, text: "Stabilize as On Turn. Heal checks roll 3d6 drop lowest. Double first-aid HP." },
      { level: 2, text: "Heal 1d6+Heal as Main Action (magical). Adds 1 System Strain." },
    ],
  },
  {
    id: "henchkeeper",
    name: "Henchkeeper",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Lead",
    blurb: "A knack for picking up lost souls who do your bidding.",
    levels: [
      { level: 1, text: "Acquire loyal non-combat henchmen in a day. One per 3 levels, rounded up." },
      { level: 2, text: "Henchmen fight as Veteran Soldiers and stay against most odds." },
    ],
  },
  {
    id: "impervious-defense",
    name: "Impervious Defense",
    kind: "combat",
    maxLevel: 2,
    blurb: "Natural defenses equivalent to high-quality armor.",
    levels: [
      { level: 1, text: "Innate AC 15 + half level (does not stack with armor; Dex and shields apply)." },
      { level: 2, text: "Once per day, shrug off a single weapon attack or physical trauma." },
    ],
  },
  {
    id: "impostor",
    name: "Impostor",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Perform or Sneak",
    blurb: "Disguise, voice, and lightning wardrobe changes.",
    levels: [
      { level: 1, text: "Once/scene reroll a failed imposture check. Maintain one modest false identity." },
      { level: 2, text: "Swap among three appearances as a Main Action. New identity per city." },
    ],
  },
  {
    id: "lucky",
    name: "Lucky",
    kind: "either",
    maxLevel: 2,
    restricted: "lucky",
    blurb: "Luck that favors the already-unblessed.",
    levels: [
      { level: 1, text: "Once/week, a killing or disabling blow fails. Roll games of chance twice." },
      { level: 2, text: "Once/session roll 1d6: 2+ something fortunate; 1 the situation worsens." },
    ],
  },
  {
    id: "nullifier",
    name: "Nullifier",
    kind: "either",
    maxLevel: 2,
    restricted: "not-mage",
    blurb: "Something about you interferes with magic.",
    levels: [
      { level: 1, text: "+2 saves vs magic in 20'. Sense magic. First failed magic save each day succeeds." },
      { level: 2, text: "Once/day, ignore an unwanted magical or monstrous supernatural effect." },
    ],
  },
  {
    id: "poisoner",
    name: "Poisoner",
    kind: "either",
    maxLevel: 2,
    bonusSkill: "Heal",
    blurb: "Compound toxins from common flora and minerals.",
    levels: [
      { level: 1, text: "Brew doses equal to level. 2d6+level, Physical for half. Reroll poison saves." },
      { level: 2, text: "Immune to poison. Detection/saves vs your toxins take −Heal. Ingested = Execution." },
    ],
  },
  {
    id: "polymath",
    name: "Polymath",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Any Skill",
    restricted: "expert-only",
    blurb: "A passing acquaintance with almost every practical skill.",
    levels: [
      { level: 1, text: "Treat all non-combat skills as at least level-0 for checks." },
      { level: 2, text: "Treat all non-combat skills as at least level-1 for checks." },
    ],
  },
  {
    id: "rider",
    name: "Rider",
    kind: "either",
    maxLevel: 2,
    bonusSkill: "Ride",
    blurb: "An almost supernatural bond with steeds.",
    levels: [
      { level: 1, text: "Steeds Morale 12, use your AC if better, travel +50%. Intuitive communication." },
      { level: 2, text: "Once/scene negate a hit on your steed. Reroll a Ride check. Telepathic bond." },
    ],
  },
  {
    id: "shocking-assault",
    name: "Shocking Assault",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Punch or Stab",
    blurb: "Melee ferocity that stresses even when blows miss.",
    levels: [
      { level: 1, text: "Your Shock treats all valid targets as AC 10." },
      { level: 2, text: "+2 Shock rating on melee and unarmed attacks that do Shock." },
    ],
  },
  {
    id: "snipers-eye",
    name: "Sniper's Eye",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Shoot",
    blurb: "Expert at placing a knife or arrow on an unsuspecting target.",
    levels: [
      { level: 1, text: "Ranged Execution / target-shooting checks roll 3d6 drop lowest." },
    ],
  },
  {
    id: "specialist",
    name: "Specialist",
    kind: "noncombat",
    maxLevel: 2,
    restricted: "repeatable",
    repeatable: true,
    blurb: "Remarkable talent at one non-combat, non-Magic skill.",
    levels: [
      { level: 1, text: "Gain that skill. Roll 3d6 drop lowest on its checks." },
      { level: 2, text: "Roll 4d6 drop the two lowest on its checks." },
    ],
  },
  {
    id: "spirit-familiar",
    name: "Spirit Familiar",
    kind: "noncombat",
    maxLevel: 2,
    blurb: "A minor spirit, devil, or construct as a devoted companion.",
    levels: [
      { level: 1, text: "Summon/dismiss a noncombat servitor. Once/day it refreshes 1 Committed Effort." },
      { level: 2, text: "Pick two familiar benefits (HP, attack, skill, extra shape, flight, speech)." },
    ],
  },
  {
    id: "trapmaster",
    name: "Trapmaster",
    kind: "noncombat",
    maxLevel: 2,
    bonusSkill: "Notice",
    blurb: "Uncommon expertise with mundane and magical traps.",
    levels: [
      { level: 1, text: "Once/scene reroll a trap save or check. Five minutes to improvise a snare." },
      { level: 2, text: "Once/scene your work counts as Extirpate Arcana vs. a stationary magical hazard." },
    ],
  },
  {
    id: "unarmed-combatant",
    name: "Unarmed Combatant",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Punch",
    blurb: "Empty hands more dangerous than most swords.",
    levels: [
      { level: 1, text: "Unarmed damage scales with Punch (1d6 at 0 to 1d12+1 at 4). Shock at Punch-1+." },
      { level: 2, text: "Even on a miss, deal 1d6 plus any Shock." },
    ],
  },
  {
    id: "valiant-defender",
    name: "Valiant Defender",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Punch or Stab",
    blurb: "Bodyguard gifted at screening allies.",
    levels: [
      { level: 1, text: "+2 Screen Ally. Screen one extra attacker. Can screen vs. spells and blasts." },
      { level: 2, text: "First Screen Ally each round auto-succeeds. +2 AC while screening." },
    ],
  },
  {
    id: "well-met",
    name: "Well Met",
    kind: "noncombat",
    maxLevel: 2,
    blurb: "Charm and pacify people you've just met — once.",
    levels: [
      { level: 1, text: "+1 to reaction rolls while present. Hostiles usually grant a round to parley." },
      { level: 2, text: "Once/session, force a reaction to be as friendly as is plausible." },
    ],
  },
  {
    id: "whirlwind-assault",
    name: "Whirlwind Assault",
    kind: "combat",
    maxLevel: 2,
    bonusSkill: "Stab",
    blurb: "A frenzy of bloody havoc among lesser melee foes.",
    levels: [
      { level: 1, text: "Once/scene, apply Shock to all foes in melee as an On Turn action." },
      { level: 2, text: "The first kill each round grants an immediate extra attack." },
    ],
  },
  {
    id: "xenoblooded",
    name: "Xenoblooded",
    kind: "either",
    maxLevel: 1,
    blurb: "Outsider-touched — survive environments humans were never meant to.",
    levels: [
      {
        level: 1,
        text: "Choose one: heat/smoke immunity; water-breathing; gravity ±1 Str/Dex; or no need to eat, sleep, or breathe, and see in darkness.",
      },
    ],
  },
];

export function focusById(id: string): FocusDef | undefined {
  return FOCI.find((f) => f.id === id);
}

export function isRepeatableFocus(def: FocusDef): boolean {
  return def.repeatable === true || def.restricted === "repeatable";
}

export function focusSlotCost(foci: { level: number }[]): number {
  return foci.reduce((n, f) => n + f.level, 0);
}
