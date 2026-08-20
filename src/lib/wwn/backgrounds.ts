import type { SkillName } from "./types";

export type GrowthEntry = "+1 Any Stat" | "+2 Physical" | "+2 Mental" | string;

export interface Background {
  id: string;
  name: string;
  blurb: string;
  freeSkill: SkillName;
  quickSkills: SkillName[];
  growth: GrowthEntry[];
  learning: string[];
}

export const BACKGROUNDS: Background[] = [
  {
    id: "artisan",
    name: "Artisan",
    blurb: "Blacksmith, carpenter, shipwright, weaver, or maker of stranger goods.",
    freeSkill: "Craft",
    quickSkills: ["Trade", "Connect"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Connect", "Convince", "Craft", "Craft", "Exert", "Know", "Notice", "Trade"],
  },
  {
    id: "barbarian",
    name: "Barbarian",
    blurb: "Hill-tribe, jungle clan, or frontier wildling counted savage even here.",
    freeSkill: "Survive",
    quickSkills: ["Stab", "Notice"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Any Combat", "Connect", "Exert", "Lead", "Notice", "Punch", "Sneak", "Survive"],
  },
  {
    id: "carter",
    name: "Carter",
    blurb: "Caravan hauler, village shipper, or messenger riding post through peril.",
    freeSkill: "Ride",
    quickSkills: ["Connect", "Stab"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Any Combat", "Connect", "Craft", "Exert", "Notice", "Ride", "Survive", "Trade"],
  },
  {
    id: "courtesan",
    name: "Courtesan",
    blurb: "Companion of song, dance, or rented affection — polished or streetwise.",
    freeSkill: "Perform",
    quickSkills: ["Notice", "Connect"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Mental", "+2 Physical", "Connect", "Any Skill"],
    learning: ["Any Combat", "Connect", "Convince", "Exert", "Notice", "Perform", "Survive", "Trade"],
  },
  {
    id: "criminal",
    name: "Criminal",
    blurb: "Thief, con, burglar, or impostor already living by nerve and timing.",
    freeSkill: "Sneak",
    quickSkills: ["Connect", "Convince"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Physical", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Administer", "Any Combat", "Connect", "Convince", "Exert", "Notice", "Sneak", "Trade"],
  },
  {
    id: "hunter",
    name: "Hunter",
    blurb: "Trapper, gamekeeper, poacher, or hermit who lives by the bow.",
    freeSkill: "Shoot",
    quickSkills: ["Survive", "Sneak"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Any Combat", "Exert", "Heal", "Notice", "Ride", "Shoot", "Sneak", "Survive"],
  },
  {
    id: "laborer",
    name: "Laborer",
    blurb: "Urban day-worker betting the city is kinder than the furrow.",
    freeSkill: "Work",
    quickSkills: ["Connect", "Exert"],
    growth: ["+1 Any Stat", "+1 Any Stat", "+1 Any Stat", "+1 Any Stat", "Exert", "Any Skill"],
    learning: ["Administer", "Any Skill", "Connect", "Convince", "Craft", "Exert", "Ride", "Work"],
  },
  {
    id: "merchant",
    name: "Merchant",
    blurb: "Prince of caravans or pack-peddler — trade is a dangerous calling.",
    freeSkill: "Trade",
    quickSkills: ["Convince", "Connect"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Mental", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Administer", "Any Combat", "Connect", "Convince", "Craft", "Know", "Notice", "Trade"],
  },
  {
    id: "noble",
    name: "Noble",
    blurb: "Spare heir, exile, or black sheep still carrying an elite education.",
    freeSkill: "Lead",
    quickSkills: ["Connect", "Administer"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Mental", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Administer", "Any Combat", "Connect", "Convince", "Know", "Lead", "Notice", "Ride"],
  },
  {
    id: "nomad",
    name: "Nomad",
    blurb: "Beast-rider or wagon-folk always one pasture ahead of reprisal.",
    freeSkill: "Ride",
    quickSkills: ["Survive", "Stab"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Any Combat", "Connect", "Exert", "Lead", "Notice", "Ride", "Survive", "Trade"],
  },
  {
    id: "peasant",
    name: "Peasant",
    blurb: "Rural laborer hardened by hunger, toil, and making-do.",
    freeSkill: "Exert",
    quickSkills: ["Sneak", "Survive"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Physical", "Exert", "Any Skill"],
    learning: ["Connect", "Exert", "Craft", "Notice", "Sneak", "Survive", "Trade", "Work"],
  },
  {
    id: "performer",
    name: "Performer",
    blurb: "Bard, dancer, actor, or poet living on applause and patrons.",
    freeSkill: "Perform",
    quickSkills: ["Convince", "Connect"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Physical", "+2 Physical", "Connect", "Any Skill"],
    learning: ["Any Combat", "Connect", "Exert", "Notice", "Perform", "Perform", "Sneak", "Convince"],
  },
  {
    id: "physician",
    name: "Physician",
    blurb: "Village herbalist or city doctor of horoscopes, sutures, and metals.",
    freeSkill: "Heal",
    quickSkills: ["Know", "Notice"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Mental", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Administer", "Connect", "Craft", "Heal", "Know", "Notice", "Convince", "Trade"],
  },
  {
    id: "priest",
    name: "Priest",
    blurb: "Monk, nun, hermit, or temple technician of rites and payment.",
    freeSkill: "Pray",
    quickSkills: ["Convince", "Know"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Physical", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Administer", "Connect", "Know", "Lead", "Heal", "Convince", "Pray", "Pray"],
  },
  {
    id: "sailor",
    name: "Sailor",
    blurb: "Captain, bargeman, pirate, or deckhand used to sudden peril.",
    freeSkill: "Sail",
    quickSkills: ["Exert", "Notice"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Any Combat", "Connect", "Craft", "Exert", "Heal", "Notice", "Perform", "Sail"],
  },
  {
    id: "scholar",
    name: "Scholar",
    blurb: "Sage, failed apprentice-mage, or institutional book-eater.",
    freeSkill: "Know",
    quickSkills: ["Heal", "Administer"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Mental", "+2 Mental", "Connect", "Any Skill"],
    learning: ["Administer", "Heal", "Craft", "Know", "Notice", "Perform", "Pray", "Convince"],
  },
  {
    id: "slave",
    name: "Slave",
    blurb: "Runaway, rebel, or freed laborer from house or mine.",
    freeSkill: "Sneak",
    quickSkills: ["Survive", "Exert"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Administer", "Any Combat", "Any Skill", "Convince", "Exert", "Sneak", "Survive", "Work"],
  },
  {
    id: "soldier",
    name: "Soldier",
    blurb: "Mercenary, militiaman, temple knight, or raider tired of poor pay.",
    freeSkill: "Stab",
    quickSkills: ["Exert", "Survive"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Physical", "Exert", "Any Skill"],
    learning: ["Any Combat", "Any Combat", "Exert", "Lead", "Notice", "Ride", "Sneak", "Survive"],
  },
  {
    id: "thug",
    name: "Thug",
    blurb: "Village bully, enforcer, assassin, or neighborhood protector.",
    freeSkill: "Stab",
    quickSkills: ["Convince", "Connect"],
    growth: ["+1 Any Stat", "+2 Mental", "+2 Physical", "+2 Physical", "Connect", "Any Skill"],
    learning: ["Any Combat", "Any Combat", "Connect", "Convince", "Exert", "Notice", "Sneak", "Survive"],
  },
  {
    id: "wanderer",
    name: "Wanderer",
    blurb: "Exile, explorer, or traveler whose home no longer has a place.",
    freeSkill: "Survive",
    quickSkills: ["Sneak", "Notice"],
    growth: ["+1 Any Stat", "+2 Physical", "+2 Physical", "+2 Mental", "Exert", "Any Skill"],
    learning: ["Any Combat", "Connect", "Notice", "Perform", "Ride", "Sneak", "Survive", "Work"],
  },
];

export function backgroundById(id: string): Background | undefined {
  return BACKGROUNDS.find((b) => b.id === id);
}
