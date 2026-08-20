import type { Attribute, WeaponInstance } from "./types";

export interface GearItem {
  name: string;
  enc: number | string;
  kind?: "armor" | "shield" | "weapon" | "kit" | "cash" | "beast";
  ac?: number;
  shieldBonus?: number;
  damage?: string;
  shock?: string;
  skill?: WeaponInstance["skill"];
  attributes?: Attribute[];
  silver?: number;
}

export interface EquipmentPackage {
  id: string;
  name: string;
  blurb: string;
  items: GearItem[];
}

export const PACKAGES: EquipmentPackage[] = [
  {
    id: "peasant",
    name: "Adventuring Peasant",
    blurb: "War-shirt, spear, and a mule — the classic hard-luck start.",
    items: [
      { name: "War Shirt", enc: 0, kind: "armor", ac: 11 },
      { name: "Large Shield", enc: 1, kind: "shield", shieldBonus: 3, ac: 14 },
      {
        name: "Light Spear",
        enc: 1,
        kind: "weapon",
        damage: "1d6",
        shock: "2/AC 13",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      {
        name: "Dagger",
        enc: 1,
        kind: "weapon",
        damage: "1d4",
        shock: "1/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      { name: "Backpack", enc: 1, kind: "kit" },
      { name: "Rations, 1 week", enc: 4, kind: "kit" },
      { name: "Mule and small cart", enc: 0, kind: "beast" },
      { name: "Tinder box and 3 torches", enc: 1, kind: "kit" },
    ],
  },
  {
    id: "ranger",
    name: "Ranger or Archer",
    blurb: "Buff coat, great bow, and a week of trail food.",
    items: [
      { name: "Buff Coat", enc: 0, kind: "armor", ac: 12 },
      {
        name: "Bow, Large",
        enc: 2,
        kind: "weapon",
        damage: "1d8",
        skill: "Shoot",
        attributes: ["dexterity"],
      },
      { name: "20 arrows & quiver", enc: 1, kind: "kit" },
      {
        name: "Dagger",
        enc: 1,
        kind: "weapon",
        damage: "1d4",
        shock: "1/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      {
        name: "Hand Axe",
        enc: 1,
        kind: "weapon",
        damage: "1d6",
        shock: "1/AC 15",
        skill: "Stab",
        attributes: ["strength"],
      },
      { name: "Backpack", enc: 1, kind: "kit" },
      { name: "Cooking utensils and 1 week of rations", enc: 5, kind: "kit" },
      { name: "Waterskin", enc: 1, kind: "kit" },
      { name: "Tinder box and 3 torches", enc: 1, kind: "kit" },
      { name: "20 silver pieces", enc: 0, kind: "cash", silver: 20 },
    ],
  },
  {
    id: "warrior",
    name: "Armored Warrior",
    blurb: "Pieced harness, large shield, and a short sword.",
    items: [
      { name: "Pieced Armor", enc: 2, kind: "armor", ac: 14 },
      { name: "Large Shield", enc: 1, kind: "shield", shieldBonus: 1 },
      {
        name: "Short Sword",
        enc: 1,
        kind: "weapon",
        damage: "1d6",
        shock: "2/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      {
        name: "Dagger",
        enc: 1,
        kind: "weapon",
        damage: "1d4",
        shock: "1/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      { name: "Backpack", enc: 1, kind: "kit" },
      { name: "Tinder box and 3 torches", enc: 1, kind: "kit" },
    ],
  },
  {
    id: "rogue",
    name: "Roguish Wanderer",
    blurb: "Light harness, throwing blades, hook and rope.",
    items: [
      { name: "Buff Coat", enc: 0, kind: "armor", ac: 12 },
      { name: "Small Shield", enc: 1, kind: "shield", shieldBonus: 1, ac: 13 },
      {
        name: "Short Sword",
        enc: 1,
        kind: "weapon",
        damage: "1d6",
        shock: "2/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      {
        name: "Throwing Blades, 5",
        enc: 1,
        kind: "weapon",
        damage: "1d4",
        skill: "Shoot",
        attributes: ["dexterity"],
      },
      { name: "Backpack", enc: 1, kind: "kit" },
      { name: "Rations, 1 week", enc: 4, kind: "kit" },
      { name: "Waterskin", enc: 1, kind: "kit" },
      { name: "Tinder box and 3 torches", enc: 1, kind: "kit" },
      { name: "Grappling hook and 50' of rope", enc: 2, kind: "kit" },
    ],
  },
  {
    id: "gentry",
    name: "Gentry Wayfarer",
    blurb: "Traveling clothes, a decent blade, and letters of introduction.",
    items: [
      { name: "Buff Coat", enc: 0, kind: "armor", ac: 12 },
      { name: "Small Shield", enc: 1, kind: "shield", shieldBonus: 1, ac: 13 },
      {
        name: "Short Sword",
        enc: 1,
        kind: "weapon",
        damage: "1d6",
        shock: "2/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      { name: "Backpack", enc: 1, kind: "kit" },
      { name: "Rations, 1 week", enc: 4, kind: "kit" },
      { name: "Waterskin", enc: 1, kind: "kit" },
      { name: "Fine suit of clothing", enc: 1, kind: "kit" },
      { name: "Writing kit & 20 sheets of paper", enc: 1, kind: "kit" },
      { name: "20 silver coins", enc: 0, kind: "cash", silver: 20 },
    ],
  },
  {
    id: "scholar",
    name: "Mage, Healer, or Scholar",
    blurb: "Staff, lantern, healer's pouch, and a purse of silver.",
    items: [
      {
        name: "Dagger",
        enc: 1,
        kind: "weapon",
        damage: "1d4",
        shock: "1/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      {
        name: "Dagger (spare)",
        enc: 1,
        kind: "weapon",
        damage: "1d4",
        shock: "1/AC 15",
        skill: "Stab",
        attributes: ["strength", "dexterity"],
      },
      {
        name: "Staff",
        enc: 1,
        kind: "weapon",
        damage: "1d6",
        shock: "1/AC 13",
        skill: "Stab",
        attributes: ["strength"],
      },
      { name: "Backpack", enc: 1, kind: "kit" },
      { name: "Lantern, tinder box, and 2 pint flasks of oil", enc: 3, kind: "kit" },
      { name: "Writing kit & 20 sheets of paper", enc: 1, kind: "kit" },
      { name: "Rations, 1 week", enc: 4, kind: "kit" },
      { name: "Waterskin", enc: 1, kind: "kit" },
      { name: "Healer's pouch", enc: 1, kind: "kit" },
      { name: "80 silver pieces", enc: 0, kind: "cash", silver: 80 },
    ],
  },
];

export function packageById(id: string): EquipmentPackage | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function suggestedPackage(classId: string): string {
  if (classId === "warrior" || classId === "adventurer-ew" || classId === "adventurer-mw") {
    return "warrior";
  }
  if (classId === "mage" || classId === "adventurer-mm" || classId === "adventurer-em") {
    return "scholar";
  }
  return "rogue";
}

export function applyPackage(pkg: EquipmentPackage): {
  gear: string[];
  weapons: WeaponInstance[];
  armorName: string;
  armorBase: number;
  shieldBonus: number;
  silver: number;
} {
  const gear: string[] = [];
  const weapons: WeaponInstance[] = [];
  let armorName = "Unarmored";
  let armorBase = 10;
  let shieldBonus = 0;
  let silver = 0;

  for (const item of pkg.items) {
    if (item.kind === "armor" && item.ac) {
      armorName = item.name;
      armorBase = item.ac;
    } else if (item.kind === "shield") {
      shieldBonus = item.shieldBonus ?? 1;
    } else if (item.kind === "weapon" && item.damage && item.skill && item.attributes) {
      weapons.push({
        name: item.name,
        damage: item.damage,
        shock: item.shock,
        skill: item.skill,
        attributes: item.attributes,
        enc: typeof item.enc === "number" ? item.enc : 1,
      });
    } else if (item.kind === "cash") {
      silver += item.silver ?? 0;
    }
    gear.push(item.name);
  }

  return { gear, weapons, armorName, armorBase, shieldBonus, silver };
}
