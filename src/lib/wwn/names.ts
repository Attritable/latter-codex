import { pick } from "@/lib/utils";

export interface Tongue {
  id: string;
  name: string;
  note: string;
  given: string[];
  surnames: string[];
  places: string[];
  gods: string[];
}

export const TONGUES: Tongue[] = [
  {
    id: "khalan",
    name: "Khalan",
    note: "Harsh northern marches — short, consonant-heavy names.",
    given: ["Ulf", "Ragna", "Hrod", "Svala", "Eirik", "Astrid", "Gunnar", "Sigrid", "Torvald", "Yrsa", "Hakkon", "Liv"],
    surnames: ["Ash-Hand", "Red-Ford", "Winterborn", "of the Pale", "Grave-Oath", "Wolf-Lease"],
    places: ["Llaigis", "Hreth", "Varnhold", "Skelfjord", "Durholt", "Kharun"],
    gods: ["Ashur the Pale", "Mother Winter", "The Red Oath"],
  },
  {
    id: "sabean",
    name: "Sabean",
    note: "River-cities and incense roads.",
    given: ["Amal", "Zahra", "Idris", "Layla", "Qasim", "Nur", "Salim", "Yasmin", "Farid", "Hanan", "Tariq", "Samira"],
    surnames: ["al-Qasr", "of the Nine Wells", "ibn Sahr", "bint Kadir", "the Ink-Hand"],
    places: ["Qadira", "Sahrum", "Wells of Nur", "Kasra", "Iram-below"],
    gods: ["The Well-Mother", "Lord of Scales", "The Night Ledger"],
  },
  {
    id: "cymric",
    name: "Cymric",
    note: "Hill-princes, bards, and drowned kingdoms.",
    given: ["Owain", "Branwen", "Rhys", "Eira", "Gwyn", "Maredudd", "Lowri", "Iorwerth", "Nia", "Cadoc", "Sian", "Taliesin"],
    surnames: ["ap Cadoc", "ferch Bran", "of the Hollow", "Green-Tor", "Drowned-Name"],
    places: ["Caer Awel", "Ynys Du", "Glyn Rhaeadr", "Porth Mawr", "Llyn Caddug"],
    gods: ["The Horned King", "Lady of the Ford", "Three Mothers"],
  },
  {
    id: "akkadian",
    name: "Akkadian",
    note: "Ziggurat cities and clay-tablet law.",
    given: ["Ninsun", "Enlil", "Shamash", "Ishtar-bel", "Ur-Nammu", "Siduri", "Kudur", "Belit", "Nabu-rim", "Eresh"],
    surnames: ["of Ur-Kasdim", "Tablet-Keeper", "Gate of Lions", "Son of Mud"],
    places: ["Dur-Sharruk", "Eridu-Below", "Kesh", "Sippar of Dust", "The Black Canal"],
    gods: ["The Seven Who Decree", "Lady of the Storehouse", "King of the Deep"],
  },
  {
    id: "nahua",
    name: "Nahua",
    note: "High plateau temples and flower-wars.",
    given: ["Tlilpotonqui", "Xochitl", "Cuauhtli", "Citlali", "Izel", "Yaotl", "Nelli", "Itzli", "Metztli", "Coatl"],
    surnames: ["of the Reed", "Obsidian-Hand", "Two-Jaguar", "Rain-Speaker"],
    places: ["Tollan-Below", "Xochimil", "The Smoking Pass", "Atlan", "House of Darts"],
    gods: ["Smoking Mirror", "Flower-Prince", "She of the Serpent Skirt"],
  },
  {
    id: "kartvel",
    name: "Kartvel",
    note: "Wine-hills, tower-villages, and stubborn guest-law.",
    given: ["Tamar", "Giorgi", "Nino", "Levan", "Ketevan", "Irakli", "Salome", "Vakhtang", "Eka", "Shota"],
    surnames: ["of the Tower", "Wine-Oath", "Son of the Pass", "Guest-Keeper"],
    places: ["Mtskhe", "Svaneti March", "The Iron Pass", "Kura-Ford", "Ananuri"],
    gods: ["Saint of the Vine", "Lord of Towers", "The Guest-God"],
  },
  {
    id: "suomi",
    name: "Suomi",
    note: "Lake-country, sauna-rites, and forest hush.",
    given: ["Aino", "Väinö", "Kerttu", "Ilmari", "Saimi", "Tapio", "Helmi", "Eero", "Lempi", "Kaleva"],
    surnames: ["of the Nine Lakes", "Pine-Singer", "Smith of Frost", "Raven-Lease"],
    places: ["Saimaa Reach", "Kaleva", "The Silent Fells", "Pohja", "Ahtola"],
    gods: ["Tapio of the Pines", "Ahti of the Water", "Louhi the North"],
  },
  {
    id: "basque",
    name: "Euskara",
    note: "Old-hill speech that predates every empire on the map.",
    given: ["Aitor", "Nekane", "Iker", "Maite", "Unai", "Ane", "Gorka", "Irati", "Mikel", "Leire"],
    surnames: ["Etxeberria", "of the Stone House", "Red Oak", "Pass-Warden"],
    places: ["Etxalar", "The Seven Valleys", "Hondarribia", "Orreaga", "Lekeitio"],
    gods: ["Mari of the Cave", "Sugaar", "The Red Boar"],
  },
];

export function tongueById(id: string): Tongue | undefined {
  return TONGUES.find((t) => t.id === id);
}

export function randomTongue(): Tongue {
  return pick(TONGUES);
}

export function personName(tongue: Tongue = randomTongue()): string {
  const given = pick(tongue.given);
  if (Math.random() < 0.45) return `${given} ${pick(tongue.surnames)}`;
  return given;
}

export function placeName(tongue: Tongue = randomTongue()): string {
  return pick(tongue.places);
}

export function godName(tongue: Tongue = randomTongue()): { name: string; portfolio: string } {
  const portfolios = [
    "oaths and harvest",
    "the drowned and the tide",
    "forges and first fire",
    "plague and mercy",
    "borders and guest-right",
    "the unquiet dead",
    "stars and navigation",
    "kings and their undoing",
    "beasts of the arratu",
    "memory and forgetting",
  ];
  return { name: pick(tongue.gods), portfolio: pick(portfolios) };
}

export function worldName(): string {
  const a = [
    "Latter",
    "Hollow",
    "Ashen",
    "Second",
    "Waning",
    "Brass",
    "Salt",
    "Undying",
    "Twice-Named",
    "Quiet",
  ];
  const b = ["Earth", "Gyre", "March", "Wheel", "Hearth", "Sea", "Vault", "Iterum", "Shore", "Age"];
  return `the ${pick(a)} ${pick(b)}`;
}

export function regionName(tongue: Tongue = randomTongue()): string {
  const forms = [
    () => pick(tongue.places),
    () => `the ${pick(["Western", "Inner", "Lower", "High", "Broken", "Far"])} ${pick(tongue.places)}`,
    () => `${pick(tongue.places)} Reach`,
    () => `the ${pick(["Nine", "Seven", "Three", "Last"])} ${pick(["Marches", "Fords", "Crowns", "Fires"])}`,
  ];
  return pick(forms)();
}

export const GOALS = [
  "Grow rich enough to buy back a stolen name.",
  "Avenge a lord who starved the people and a loyal beast.",
  "Find a lost sibling last seen entering a Deep.",
  "Raise a freehold where no tyrant can levy bread.",
  "Steal a Working that could water a dying valley.",
  "Unmask the priest who sold the village to raiders.",
  "Chart a safe road through an arratu and sell the map.",
  "Recover a family relic from a drowned city.",
  "Win a commission that will make a spare heir matter.",
  "Learn why the stars over home have begun to fail.",
  "Break a geas laid on the bloodline three kings ago.",
  "Found a school that teaches magic without a master's leash.",
];

export const TIES = [
  "A hunting-spirit took a liking to the rest of the party; that is enough.",
  "They pulled this hero from a ditch after a tax-raid. Debts are debts.",
  "Shared a cell for three nights. The gaoler is dead; the pact is not.",
  "One of them carries a letter sealed in this hero's family wax.",
  "Hired as a guide. The pay was insulting. The company is not.",
  "Recognized a childhood mark on another traveler's wrist.",
  "Bound by a temple oath to watch each other's backs until the next new moon — and then some.",
  "The only people who laughed at the same bitter joke in a foreign inn.",
];
