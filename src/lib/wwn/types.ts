export const ATTRIBUTES = [
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma",
] as const;

export type Attribute = (typeof ATTRIBUTES)[number];

export type SkillName =
  | "Administer"
  | "Connect"
  | "Convince"
  | "Craft"
  | "Exert"
  | "Heal"
  | "Know"
  | "Lead"
  | "Magic"
  | "Notice"
  | "Perform"
  | "Pray"
  | "Punch"
  | "Ride"
  | "Sail"
  | "Shoot"
  | "Sneak"
  | "Stab"
  | "Survive"
  | "Trade"
  | "Work";

export type SkillLevel = 0 | 1 | 2 | 3 | 4;

export type FocusKind = "combat" | "noncombat" | "either";

export type ClassId =
  | "warrior"
  | "expert"
  | "mage"
  | "adventurer-ew"
  | "adventurer-em"
  | "adventurer-mw"
  | "adventurer-mm";

export type TraditionId =
  | "high-mage"
  | "elementalist"
  | "necromancer"
  | "healer"
  | "vowed";

export type SkillMethod = "quick" | "pick" | "roll";

export type EquipmentMethod = "package" | "silver";

export interface CharacterData {
  name: string;
  goal: string;
  ties: string;
  level: number;
  attributes: Record<Attribute, number>;
  rolledOrder?: number[];
  usedArray: boolean;
  boostedAttribute?: Attribute | null;
  backgroundId: string;
  skillMethod: SkillMethod;
  growthRolls?: string[];
  learningPicks?: string[];
  skills: Partial<Record<SkillName, number>>;
  classId: ClassId;
  traditions: TraditionId[];
  foci: { id: string; level: 1 | 2; notes?: string }[];
  freeSkill?: SkillName;
  spells: string[];
  arts: string[];
  hpRoll: number;
  hp: number;
  equipmentMethod: EquipmentMethod;
  packageId?: string;
  silver: number;
  gear: string[];
  armorName: string;
  armorBase: number;
  shieldBonus: number;
  weapons: WeaponInstance[];
  languages: string[];
}

export interface WeaponInstance {
  name: string;
  damage: string;
  shock?: string;
  skill: "Stab" | "Shoot" | "Punch";
  attributes: Attribute[];
  enc: number;
}

export interface CharacterRecord {
  id: string;
  user_id: string;
  name: string;
  class_label: string;
  level: number;
  data: CharacterData;
  created_at: string;
  updated_at: string;
}

/** One lockable, editable roll-table result. */
export interface Cell<T = string> {
  id: string;
  value: T;
  locked: boolean;
  notes: string;
}

export type WorldSection =
  | "world"
  | "region"
  | "terrain"
  | "nations"
  | "gods"
  | "relationships"
  | "kingdom"
  | "all";

export interface TerrainFeature {
  id: string;
  locked: boolean;
  terrainId: Cell;
  name: Cell;
  description: Cell;
  danger: Cell;
  use: Cell;
  lastEvent: Cell;
  population: Cell;
  antagonist: Cell;
  quirk: Cell;
}

export interface Nation {
  id: string;
  locked: boolean;
  name: Cell;
  blurb: Cell;
  theme: Cell;
  themeNote: Cell;
  history: Cell[];
  wants: Cell;
  dispute: Cell;
  tie: Cell;
  values: Cell[];
}

export interface God {
  id: string;
  locked: boolean;
  name: Cell;
  portfolio: Cell;
  origin: Cell;
  function: Cell;
  want: Cell;
  note: Cell;
}

export interface Relationship {
  id: string;
  locked: boolean;
  from: Cell;
  to: Cell;
  text: Cell;
}

export interface City {
  id: string;
  locked: boolean;
  name: Cell;
  size: Cell;
  tags: Cell[];
  note: Cell;
}

export interface CourtFigure {
  id: string;
  locked: boolean;
  name: Cell;
  role: Cell;
  power: Cell;
}

export interface Court {
  id: string;
  locked: boolean;
  name: Cell;
  type: Cell;
  theme: Cell;
  tags: Cell[];
  figures: CourtFigure[];
  internalConflict: Cell;
  externalConflict: Cell;
  note: Cell;
}

export interface Ruin {
  id: string;
  locked: boolean;
  name: Cell;
  kind: Cell;
  tags: Cell[];
  note: Cell;
}

export interface Kingdom {
  name: Cell;
  language: Cell;
  history: Cell[];
  ruler: Cell;
  rulerStyle: Cell;
  rulerCount: Cell;
  rulingClass: Cell;
  legitimacy: Cell;
  enforcers: Cell;
  struggle: Cell;
  enemy: Cell;
  problems: Cell[];
  fortune: Cell;
  society: Cell;
  ethnicNotes: Cell;
  values: Cell[];
  organization: Cell;
  aesthetic: Cell;
  density: Cell;
  stability: Cell;
  formOfRule: Cell;
  localGods: God[];
  cities: City[];
  wastelands: Cell[];
  courts: Court[];
  ruins: Ruin[];
}

export interface WorldData {
  scope: Cell;
  worldName: Cell;
  physics: Cell;
  cosmology: Cell;
  empires: Cell;
  interconnected: Cell;
  recentEvent: Cell;
  regionName: Cell;
  oceanSides: Cell<number>;
  features: TerrainFeature[];
  riverCount: Cell<number>;
  lakeCount: Cell<number>;
  nations: Nation[];
  gods: God[];
  relationships: Relationship[];
  kingdom: Kingdom;
  gazetteer?: string;
}

export interface WorldRecord {
  id: string;
  user_id: string;
  name: string;
  region: string;
  data: WorldData;
  created_at: string;
  updated_at: string;
}
