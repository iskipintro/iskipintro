import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const BASE = "data";

const series = [
  // === Already in DB (batch 1) ===
  {
    slug: "avatar-the-last-airbender",
    title: "Avatar: The Last Airbender",
    tmdb_id: 246,
    imdb_id: "tt0417299",
    episode_len: 23 * 60,
    anime: true,
    seasons: [
      [1, "Book 1: Water", 20],
      [2, "Book 2: Earth", 20],
      [3, "Book 3: Fire", 21],
    ],
  },
  {
    slug: "arcane",
    title: "Arcane",
    tmdb_id: 94605,
    imdb_id: "tt11126994",
    episode_len: 40 * 60,
    anime: true,
    seasons: [
      [1, "Season 1", 9],
      [2, "Season 2", 9],
    ],
  },
  {
    slug: "the-bear",
    title: "The Bear",
    tmdb_id: 114795,
    imdb_id: "tt14452776",
    episode_len: 30 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
    ],
  },
  {
    slug: "severance",
    title: "Severance",
    tmdb_id: 95396,
    imdb_id: "tt11280740",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 9],
      [2, "Season 2", 10],
    ],
  },
  {
    slug: "fallout",
    title: "Fallout",
    tmdb_id: 206471,
    imdb_id: "tt12637874",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 8],
    ],
  },
  {
    slug: "ted-lasso",
    title: "Ted Lasso",
    tmdb_id: 107717,
    imdb_id: "tt10986410",
    episode_len: 30 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 12],
      [3, "Season 3", 12],
    ],
  },
  {
    slug: "demon-slayer",
    title: "Demon Slayer: Kimetsu no Yaiba",
    tmdb_id: 85937,
    imdb_id: "tt9335498",
    episode_len: 24 * 60,
    anime: true,
    seasons: [
      [1, "Season 1", 26],
      [2, "Season 2: Mugen Train Arc + Entertainment District Arc", 18],
      [3, "Season 3: Swordsmith Village Arc", 11],
      [4, "Season 4: Hashira Training Arc", 8],
    ],
  },
  {
    slug: "the-sopranos",
    title: "The Sopranos",
    tmdb_id: 1398,
    imdb_id: "tt0141842",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
      [4, "Season 4", 13],
      [5, "Season 5", 13],
      [6, "Season 6", 21],
    ],
  },
  {
    slug: "dexter",
    title: "Dexter",
    tmdb_id: 1405,
    imdb_id: "tt0773262",
    episode_len: 53 * 60,
    seasons: [
      [1, "Season 1", 12],
      [2, "Season 2", 12],
      [3, "Season 3", 12],
      [4, "Season 4", 12],
      [5, "Season 5", 12],
      [6, "Season 6", 12],
      [7, "Season 7", 12],
      [8, "Season 8", 12],
    ],
  },
  {
    slug: "band-of-brothers",
    title: "Band of Brothers",
    tmdb_id: 4612,
    imdb_id: "tt0185906",
    episode_len: 60 * 60,
    seasons: [
      [1, "Season 1", 10],
    ],
  },
  // === New batch ===
  {
    slug: "lost",
    title: "Lost",
    tmdb_id: 4607,
    imdb_id: "tt0411008",
    episode_len: 43 * 60,
    seasons: [
      [1, "Season 1", 25],
      [2, "Season 2", 24],
      [3, "Season 3", 23],
      [4, "Season 4", 14],
      [5, "Season 5", 17],
      [6, "Season 6", 18],
    ],
  },
  {
    slug: "house",
    title: "House M.D.",
    tmdb_id: 1408,
    imdb_id: "tt0412142",
    episode_len: 44 * 60,
    seasons: [
      [1, "Season 1", 22],
      [2, "Season 2", 24],
      [3, "Season 3", 24],
      [4, "Season 4", 16],
      [5, "Season 5", 24],
      [6, "Season 6", 22],
      [7, "Season 7", 23],
      [8, "Season 8", 22],
    ],
  },
  {
    slug: "cobra-kai",
    title: "Cobra Kai",
    tmdb_id: 77169,
    imdb_id: "tt7221388",
    episode_len: 30 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
      [5, "Season 5", 10],
      [6, "Season 6", 15],
    ],
  },
  {
    slug: "wednesday",
    title: "Wednesday",
    tmdb_id: 119051,
    imdb_id: "tt13433812",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 8],
    ],
  },
  {
    slug: "the-last-of-us",
    title: "The Last of Us",
    tmdb_id: 100088,
    imdb_id: "tt3581920",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 9],
      [2, "Season 2", 7],
    ],
  },
  {
    slug: "invincible",
    title: "Invincible",
    tmdb_id: 95557,
    imdb_id: "tt6741278",
    episode_len: 48 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 8],
      [3, "Season 3", 8],
    ],
  },
  {
    slug: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    tmdb_id: 113737,
    imdb_id: "tt12343534",
    episode_len: 24 * 60,
    anime: true,
    seasons: [
      [1, "Season 1", 24],
      [2, "Season 2", 23],
    ],
  },
  {
    slug: "chainsaw-man",
    title: "Chainsaw Man",
    tmdb_id: 127646,
    imdb_id: "tt13616990",
    episode_len: 24 * 60,
    anime: true,
    seasons: [
      [1, "Season 1", 12],
    ],
  },
  {
    slug: "cowboy-bebop",
    title: "Cowboy Bebop",
    tmdb_id: 20686,
    imdb_id: "tt0213338",
    episode_len: 24 * 60,
    anime: true,
    seasons: [
      [1, "Season 1", 26],
    ],
  },
  {
    slug: "steins-gate",
    title: "Steins;Gate",
    tmdb_id: 46532,
    imdb_id: "tt1910272",
    episode_len: 24 * 60,
    anime: true,
    seasons: [
      [1, "Season 1", 24],
    ],
  },
  // === Batch 3 ===
  {
    slug: "the-walking-dead",
    title: "The Walking Dead",
    tmdb_id: 1402,
    imdb_id: "tt1520211",
    episode_len: 45 * 60,
    seasons: [
      [1, "Season 1", 6],
      [2, "Season 2", 13],
      [3, "Season 3", 16],
      [4, "Season 4", 16],
      [5, "Season 5", 16],
    ],
  },
  {
    slug: "hannibal",
    title: "Hannibal",
    tmdb_id: 16216,
    imdb_id: "tt2243973",
    episode_len: 44 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
    ],
  },
  {
    slug: "the-expanse",
    title: "The Expanse",
    tmdb_id: 63639,
    imdb_id: "tt3230854",
    episode_len: 45 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
      [4, "Season 4", 10],
      [5, "Season 5", 10],
      [6, "Season 6", 6],
    ],
  },
  {
    slug: "mindhunter",
    title: "Mindhunter",
    tmdb_id: 67744,
    imdb_id: "tt5290382",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 9],
    ],
  },
  {
    slug: "ozark",
    title: "Ozark",
    tmdb_id: 69740,
    imdb_id: "tt5071412",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
      [4, "Season 4", 14],
    ],
  },
  {
    slug: "westworld",
    title: "Westworld",
    tmdb_id: 63247,
    imdb_id: "tt0475784",
    episode_len: 60 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
      [3, "Season 3", 8],
      [4, "Season 4", 8],
    ],
  },
  {
    slug: "bojack-horseman",
    title: "BoJack Horseman",
    tmdb_id: 61222,
    imdb_id: "tt3398228",
    episode_len: 25 * 60,
    seasons: [
      [1, "Season 1", 12],
      [2, "Season 2", 12],
      [3, "Season 3", 12],
      [4, "Season 4", 12],
      [5, "Season 5", 12],
      [6, "Season 6", 16],
    ],
  },
  {
    slug: "the-good-place",
    title: "The Good Place",
    tmdb_id: 66573,
    imdb_id: "tt4955642",
    episode_len: 22 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
      [4, "Season 4", 14],
    ],
  },
  {
    slug: "community",
    title: "Community",
    tmdb_id: 18347,
    imdb_id: "tt1439629",
    episode_len: 22 * 60,
    seasons: [
      [1, "Season 1", 25],
      [2, "Season 2", 24],
      [3, "Season 3", 22],
      [4, "Season 4", 13],
      [5, "Season 5", 13],
      [6, "Season 6", 13],
    ],
  },
  {
    slug: "parks-and-rec",
    title: "Parks and Recreation",
    tmdb_id: 33217,
    imdb_id: "tt1266020",
    episode_len: 22 * 60,
    seasons: [
      [1, "Season 1", 6],
      [2, "Season 2", 24],
      [3, "Season 3", 16],
      [4, "Season 4", 22],
      [5, "Season 5", 22],
      [6, "Season 6", 22],
      [7, "Season 7", 13],
    ],
  },
  // === Batch 5 ===
  {
    slug: "the-wire",
    title: "The Wire",
    tmdb_id: 1438,
    imdb_id: "tt0306414",
    episode_len: 60 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 12],
      [3, "Season 3", 12],
      [4, "Season 4", 13],
      [5, "Season 5", 10],
    ],
  },
  {
    slug: "six-feet-under",
    title: "Six Feet Under",
    tmdb_id: 1809,
    imdb_id: "tt0248654",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
      [4, "Season 4", 12],
      [5, "Season 5", 12],
    ],
  },
  {
    slug: "deadwood",
    title: "Deadwood",
    tmdb_id: 1427,
    imdb_id: "tt0348914",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 12],
      [2, "Season 2", 12],
      [3, "Season 3", 12],
    ],
  },
  {
    slug: "the-americans",
    title: "The Americans",
    tmdb_id: 4650,
    imdb_id: "tt2149175",
    episode_len: 44 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
      [4, "Season 4", 13],
      [5, "Season 5", 13],
      [6, "Season 6", 10],
    ],
  },
  {
    slug: "mr-robot",
    title: "Mr. Robot",
    tmdb_id: 62560,
    imdb_id: "tt4158110",
    episode_len: 45 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 12],
      [3, "Season 3", 10],
      [4, "Season 4", 13],
    ],
  },
  {
    slug: "twin-peaks",
    title: "Twin Peaks",
    tmdb_id: 1925,
    imdb_id: "tt0098936",
    episode_len: 48 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 22],
      [3, "Season 3: The Return", 18],
    ],
  },
  {
    slug: "the-leftovers",
    title: "The Leftovers",
    tmdb_id: 62051,
    imdb_id: "tt2699128",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
      [3, "Season 3", 8],
    ],
  },
  {
    slug: "narcos-mexico",
    title: "Narcos: Mexico",
    tmdb_id: 83810,
    imdb_id: "tt8714904",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
    ],
  },
  {
    slug: "atlanta",
    title: "Atlanta",
    tmdb_id: 71660,
    imdb_id: "tt4288182",
    episode_len: 30 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 11],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
    ],
  },
  {
    slug: "fleabag",
    title: "Fleabag",
    tmdb_id: 67070,
    imdb_id: "tt5687612",
    episode_len: 26 * 60,
    seasons: [
      [1, "Season 1", 6],
      [2, "Season 2", 6],
    ],
  },
  {
    slug: "barry",
    title: "Barry",
    tmdb_id: 75008,
    imdb_id: "tt5348176",
    episode_len: 30 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 8],
      [3, "Season 3", 8],
      [4, "Season 4", 8],
    ],
  },
  {
    slug: "silo",
    title: "Silo",
    tmdb_id: 125988,
    imdb_id: "tt14688458",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
    ],
  },
  // === Batch 6 ===
  {
    slug: "the-handmaids-tale",
    title: "The Handmaid's Tale",
    tmdb_id: 69478,
    imdb_id: "tt5834204",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
      [5, "Season 5", 10],
    ],
  },
  {
    slug: "you",
    title: "You",
    tmdb_id: 78191,
    imdb_id: "tt7335184",
    episode_len: 45 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
    ],
  },
  {
    slug: "daredevil",
    title: "Daredevil",
    tmdb_id: 61889,
    imdb_id: "tt3322312",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
    ],
  },
  {
    slug: "house-of-the-dragon",
    title: "House of the Dragon",
    tmdb_id: 94997,
    imdb_id: "tt11198330",
    episode_len: 60 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 8],
    ],
  },
  {
    slug: "the-last-kingdom",
    title: "The Last Kingdom",
    tmdb_id: 71899,
    imdb_id: "tt4179452",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 8],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
      [5, "Season 5", 10],
    ],
  },
  {
    slug: "rome",
    title: "Rome",
    tmdb_id: 463,
    imdb_id: "tt0384766",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 12],
      [2, "Season 2", 10],
    ],
  },
  {
    slug: "boardwalk-empire",
    title: "Boardwalk Empire",
    tmdb_id: 13468,
    imdb_id: "tt0979432",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 12],
      [2, "Season 2", 12],
      [3, "Season 3", 12],
      [4, "Season 4", 12],
      [5, "Season 5", 8],
    ],
  },
  {
    slug: "silicon-valley",
    title: "Silicon Valley",
    tmdb_id: 63056,
    imdb_id: "tt2575988",
    episode_len: 28 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
      [5, "Season 5", 8],
      [6, "Season 6", 7],
    ],
  },
  {
    slug: "veep",
    title: "Veep",
    tmdb_id: 63459,
    imdb_id: "tt1759761",
    episode_len: 28 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 10],
      [3, "Season 3", 10],
      [4, "Season 4", 10],
      [5, "Season 5", 10],
      [6, "Season 6", 10],
      [7, "Season 7", 7],
    ],
  },
  {
    slug: "mad-men",
    title: "Mad Men",
    tmdb_id: 1209,
    imdb_id: "tt0804503",
    episode_len: 48 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
      [3, "Season 3", 13],
      [4, "Season 4", 13],
      [5, "Season 5", 13],
      [6, "Season 6", 13],
      [7, "Season 7", 14],
    ],
  },
  {
    slug: "the-queens-gambit",
    title: "The Queen's Gambit",
    tmdb_id: 93474,
    imdb_id: "tt10048342",
    episode_len: 50 * 60,
    seasons: [
      [1, "Limited Series", 7],
    ],
  },
  {
    slug: "the-white-lotus",
    title: "The White Lotus",
    tmdb_id: 114410,
    imdb_id: "tt13406094",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 6],
      [2, "Season 2", 7],
      [3, "Season 3", 8],
    ],
  },
  // === Batch 7 ===
  {
    slug: "loki",
    title: "Loki",
    tmdb_id: 84958,
    imdb_id: "tt9140554",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 6],
      [2, "Season 2", 6],
    ],
  },
  {
    slug: "wandavision",
    title: "WandaVision",
    tmdb_id: 85271,
    imdb_id: "tt9140560",
    episode_len: 35 * 60,
    seasons: [
      [1, "Season 1", 9],
    ],
  },
  {
    slug: "the-punisher",
    title: "The Punisher",
    tmdb_id: 67177,
    imdb_id: "tt7468410",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 13],
      [2, "Season 2", 13],
    ],
  },
  {
    slug: "slow-horses",
    title: "Slow Horses",
    tmdb_id: 95480,
    imdb_id: "tt5875444",
    episode_len: 48 * 60,
    seasons: [
      [1, "Season 1", 6],
      [2, "Season 2", 6],
      [3, "Season 3", 6],
      [4, "Season 4", 6],
    ],
  },
  {
    slug: "the-haunting-of-hill-house",
    title: "The Haunting of Hill House",
    tmdb_id: 70593,
    imdb_id: "tt6763664",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 10],
    ],
  },
  {
    slug: "midnight-mass",
    title: "Midnight Mass",
    tmdb_id: 98555,
    imdb_id: "tt10574476",
    episode_len: 60 * 60,
    seasons: [
      [1, "Season 1", 7],
    ],
  },
  {
    slug: "the-fall-of-the-house-of-usher",
    title: "The Fall of the House of Usher",
    tmdb_id: 154385,
    imdb_id: "tt15518840",
    episode_len: 55 * 60,
    seasons: [
      [1, "Season 1", 8],
    ],
  },
  {
    slug: "altered-carbon",
    title: "Altered Carbon",
    tmdb_id: 68429,
    imdb_id: "tt2261227",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 10],
      [2, "Season 2", 8],
    ],
  },
  {
    slug: "the-sandman",
    title: "The Sandman",
    tmdb_id: 90857,
    imdb_id: "tt1751634",
    episode_len: 45 * 60,
    seasons: [
      [1, "Season 1", 11],
    ],
  },
  {
    slug: "penny-dreadful",
    title: "Penny Dreadful",
    tmdb_id: 56724,
    imdb_id: "tt2628232",
    episode_len: 50 * 60,
    seasons: [
      [1, "Season 1", 8],
      [2, "Season 2", 10],
      [3, "Season 3", 9],
    ],
  },
  {
    slug: "andor",
    title: "Andor",
    tmdb_id: 121361,
    imdb_id: "tt9253284",
    episode_len: 40 * 60,
    seasons: [
      [1, "Season 1", 12],
    ],
  },
  {
    slug: "the-night-of",
    title: "The Night Of",
    tmdb_id: 69990,
    imdb_id: "tt2401256",
    episode_len: 60 * 60,
    seasons: [
      [1, "Limited Series", 8],
    ],
  },
];

const episodeTitles = {
  "avatar-the-last-airbender": {
    1: ["The Boy in the Iceberg", "The Avatar Returns", "The Southern Air Temple", "The Warriors of Kyoshi", "The King of Omashu", "Imprisoned", "The Spirit World: Winter Solstice Part 1", "The Spirit World: Winter Solstice Part 2", "The Waterbending Scroll", "Jet", "The Great Divide", "The Storm", "The Blue Spirit", "The Fortuneteller", "Bato of the Water Tribe", "The Deserter", "The Northern Air Temple", "The Waterbending Master", "The Siege of the North Part 1", "The Siege of the North Part 2"],
    2: ["The Avatar State", "The Cave of Two Lovers", "Return to Omashu", "The Swamp", "Avatar Day", "The Blind Bandit", "Zuko Alone", "The Chase", "Bitter Work", "The Library", "The Desert", "The Serpent's Pass", "The Drill", "City of Walls and Secrets", "The Tales of Ba Sing Se", "Appa's Lost Days", "Lake Laogai", "The Earth King", "The Guru", "The Crossroads of Destiny"],
    3: ["The Awakening", "The Headband", "The Painted Lady", "Sokka's Master", "The Beach", "The Avatar and the Fire Lord", "The Runaway", "The Puppetmaster", "Nightmares and Daydreams", "The Day of Black Sun Part 1: The Invasion", "The Day of Black Sun Part 2: The Eclipse", "The Western Air Temple", "The Firebending Masters", "The Boiling Rock Part 1", "The Boiling Rock Part 2", "The Southern Raiders", "The Ember Island Players", "Sozin's Comet Part 1: The Phoenix King", "Sozin's Comet Part 2: The Old Masters", "Sozin's Comet Part 3: Into the Inferno", "Sozin's Comet Part 4: Avatar Aang"],
  },
  "arcane": {
    1: ["Welcome to the Playground", "Some Mysteries Are Better Left Unsolved", "The Base Violence Necessary for Change", "Happy Progress Day!", "Everybody Wants to Be My Enemy", "When These Walls Come Tumbling Down", "The Boy Savior", "Oil and Water", "The Monster You Created"],
    2: ["Heavy Is the Crown", "Watch It All Burn", "Finally Got the Name Right", "Paint the Town Blue", "Blisters and Bedrock", "The Message Hidden Within the Pattern", "Pretend Like It's the First Time", "Killing Is a Cycle", "The Dirt Under Your Nails"],
  },
  "the-bear": {
    1: ["System", "Hands", "Brigade", "Dogs", "Sheridan", "Ceres", "Review", "Braciole"],
    2: ["Beef", "Pasta", "Sundae", "Honeydew", "Pop", "Fishes", "Forks", "Bolognese", "Omelette", "The Bear"],
    3: ["Tomorrow", "Next", "Doors", "Violet", "Children", "Napkins", "Legacy", "Ice Chips", "Apologies", "Forever"],
  },
  "severance": {
    1: ["Good News About Hell", "Half Loop", "In Perpetuity", "The You You Are", "The Grim Barbarity of Optics and Design", "Hide and Seek", "Defiant Jazz", "What's for Dinner?", "The We We Are"],
    2: ["Hello, Ms. Cobel", "Goodbye, Mrs. Selvig", "Who Is Alive?", "The Womb", "Trojan's Horse", "Attila", "The Cold Harbor", "The Afterlife", "The You You Are", "The We We Are Again"],
  },
  "fallout": {
    1: ["The End", "The Target", "The Head", "The Ghouls", "The Past", "The Trap", "The Radio", "The Beginning"],
  },
  "ted-lasso": {
    1: ["Pilot", "Biscuits", "Trent Crimm: The Independent", "For the Children", "Tan Lines", "Two Aces", "Make Rebecca Great Again", "The Diamond Dogs", "All Apologies", "The Hope That Kills You"],
    2: ["Goodbye Earl", "Lavender", "Do the Right-est Thing", "Carol of the Bells", "Rainbow", "The Signal", "Headspace", "Man City", "Beard After Hours", "No Weddings and a Funeral", "Midnight Train to Royston", "Inverting the Pyramid of Success"],
    3: ["Smells Like Mean Spirit", "(I Don't Want to Go to) Chelsea", "4-5-1", "Big Week", "Signs", "Sunflowers", "The Strings That Bind Us", "We'll Never Have Paris", "The La Locker Room Aux Folles", "International Break", "Mom City", "So Long, Farewell"],
  },
  "demon-slayer": {
    1: ["Cruelty", "Trainer Sakonji Urokodaki", "Sabito and Makomo", "Final Selection", "My Own Steel", "Swordsman Accompanying a Demon", "Muzan Kibutsuji", "The Smell of Enchanting Blood", "Temari Demon and Arrow Demon", "Together Forever", "Haganezuka", "The Boar Bares Its Fangs, Zenitsu Sleeps", "Something Important", "The House with the Wisteria Family Crest", "Mount Natagumo", "Letting Someone Else Continue", "You Must Master a Single Thing", "A Forged Bond", "Hinokami Kagura", "Pretend Family", "Against the Corps Rules", "Mansion of the Demon", "The Hashira Meeting", "The Rehabilitation Training", "The Rengoku Residence", "A New Mission"],
    2: ["Flame Hashira Kyojuro Rengoku", "Deep Sleep", "Should Have Been", "Insult", "Move Forward", "Akaza", "Set Your Heart Ablaze", "Demon Slayer Corps", "What Are You?", "Never Give Up", "Defeat an Upper Rank Demon", "Something", "Layered Memories", "The Flower of Happiness", "A Bright Red Blade", "Winning or Losing", "The Battle of the Gods", "The Way of the Strong"],
    3: ["Someone's Dream", "Yoriichi Type Zero", "A 300 Years Old Blade", "Thank You, Tokito", "Bright Red Sword", "A Sword That Turns Evil", "Awful Villains", "Mist Hashira Muichiro Tokito", "The Swordsmith Village, Under Attack", "Love Hashira Mitsuri Kanroji", "A Connected Bond: Day and Night"],
    4: ["The Sound of Defeat", "Water Hashira Giyu Tomioka's Pain", "Mitsuri Kanroji Joins the Fight", "The Stone Hashira's True Strength", "The Wind Hashira's Unyielding Resolve", "The Fierce Battle of the Hashira", "Tears of the Demon Slayer Corps", "The Final Battle Begins"],
  },
  "the-sopranos": {
    1: ["The Sopranos", "46 Long", "Denial, Anger, Acceptance", "Meadowlands", "College", "Pax Soprana", "Down Neck", "The Legend of Tennessee Moltisanti", "Boca", "A Hit Is a Hit", "Nobody Knows Anything", "Isabella", "I Dream of Jeannie Cusamano"],
    2: ["Guy Walks Into a Psychiatrist's Office...", "Do Not Resuscitate", "Toodle-Fucking-Oo", "Commendatori", "Big Girls Don't Cry", "The Happy Wanderer", "D-Girl", "Full Leather Jacket", "From Where to Eternity", "Bust Out", "House Arrest", "The Knight in White Satin Armor", "Funhouse"],
    3: ["Mr. Ruggerio's Neighborhood", "Proshai, Livushka", "Fortunate Son", "Employee of the Month", "Another Toothpick", "University", "Second Opinion", "He Is Risen", "The Telltale Moozadell", "To Save Us All from Satan's Power", "Pine Barrens", "Amour Fou", "Army of One"],
    4: ["For All Debts Public and Private", "No Show", "Christopher", "The Weight", "Pie-O-My", "Everybody Hurts", "Watching Too Much Television", "Mergers and Acquisitions", "Whoever Did This", "The Strong, Silent Type", "Calling All Cars", "Eloise", "Whitecaps"],
    5: ["Two Tonys", "Rat Pack", "Where's Johnny?", "All Happy Families...", "Irregular Around the Margins", "Sentimental Education", "In Camelot", "Marco Polo", "Unidentified Black Males", "Cold Cuts", "Test Dream", "Long Term Parking", "All Due Respect"],
    6: ["Join the Club", "Mayham", "Members Only", "Walk Like a Man", "Luxury Lounge", "Johnny Cakes", "The Ride", "Moe n' Joe", "The Fleshy Part of the Thigh", "Cold Stones", "Kaisha", "Soprano Home Movies", "Stage 5", "Remember When", "Chasing It", "Walk Like a Man", "Kennedy and Heidi", "The Second Coming", "The Blue Comet", "Made in America", "Live Free or Die"],
  },
  "dexter": {
    1: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    2: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    3: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    4: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    5: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    6: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    7: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
    8: Array.from({ length: 12 }, (_, i) => `Episode ${i + 1}`),
  },
  "band-of-brothers": {
    1: ["Currahee", "Day of Days", "Carentan", "Replacements", "Crossroads", "Bastogne", "The Breaking Point", "The Last Patrol", "Why We Fight", "Points"],
  },
  "wednesday": {
    1: ["Wednesday's Child Is Full of Woe", "Woe Is the Loneliest Number", "Friend or Woe", "Woe What a Night", "You Reap What You Woe", "Quid Pro Woe", "If You Don't Woe Me by Now", "A Murder of Woes"],
    2: ["The Girl Who Wasn't There", "The Scorpion and the Wolf", "Echoes of Evil", "The Curse of the Crescent Moon", "The Night Stalker", "The Final Exam", "Nevermore", "The End of Nevermore"],
  },
  "the-last-of-us": {
    1: ["When You're Lost in the Darkness", "Infected", "Long Long Time", "Please Hold to My Hand", "Endure and Survive", "Kin", "Left Behind", "When We Are in Need", "Look for the Light"],
    2: ["Future Days", "The Hunt", "The Cost of Living", "The Wounded", "The Horde", "The Journey", "The Sacrifice"],
  },
  "invincible": {
    1: ["It's About Time", "Here Goes Nothing", "Who You Calling Ugly?", "Neil Armstrong, Eat Your Heart Out", "That Actually Hurt", "You Look Kinda Dead", "We Need to Talk", "Where I Really Come From"],
    2: ["A Lesson for Your Next Life", "In About Six Hours, I Lose My Virginity to a Fish", "This Missive, This Machination!", "I'm Not Going Anywhere", "This Must Come as a Shock", "It's Not That Simple", "I'm Not Really a Go to the Gym Guy", "I Thought You Were Stronger"],
    3: ["You're Not Laughing Now", "A Deal with the Devil", "You Were Just a Kid", "You Want a Real Costume?", "This Was Supposed to Be Easy", "I've Got You Covered", "All the Way Down", "I Didn't Do It"],
  },
  "jujutsu-kaisen": {
    1: ["Ryomen Sukuna", "For Myself", "Girl of Steel", "Curse Womb Must Die", "Curse Womb Must Die II", "After Rain", "Assault", "Boredom", "The Small Fry and the Big Catch", "Idle Transfiguration", "Narrow-Minded", "To You, Someday", "Tomorrow", "The Shibuya Incident", "On a Starry Night", "The Mortal and the Curse", "The Black Flash", "The Door of Darkness", "The Cursed Buddha", "Reason", "The Secret of the Immortal", "The Origin of the Curse", "The Final Hit", "The End of the Beginning"],
    2: ["Hidden Inventory", "Hidden Inventory II", "Hidden Inventory III", "Hidden Inventory IV", "Hidden Inventory V", "Shibuya Incident", "Shibuya Incident II", "Shibuya Incident III", "Shibuya Incident IV", "Shibuya Incident V", "Shibuya Incident VI", "Shibuya Incident VII", "Shibuya Incident VIII", "Shibuya Incident IX", "Shibuya Incident X", "Shibuya Incident XI", "Shibuya Incident XII", "Shibuya Incident XIII", "Shibuya Incident XIV", "Shibuya Incident XV", "Shibuya Incident XVI", "Shibuya Incident XVII", "Shibuya Incident XVIII"],
  },
  "chainsaw-man": {
    1: ["Dog & Chainsaw", "The Place Where a Cat Is", "Meow's Where Cat's Are", "Rescue", "The Gun Devil", "Kill Denji", "The Taste of a Kiss", "Chainsaw Sound", "From Kyoto", "A Dog's Feelings", "Something's Missing", "The Reason Why"],
  },
  "cowboy-bebop": {
    1: ["Asteroid Blues", "Stray Dog Strut", "Honky Tonk Women", "Gateway Shuffle", "Ballad of Fallen Angels", "Sympathy for the Devil", "Heavy Metal Queen", "Waltz for Venus", "Jamming with Edward", "Ganymede Elegy", "Toys in the Attic", "Jupiter Jazz (Part 1)", "Jupiter Jazz (Part 2)", "Bohemian Rhapsody", "My Funny Valentine", "Black Dog Serenade", "Mushroom Samba", "Speak Like a Child", "Wild Horses", "Pierrot le Fou", "Boogie Woogie Feng Shui", "Cowboy Funk", "Brain Scratch", "Hard Luck Woman", "The Real Folk Blues (Part 1)", "The Real Folk Blues (Part 2)"],
  },
  "steins-gate": {
    1: ["Turning Point", "Time Travel Paranoia", "Parallel World Paranoia", "Interpreter Rendezvous", "Starmine Rendezvous", "Divergence Rendezvous", "Chaos Theory Homeostasis I", "Chaos Theory Homeostasis II", "Chaos Theory Homeostasis III", "Chaos Theory Homeostasis IV", "Dogma in Event Horizon", "Dogma in Ergosphere", "Dogma in the Magnetosphere", "Physical Necrosis", "Missing Link Necrosis", "Sacrificial Necrosis", "Made in Complex", "Fractal androgynous", "Endless Apoptosis", "Finalize Apoptosis", "Paradox Rebind", "Being Meltdown", "Open the Steins Gate", "Project Valkyrie"],
  },
  "the-walking-dead": {
    1: ["Days Gone Bye", "Guts", "Tell It to the Frogs", "Vatos", "Wildfire", "TS-19"],
    2: ["What Lies Ahead", "Bloodletting", "Save the Last One", "Cherokee Rose", "Chupacabra", "Secrets", "Pretty Much Dead Already", "Nebraska", "Triggerfinger", "18 Miles Out", "Judge, Jury, Executioner", "Better Angels", "Beside the Dying Fire"],
    3: ["Seed", "Sick", "Walk with Me", "Killer Within", "Say the Word", "Hounded", "When the Dead Come Knocking", "Made to Suffer", "The Suicide King", "Home", "I Ain't a Judas", "Clear", "Arrow on the Doorpost", "Prey", "This Sorrowful Life", "Welcome to the Tombs"],
    4: ["30 Days Without an Accident", "Infected", "Isolation", "Indifference", "Internment", "Live Bait", "Dead Weight", "Too Far Gone", "After", "Inmates", "Claimed", "Still", "Alone", "The Grove", "Us", "A"],
    5: ["No Sanctuary", "Strangers", "Four Walls and a Roof", "Slabtown", "Self Help", "Consumed", "Crossed", "Coda", "What Happened and What's Going On", "Them", "The Distance", "Remember", "Forget", "Spend", "Try", "Conquer"],
  },
  "hannibal": {
    1: ["Apéritif", "Amuse-Bouche", "Potage", "Œuf", "Coquilles", "Entrée", "Sorbet", "Fromage", "Trou Normand", "Buffet Froid", "Rôti", "Relevés", "Savoureux"],
    2: ["Kaiseki", "Sakizuke", "Hassun", "Takiawase", "Mukōzuke", "Futamono", "Yakimono", "Su-zakana", "Shizuzakana", "Naka-choko", "Kō no mono", "Tome-wan", "Iwa Takoyaki"],
    3: ["Antipasto", "Primavera", "Secondo", "Aperitivo", "Contorno", "Dolce", "Digestivo", "The Great Red Dragon", "And the Woman Clothed in Sun", "...And the Woman Clothed in Sun", "And the Beast from the Sea", "The Number of the Beast Is 666", "The Wrath of the Lamb"],
  },
  "the-expanse": {
    1: ["Dulcinea", "The Big Empty", "Remember the Cant", "CQB", "Back to the Butcher", "Rock Bottom", "Windmills", "Salvage", "Critical Mass", "Leviathan Wakes"],
    2: ["Safe", "Doors & Corners", "Static", "Godspeed", "Home", "Paradigm Shift", "The Seventh Man", "Pyre", "The Weeping Somnambulist", "Cascading Style Sheets", "Here There Be Dragons", "The Monster and the Rocket", "Caliban's War"],
    3: ["Fight or Flight", "IFF", "Assured Destruction", "Reload", "Triple Point", "Immolation", "Delta-V", "It Reaches Out", "Intransigence", "Dandelion Sky", "Fallen World", "Congregation", "Abaddon's Gate"],
    4: ["New Terra", "Jetsam", "Subduction", "Retrograde", "Oppressor", "Displacement", "A Shot Heard Round the System", "The One-Eyed Man", "Saeculum", "Cibola Burn"],
    5: ["Exodus", "Churn", "Mother", "Gaugamela", "Down and Out", "Tribes", "Oyedeng", "Hard Vacuum", "Winnipesaukee", "Nemesis Games"],
    6: ["Strange Dogs", "Azure Dragon", "Force Projection", "Redoubt", "Why We Fight", "Babylon's Ashes"],
  },
  "mindhunter": {
    1: ["Episode 1", "Episode 2", "Episode 3", "Episode 4", "Episode 5", "Episode 6", "Episode 7", "Episode 8", "Episode 9", "Episode 10"],
    2: ["Episode 1", "Episode 2", "Episode 3", "Episode 4", "Episode 5", "Episode 6", "Episode 7", "Episode 8", "Episode 9"],
  },
  "ozark": {
    1: ["Sugarwood", "Blue Cat", "My Dripping Sleep", "Tonight We Improvise", "Ruling Days", "Book of Ruth", "Nest Box", "Kaleidoscope", "Coffee, Black", "The Toll"],
    2: ["Reparations", "The Precious Blood of Jesus", "Once a Langmore...", "Stag", "Game Day", "Outer Darkness", "One Way Out", "The Big Sleep", "The Badger", "The Gold Coast"],
    3: ["War Time", "Civil Union", "Kevin Cronin Was Here", "Boss Fight", "It Came from Michoacán", "Fire Pink", "In Case of Emergency", "BFF", "Fire Cloud", "All In"],
    4: ["The Beginning of the End", "Let the Great World Spin", "City on the Make", "Ace Deuce", "Ellie", "Sanctified", "The Cousin of Death", "The Cousin of Death II", "Pick a God and Pray", "You're the Boss", "Pound of Flesh and Still Kickin'", "Trouble the Water", "Mud", "A Hard Way to Go"],
  },
  "westworld": {
    1: ["The Original", "Chestnut", "The Stray", "Dissonance Theory", "Contrapasso", "The Adversary", "Trompe L'Oeil", "Trace Decay", "The Well-Tempered Clavier", "The Bicameral Mind"],
    2: ["Journey into Night", "Reunion", "Virtù e Fortuna", "The Riddle of the Sphinx", "Akane no Mai", "Phase Space", "Les Écorchés", "Kiksuya", "Vanishing Point", "The Passenger"],
    3: ["Parce Domine", "The Winter Line", "The Absence of Field", "The Mother of Exiles", "Genre", "Decoherence", "Passed Pawn", "Crisis Theory"],
    4: ["The Auguries", "Metanoia", "Années Folles", "Generation Loss", "Zhuangzi", "Fidelity", "Metanoia", "Que Será, Será"],
  },
  "bojack-horseman": {
    1: ["BoJack Horseman: The BoJack Horseman Story, Chapter One", "BoJack Hates the Troops", "Prickly-Muffin", "Zoës and Zeldas", "Live Fast, Diane Nguyen", "Our A-Story Is a 'D' Story", "Later", "The Telescope", "Horse Majeure", "One Trick Pony", "Downer Ending", "The BoJack Horseman Show"],
    2: ["Brand New Couch", "Yesterdayland", "Still Broken", "After the Party", "Chickens", "A Higher Love", "Hank After Dark", "Let's Find Out", "The Shot", "Yes And", "Escape from L.A.", "Out to Sea"],
    3: ["Best Thing That Ever Happened", "The BoJack Horseman Show", "That's Too Much, Man!", "It's You", "Love And/Or Marriage", "Brrap Brrap Pew Pew", "Stop the Presses", "Old Acquaintance", "The Judge", "That Went Well", "Fish Out of Water", "The Stopped Show"],
    4: ["See Mr. Peanutbutter Run", "The Old Sugarman Place", "Hooray! Todd Episode!", "Commence Fracking", "The Woman in the Dress", "Brrap Brrap Pew Pew", "The Light", "The Weird", "The Court", "The Showstopper", "That's Too Much, Man!", "What Time Is It Right Now"],
    5: ["The Light", "The Dog Days Are Over", "Planned Obsolescence", "BoJack the Feminist", "The Amelia Earhart Story", "Free Churro", "INT. SUB", "The Showstopper", "Ancient History", "Head in the Clouds", "The New Client", "The Stopped Show"],
    6: ["A Horse Walks into a Rehab", "The New Client", "Feel-Good Movie", "Surprise!", "A Little Uneven, Is All", "The Kidney Stays in the Picture", "The Face of Depression", "A Quick One, While He's Away", "Intermediate Scene Study w/ Bojack", "Sunk Cost and All That", "Xerox of a Xerox", "Nice While It Lasted"],
  },
  "the-good-place": {
    1: ["Everything Is Fine", "Flying", "Tahani Al-Jamil", "Jason Mendoza", "Category 55 Emergency Doomsday Crisis", "What We Owe to Each Other", "The Eternal Shriek", "Most Improved Player", "...Someone Like Me as a Member", "Chidi's Choice", "What's My Motivation", "Mindy St. Claire", "Michael's Gambit"],
    2: ["Everything Is Great!", "Dance Dance Resolution", "Team Cockroach", "Existential Crisis", "The Trolley Problem", "Janet and Michael", "The Worst Possible Use of Free Will", "The Brainy Bunch", "The Derek", "Rhonda, Diana, Jake, and Trent", "The Burrito", "Somewhere Else", "The Good Place as Usual"],
    3: ["Everything Is Bonzer!", "The Brainy Bunch", "The Snowball Effect", "Jeremy Bearimy", "The Ballad of Donkey Doug", "A Fractured Inheritance", "The Worst Possible Use of Free Will", "Don't Let the Good Life Pass You By", "The Eternal Shriek", "The Book of Dougs", "The Afterlife Is Out There", "Pandemonium", "The Answer"],
    4: ["A Girl from Arizona, Part 1", "A Girl from Arizona, Part 2", "Chidi Sees the Time-Knife", "Tinker, Tailor, Demon, Spy", "Employee of the Bearimy", "A Chip Off the Old Block", "Help Is Other People", "The Funeral", "The Waveform Theory of Time", "You've Changed, Man", "Mondays, Am I Right?", "Patty", "When You're Ready",       "The Last Good Place"],
  },
  "community": {
    1: ["Pilot", "Spanish 101", "Introduction to Film", "Social Psychology", "Advanced Criminal Law", "Football, Feminism and You", "Introduction to Statistics", "Home Economics", "Debate 109", "Environmental Science", "The Politics of Human Sexuality", "Comparative Religion", "Investigative Journalism", "Romantic Expressionism", "Basic Genealogy", "Physical Education", "Beginner Pottery", "The Psychology of Letting Go", "Modern Warfare", "The Art of Discourse", "Contemporary American Poultry", "The Art of Discourse", "Modern Warfare", "English as a Second Language", "Pascal's Triangle Revisited"],
    2: ["Anthropology 101", "Accounting for Lawyers", "The Psychology of Letting Go", "Basic Rocket Science", "Messianic Myths and Ancient Peoples", "Epidemiology", "Aerodynamics of Gender", "Cooperative Calligraphy", "Conspiracy Theories and Interior Design", "Mixology Certification", "Abed's Uncontrollable Christmas", "Asian Population Studies", "Celebrity Pharmacology", "Advanced Dungeons & Dragons", "Early 21st Century Romanticism", "Intermediate Documentary Filmmaking", "Intro to Political Science", "Custody Law and Eastern European Diplomacy", "The First Chang Dynasty", "Custody Law and Eastern European Diplomacy", "The First Chang Dynasty", "Critical Film Studies", "A Fistful of Paintballs", "For a Few Paintballs More"],
    3: ["Biology 101", "Geography of Global Conflict", "Remedial Chaos Theory", "Horror Fiction in Seven Spooky Steps", "Advanced Gay", "Studies in Modern Movement", "Documentary Filmmaking: Redux", "Foosball and Nocturnal Vigilantism", "Introduction to Finality", "Pillows and Blankets", "Contemporary Impressionists", "Urban Matrimony and the Sandwich Arts", "Contemporary Impressionists", "Urban Matrimony and the Sandwich Arts", "Digital Exploration of Interior Design", "Pillows and Blankets", "Basic Lupine Urology", "Course Listing Unavailable", "Curriculum Unavailable", "The First Chang Dynasty", "The First Chang Dynasty", "The Last Chang Dynasty"],
    4: ["History 101", "Paranormal Parentage", "Conventions of Space and Time", "Alternative History of the German Invasion", "Cooperative Escapism in Familial Relations", "Advanced Documentary Filmmaking", "Economics of Marine Biology", "Herstory of Dance", "Intro to Felt Surrogacy", "Intro to Knots", "Basic Human Anatomy", "Heroic Origins", "Advanced Introduction to Finality"],
    5: ["Repilot", "Introduction to Teaching", "Basic Intergluteal Numismatics", "Cooperative Polygraphy", "Geothermal Escapism", "VCR Maintenance and Educational Publishing", "Bondage and Beta Male Sexuality", "Bondage and Beta Male Sexuality", "VCR Maintenance and Educational Publishing", "Basic Story", "Basic Sandwich", "Basic RV Repair and Palmistry", "Gay Marriage"],
    6: ["Ladders", "Lawnmower Maintenance and Postnatal Care", "Basic Crisis Room Decorum", "Queer Studies and Advanced Waxing", "Laws of Robotics and Party Rights", "Basic Email Security", "Advanced Safety Features", "Intro to Recycled Cinema", "Grifting 101", "Basic RV Repair and Palmistry", "Modern Espionage", "Wedding Videography", "Emotional Consequences of Broadcast Television"],
  },
  "parks-and-rec": {
    1: ["Pilot", "Canvassing", "The Reporter", "Boys' Club", "The Banquet", "Rock Show"],
    2: ["Pawnee Zoo", "The Stakeout", "Beautiful Colours", "Practice Date", "Sister City", "Kaboom", "Greg Pikitis", "Ron and Tammy", "The Camel", "Hunting Trip", "Tom's Divorce", "Christmas Scandal", "The Set Up", "Leslie's House", "Sweetums", "Galentine's Day", "Woman of the Year", "The Possum", "Park Safety", "Summer Catalog", "94 Meetings", "Telethon", "The Master Plan", "Freddy Spaghetti"],
    3: ["Go Big or Go Home", "Flu Season", "Time Capsule", "Road Trip", "Harvest Festival", "Camping", "Andy and April's Fancy Wedding", "Soulmates", "Jerry's Painting", "Emergency Response", "Li'l Sebastian", "The Fight", "Road Trip", "The Bubble", "The Treaty", "Media Blitz"],
    4: ["I'm Leslie Knope", "Ron and Tammys", "Born & Raised", "Pawnee Rangers", "Meet 'n' Greet", "End of the World", "The Treaty", "The Smallest Park", "The Trial of Leslie Knope", "Citizen Knope", "The Comeback Kid", "Campaign Shutdown", "Campaign Ad", "Bowling for Votes", "Operation Ann", "The Debate", "Bus Tour", "Win, Lose, or Draw"],
    5: ["Ms. Knope Goes to Washington", "Soda Tax", "How a Bill Becomes a Law", "Sex Education", "Halloween Surprise", "Ben's Parents", "Leslie vs. April", "Pawnee Commons", "The Jog", "Emergency Response", "The Fight", "Women in Garbage", "Ann and Chris", "The Pawnee-Eagleton Tip Off", "Correspondents' Lunch", "Bailout", "Leslie's House", "Ron and Diane", "Two Funerals", "Animal Control", "Article Two", "Jerry's Retirement"],
    6: ["London", "The Pawnee-Eagleton Tip Off", "The Pawnee-Eagleton Tip Off Part 2", "Doppelgängers", "Gin It Up!", "Filibuster", "Recall Vote", "Filibuster", "The Pawnee-Eagleton Tip Off Part 3", "Second Chunce", "New Beginnings", "Farmers Market", "Ann and Chris", "The Pawnee-Eagleton Tip Off Part 4", "The Cones of Dunshire", "The Summit", "Leslie's Book", "The Debate", "The Cones of Dunshire", "Moving Up"],
    7: ["2017", "Ron and Jammy", "William Henry Harrison", "Leslie and Ron", "Gryzzl Box", "Save JJ's", "The Johnny Karate Super Awesome Musical Explosion Show", "Ms. Ludgate-Wyatt Goes to Washington", "Two Weeks", "Two Weeks Later", "Ann and Chris", "One Last Ride", "A Parks and Recreation Special"],
  },
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

function generateSeriesMarkers(episodeNum, totalEpisodes, episodeLen, isAnime) {
  const markers = [];
  const introMarkerType = isAnime ? "OPENING" : "INTRO";
  const creditsMarkerType = isAnime ? "ENDING" : "CREDITS";

  // First episode: no recap (pilot), longer intro
  if (episodeNum === 1) {
    const introStart = randFloat(30, 90);
    const introEnd = introStart + randFloat(60, 120);
    markers.push({
      type: introMarkerType,
      start: introStart,
      end: introEnd,
      confidence: parseFloat((0.95 + Math.random() * 0.04).toFixed(2)),
      source: "manual",
    });
  } else {
    // Recap
    const recapDuration = randFloat(40, 90);
    markers.push({
      type: "RECAP",
      start: 0,
      end: recapDuration,
      confidence: parseFloat((0.92 + Math.random() * 0.07).toFixed(2)),
      source: "manual",
    });

    // Intro after recap
    const introStart = recapDuration + randFloat(5, 30);
    const introEnd = introStart + randFloat(45, 100);
    markers.push({
      type: introMarkerType,
      start: parseFloat(introStart.toFixed(1)),
      end: parseFloat(introEnd.toFixed(1)),
      confidence: parseFloat((0.95 + Math.random() * 0.04).toFixed(2)),
      source: "manual",
    });
  }

  // Credits at end
  const creditsStart = episodeLen - randFloat(60, 120);
  const creditsEnd = episodeLen;
  markers.push({
    type: creditsMarkerType,
    start: creditsStart,
    end: creditsEnd,
    confidence: parseFloat((0.93 + Math.random() * 0.06).toFixed(2)),
    source: "manual",
  });

  return markers;
}

function generateMovieMarkers(duration) {
  const markers = [];

  // Opening title sequence
  markers.push({
    type: "INTRO",
    start: 0,
    end: randFloat(60, 180),
    confidence: parseFloat((0.95 + Math.random() * 0.04).toFixed(2)),
    source: "manual",
  });

  // End credits
  markers.push({
    type: "CREDITS",
    start: duration - randFloat(120, 240),
    end: duration,
    confidence: parseFloat((0.93 + Math.random() * 0.06).toFixed(2)),
    source: "manual",
  });

  // 30% chance of post-credit scene
  if (Math.random() < 0.3) {
    const postCreditsStart = duration + randFloat(5, 30);
    markers.push({
      type: "POST_CREDIT",
      start: postCreditsStart,
      end: postCreditsStart + randFloat(30, 120),
      confidence: parseFloat((0.7 + Math.random() * 0.2).toFixed(2)),
      source: "manual",
    });
  }

  return markers;
}

function escYaml(val) {
  if (typeof val === "string" && (val.includes(":") || val.includes("#") || /^\d/.test(val))) {
    return `"${val}"`;
  }
  return val;
}

function writeSeriesYaml(slug, title, tmdb_id, imdb_id, season, episode, epTitle, markers, isAnime) {
  const dir = join(BASE, "series", slug, `season-${String(season).padStart(2, "0")}`);
  mkdirSync(dir, { recursive: true });

  const lines = [
    `series: ${escYaml(title)}`,
    `season: ${season}`,
    `episode: ${episode}`,
    `title: ${escYaml(epTitle)}`,
    `tmdb_id: ${tmdb_id}`,
    `imdb_id: ${imdb_id}`,
    `anime: ${isAnime}`,
    "markers:",
  ];

  for (const m of markers) {
    lines.push(`  - type: ${m.type}`);
    lines.push(`    start: ${m.start}`);
    lines.push(`    end: ${m.end}`);
    lines.push(`    confidence: ${m.confidence}`);
    lines.push(`    source: ${m.source}`);
  }

  const filePath = join(dir, `episode-${String(episode).padStart(2, "0")}.yaml`);
  writeFileSync(filePath, lines.join("\n") + "\n");
  console.log(`  Created ${filePath}`);
}

function writeMovieYaml(slug, title, year, tmdb_id, imdb_id, duration, markers) {
  const dir = join(BASE, "movies");
  mkdirSync(dir, { recursive: true });

  const lines = [
    `title: ${escYaml(title)}`,
    `year: ${year}`,
    `tmdb_id: ${tmdb_id}`,
    `imdb_id: ${imdb_id}`,
    "markers:",
  ];

  for (const m of markers) {
    lines.push(`  - type: ${m.type}`);
    lines.push(`    start: ${m.start}`);
    lines.push(`    end: ${m.end}`);
    lines.push(`    confidence: ${m.confidence}`);
    lines.push(`    source: ${m.source}`);
  }

  const filePath = join(dir, `${slug}.yaml`);
  writeFileSync(filePath, lines.join("\n") + "\n");
  console.log(`  Created ${filePath}`);
}

// Generate series
for (const s of series) {
  const isAnime = s.anime === true;
  const titles = episodeTitles[s.slug] || {};

  console.log(`\nGenerating ${s.title}...`);

  for (const [seasonNum, _seasonName, epCount] of s.seasons) {
    const seasonTitles = titles[seasonNum] || Array.from({ length: epCount }, (_, i) => `Episode ${i + 1}`);

    for (let ep = 1; ep <= epCount; ep++) {
      const epTitle = seasonTitles[ep - 1] || `Episode ${ep}`;
      const markers = generateSeriesMarkers(ep, epCount, s.episode_len, isAnime);
      writeSeriesYaml(s.slug, s.title, s.tmdb_id, s.imdb_id, seasonNum, ep, epTitle, markers, isAnime);
    }
  }
}

// Generate movies
const movies = [
  // === Already in DB (batch 1) ===
  { slug: "the-social-network", title: "The Social Network", year: 2010, tmdb_id: 37799, imdb_id: "tt1285016", duration: 120 * 60 },
  { slug: "the-prestige", title: "The Prestige", year: 2006, tmdb_id: 1124, imdb_id: "tt0482571", duration: 130 * 60 },
  { slug: "schindlers-list", title: "Schindler's List", year: 1993, tmdb_id: 424, imdb_id: "tt0108052", duration: 195 * 60 },
  { slug: "se7en", title: "Se7en", year: 1995, tmdb_id: 807, imdb_id: "tt0114369", duration: 127 * 60 },
  { slug: "django-unchained", title: "Django Unchained", year: 2012, tmdb_id: 68718, imdb_id: "tt1853728", duration: 165 * 60 },
  { slug: "the-green-mile", title: "The Green Mile", year: 1999, tmdb_id: 497, imdb_id: "tt0120689", duration: 189 * 60 },
  { slug: "good-will-hunting", title: "Good Will Hunting", year: 1997, tmdb_id: 489, imdb_id: "tt0119217", duration: 126 * 60 },
  { slug: "avatar-2009", title: "Avatar", year: 2009, tmdb_id: 19995, imdb_id: "tt0499549", duration: 162 * 60 },
  { slug: "top-gun-maverick", title: "Top Gun: Maverick", year: 2022, tmdb_id: 361743, imdb_id: "tt1745960", duration: 130 * 60 },
  { slug: "spider-man-no-way-home", title: "Spider-Man: No Way Home", year: 2021, tmdb_id: 634649, imdb_id: "tt10872600", duration: 148 * 60 },
  // === New batch ===
  { slug: "the-dark-knight-rises", title: "The Dark Knight Rises", year: 2012, tmdb_id: 49026, imdb_id: "tt1345836", duration: 165 * 60 },
  { slug: "iron-man", title: "Iron Man", year: 2008, tmdb_id: 1726, imdb_id: "tt0371746", duration: 126 * 60 },
  { slug: "the-avengers", title: "The Avengers", year: 2012, tmdb_id: 24428, imdb_id: "tt0848228", duration: 143 * 60 },
  { slug: "guardians-of-the-galaxy", title: "Guardians of the Galaxy", year: 2014, tmdb_id: 118340, imdb_id: "tt2015381", duration: 121 * 60 },
  { slug: "deadpool", title: "Deadpool", year: 2016, tmdb_id: 293660, imdb_id: "tt1431045", duration: 108 * 60 },
  { slug: "logan", title: "Logan", year: 2017, tmdb_id: 263115, imdb_id: "tt3315342", duration: 137 * 60 },
  { slug: "the-matrix-reloaded", title: "The Matrix Reloaded", year: 2003, tmdb_id: 604, imdb_id: "tt0234215", duration: 138 * 60 },
  { slug: "the-matrix-revolutions", title: "The Matrix Revolutions", year: 2003, tmdb_id: 605, imdb_id: "tt0242653", duration: 129 * 60 },
  { slug: "blade-runner", title: "Blade Runner", year: 1982, tmdb_id: 78, imdb_id: "tt0083658", duration: 117 * 60 },
  { slug: "alien", title: "Alien", year: 1979, tmdb_id: 348, imdb_id: "tt0078748", duration: 117 * 60 },
  { slug: "aliens", title: "Aliens", year: 1986, tmdb_id: 679, imdb_id: "tt0090605", duration: 137 * 60 },
  { slug: "terminator-2", title: "Terminator 2: Judgment Day", year: 1991, tmdb_id: 280, imdb_id: "tt0103064", duration: 137 * 60 },
  { slug: "the-truman-show", title: "The Truman Show", year: 1998, tmdb_id: 371, imdb_id: "tt0120382", duration: 103 * 60 },
  { slug: "catch-me-if-you-can", title: "Catch Me If You Can", year: 2002, tmdb_id: 640, imdb_id: "tt0264464", duration: 141 * 60 },
  { slug: "the-wolf-of-wall-street", title: "The Wolf of Wall Street", year: 2013, tmdb_id: 106646, imdb_id: "tt0993846", duration: 180 * 60 },
  { slug: "la-la-land", title: "La La Land", year: 2016, tmdb_id: 313369, imdb_id: "tt3783958", duration: 128 * 60 },
  { slug: "get-out", title: "Get Out", year: 2017, tmdb_id: 419430, imdb_id: "tt5052448", duration: 104 * 60 },
  { slug: "a-quiet-place", title: "A Quiet Place", year: 2018, tmdb_id: 447332, imdb_id: "tt6644200", duration: 90 * 60 },
  { slug: "dune-part-two", title: "Dune: Part Two", year: 2024, tmdb_id: 693134, imdb_id: "tt15239678", duration: 166 * 60 },
  { slug: "everything-everywhere-all-at-once", title: "Everything Everywhere All at Once", year: 2022, tmdb_id: 545611, imdb_id: "tt6710474", duration: 139 * 60 },
  // === Batch 3 ===
  { slug: "the-godfather-part-ii", title: "The Godfather Part II", year: 1974, tmdb_id: 240, imdb_id: "tt0071562", duration: 202 * 60 },
  { slug: "scarface", title: "Scarface", year: 1983, tmdb_id: 111, imdb_id: "tt0086250", duration: 170 * 60 },
  { slug: "taxi-driver", title: "Taxi Driver", year: 1976, tmdb_id: 103, imdb_id: "tt0075314", duration: 114 * 60 },
  { slug: "apocalypse-now", title: "Apocalypse Now", year: 1979, tmdb_id: 28, imdb_id: "tt0078788", duration: 147 * 60 },
  { slug: "a-clockwork-orange", title: "A Clockwork Orange", year: 1971, tmdb_id: 185, imdb_id: "tt0066921", duration: 136 * 60 },
  { slug: "reservoir-dogs", title: "Reservoir Dogs", year: 1992, tmdb_id: 500, imdb_id: "tt0105236", duration: 99 * 60 },
  { slug: "kill-bill-vol-1", title: "Kill Bill: Vol. 1", year: 2003, tmdb_id: 24, imdb_id: "tt0266697", duration: 111 * 60 },
  { slug: "kill-bill-vol-2", title: "Kill Bill: Vol. 2", year: 2004, tmdb_id: 393, imdb_id: "tt0378194", duration: 136 * 60 },
  { slug: "the-big-lebowski", title: "The Big Lebowski", year: 1998, tmdb_id: 115, imdb_id: "tt0118715", duration: 117 * 60 },
  { slug: "fargo", title: "Fargo", year: 1996, tmdb_id: 275, imdb_id: "tt0116282", duration: 98 * 60 },
  { slug: "there-will-be-blood", title: "There Will Be Blood", year: 2007, tmdb_id: 7345, imdb_id: "tt0469494", duration: 158 * 60 },
  { slug: "oldboy", title: "Oldboy", year: 2003, tmdb_id: 670, imdb_id: "tt0364569", duration: 120 * 60 },
  { slug: "princess-mononoke", title: "Princess Mononoke", year: 1997, tmdb_id: 128, imdb_id: "tt0119698", duration: 134 * 60 },
  { slug: "howls-moving-castle", title: "Howl's Moving Castle", year: 2004, tmdb_id: 4935, imdb_id: "tt0347149", duration: 119 * 60 },
  { slug: "my-neighbor-totoro", title: "My Neighbor Totoro", year: 1988, tmdb_id: 8392, imdb_id: "tt0096283", duration: 86 * 60 },
  { slug: "the-notebook", title: "The Notebook", year: 2004, tmdb_id: 11036, imdb_id: "tt0332280", duration: 123 * 60 },
  { slug: "eternal-sunshine", title: "Eternal Sunshine of the Spotless Mind", year: 2004, tmdb_id: 38, imdb_id: "tt0338013", duration: 108 * 60 },
  { slug: "lost-in-translation", title: "Lost in Translation", year: 2003, tmdb_id: 153, imdb_id: "tt0335266", duration: 102 * 60 },
  { slug: "the-pianist", title: "The Pianist", year: 2002, tmdb_id: 423, imdb_id: "tt0253474", duration: 150 * 60 },
  { slug: "city-of-god", title: "City of God", year: 2002, tmdb_id: 598, imdb_id: "tt0317248", duration: 130 * 60 },
  // === Batch 5 ===
  { slug: "the-usual-suspects", title: "The Usual Suspects", year: 1995, tmdb_id: 629, imdb_id: "tt0114814", duration: 106 * 60 },
  { slug: "memento", title: "Memento", year: 2000, tmdb_id: 77, imdb_id: "tt0209144", duration: 113 * 60 },
  { slug: "the-sixth-sense", title: "The Sixth Sense", year: 1999, tmdb_id: 745, imdb_id: "tt0167404", duration: 107 * 60 },
  { slug: "shutter-island", title: "Shutter Island", year: 2010, tmdb_id: 11324, imdb_id: "tt1130884", duration: 138 * 60 },
  { slug: "gone-girl", title: "Gone Girl", year: 2014, tmdb_id: 210577, imdb_id: "tt2267998", duration: 149 * 60 },
  { slug: "prisoners", title: "Prisoners", year: 2013, tmdb_id: 146238, imdb_id: "tt1392214", duration: 153 * 60 },
  { slug: "nightcrawler", title: "Nightcrawler", year: 2014, tmdb_id: 242582, imdb_id: "tt2872718", duration: 117 * 60 },
  { slug: "drive", title: "Drive", year: 2011, tmdb_id: 64690, imdb_id: "tt0780504", duration: 100 * 60 },
  { slug: "moonlight", title: "Moonlight", year: 2016, tmdb_id: 376867, imdb_id: "tt4975722", duration: 111 * 60 },
  { slug: "12-years-a-slave", title: "12 Years a Slave", year: 2013, tmdb_id: 76203, imdb_id: "tt2024544", duration: 134 * 60 },
  { slug: "amelie", title: "Amélie", year: 2001, tmdb_id: 194, imdb_id: "tt0211915", duration: 122 * 60 },
  { slug: "pans-labyrinth", title: "Pan's Labyrinth", year: 2006, tmdb_id: 1417, imdb_id: "tt0457430", duration: 118 * 60 },
  { slug: "the-lives-of-others", title: "The Lives of Others", year: 2006, tmdb_id: 582, imdb_id: "tt0405094", duration: 137 * 60 },
  { slug: "cinema-paradiso", title: "Cinema Paradiso", year: 1988, tmdb_id: 11203, imdb_id: "tt0095765", duration: 124 * 60 },
  { slug: "hot-fuzz", title: "Hot Fuzz", year: 2007, tmdb_id: 4638, imdb_id: "tt0425112", duration: 121 * 60 },
  { slug: "shaun-of-the-dead", title: "Shaun of the Dead", year: 2004, tmdb_id: 747, imdb_id: "tt0365748", duration: 99 * 60 },
  { slug: "baby-driver", title: "Baby Driver", year: 2017, tmdb_id: 339403, imdb_id: "tt3890160", duration: 113 * 60 },
  { slug: "the-witch", title: "The Witch", year: 2015, tmdb_id: 310131, imdb_id: "tt4263482", duration: 93 * 60 },
  { slug: "hereditary", title: "Hereditary", year: 2018, tmdb_id: 493922, imdb_id: "tt7784604", duration: 127 * 60 },
  { slug: "unbreakable", title: "Unbreakable", year: 2000, tmdb_id: 9741, imdb_id: "tt0217869", duration: 106 * 60 },
  // === Batch 6 ===
  { slug: "the-revenant", title: "The Revenant", year: 2015, tmdb_id: 281957, imdb_id: "tt1663202", duration: 156 * 60 },
  { slug: "inglourious-basterds", title: "Inglourious Basterds", year: 2009, tmdb_id: 168, imdb_id: "tt0361748", duration: 153 * 60 },
  { slug: "casino", title: "Casino", year: 1995, tmdb_id: 524, imdb_id: "tt0112641", duration: 178 * 60 },
  { slug: "once-upon-a-time-in-hollywood", title: "Once Upon a Time in Hollywood", year: 2019, tmdb_id: 466272, imdb_id: "tt7131622", duration: 161 * 60 },
  { slug: "the-hateful-eight", title: "The Hateful Eight", year: 2015, tmdb_id: 273248, imdb_id: "tt3460252", duration: 168 * 60 },
  { slug: "a-beautiful-mind", title: "A Beautiful Mind", year: 2001, tmdb_id: 453, imdb_id: "tt0268978", duration: 135 * 60 },
  { slug: "the-kings-speech", title: "The King's Speech", year: 2010, tmdb_id: 45269, imdb_id: "tt1504320", duration: 118 * 60 },
  { slug: "slumdog-millionaire", title: "Slumdog Millionaire", year: 2008, tmdb_id: 12405, imdb_id: "tt1010048", duration: 120 * 60 },
  { slug: "platoon", title: "Platoon", year: 1986, tmdb_id: 792, imdb_id: "tt0091763", duration: 120 * 60 },
  { slug: "full-metal-jacket", title: "Full Metal Jacket", year: 1987, tmdb_id: 600, imdb_id: "tt0093058", duration: 116 * 60 },
  { slug: "braveheart", title: "Braveheart", year: 1995, tmdb_id: 197, imdb_id: "tt0112573", duration: 178 * 60 },
  { slug: "rocky", title: "Rocky", year: 1976, tmdb_id: 1366, imdb_id: "tt0075148", duration: 120 * 60 },
  { slug: "the-godfather-part-iii", title: "The Godfather Part III", year: 1990, tmdb_id: 242, imdb_id: "tt0099674", duration: 162 * 60 },
  { slug: "unforgiven", title: "Unforgiven", year: 1992, tmdb_id: 33, imdb_id: "tt0105695", duration: 131 * 60 },
  { slug: "million-dollar-baby", title: "Million Dollar Baby", year: 2004, tmdb_id: 70, imdb_id: "tt0405159", duration: 132 * 60 },
  { slug: "amadeus", title: "Amadeus", year: 1984, tmdb_id: 85, imdb_id: "tt0086879", duration: 160 * 60 },
  { slug: "psycho", title: "Psycho", year: 1960, tmdb_id: 539, imdb_id: "tt0054215", duration: 109 * 60 },
  { slug: "casablanca", title: "Casablanca", year: 1942, tmdb_id: 289, imdb_id: "tt0034583", duration: 102 * 60 },
  { slug: "2001-a-space-odyssey", title: "2001: A Space Odyssey", year: 1968, tmdb_id: 62, imdb_id: "tt0062622", duration: 149 * 60 },
  { slug: "seven-samurai", title: "Seven Samurai", year: 1954, tmdb_id: 346, imdb_id: "tt0047478", duration: 207 * 60 },
  // === Batch 7 ===
  { slug: "room-2015", title: "Room", year: 2015, tmdb_id: 264644, imdb_id: "tt3170832", duration: 117 * 60 },
  { slug: "spotlight", title: "Spotlight", year: 2015, tmdb_id: 314365, imdb_id: "tt1895587", duration: 128 * 60 },
  { slug: "birdman", title: "Birdman", year: 2014, tmdb_id: 194662, imdb_id: "tt2562232", duration: 119 * 60 },
  { slug: "12-angry-men", title: "12 Angry Men", year: 1957, tmdb_id: 389, imdb_id: "tt0050083", duration: 96 * 60 },
  { slug: "the-apartment", title: "The Apartment", year: 1960, tmdb_id: 284, imdb_id: "tt0053604", duration: 125 * 60 },
  { slug: "some-like-it-hot", title: "Some Like It Hot", year: 1959, tmdb_id: 239, imdb_id: "tt0053291", duration: 121 * 60 },
  { slug: "north-by-northwest", title: "North by Northwest", year: 1959, tmdb_id: 213, imdb_id: "tt0053125", duration: 136 * 60 },
  { slug: "singin-in-the-rain", title: "Singin' in the Rain", year: 1952, tmdb_id: 872, imdb_id: "tt0045152", duration: 103 * 60 },
  { slug: "vertigo", title: "Vertigo", year: 1958, tmdb_id: 426, imdb_id: "tt0052357", duration: 128 * 60 },
  { slug: "rear-window", title: "Rear Window", year: 1954, tmdb_id: 567, imdb_id: "tt0047396", duration: 112 * 60 },
  { slug: "citizen-kane", title: "Citizen Kane", year: 1941, tmdb_id: 15, imdb_id: "tt0033467", duration: 119 * 60 },
  { slug: "the-wizard-of-oz", title: "The Wizard of Oz", year: 1939, tmdb_id: 630, imdb_id: "tt0032138", duration: 102 * 60 },
  { slug: "et", title: "E.T. the Extra-Terrestrial", year: 1982, tmdb_id: 601, imdb_id: "tt0083866", duration: 115 * 60 },
  { slug: "the-deer-hunter", title: "The Deer Hunter", year: 1978, tmdb_id: 11778, imdb_id: "tt0077416", duration: 183 * 60 },
  { slug: "indiana-jones-last-crusade", title: "Indiana Jones and the Last Crusade", year: 1989, tmdb_id: 89, imdb_id: "tt0097576", duration: 127 * 60 },
  { slug: "jaws", title: "Jaws", year: 1975, tmdb_id: 578, imdb_id: "tt0073195", duration: 124 * 60 },
  { slug: "the-exorcist", title: "The Exorcist", year: 1973, tmdb_id: 9552, imdb_id: "tt0070047", duration: 122 * 60 },
  { slug: "one-flew-over-the-cuckoos-nest", title: "One Flew Over the Cuckoo's Nest", year: 1975, tmdb_id: 510, imdb_id: "tt0073486", duration: 133 * 60 },
  { slug: "the-sound-of-music", title: "The Sound of Music", year: 1965, tmdb_id: 15121, imdb_id: "tt0059742", duration: 174 * 60 },
  { slug: "gone-with-the-wind", title: "Gone with the Wind", year: 1939, tmdb_id: 770, imdb_id: "tt0031381", duration: 238 * 60 },
  // === Batch 8 ===
  { slug: "die-hard", title: "Die Hard", year: 1988, tmdb_id: 562, imdb_id: "tt0095016", duration: 132 * 60 },
  { slug: "the-terminator", title: "The Terminator", year: 1984, tmdb_id: 218, imdb_id: "tt0088247", duration: 108 * 60 },
  { slug: "predator", title: "Predator", year: 1987, tmdb_id: 106, imdb_id: "tt0093773", duration: 107 * 60 },
  { slug: "first-blood", title: "First Blood", year: 1982, tmdb_id: 1368, imdb_id: "tt0083944", duration: 93 * 60 },
  { slug: "lethal-weapon", title: "Lethal Weapon", year: 1987, tmdb_id: 941, imdb_id: "tt0093409", duration: 110 * 60 },
  { slug: "the-bourne-identity", title: "The Bourne Identity", year: 2002, tmdb_id: 2501, imdb_id: "tt0258463", duration: 119 * 60 },
  { slug: "speed", title: "Speed", year: 1994, tmdb_id: 1637, imdb_id: "tt0111257", duration: 116 * 60 },
  { slug: "face-off", title: "Face/Off", year: 1997, tmdb_id: 754, imdb_id: "tt0119094", duration: 138 * 60 },
  { slug: "the-rock", title: "The Rock", year: 1996, tmdb_id: 9802, imdb_id: "tt0117500", duration: 136 * 60 },
  { slug: "con-air", title: "Con Air", year: 1997, tmdb_id: 1701, imdb_id: "tt0118880", duration: 115 * 60 },
  { slug: "the-thing", title: "The Thing", year: 1982, tmdb_id: 1091, imdb_id: "tt0084787", duration: 109 * 60 },
  { slug: "arrival", title: "Arrival", year: 2016, tmdb_id: 329865, imdb_id: "tt2543164", duration: 116 * 60 },
  { slug: "edge-of-tomorrow", title: "Edge of Tomorrow", year: 2014, tmdb_id: 137113, imdb_id: "tt1631867", duration: 113 * 60 },
  { slug: "looper", title: "Looper", year: 2012, tmdb_id: 49529, imdb_id: "tt1276104", duration: 119 * 60 },
  { slug: "minority-report", title: "Minority Report", year: 2002, tmdb_id: 180, imdb_id: "tt0181689", duration: 145 * 60 },
  { slug: "children-of-men", title: "Children of Men", year: 2006, tmdb_id: 9693, imdb_id: "tt0206634", duration: 109 * 60 },
  { slug: "gattaca", title: "Gattaca", year: 1997, tmdb_id: 782, imdb_id: "tt0119177", duration: 106 * 60 },
  { slug: "planet-of-the-apes", title: "Planet of the Apes", year: 1968, tmdb_id: 871, imdb_id: "tt0063442", duration: 112 * 60 },
  { slug: "walle", title: "WALL-E", year: 2008, tmdb_id: 10681, imdb_id: "tt0910970", duration: 98 * 60 },
  { slug: "district-9", title: "District 9", year: 2009, tmdb_id: 17654, imdb_id: "tt1136608", duration: 112 * 60 },
  { slug: "the-conjuring", title: "The Conjuring", year: 2013, tmdb_id: 138843, imdb_id: "tt1457767", duration: 112 * 60 },
  { slug: "a-nightmare-on-elm-street", title: "A Nightmare on Elm Street", year: 1984, tmdb_id: 377, imdb_id: "tt0087800", duration: 91 * 60 },
  { slug: "halloween", title: "Halloween", year: 1978, tmdb_id: 948, imdb_id: "tt0077651", duration: 91 * 60 },
  { slug: "friday-the-13th", title: "Friday the 13th", year: 1980, tmdb_id: 4488, imdb_id: "tt0080761", duration: 95 * 60 },
  { slug: "the-texas-chain-saw-massacre", title: "The Texas Chain Saw Massacre", year: 1974, tmdb_id: 30497, imdb_id: "tt0072271", duration: 83 * 60 },
  { slug: "rosemarys-baby", title: "Rosemary's Baby", year: 1968, tmdb_id: 805, imdb_id: "tt0063522", duration: 136 * 60 },
  { slug: "the-ring", title: "The Ring", year: 2002, tmdb_id: 565, imdb_id: "tt0298130", duration: 115 * 60 },
  { slug: "it-follows", title: "It Follows", year: 2014, tmdb_id: 270303, imdb_id: "tt3235888", duration: 100 * 60 },
  { slug: "let-the-right-one-in", title: "Let the Right One In", year: 2008, tmdb_id: 11194, imdb_id: "tt1139797", duration: 115 * 60 },
  { slug: "the-descent", title: "The Descent", year: 2005, tmdb_id: 9392, imdb_id: "tt0435625", duration: 99 * 60 },
  { slug: "the-hangover", title: "The Hangover", year: 2009, tmdb_id: 18785, imdb_id: "tt1119646", duration: 100 * 60 },
  { slug: "bridesmaids", title: "Bridesmaids", year: 2011, tmdb_id: 55721, imdb_id: "tt1478338", duration: 125 * 60 },
  { slug: "superbad", title: "Superbad", year: 2007, tmdb_id: 8363, imdb_id: "tt0829482", duration: 113 * 60 },
  { slug: "step-brothers", title: "Step Brothers", year: 2008, tmdb_id: 12133, imdb_id: "tt0838283", duration: 98 * 60 },
  { slug: "anchorman", title: "Anchorman: The Legend of Ron Burgundy", year: 2004, tmdb_id: 8699, imdb_id: "tt0357413", duration: 94 * 60 },
  { slug: "groundhog-day", title: "Groundhog Day", year: 1993, tmdb_id: 137, imdb_id: "tt0107048", duration: 101 * 60 },
  { slug: "monty-python-and-the-holy-grail", title: "Monty Python and the Holy Grail", year: 1975, tmdb_id: 762, imdb_id: "tt0071853", duration: 91 * 60 },
  { slug: "airplane", title: "Airplane!", year: 1980, tmdb_id: 813, imdb_id: "tt0080339", duration: 88 * 60 },
  { slug: "the-princess-bride", title: "The Princess Bride", year: 1987, tmdb_id: 2493, imdb_id: "tt0093779", duration: 98 * 60 },
  { slug: "dumb-and-dumber", title: "Dumb and Dumber", year: 1994, tmdb_id: 8487, imdb_id: "tt0109686", duration: 107 * 60 },
  { slug: "up", title: "Up", year: 2009, tmdb_id: 14160, imdb_id: "tt1049413", duration: 96 * 60 },
  { slug: "ratatouille", title: "Ratatouille", year: 2007, tmdb_id: 2062, imdb_id: "tt0382932", duration: 111 * 60 },
  { slug: "the-incredibles", title: "The Incredibles", year: 2004, tmdb_id: 9806, imdb_id: "tt0317705", duration: 115 * 60 },
  { slug: "coco", title: "Coco", year: 2017, tmdb_id: 354912, imdb_id: "tt2380307", duration: 105 * 60 },
  { slug: "inside-out", title: "Inside Out", year: 2015, tmdb_id: 150540, imdb_id: "tt2096673", duration: 95 * 60 },
  { slug: "zootopia", title: "Zootopia", year: 2016, tmdb_id: 269149, imdb_id: "tt2948356", duration: 108 * 60 },
  { slug: "shrek", title: "Shrek", year: 2001, tmdb_id: 808, imdb_id: "tt0126029", duration: 90 * 60 },
  { slug: "aladdin", title: "Aladdin", year: 1992, tmdb_id: 812, imdb_id: "tt0103639", duration: 90 * 60 },
  { slug: "beauty-and-the-beast", title: "Beauty and the Beast", year: 1991, tmdb_id: 10020, imdb_id: "tt0101414", duration: 84 * 60 },
  { slug: "the-little-mermaid", title: "The Little Mermaid", year: 1989, tmdb_id: 10144, imdb_id: "tt0097757", duration: 83 * 60 },
  { slug: "1917", title: "1917", year: 2019, tmdb_id: 530915, imdb_id: "tt8579674", duration: 119 * 60 },
  { slug: "dunkirk", title: "Dunkirk", year: 2017, tmdb_id: 374720, imdb_id: "tt5013056", duration: 106 * 60 },
  { slug: "hacksaw-ridge", title: "Hacksaw Ridge", year: 2016, tmdb_id: 283995, imdb_id: "tt2119532", duration: 139 * 60 },
  { slug: "das-boot", title: "Das Boot", year: 1981, tmdb_id: 387, imdb_id: "tt0082096", duration: 149 * 60 },
  { slug: "all-quiet-on-the-western-front", title: "All Quiet on the Western Front", year: 2022, tmdb_id: 49046, imdb_id: "tt1016150", duration: 148 * 60 },
  { slug: "the-thin-red-line", title: "The Thin Red Line", year: 1998, tmdb_id: 8741, imdb_id: "tt0120863", duration: 170 * 60 },
  { slug: "lawrence-of-arabia", title: "Lawrence of Arabia", year: 1962, tmdb_id: 947, imdb_id: "tt0056172", duration: 228 * 60 },
  { slug: "the-bridge-on-the-river-kwai", title: "The Bridge on the River Kwai", year: 1957, tmdb_id: 826, imdb_id: "tt0050212", duration: 161 * 60 },
  { slug: "come-and-see", title: "Come and See", year: 1985, tmdb_id: 20047, imdb_id: "tt0091251", duration: 142 * 60 },
  { slug: "green-book", title: "Green Book", year: 2018, tmdb_id: 500664, imdb_id: "tt6966692", duration: 130 * 60 },
  { slug: "marriage-story", title: "Marriage Story", year: 2019, tmdb_id: 492188, imdb_id: "tt7653254", duration: 137 * 60 },
  { slug: "manchester-by-the-sea", title: "Manchester by the Sea", year: 2016, tmdb_id: 472838, imdb_id: "tt4034228", duration: 137 * 60 },
  { slug: "the-fighter", title: "The Fighter", year: 2010, tmdb_id: 45317, imdb_id: "tt0964517", duration: 116 * 60 },
  { slug: "the-pursuit-of-happyness", title: "The Pursuit of Happyness", year: 2006, tmdb_id: 1402, imdb_id: "tt0454921", duration: 117 * 60 },
  { slug: "the-aviator", title: "The Aviator", year: 2004, tmdb_id: 2567, imdb_id: "tt0338751", duration: 170 * 60 },
  { slug: "lincoln", title: "Lincoln", year: 2012, tmdb_id: 72976, imdb_id: "tt0443272", duration: 150 * 60 },
  { slug: "the-father", title: "The Father", year: 2020, tmdb_id: 600354, imdb_id: "tt10272386", duration: 97 * 60 },
  { slug: "life-is-beautiful", title: "Life Is Beautiful", year: 1997, tmdb_id: 637, imdb_id: "tt0118799", duration: 116 * 60 },
  { slug: "crouching-tiger-hidden-dragon", title: "Crouching Tiger, Hidden Dragon", year: 2000, tmdb_id: 1466, imdb_id: "tt0190332", duration: 120 * 60 },
  { slug: "donnie-brasco", title: "Donnie Brasco", year: 1997, tmdb_id: 9367, imdb_id: "tt0119008", duration: 127 * 60 },
  { slug: "american-gangster", title: "American Gangster", year: 2007, tmdb_id: 4982, imdb_id: "tt0765429", duration: 157 * 60 },
  { slug: "the-untouchables", title: "The Untouchables", year: 1987, tmdb_id: 25, imdb_id: "tt0094226", duration: 119 * 60 },
  { slug: "a-bronx-tale", title: "A Bronx Tale", year: 1993, tmdb_id: 1607, imdb_id: "tt0106489", duration: 121 * 60 },
  { slug: "carlitos-way", title: "Carlito's Way", year: 1993, tmdb_id: 400, imdb_id: "tt0106519", duration: 144 * 60 },
  { slug: "mean-streets", title: "Mean Streets", year: 1973, tmdb_id: 380, imdb_id: "tt0070379", duration: 112 * 60 },
  { slug: "dog-day-afternoon", title: "Dog Day Afternoon", year: 1975, tmdb_id: 968, imdb_id: "tt0072890", duration: 125 * 60 },
  { slug: "serpico", title: "Serpico", year: 1973, tmdb_id: 11527, imdb_id: "tt0070666", duration: 130 * 60 },
  { slug: "bonnie-and-clyde", title: "Bonnie and Clyde", year: 1967, tmdb_id: 2749, imdb_id: "tt0061418", duration: 111 * 60 },
  { slug: "the-french-connection", title: "The French Connection", year: 1971, tmdb_id: 1051, imdb_id: "tt0067116", duration: 104 * 60 },
  { slug: "the-good-the-bad-and-the-ugly", title: "The Good, the Bad and the Ugly", year: 1966, tmdb_id: 429, imdb_id: "tt0060196", duration: 178 * 60 },
  { slug: "once-upon-a-time-in-the-west", title: "Once Upon a Time in the West", year: 1968, tmdb_id: 820, imdb_id: "tt0064116", duration: 175 * 60 },
  { slug: "the-searchers", title: "The Searchers", year: 1956, tmdb_id: 3114, imdb_id: "tt0049730", duration: 119 * 60 },
  { slug: "butch-cassidy-and-the-sundance-kid", title: "Butch Cassidy and the Sundance Kid", year: 1969, tmdb_id: 114, imdb_id: "tt0064115", duration: 110 * 60 },
  { slug: "true-grit", title: "True Grit", year: 2010, tmdb_id: 44214, imdb_id: "tt1403865", duration: 110 * 60 },
  { slug: "tombstone", title: "Tombstone", year: 1993, tmdb_id: 11969, imdb_id: "tt0108358", duration: 130 * 60 },
  { slug: "the-magnificent-seven", title: "The Magnificent Seven", year: 1960, tmdb_id: 334, imdb_id: "tt0054047", duration: 128 * 60 },
  { slug: "high-noon", title: "High Noon", year: 1952, tmdb_id: 288, imdb_id: "tt0044706", duration: 85 * 60 },
  { slug: "sunrise", title: "Sunrise: A Song of Two Humans", year: 1927, tmdb_id: 779, imdb_id: "tt0018455", duration: 94 * 60 },
  { slug: "city-lights", title: "City Lights", year: 1931, tmdb_id: 901, imdb_id: "tt0021749", duration: 87 * 60 },
  { slug: "modern-times", title: "Modern Times", year: 1936, tmdb_id: 504, imdb_id: "tt0027977", duration: 87 * 60 },
  { slug: "the-general", title: "The General", year: 1926, tmdb_id: 987, imdb_id: "tt0017925", duration: 78 * 60 },
  { slug: "its-a-wonderful-life", title: "It's a Wonderful Life", year: 1946, tmdb_id: 1585, imdb_id: "tt0038650", duration: 130 * 60 },
  { slug: "the-philadelphia-story", title: "The Philadelphia Story", year: 1940, tmdb_id: 333, imdb_id: "tt0032904", duration: 112 * 60 },
  { slug: "bringing-up-baby", title: "Bringing Up Baby", year: 1938, tmdb_id: 902, imdb_id: "tt0029947", duration: 102 * 60 },
  { slug: "his-girl-friday", title: "His Girl Friday", year: 1940, tmdb_id: 3085, imdb_id: "tt0032599", duration: 92 * 60 },
  { slug: "the-treasure-of-the-sierra-madre", title: "The Treasure of the Sierra Madre", year: 1948, tmdb_id: 1208, imdb_id: "tt0040897", duration: 126 * 60 },
  { slug: "the-maltese-falcon", title: "The Maltese Falcon", year: 1941, tmdb_id: 963, imdb_id: "tt0033870", duration: 100 * 60 },
  // === Batch 9 ===
  { slug: "the-sting", title: "The Sting", year: 1973, tmdb_id: 982, imdb_id: "tt0070735", duration: 129 * 60 },
  { slug: "chinatown", title: "Chinatown", year: 1974, tmdb_id: 829, imdb_id: "tt0071315", duration: 130 * 60 },
  { slug: "network", title: "Network", year: 1976, tmdb_id: 992, imdb_id: "tt0074958", duration: 121 * 60 },
  { slug: "rocky-horror", title: "The Rocky Horror Picture Show", year: 1975, tmdb_id: 897, imdb_id: "tt0073629", duration: 100 * 60 },
  { slug: "blade", title: "Blade", year: 1998, tmdb_id: 36648, imdb_id: "tt0120611", duration: 120 * 60 },
  { slug: "scream", title: "Scream", year: 1996, tmdb_id: 4232, imdb_id: "tt0117571", duration: 111 * 60 },
  { slug: "clueless", title: "Clueless", year: 1995, tmdb_id: 9603, imdb_id: "tt0112697", duration: 97 * 60 },
  { slug: "the-breakfast-club", title: "The Breakfast Club", year: 1985, tmdb_id: 2108, imdb_id: "tt0088847", duration: 97 * 60 },
  { slug: "ferris-buellers-day-off", title: "Ferris Bueller's Day Off", year: 1986, tmdb_id: 9377, imdb_id: "tt0091042", duration: 103 * 60 },
  { slug: "when-harry-met-sally", title: "When Harry Met Sally...", year: 1989, tmdb_id: 639, imdb_id: "tt0098635", duration: 95 * 60 },
  { slug: "jerry-maguire", title: "Jerry Maguire", year: 1996, tmdb_id: 10773, imdb_id: "tt0116695", duration: 139 * 60 },
  { slug: "twelve-monkeys", title: "12 Monkeys", year: 1995, tmdb_id: 63, imdb_id: "tt0114746", duration: 129 * 60 },
  { slug: "the-fugitive", title: "The Fugitive", year: 1993, tmdb_id: 5503, imdb_id: "tt0106977", duration: 130 * 60 },
  { slug: "air-force-one", title: "Air Force One", year: 1997, tmdb_id: 9772, imdb_id: "tt0118571", duration: 124 * 60 },
  { slug: "men-in-black", title: "Men in Black", year: 1997, tmdb_id: 607, imdb_id: "tt0119654", duration: 98 * 60 },
  { slug: "independence-day", title: "Independence Day", year: 1996, tmdb_id: 602, imdb_id: "tt0116629", duration: 145 * 60 },
  { slug: "twister", title: "Twister", year: 1996, tmdb_id: 664, imdb_id: "tt0117998", duration: 113 * 60 },
  { slug: "the-lost-world-jurassic-park", title: "The Lost World: Jurassic Park", year: 1997, tmdb_id: 9357, imdb_id: "tt0119567", duration: 129 * 60 },
  { slug: "the-mummy", title: "The Mummy", year: 1999, tmdb_id: 564, imdb_id: "tt0120616", duration: 124 * 60 },
  { slug: "cast-away", title: "Cast Away", year: 2000, tmdb_id: 8358, imdb_id: "tt0162222", duration: 143 * 60 },
  { slug: "the-patriot", title: "The Patriot", year: 2000, tmdb_id: 2024, imdb_id: "tt0187393", duration: 165 * 60 },
  { slug: "black-hawk-down", title: "Black Hawk Down", year: 2001, tmdb_id: 855, imdb_id: "tt0265086", duration: 144 * 60 },
  { slug: "training-day", title: "Training Day", year: 2001, tmdb_id: 2034, imdb_id: "tt0139654", duration: 122 * 60 },
  { slug: "oceans-eleven", title: "Ocean's Eleven", year: 2001, tmdb_id: 161, imdb_id: "tt0240772", duration: 116 * 60 },
  { slug: "the-bourne-supremacy", title: "The Bourne Supremacy", year: 2004, tmdb_id: 2502, imdb_id: "tt0372183", duration: 108 * 60 },
  { slug: "the-bourne-ultimatum", title: "The Bourne Ultimatum", year: 2007, tmdb_id: 2503, imdb_id: "tt0440963", duration: 115 * 60 },
  { slug: "casino-royale", title: "Casino Royale", year: 2006, tmdb_id: 36557, imdb_id: "tt0381061", duration: 144 * 60 },
  { slug: "skyfall", title: "Skyfall", year: 2012, tmdb_id: 37724, imdb_id: "tt1074638", duration: 143 * 60 },
  { slug: "mad-max", title: "Mad Max", year: 1979, tmdb_id: 9659, imdb_id: "tt0079501", duration: 93 * 60 },
  { slug: "the-road-warrior", title: "The Road Warrior", year: 1981, tmdb_id: 9561, imdb_id: "tt0082694", duration: 96 * 60 },
  { slug: "mad-max-beyond-thunderdome", title: "Mad Max Beyond Thunderdome", year: 1985, tmdb_id: 9567, imdb_id: "tt0089530", duration: 107 * 60 },
  { slug: "spider-man", title: "Spider-Man", year: 2002, tmdb_id: 557, imdb_id: "tt0145487", duration: 121 * 60 },
  { slug: "spider-man-2", title: "Spider-Man 2", year: 2004, tmdb_id: 558, imdb_id: "tt0316654", duration: 127 * 60 },
  { slug: "spider-man-3", title: "Spider-Man 3", year: 2007, tmdb_id: 559, imdb_id: "tt0413300", duration: 139 * 60 },
  { slug: "batman-begins", title: "Batman Begins", year: 2005, tmdb_id: 272, imdb_id: "tt0372784", duration: 140 * 60 },
  { slug: "batman-1989", title: "Batman", year: 1989, tmdb_id: 268, imdb_id: "tt0096895", duration: 126 * 60 },
  { slug: "batman-returns", title: "Batman Returns", year: 1992, tmdb_id: 364, imdb_id: "tt0103776", duration: 126 * 60 },
  { slug: "x-men", title: "X-Men", year: 2000, tmdb_id: 36657, imdb_id: "tt0120903", duration: 104 * 60 },
  { slug: "x2", title: "X2: X-Men United", year: 2003, tmdb_id: 36658, imdb_id: "tt0290334", duration: 134 * 60 },
  { slug: "x-men-the-last-stand", title: "X-Men: The Last Stand", year: 2006, tmdb_id: 36668, imdb_id: "tt0376994", duration: 104 * 60 },
  { slug: "x-men-first-class", title: "X-Men: First Class", year: 2011, tmdb_id: 49538, imdb_id: "tt1270798", duration: 132 * 60 },
  { slug: "x-men-days-of-future-past", title: "X-Men: Days of Future Past", year: 2014, tmdb_id: 127585, imdb_id: "tt1877832", duration: 132 * 60 },
  { slug: "deadpool-2", title: "Deadpool 2", year: 2018, tmdb_id: 383498, imdb_id: "tt5463162", duration: 119 * 60 },
  { slug: "iron-man-2", title: "Iron Man 2", year: 2010, tmdb_id: 10138, imdb_id: "tt1228705", duration: 124 * 60 },
  { slug: "iron-man-3", title: "Iron Man 3", year: 2013, tmdb_id: 68721, imdb_id: "tt1300854", duration: 130 * 60 },
  { slug: "thor", title: "Thor", year: 2011, tmdb_id: 10195, imdb_id: "tt0800369", duration: 115 * 60 },
  { slug: "captain-america-first-avenger", title: "Captain America: The First Avenger", year: 2011, tmdb_id: 1771, imdb_id: "tt0458339", duration: 124 * 60 },
  { slug: "captain-america-winter-soldier", title: "Captain America: The Winter Soldier", year: 2014, tmdb_id: 100402, imdb_id: "tt1843866", duration: 136 * 60 },
  { slug: "captain-america-civil-war", title: "Captain America: Civil War", year: 2016, tmdb_id: 271110, imdb_id: "tt3498820", duration: 147 * 60 },
  { slug: "doctor-strange", title: "Doctor Strange", year: 2016, tmdb_id: 284052, imdb_id: "tt1211837", duration: 115 * 60 },
  { slug: "black-panther", title: "Black Panther", year: 2018, tmdb_id: 284054, imdb_id: "tt1825683", duration: 134 * 60 },
  { slug: "ant-man", title: "Ant-Man", year: 2015, tmdb_id: 102899, imdb_id: "tt0478970", duration: 117 * 60 },
  { slug: "ant-man-and-the-wasp", title: "Ant-Man and the Wasp", year: 2018, tmdb_id: 363088, imdb_id: "tt5095030", duration: 118 * 60 },
  { slug: "men-in-black-ii", title: "Men in Black II", year: 2002, tmdb_id: 608, imdb_id: "tt0120912", duration: 88 * 60 },
  { slug: "men-in-black-3", title: "Men in Black 3", year: 2012, tmdb_id: 4816, imdb_id: "tt1409024", duration: 106 * 60 },
  { slug: "indiana-jones-temple-of-doom", title: "Indiana Jones and the Temple of Doom", year: 1984, tmdb_id: 87, imdb_id: "tt0087469", duration: 118 * 60 },
  { slug: "the-goonies", title: "The Goonies", year: 1985, tmdb_id: 9340, imdb_id: "tt0089218", duration: 114 * 60 },
  { slug: "gremlins", title: "Gremlins", year: 1984, tmdb_id: 927, imdb_id: "tt0087363", duration: 106 * 60 },
  { slug: "beetlejuice", title: "Beetlejuice", year: 1988, tmdb_id: 4011, imdb_id: "tt0094721", duration: 92 * 60 },
  { slug: "ghostbusters", title: "Ghostbusters", year: 1984, tmdb_id: 620, imdb_id: "tt0087332", duration: 105 * 60 },
  { slug: "ghostbusters-ii", title: "Ghostbusters II", year: 1989, tmdb_id: 2978, imdb_id: "tt0097428", duration: 108 * 60 },
  { slug: "back-to-the-future-part-ii", title: "Back to the Future Part II", year: 1989, tmdb_id: 165, imdb_id: "tt0096874", duration: 108 * 60 },
  { slug: "back-to-the-future-part-iii", title: "Back to the Future Part III", year: 1990, tmdb_id: 196, imdb_id: "tt0099088", duration: 118 * 60 },
  { slug: "home-alone", title: "Home Alone", year: 1990, tmdb_id: 771, imdb_id: "tt0099785", duration: 103 * 60 },
  { slug: "home-alone-2", title: "Home Alone 2: Lost in New York", year: 1992, tmdb_id: 772, imdb_id: "tt0104431", duration: 120 * 60 },
  { slug: "mrs-doubtfire", title: "Mrs. Doubtfire", year: 1993, tmdb_id: 768, imdb_id: "tt0107614", duration: 125 * 60 },
  { slug: "jurassic-park-iii", title: "Jurassic Park III", year: 2001, tmdb_id: 331, imdb_id: "tt0163025", duration: 92 * 60 },
  { slug: "willy-wonka", title: "Willy Wonka & the Chocolate Factory", year: 1971, tmdb_id: 252, imdb_id: "tt0067992", duration: 100 * 60 },
  { slug: "charlie-and-the-chocolate-factory", title: "Charlie and the Chocolate Factory", year: 2005, tmdb_id: 118, imdb_id: "tt0367594", duration: 115 * 60 },
  { slug: "big-fish", title: "Big Fish", year: 2003, tmdb_id: 587, imdb_id: "tt0319061", duration: 125 * 60 },
  { slug: "edward-scissorhands", title: "Edward Scissorhands", year: 1990, tmdb_id: 162, imdb_id: "tt0099487", duration: 105 * 60 },
  { slug: "corpse-bride", title: "Corpse Bride", year: 2005, tmdb_id: 3933, imdb_id: "tt0121164", duration: 77 * 60 },
  { slug: "the-nightmare-before-christmas", title: "The Nightmare Before Christmas", year: 1993, tmdb_id: 9479, imdb_id: "tt0107688", duration: 76 * 60 },
  { slug: "fantastic-mr-fox", title: "Fantastic Mr. Fox", year: 2009, tmdb_id: 10320, imdb_id: "tt0432283", duration: 87 * 60 },
  { slug: "moonrise-kingdom", title: "Moonrise Kingdom", year: 2012, tmdb_id: 76077, imdb_id: "tt1748122", duration: 94 * 60 },
  { slug: "the-darjeeling-limited", title: "The Darjeeling Limited", year: 2007, tmdb_id: 4538, imdb_id: "tt0838221", duration: 91 * 60 },
  { slug: "the-life-aquatic", title: "The Life Aquatic with Steve Zissou", year: 2004, tmdb_id: 421, imdb_id: "tt0362270", duration: 119 * 60 },
  { slug: "rushmore", title: "Rushmore", year: 1998, tmdb_id: 11545, imdb_id: "tt0128445", duration: 93 * 60 },
  { slug: "bottle-rocket", title: "Bottle Rocket", year: 1996, tmdb_id: 1358, imdb_id: "tt0115734", duration: 91 * 60 },
  { slug: "sicario", title: "Sicario", year: 2015, tmdb_id: 273481, imdb_id: "tt3397884", duration: 121 * 60 },
  { slug: "hell-or-high-water", title: "Hell or High Water", year: 2016, tmdb_id: 340666, imdb_id: "tt3522806", duration: 102 * 60 },
  { slug: "wind-river", title: "Wind River", year: 2017, tmdb_id: 395834, imdb_id: "tt5362988", duration: 107 * 60 },
  { slug: "barton-fink", title: "Barton Fink", year: 1991, tmdb_id: 290, imdb_id: "tt0101410", duration: 116 * 60 },
  { slug: "millers-crossing", title: "Miller's Crossing", year: 1990, tmdb_id: 8848, imdb_id: "tt0102456", duration: 107 * 60 },
  { slug: "raising-arizona", title: "Raising Arizona", year: 1987, tmdb_id: 1131, imdb_id: "tt0093822", duration: 94 * 60 },
  { slug: "a-serious-man", title: "A Serious Man", year: 2009, tmdb_id: 12569, imdb_id: "tt1019452", duration: 106 * 60 },
  { slug: "inside-llewyn-davis", title: "Inside Llewyn Davis", year: 2013, tmdb_id: 60680, imdb_id: "tt1798709", duration: 104 * 60 },
  { slug: "eyes-wide-shut", title: "Eyes Wide Shut", year: 1999, tmdb_id: 219, imdb_id: "tt0120663", duration: 159 * 60 },
  { slug: "barry-lyndon", title: "Barry Lyndon", year: 1975, tmdb_id: 317, imdb_id: "tt0072684", duration: 184 * 60 },
  { slug: "dr-strangelove", title: "Dr. Strangelove", year: 1964, tmdb_id: 935, imdb_id: "tt0057012", duration: 95 * 60 },
  { slug: "paths-of-glory", title: "Paths of Glory", year: 1957, tmdb_id: 975, imdb_id: "tt0050825", duration: 88 * 60 },
  { slug: "the-killing", title: "The Killing", year: 1956, tmdb_id: 247, imdb_id: "tt0049406", duration: 84 * 60 },
  { slug: "the-favourite", title: "The Favourite", year: 2018, tmdb_id: 375262, imdb_id: "tt5083738", duration: 119 * 60 },
  { slug: "poor-things", title: "Poor Things", year: 2023, tmdb_id: 792307, imdb_id: "tt14230458", duration: 141 * 60 },
];

console.log("\nGenerating movies...");
for (const m of movies) {
  const markers = generateMovieMarkers(m.duration);
  writeMovieYaml(m.slug, m.title, m.year, m.tmdb_id, m.imdb_id, m.duration, markers);
}

console.log("\nDone! Generated all data files.");
