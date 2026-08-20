import { COMMUNITY_TAGS as COMMUNITY_TAG_DEFS, COURT_TAGS as COURT_TAG_DEFS, RUIN_TAGS as RUIN_TAG_DEFS } from "./tags";

export const SCOPES = [
  { id: "sandbox", name: "Regional sandbox", blurb: "A two-hundred-mile square of quarreling nations and empty space." },
  { id: "intrigue", name: "Court intrigue", blurb: "One capital, a dozen knives, and no clean exits." },
  { id: "delve", name: "Ruin-delving", blurb: "A border keep and the Deeps that open beneath it." },
  { id: "nautical", name: "Nautical", blurb: "Island-hopping, piracy, and ports that change flags overnight." },
  { id: "frontier", name: "Frontier march", blurb: "Hardscrabble settlements facing an arratu and whatever lives in it." },
  { id: "city", name: "Hive-city", blurb: "One vast megalopolis and the ruined districts that feed it." },
];

export const PHYSICS = [
  "Natural law is as Earth, save where the Legacy has locally failed.",
  "Two moons hang in the sky; the lesser one is a ruin.",
  "There is no true night — only a long rust-colored dusk.",
  "The world is flat beneath a cracked crystal dome. Stars are holes.",
  "Water remembers names spoken over it and will not drown those it loves.",
  "Machines more subtle than a water-wheel fail within a season.",
  "The sun is a working, and some years it forgets to rise on time.",
  "Gravity thins on high places; mountaintops are half-afloat.",
];

export const COSMOLOGY = [
  "No afterworld is agreed upon. Priests sell many, and none refund.",
  "A Crawling Dark sits behind the stars; the wise do not look up too long.",
  "The dead go to a gray Iterum that sometimes leaks back.",
  "Gods are dead kings whose Workings still answer the correct rite.",
  "Heavens and hells are neighboring Iterums, some of them still inhabited.",
  "The Legacy itself is the only divinity that reliably answers.",
];

export const EMPIRES = [
  "The Brass Mandarinate still collects tribute in the form of living statues.",
  "A hollow-earth empire of the old Outsiders sends tribute-fleets once a generation.",
  "The Last Hegemon's banners are honored in name; their tax-ships no longer come.",
  "A sorcerer-queen of a drowned continent still dreams her laws into coastal towns.",
  "No global power remains. Distance is the only empire.",
  "The Sodality of Wisdom claims every High Mage as a citizen, wherever they sleep.",
];

export const INTERCONNECT = [
  "Caravans and coasting ships keep the region in gossip, if not in law.",
  "Mountain and arratu isolate every valley; neighbors are rumors.",
  "A still-working high road of the ancients crosses the region in a straight line.",
  "Only river traffic is safe. Overland is a gamble with raiders and worse.",
  "Pilgrimage routes bind the temples; everything else is local.",
  "A shared liturgical tongue lets sages write to each other across a thousand miles.",
];

export const RECENT_EVENTS = [
  "A star fell and the sea nearest it has not been right since.",
  "A hegemonic tax-fleet failed to arrive for the first time in living memory.",
  "The Legacy flickered for nine days; every Working in the world stuttered.",
  "A new plague that does not kill, but forgets names, is moving west.",
  "An Iterum-gate opened in a capital and has not closed.",
  "The last known Legate died, or vanished, or became something else.",
  "A crop-working failed across three kingdoms in the same season.",
  "Raiders flying no banner have begun taking people, not silver.",
];

export const TERRAIN = [
  { id: "farmland", name: "Ancient farmland", color: "#6b7a4e", note: "Re-engineered for optimal farming by a vanished people." },
  { id: "arratu", name: "Arratu wasteland", color: "#6a4a3a", note: "Xenofarmed by Outsiders into a place hostile to human life." },
  { id: "blasted", name: "Blasted lands", color: "#5a5348", note: "Scorched or poisoned by ancient war. Ruins are common." },
  { id: "canyons", name: "Canyons", color: "#8a6a4a", note: "Cut by rivers present or long-vanished." },
  { id: "dense-forest", name: "Dense forest", color: "#2f4a34", note: "Trackless, dark, and an effective natural barrier." },
  { id: "grasslands", name: "Grasslands", color: "#7a8a4e", note: "A coherent sweep of savanna or grassy plains." },
  { id: "islands", name: "Islands", color: "#4a6a6a", note: "A significant island or archipelago off the coast." },
  { id: "jagged-mountains", name: "Jagged mountains", color: "#6a6864", note: "Young, tall, and likely casting a rain shadow." },
  { id: "jungle", name: "Jungle", color: "#2a4a2e", note: "Wild, semi-alien flora and fauna." },
  { id: "light-forest", name: "Light forest", color: "#4a6a44", note: "Interspersed with other terrain." },
  { id: "megaplex", name: "Megaplex", color: "#5a4a4a", note: "Ruins of a single huge ancient structure stretching for miles." },
  { id: "pit", name: "Pit", color: "#3a322c", note: "A Deep or megastructure collapsed into a hole tens of miles wide." },
  { id: "rain-forest", name: "Rain forest", color: "#245238", note: "Vast, damp, and green." },
  { id: "rocky-hills", name: "Rocky hills", color: "#6a5a48", note: "Little arable land. Herding and raiding pay better than farming." },
  { id: "rolling-hills", name: "Rolling hills", color: "#6a7a52", note: "Gently rolling, good agricultural country." },
  { id: "sand-desert", name: "Sand desert", color: "#b08a4a", note: "Dunes. Rain shadow, or a legacy of ancient war." },
  { id: "scrub-desert", name: "Scrub desert", color: "#9a7a4a", note: "Leeward of mountains. Borders often grasslands." },
  { id: "swamp", name: "Swamp", color: "#3a4a3a", note: "Sinking river, lake margin, or wet coastal delta." },
  { id: "volcano", name: "Volcano", color: "#6a3a32", note: "Natural, or a consequence of Legacy flux." },
  { id: "weathered-mountains", name: "Weathered mountains", color: "#5a5854", note: "Rounded, with a skirt of hills and a limited rain shadow." },
];

export const DANGER = [
  "Safer than usual for someplace like it",
  "There's one notable kind of danger there",
  "It's got some site-specific flavors of peril",
  "It's unusually dangerous in several ways",
  "It will quickly kill the unprepared or unwary",
  "It's a death zone for all but the strongest",
];

export const USES = [
  "A rare and precious resource is found there",
  "Ancient sites and relics are common there",
  "It's sacred land to a group or religion",
  "Controlling it has military significance",
  "It has substantial productive infrastructure",
  "A major trade route goes through it",
  "Uncontrolled, it's a nest of raiders and worse",
  "A mighty Working is still functioning there",
];

export const LAST_EVENTS = [
  "A significant battle was fought there",
  "A mad prophet tried to start a faith there",
  "A usurper and supporters fled into it",
  "A resource strike drew numerous people",
  "A major nest of bandits or raiders formed",
  "A rich ancient ruin was discovered there",
  "An uncanny plague erupted in the area",
  "Some grim and terrible thing was awoken",
  "A community of outcasts or marginals formed",
  "A natural or uncanny disaster struck there",
];

export const POPULATION = [
  "Almost unpopulated for something like it",
  "Very few settlers or workers there",
  "Average or more population density",
  "A rush of people have gone there",
];

export const ANTAGONISTS = [
  "Violent secessionist rebels",
  "Angry cultists of a local faith",
  "Locals who resent interloping outsiders",
  "A type of cunning, dangerous beast",
  "Relic-creatures of ancient settlements",
  "Elemental emanations of the disordered land",
  "A hostile sentient monster civilization",
  "Brutal envoys of the central government",
  "Raiders and bandits driven into the area",
  "Rapacious local lords and gang bosses",
  "Remnants of a furious native population",
  "Outsider remnants with a bitter grudge",
];

export const QUIRKS = [
  "It has significant magical structures in it",
  "It has a place in the national origin legend",
  "It is entirely man-made by ancient arts",
  "Time and space sometimes slip there",
  "The magical power there attracts wizards",
  "It subtly changes those who live there",
  "It's holy land to a particular faith",
  "It was formerly a different kind of terrain",
  "It has human-worked vistas of beauty",
  "It was formerly an Outsider stronghold",
  "A significant part of it is subterranean",
  "It'd expand were it not for ancient wards",
  "It was a nature preserve of a megastructure",
  "It's maintained by an ancient artificial mind",
  "Magic is somehow warped in its area",
  "The flora and fauna are queasily off",
  "The locals once populated it more heavily",
  "Rulership of the feature is widely disputed",
  "It's riddled with caves and delvings",
  "A unique type of sentient lives there",
];

export const NATION_THEMES = [
  { name: "Barbarism", note: "Brutal savagery is always near the surface — from without, or from within." },
  { name: "Decadence", note: "Voluptuous cruelty; pleasures bought at someone else's ruin." },
  { name: "Despair", note: "Hope is unlooked-for. Evils are accepted as weather." },
  { name: "Exhaustion", note: "Strength spent: cut forests, spent rivers, a people too tired to improve." },
  { name: "Ignorance", note: "False gods and necessary errors. Truth would unmake the peace." },
  { name: "Oppression", note: "Rule is a crushing weight, justified with a philosophy that almost sounds true." },
  { name: "Poverty", note: "Even the rich are poor. Bread is policy." },
  { name: "Precarity", note: "Whatever good exists is under siege and may crumble this season." },
  { name: "Stratification", note: "Classes do not touch. Birth writes the law." },
  { name: "Violence", note: "Life is cheap. A death in bed is unlooked-for." },
  { name: "Enlightenment", note: "Academies matter. Finding the truth outranks a quiet lie." },
  { name: "Expansion", note: "Borders swell by conquest, marriage, or a culture people want to join." },
  { name: "Hope", note: "A better day is spoken of as if it were already on the road." },
  { name: "Justice", note: "Laws are meant, and often are, applied evenly." },
  { name: "Legitimacy", note: "The structures of rule feel eternal, even when the people in them are not." },
  { name: "Pageantry", note: "Splendor and ritual actually bind the place together." },
  { name: "Prosperity", note: "Famine is a story about other kingdoms." },
  { name: "Renewal", note: "Old houses rise, rotten offices are shaken, things grow brighter." },
  { name: "Triumph", note: "A victory is still warm. New hands reach for the spoils." },
  { name: "Unity", note: "Purposes are shared. Strangers rank below kin." },
];

export const HISTORY = [
  { name: "Battleground", note: "The land was fought over by two stronger powers, and suffered for it." },
  { name: "Betrayal", note: "A trusting neighbor was sold, or they were sold by one." },
  { name: "Brutal Oppression", note: "Some portion of the people was reduced to wretched subservience." },
  { name: "Class Struggle", note: "Orders of society fought, subtly or with knives, each for its own gain." },
  { name: "Decadence", note: "Old strengths crumbled into indulgence." },
  { name: "Depravity", note: "Vile habits became commonplace among those who could afford them." },
  { name: "Desolation", note: "A portion of the territory was rendered uninhabitable, for a long time or forever." },
  { name: "Diplomatic Coup", note: "An alliance was struck that may yet persist." },
  { name: "Economic Boom", note: "Circumstances produced a burst of tremendous prosperity." },
  { name: "Enemies Within", note: "A hostile sub-group worked evil, perhaps for a neighbor." },
  { name: "Evil Wizard", note: "A malevolent sorcerer or cult caused a great deal of trouble." },
  { name: "Exodus", note: "A significant chunk packed up and left for a supposedly-superior land." },
  { name: "Exquisite Art", note: "Art was produced that is still revered, in general or in one medium." },
  { name: "External War", note: "A war with an outside rival left grave consequences." },
  { name: "Freakish Magic", note: "A type of magic developed here that is unknown elsewhere." },
  { name: "Golden Age", note: "Everything went remarkably well for an extended period." },
  { name: "Good Wizard", note: "A magic-using power protected, taught, or otherwise assisted them." },
  { name: "Great Awakening", note: "A wave of reform and re-commitment to venerable values swept through." },
  { name: "Great Builders", note: "Palaces, monuments, or estates of wide fame were raised." },
  { name: "Great Infrastructure", note: "Canals, walls, roads, aqueducts, or mines were accomplished." },
  { name: "Hero King", note: "A ruler achieved legendary glory. The name is still honored." },
  { name: "Immigrants", note: "A large group of foreigners entered, welcomed or not." },
  { name: "Inefficient Rule", note: "Governance was impractical or corrupt, holding to unhelpful values." },
  { name: "Internal War", note: "Civil war involved all or many of the people." },
  { name: "Loss of Confidence", note: "A shock made the people lose faith in their own customs." },
  { name: "Magical Disaster", note: "Large-scale magic scarred them, natural or someone else's doing." },
  { name: "Magical Tech", note: "A useful widespread magical infrastructure was developed, and may survive." },
  { name: "Natural Calamity", note: "Earthquake, drought, tsunami, or falling star smote them." },
  { name: "New Horizons", note: "New territory was discovered — far, deep, or through a gate." },
  { name: "New Rulers", note: "The former dynasty was replaced, peacefully or by conquest." },
  { name: "Noble Function", note: "The ruling class was expected to fill a specific role: priest, mage, scholar." },
  { name: "Noble Strife", note: "The nobility embroiled itself in assassinations and petty wars." },
  { name: "Plague", note: "A sickness of vast scope culled many, and may yet linger." },
  { name: "Poverty", note: "Circumstances reduced them to harsh simplicity for a time." },
  { name: "Power Brokers", note: "Their aid decided who would be hegemon of the region." },
  { name: "Praetorian Coups", note: "Guardsmen became the ruler's electors or deposers." },
  { name: "Priest King", note: "Religion intertwined with legitimacy; priests became nobles and vice-versa." },
  { name: "Rare Resource", note: "A uniquely valuable resource was found or made, and used to full effect." },
  { name: "Religious Fall", note: "A once-honored religion collapsed through displeasure, corruption, or suppression." },
  { name: "Religious Rise", note: "A powerful new religion arose among them." },
  { name: "Resource Collapse", note: "Water, timber, arable land, or magical power ran short." },
  { name: "Secession", note: "A substantial portion of the territory tried to leave, successfully or not." },
  { name: "Terrain Change", note: "Some portion of the land slowly changed its ecosystem." },
  { name: "Total Collapse", note: "Society fell into anarchistic chaos for a time." },
  { name: "Urbanization", note: "One or more cities grew vastly, with a wide net of supporting towns." },
  { name: "Weak Throne", note: "Central government became weak; subsidiaries gained independence." },
  { name: "Xenophilia", note: "Many foreign customs were adopted, and many foreigners joined." },
  { name: "Xenophobia", note: "A strong distaste for outsiders curtailed contact." },
];

export const DISPUTES = [
  "Raiders are taking refuge in their lands",
  "Ownership of a resource site is disputed",
  "A usurper or criminal is being sheltered there",
  "A troublemaking religion is based there",
  "Their rulers have a political claim on the throne",
  "A diplomatic marriage is going sour",
  "A past war's savagery has left deep scars",
  "Their culture is supplanting local beliefs",
  "Their immigrants are gaining great influence",
  "They broke off an alliance or important pact",
  "They lured away an academy or great temple",
  "Border tariffs and taxes are blocking trade",
  "They drove a terrible beast into this land",
  "A Working of theirs caused problems here",
  "They woke up a great peril from the past",
  "They're cooperating with an enemy group",
  "They're suspected of backing assassinations",
  "A spy ring is suspected or has been found",
  "They refused to give aid for some current need",
  "They've been hostile to an allied group",
];

export const TIES = [
  "The ruling classes are related in some way",
  "An important faith crosses the border",
  "They fought by our side sometime in the past",
  "Their culture is widely admired here",
  "They helped to overcome an eldritch peril",
  "They held back an enemy from our border",
  "They are co-ethnics of the same origins",
  "They provide critical trade relations",
  "Sages and scholars came from there",
  "They gave critical aid during a disaster",
  "A hero of this land came originally from there",
  "A past hero-king once ruled both lands",
  "They produce some vital commodity",
  "They have a shared enemy",
  "A Working they have is helpful here, too",
  "A long-standing alliance or trade pact exists",
  "They recently conceded some disputed land",
  "They greatly admire elements of this culture",
  "They're considered unusually attractive here",
  "They took in refugees from here at one point",
];

export const PROBLEMS = [
  "Farmland is becoming worn-out and depleted",
  "Verminous monsters are swarming",
  "A rebel front is stirring up trouble",
  "An outside power is backing internal strife",
  "The leadership is inept and distracted",
  "A religious reformer is breaking old compacts",
  "An evil is provoking outraged rioting",
  "Dark cults are attracting the ambitious",
  "A Blighted horde is threatening the borders",
  "An ancient ruin has disgorged some peril",
  "Malcontents have obtained a potent artifact",
  "Luxuriance has left the nation's coffers bare",
  "Local aristocrats are pushing for independence",
  "An important mine has run out or been harmed",
  "A sinister favorite has infatuated the leader",
  "A recurring plant plague is causing hunger",
  "Fearsome monsters are migrating into the land",
  "A rival is preparing for war or raiding",
  "A grand national plan is exhausting the people",
  "A savage grudge has erupted between lords",
];

export const FORTUNES = [
  "A splendid mine or resource has been found",
  "A pious saint is strengthening a major faith",
  "A noble heir shows signs of heroic greatness",
  "A major rival has recently suffered a calamity",
  "New farmland has been opened up recently",
  "A new trade route has been forged",
  "A horrible monster was slain or driven off",
  "Good harvests have enriched the people",
  "A wicked minister has been deposed",
  "A new academy has recently opened",
  "A bandit or rebel uprising has been crushed",
  "Two rival lords have started to make peace",
  "An old enemy has agreed to a peace pact",
  "The military won a recent smashing victory",
  "A helpful Working has been activated",
  "A powerful artifact is helping the ruler",
  "An old source of unrest has been calmed",
  "A dark cult has been revealed and purged",
  "New diplomatic ties have been made",
  "A new lord has risen, loved by the people",
];

export const RULER_STYLES = [
  "A careful steward who taxes lightly and forgets nothing",
  "A war-prince who thinks every problem is a campaign",
  "A child on the throne; the regent is the real question",
  "A priest-king who rules by omen and ledger",
  "A merchant-doge elected by those who can afford the vote",
  "A usurper still wearing last year's blood",
  "A beloved fool steered by a competent favorite",
  "A scholar who would rather annotate the law than enforce it",
  "A hard judge who is fair, and therefore hated",
  "A dying monarch whose heirs have already drawn maps",
  "A council that cannot agree on the color of the seal",
  "A foreign satrap who collects and does not stay",
];

export const SOCIETIES = [
  "Village custom outweighs written law except in the capital.",
  "Guest-right is sacred; kin-right is more so.",
  "Status is worn on the sleeve — dyes, metals, and who may ride.",
  "A caste of scribes runs everything a sword cannot.",
  "Duels settle slights; courts settle taxes.",
  "The dead are consulted before any marriage or war.",
  "Slavery exists but manumission is a public virtue.",
  "Magic is licensed. Unlicensed talent is a hanging matter.",
  "Every free adult owes forty days' levy or the coin equivalent.",
  "Foreigners may trade, but may not own roofs or graves.",
];

/** Book community tags (50). Names only — blurbs live in tags.ts. */
export const COMMUNITY_TAGS = COMMUNITY_TAG_DEFS.map((t) => t.name);
export const COURT_TAG_NAMES = COURT_TAG_DEFS.map((t) => t.name);
export const RUIN_TAG_NAMES = RUIN_TAG_DEFS.map((t) => t.name);

export const WANTS = [
  "a recognized claim on a neighbor's river-ford",
  "a temple raised in a hostile capital",
  "exclusive rights to a newly-struck mine",
  "the return of a stolen relic or heir",
  "a marriage that would end a three-generation feud",
  "safe passage through an arratu they cannot garrison",
  "the death of a particular priest, quietly",
  "grain enough to survive the next failed harvest",
  "recognition as the orthodox church of a shared god",
  "a Working repaired before the canal fails",
];

export const RULER_COUNTS = [
  "A single nominal monarch",
  "A monarch and several under-kings",
  "A group of approximate equals",
  "A large number of small rulers",
];

export const RULING_CLASSES = [
  "Hereditary nobility of blood",
  "Powerful merchant-princes and oligarchs",
  "Sorcerers and the arcanely skilled",
  "Magically-empowered bloodlines",
  "Proletariat peasantry or artisans",
  "A minority ethnicity of long historical rule",
  "Clergy of one or more local faiths",
  "Citizens of a special city or old homeland",
  "Outsiders or nonhumans of a certain type",
  "Warlords or military leaders",
  "Clan heads or ethnarchs of particular groups",
  "Colonizer viceroys of a foreign hegemon",
];

export const LEGITIMACY = [
  "They've simply always been the rulers",
  "They're thought wiser and more virtuous",
  "Their martial prowess is awe-inspiring",
  "The gods chose them as the leaders",
  "They were chosen by popular will",
  "They're loved for their benevolence",
  "They utterly crushed the last batch of rebels",
  "They brought greater prosperity to the land",
  "They smashed the prior government",
  "They brought order out of bloody chaos",
  "They led the nation to greater glory and pride",
  "They seem less bad than the alternatives",
];

export const ENFORCERS = [
  "Subordinate lords pledged to the ruler",
  "Obedient commoner bureaucracies",
  "Magically-empowered enforcers",
  "A major religion allied with state power",
  "A powerful and respected judiciary",
  "Savage brutes on the government leash",
  "Economy-controlling officialdom",
  "Divine blessings and curses on the people",
  "Ingrained obedience in the populace",
  "Hireling enforcers employed at need",
  "Sorcerers in service to the ruler",
  "A specific ethnic client group of the ruler",
];

export const STRUGGLES = [
  "The ruler is trying to crush a too-powerful lord",
  "Ministers are trying to usurp power",
  "A grand scheme has gone terribly wrong",
  "External diplomacy has bungled something",
  "A usurper secretly controls a major power",
  "Foreign rivals are backing malcontents",
  "A different class demands a share of rule",
  "The existing ruling class wants more power",
  "A disfavored class is being oppressed",
  "Popular discontent is destroying legitimacy",
  "The prior ruler's incompetence still harms it",
  "The heir is unacceptable to many",
];

export const ENEMIES = [
  "a usurping cousin with a foreign purse",
  "a peasant league that has learned to read the tax-rolls",
  "a slowly-advancing army that does not eat",
  "the high priest of the official faith",
  "a merchant-prince who already owns the harbors",
  "a bastard line with older papers than the throne",
  "a Blighted host gathering in the nearest wasteland",
  "the second city, which means to be first",
];

export const GOD_ORIGINS = [
  "A deified ancestor-king or progenitor",
  "A legendary historical hero or teacher",
  "An abstract principle reified as an entity",
  "It simply always existed since creation",
  "An apotheosized sorcerer",
  "The genius of a particular land or location",
  "An Outsider or alien from beyond",
  "A personified natural phenomenon",
  "Another faith's saint turned into a god",
  "A tamed or placated supernatural entity",
  "An artificial construct built by humans",
];

export const GOD_FUNCTIONS = [
  "War god or patron of those who fight",
  "Favorite god of the ruling class",
  "Patron of an important profession",
  "A devil-figure that must be placated",
  "Provides healing or protection from danger",
  "Patron of an illegal but inevitable trade",
  "Hallows the law and consecrates oaths",
  "Flatly illegal and hated by most",
  "Protector of an ethnic minority",
  "Provides good harvests or human fertility",
  "Patron of the former rulers of the land",
  "Guards particular places within the land",
  "Provides wisdom and insight at need",
  "Gives good luck to its petitioners",
  "Protector of the weak and humble",
  "Empowers those seeking revenge for wrongs",
  "Bestows material wealth upon petitioners",
  "Protects the soul in the afterlife",
  "Explains the creation and order of the world",
  "Prevents some type of common disaster",
];

export const GOD_WANTS = [
  "Crush its religious rivals in the area",
  "Destroy a heretical but powerful sub-sect",
  "Expand the faith to a foreign land or people",
  "Recover holy land or a sacred site",
  "Obtain vast material wealth for the faith",
  "Depose a hostile royal house or government",
  "Smash a specific enemy faith or group",
  "Embody their god with a mighty ritual",
  "Erect a huge and imposing temple complex",
  "Perform a tremendously expensive rite",
  "Strengthen or protect its devout believers",
];

export const CITY_SIZES = ["Capital", "Second city", "Market town", "Frontier stockade", "Temple-city", "Port"];

/** Values They Esteem — society/nation layer (WWN). Roll two. */
export const VALUES = [
  "Ancestral piety and the keeping of the old ways",
  "Artistic excellence — a people judged by what they make",
  "Cunning; the clever lie is admired more than the clean blow",
  "Formal courtesy and the exact performance of ceremony",
  "Honesty and plain speech, even when it costs",
  "Hospitality; a guest's safety is a public virtue",
  "Martial glory and the names of those who died well",
  "Mercantile success; profit is proof of heaven's favor",
  "Physical beauty, cultivated and displayed",
  "Pious devotion and the daily rite",
  "Scholarly learning and the keeping of books",
  "Stoic endurance; complaint is a kind of sin",
  "Subtlety and the art of not being seen to act",
  "Wealth and the open showing of it",
  "Blood and lineage; birth is the first law",
  "Personal liberty; a free adult answers to few",
  "Communal duty; the household outranks the self",
  "Vengeance for slights, kept warm across years",
  "Generosity and open hands at festival",
  "Fearlessness, including the stupid kind",
];

export const ORGANIZATIONS = [
  "Extended clans that share work, roofs, and blood-guilt",
  "Isolated households that owe the tax and nothing else",
  "Urban wards and neighborhood associations that police their own",
  "Guilds that are more family than trade",
  "Temple congregations; the parish is the real village",
  "Patron and client pyramids from hut to hall",
  "Age-grades and warrior societies that cut across blood",
  "Castes fixed by birth and forbidden to touch",
  "Village communes that rotate offices by lot",
  "Great houses with client villages in their shadow",
];

export const AESTHETICS = [
  "Brilliant dyes and hammered metal on even modest clothes",
  "Austere undyed wool and wooden beads",
  "Full-body tattoos that mark rank and debts",
  "Veils and covered hair for anyone past childhood",
  "Hats so elaborate they are a form of law",
  "Shaved heads and painted eyes",
  "Furs and bone in the old hill style",
  "Silk scraps worn over patched linen",
  "Uniforms even for farmers in the planting season",
  "Masks in public; a bare face is for kin",
  "Painted teeth and lacquered nails as caste marks",
  "Bare arms and a knife worn where everyone can count it",
];

export const DENSITIES = [
  "Almost empty wilderness with a few stubborn steadings",
  "Scattered villages; a day's walk between hearths",
  "Typical agricultural country; towns every few days",
  "Thickly settled; you are seldom out of sight of smoke",
  "Urban hive — one of the region's great population centers",
];

export const STABILITIES = [
  "Collapsing; the center cannot hold another season",
  "Freshly conquered or newly founded, and still bleeding",
  "Unstable; one crisis from a change of hands",
  "The usual tensions; government is expected to continue",
  "Long-established and accepted, even by its enemies",
  "Ossified; change is almost unthinkable, which is its own danger",
];

export const FORMS_OF_RULE = [
  "Autocracy of a single will",
  "Oligarchy of a closed elite",
  "Magocracy of those who can work the arts",
  "Theocracy of a faith and its officers",
  "Tribal or clan confederacy",
  "Republic of enfranchised citizens",
  "Feudal pyramid of oaths and land",
  "Military command dressed as civil law",
  "Monarchy by blood, with all the usual cousins",
  "A council of approximate equals who hate the word king",
];

export const COURT_TYPES = ["Aristocratic", "Business", "Criminal", "Familial", "Religious"];

export const COURT_THEMES = [
  "A house living on last century's name",
  "New money trying to buy old manners",
  "A pious circle that collects more than it prays",
  "A family that is also a conspiracy",
  "A counting-house that already owns the harbor",
  "A thieves' court that settles more cases than the magistrate",
  "A war-band wintering as a household",
  "Scholars whose library is a faction",
];

export const COURT_FIGURE_ROLES = [
  "The seated power — signs, or pretends to",
  "The purse; nothing moves without their mark",
  "The favorite; access is the office",
  "The heir who is not supposed to be",
  "The old soldier who still commands the gate",
  "The clerk who remembers every slight",
  "The foreign spouse with a second loyalty",
  "The chaplain who hears what the walls should not",
  "The bastard used for work the name cannot touch",
  "The rival who smiles at every feast",
];

export const COURT_POWERS = [
  "Commands the household guard",
  "Holds the seals and the correspondence",
  "Owns the debts of three lesser houses",
  "Can call a mob in the lower wards",
  "Has the ear of the temple",
  "Knows where the bodies are, literally",
  "Can close a market with a rumor",
  "Is loved by the common soldiers",
  "Has a Working bound to their blood",
  "Can ruin a name with one dinner invitation withheld",
];

export const COURT_INTERNAL = [
  "Two factions will not sit at the same table",
  "The succession is already a knife-fight in slow motion",
  "Someone is selling the court's secrets by the page",
  "A marriage alliance is being forced that will split the house",
  "The books no longer match the rooms they describe",
  "A younger line is collecting retainers it should not have",
];

export const COURT_EXTERNAL = [
  "A rival court wants this one absorbed or erased",
  "The crown needs a favor this court cannot safely give",
  "A foreign envoy is shopping for a traitor",
  "The street has begun to hate their livery",
  "A temple has named them impious in public",
  "A creditor from abroad is arriving with papers and men",
];

export const RUIN_KINDS = [
  "Tomb-complex of a forgotten dynasty",
  "Fortress that lost its war and not its walls",
  "Sunken or half-swallowed city",
  "Temple whose god is no longer answered",
  "Mine that went deeper than sense",
  "Shattered Working, still warm in places",
  "Outsider habitat not meant for human lungs",
  "Palace of a hegemon, picked but not emptied",
  "Collapsed megastructure rib",
  "Sealed vault with too many warning-marks",
];
