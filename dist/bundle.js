(function (seedrandom) {
'use strict';

seedrandom = seedrandom && seedrandom.hasOwnProperty('default') ? seedrandom['default'] : seedrandom;

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var parseUrl = function parseUrl() {
  if (window.location.search === '') return [];

  var loc = window.location.search.split('/').slice(1);
  var showResults = validateInputs(loc);
  return showResults ? loc : [];
};

var setUrl = function setUrl(title, amount) {
  return window.location.assign('?/' + title + '/' + amount);
};

function validateInputs(inputs) {
  var initCheck = inputs.length === 2;
  if (initCheck === false) return false;

  var _inputs = slicedToArray(inputs, 2),
      title = _inputs[0],
      num = _inputs[1];

  if (title.length === 0) return false;

  return parseInt(num, 10) > 0;
}

var urlFns = { parseUrl: parseUrl, setUrl: setUrl, validateInputs: validateInputs };

var homePageTemplate = function homePageTemplate() {
  return " <div class='form-container'>\n      <div class=\"background-logo\"></div>\n      <form class='form create-best-games'>\n        <input id='title-input' type='text' name='title' value='Not Polygon' autofocus>\n        <div>\n          <span> The </span>\n          <input id='amount-input' type='number' name='amount' value='50'>\n          <span> best games of all time</span>\n        </div>\n        <span> After weeks of voting and arguments, we\u2019re ready to present our choices </span>\n        <input id='submit-input' type='submit' name='submit' value='View Now'>\n     </form>\n     </div>";
};

var paintHomePage = function paintHomePage(container) {
  container.innerHTML = '';
  container.innerHTML = homePageTemplate();

  var form = container.querySelector('.create-best-games');
  console.log({ form: form });
  form.addEventListener('submit', function (e) {
    console.log({ e: e, form: form });
    e.preventDefault();
    var inputs = ['title', 'amount'];
    var data = inputs.map(function (id, i) {
      var input = document.querySelector('#' + id + '-input');
      return i === 0 ? input.value : parseInt(input.value, 10);
    });

    if (urlFns.validateInputs(data)) {
      urlFns.setUrl.apply(urlFns, toConsumableArray(data));
    }
  });
};

var itemTemplate = function itemTemplate(_ref) {
  var item = _ref.item;
  return "<li>\n    <div>" + item.title + "</div>\n    <div>" + item.releases + "</div>\n    <div>these are words. they are a lot of words. then there are more words. how amazing.</div>\n  </li>";
};

var listTemplate = function listTemplate(_ref) {
  var list = _ref.list;

  var ul = '<ul>';
  list.forEach(function (item) {
    return ul += itemTemplate({ item: item });
  });
  return ul += '</ul>';
};

var paintListPage = function paintListPage(container, list) {
  container.innerHTML = '';
  container.innerHTML = listTemplate({ list: list });
};

var sample = function sample(_ref) {
  var array = _ref.array,
      seed = _ref.seed;

  var rng = seed ? seedrandom(seed) : seedrandom();
  var index = Math.floor(rng() * array.length);
  return array[index];
};

var arrayMaker = function arrayMaker(_ref2) {
  var input = _ref2.input;
  return input.split(' ');
};

var addToState = function addToState(_ref3) {
  var array = _ref3.array,
      _ref3$state = _ref3.state,
      state = _ref3$state === undefined ? { entry: [], exit: [], node: {} } : _ref3$state;

  array.forEach(function (value, i) {
    var nexti = i + 1;
    var previ = i - 1;

    var node = {
      value: value,
      entry: false,
      exit: false
    };

    if (previ < 0) {
      node.entry = true;
      state.entry.push(value);
    }

    if (nexti >= array.length) {
      node.exit = true;
      state.exit.push(value);
    }

    if (state.node[value] === undefined) state.node[value] = [];
    state.node[value].push(node);
  });

  return state;
};

var getItem = function getItem(_ref4) {
  var state = _ref4.state,
      seed = _ref4.seed;

  var array = Array.isArray(state) ? sample({ array: state, seed: seed }) : sample({ array: Object.values(state), seed: seed });

  return sample({ array: array, seed: seed });
};

var switcher = function switcher(direction) {
  return direction === 'prev' ? 'next' : 'prev';
};

var createChain = function createChain(_ref5) {
  var state = _ref5.state,
      amount = _ref5.amount,
      seed = _ref5.seed;

  var haveStart = false;
  var haveEnd = false;
  var direction = 'prev';
  var i = 0;
  var item = getItem({ seed: seed, state: state.node });

  while (item.next === true && item.prev === true) {
    item = getItem({ seed: seed, state: state.node });
    haveStart = item.entry === true;
    haveEnd = item.exit === true;
  }

  var parts = [];

  while (i < amount) {
    direction = switcher(direction);
    if (haveStart === true && haveEnd === true) break;
    if (haveStart && direction === 'prev') continue;
    if (haveEnd && direction === 'next') continue;

    item = getItem({ seed: seed + i, state: state.node });
    if (parts.includes(item.value)) continue;

    if (direction === 'prev') parts.push(item.value);
    if (direction === 'next') parts.unshift(item.value);
    haveStart = item.entry === true;
    haveEnd = item.exit === true;

    i++;
  }

  if (haveStart === false) {
    var v = getPart({ array: parts, state: state.entry, seed: seed });
    parts.unshift(v);
  }

  if (haveEnd === false) {
    var _v = getPart({ array: parts, state: state.exit, seed: seed });
    parts.push(_v);
  }

  if (i < amount) {
    var _v2 = getPart({ array: parts, state: state.exit, seed: seed });
    parts.push(_v2);
  }

  return parts.join(' ');
};

var getPart = function getPart(_ref6) {
  var array = _ref6.array,
      state = _ref6.state,
      seed = _ref6.seed;

  var value = sample({ array: state, seed: seed });
  var i = 0;

  while (array.includes(value)) {
    value = sample({ array: state, seed: seed + i });
    i++;
  }

  return value;
};

var fns = {
  sample: sample,
  getPart: getPart,
  addToState: addToState,
  arrayMaker: arrayMaker,
  createChain: createChain,
  getItem: getItem,
  switcher: switcher
};

var titles = ["Sea of Thieves", "R.B.I Baseball 18", "Attack on Titan 2", "Assault Gunners HD Edition", "Assassin's Creed Rogue: Remastered", "Kirby Star Allies", "Burnout Paradise Remastered", "Surviving Mars", "Gal Gunvolt Burst", "Q.U.B.E. 2", "Devil May Cry HD Collection", "Flinthook", "Warhammer: Vermintide 2", "Chuchel", "Damascus Gear: Operation Osaka", "Scribblenauts Showdown", "Frantics", "Final Fantasy XV", "Fear Effect Sedna", "DJMax Respect", "Bravo Team", "Pit People", "H1Z1", "Darkest Dungeon", "Payday 2", "Moss", "Heroine Anthem Zero", "Gravel", "Girls und Panzer: Dream Tank Match", "De Blob 2 Remastered", "Part Time UFO", "Yume Nikki: Dream Diary", "Sword Art Online: Fatal Bullet", "Past Cure", "Pac-Man Championship Edition 2 Plus", "Metal Gear Survive", "Armored Warfare", "Age of Empires: Definitive Edition", "Fe", "Bayonetta", "Bayonetta 2", "Secret of Mana", "A Certain Magical Virtual-On", "The Legend of Heroes: Trails of Cold Steel II", "The Legend of Heroes: Trails of Cold Steel", "The Longest 5 Minutes", "Radiant Historia: Perfect Chronology", "Owlboy", "Monster Energy Supercross: The Official Videogame", "Kingdom Come: Deliverance", "Dynasty Warriors 9", "Under Night In-Birth Exe: Late[st]", "The Seven Deadly Sins: Knights of Britannia", "Dragon Quest Builders", "Rust", "Octogeddon", "Civilization VI: Rise and Fall", "Shadow of the Colossus", "Marooners", "We Were Here Too", "Gundemoniums", "EA Sports UFC 3", "SteamWorld Dig", "Sky Force Reloaded", "Night in the Woods", "Dissidia Final Fantasy NT", "Monster Hunter: World", "Dragon Ball FighterZ", "Celeste", "The Inpatient", "Subnautica", "Lost Sphear", "Iconoclasts", "Kirby Battle Royale", "World to the West", "Gintama Rumble", "Darkest Dungeon", "Street Fighter V Arcade Edition", "Kerbal Space Program: Enhanced Edition", "InnerSpace", "The Escapists 2", "The Escapists", "Valkyria Chronicles 4", "A Way Out", "Detective Pikachu", "Atelier Lydie & Suelle: The Alchemists and the Mysterious Paintings", "Far Cry 5", "Far Cry 4", "Far Cry 3", "MLB The Show 18", "Long Gone Days", "Shining Resonance Refrain", "Shining Force", "Shining in the Dark", "Super Robot Wars X", "Dark Rose Valkyrie", "Extinction", "God of War", "Nintendo Labo Variety Kit", "Nintendo Labo Robot Kit", "Adventure Time: Pirates of the Enchiridion", "Frostpunk", "South Park: The Fractured but Whole", "BattleTech", "Donkey Kong Country: Tropical Freeze", "Pillars of Eternity II: Deadfire", "Conan Exiles", "Hyrule Warriors: Definitive Edition", "State of Decay 2", "Dark Souls Remastered", "Detroit: Become Human", "Vampyr", "Street Fighter 30th Anniversary Collection", "Full Metal Panic! Fight: Who Dares Wins", "Sushi Striker: The Way of Sushido", "Jurassic World Evolution", "Mario Tennis Aces", "The Crew 2", "Captain Toad: Treasure Tracker", "Octopath Traveler", "WarioWare Gold", "Shadow of the Tomb Raider", "Call of Duty: Black Ops 4", "Red Dead Redemption 2", "Red Dead Redemption", "Anno 1800", "Call of Cthulhu", "Catherine: Full Body", "Concrete Genie", "Pony Island", "Amplitude", "Hardware: Rivals", "Volume", "Punch Club", "Lovely Planet", "Assassin's Creed Chronicles: India", "Gemini: Heroes Reborn", "Gone Home: Console Edition", "The Banner Saga", "That Dragon, Cancer", "Dragon's Dogma: Dark Arisen", "A Boy and His Blob", "Darkest Dungeon", "Oddworld: New 'n' Tasty!", "Resident Evil Zero HD Remaster", "The Deadly Tower of Monsters", "World of Tanks", "Homeworld: Deserts of Kharak", "Minecraft: Story Mode: Episode 1 — The Order of the Stone", "The Westport Independent", "Mario & Luigi: Paper Jam", "Lego Marvel's Avengers", "The Witness", "Rise of the Tomb Raider", "Bombshell", "This War of Mine: The Little Ones", "American Truck Simulator", "Digimon Story: Cyber Sleuth", "Megadimension Neptunia VII", "Tales of Symphonia HD", "Agatha Christie: The ABC Murders", "Assassin's Creed Chronicles: Russia", "XCOM 2", "Final Fantasy IX", "Lovers in a Dangerous Spacetime", "Naruto Shippuden: Ultimate Ninja Storm 4", "Grand Theft Auto: Liberty City Stories Mobile", "Pillars of Eternity: The White March Part 2", "Project X Zone 2", "The Escapists: The Walking Dead", "Rocket League", "Danganronpa: Trigger Happy Havoc", "Far Cry Primal", "Plants vs. Zombies: Garden Warfare 2", "The Flame in the Flood", "Gears of War: Ultimate Edition", "The Witch and the Hundred Knight: Revival Edition", "Heavy Rain", "BlazBlue: Chrono Phantasma Extend", "Black Desert Online", "The Legend of Zelda: Twilight Princess HD", "Tom Clancy's The Division", "Shadow Complex Remastered", "XCOM: Enemy Unknown", "Adventure Time: Magic Man's Head Games", "Keep Talking and Nobody Explodes", "Minecraft: Story Mode Episode 5 — Order Up!", "Ashes of the Singularity", "Sleeping Dogs: Definitive Edition", "1979 Revolution: Black Friday", "Sorcery! Part 3: The Seven Serpents", "Skullgirls 2nd Encore", "Everybody's Gone to the Rapture", "Dark Souls III", "Loud on Planet X", "The Banner Saga 2", "The Banner Saga", "Hyperdevotion Noire: Goddess Black Heart", "Stranger of Sword City", "Offworld Trading Company", "Uncharted 4: A Thief's End", "Shadow of the Beast", "Total War: Warhammer", "Dead Island: Definitive Edition", "Hearts of Iron IV", "Guilty Gear Xrd -Revelator-", "Sherlock Holmes: The Devil's Daughter", "Deadlight: Director’s Cut", "Mario & Sonic at the Rio 2016 Olympic Games", "Lost Sea", "Crypt of the Necrodancer Pocket Edition", "Crypt of the Necrodancer", "Romance of the Three Kingdoms XIII", "Assault Suit Leynos", "Mobile Suit Gundam: Extreme VS Force", "Kerbal Space Program", "Batman: Arkham Underworld", "Earth Defense Force 4.1: The Shadow of New Despair", "Kentucky Route Zero Act 4", "Fairy Fencer F: Advent Dark Force", "Stardew Valley", "Xblaze: Lost Memories", "The Girl and the Robot", "Master of Orion: Conquer the Stars", "Star Trek Online", "Pro Evolution Soccer 2017", "The Witness", "NBA 2K17", "NBA 2K14", "NBA 2K12", "NBA 2K9", "NBA 2K10", "FIFA 17", "FIFA 2007", "FIFA 08", "FIFA 15", "FIFA 12", "FIFA 98", "NFL Blitz", "Call of Cthulhu: The Wasted Land", "Double Fine Happy Action Theater", "Kingdoms of Amalur: Reckoning", "Shank 2", "Shank", "Jagged Alliance: Back in Action", "Tales of the Abyss", "Grand Slam Tennis 2", "Crusader Kings II", "Dear Esther", "Little Deviants", "Metal Gear Solid: Snake Eater 3D", "Dynasty Warriors Next", "Hot Shots Golf: World International", "Lumines: Electronic Symphony", "Wipeout 2048", "Shin Megami Tensei: Devil Survivor 2", "Vessel", "MLB 12: The Show", "Street Fighter X Tekken", "Mario Party 9", "Dungeon Defenders", "Total War: Shogun 2 – Fall of the Samurai", "Rayman Origins", "BioShock 2", "BioShock", "BioShock Infinite", "The House of the Dead 4", "Insanely Twisted Shadow Planet", "The Witcher 2: Assassins of Kings Enhanced Edition", "Port Royale 3: Pirates & Merchants", "Diablo III", "Diablo 2", "Diablo", "Mario Tennis Open", "Resident Evil: Operation Raccoon City", "Metal Gear Solid HD Collection", "Pokémon Conquest", "Civilization V: Gods & Kings", "Tom Clancy's Ghost Recon: Future Soldier", "Final Fantasy III", "The Amazing Spider-Man", "Tony Hawk's Pro Skater HD", "Growlanser Wayfarer of Time", "Persona 4 Arena", "Persona 4", "The Last Story", "Madden NFL 13", "Rock Band Blitz", "Anomaly: Warzone Earth", "Tekken Tag Tournament 2", "Torchlight II", "Torchlight", "Tokyo Jungle", "Marvel vs. Capcom Origins", "Dishonored", "RollerCoaster Tycoon 3D", "Carmageddon", "The Witcher 2: Assassins of Kings", "Medal of Honor: Warfighter", "Assassin's Creed III", "Ragnarok Tactics", "Paper Mario: Sticker Star", "Thomas Was Alone", "Epic Mickey: Power of Illusion", "Virtua Fighter 2", "Legacy of Kain: Soul Reaver", "Grand Theft Auto: San Andreas", "Final Fantasy IV", "Oddworld: Munch's Oddysee", "Divinity II: Ego Draconis", "Bayonetta", "Vandal Hearts: Flames of Judgment", "Mass Effect 2", "No More Heroes 2: Desperate Struggle", "S.T.A.L.K.E.R.: Call of Pripyat", "Deadly Premonition", "Risen", "Napoleon: Total War", "MLB 2K10", "Final Fantasy XIII", "God of War III", "Dead or Alive Paradise", "Mega Man 10", "Flotilla", "Monster Hunter Tri", "Alan Wake", "UFC 2010", "River City Soccer Hooligans", "Prince of Persia: The Forgotten Sands", "Ninety-Nine Nights II", "Singularity", "StarCraft II: Wings of Liberty", "Madden NFL 11", "Victoria 2", "Victoria", "Mafia II", "Mafia 3", "Phantasy Star II", "Phantasy Star IV", "Spider-Man: Shattered Dimensions", "Lost Horizon", "Front Mission Evolved", "Final Fantasy XIV", "Quantum Theory", "Castlevania: Lords of Shadow", "NBA Jam", "Lost Planet 2", "Sonic the Hedgehog 4: Episode 1", "Naruto Shippuden: Ultimate Ninja Storm 2", "Fallout: New Vegas", "Vanquish", "Fable III", "FIFA Manager 11", "God of War: Ghost of Sparta", "The Penguins of Madagascar", "Football Manager 2011", "Assassin's Creed: Brotherhood", "Pac-Man Party", "Tom Clancy's Ghost Recon", "Need for Speed: Hot Pursuit", "Gran Turismo 5", "Golden Sun: Dark Dawn", "Super Meat Boy", "World of Warcraft: Cataclysm", "Secret of Mana", "Saints Row 2", "Street Fighter IV", "Star Ocean: The Last Hope", "Warhammer 40,000: Dawn of War II", "Empire: Total War", "The Maw", "Resident Evil 5", "Valkyrie Profile: Covenant of the Plume", "Suikoden Tierkreis", "The Last Remnant", "Ninja Blade", "Dynasty Warriors: Gundam 2", "inFamous", "Gunstar Heroes", "Anno 1404", "Overlord: Dark Legend", "Overlord II", "Call of Juarez: Bound in Blood", "BlazBlue: Calamity Trigger", "Tales of Monkey Island", "Resident Evil 4", "Rez", "Mobile Suit Gundam: Zeonic Front", "Medal of Honor: Allied Assault", "MotoGP 2", "PaRappa the Rapper 2", "Grandia II", "Sonic Advance", "Super Mario Advance 2: Super Mario World", "Star Wars: Racer Revenge", "Zone of the Enders: The Fist of Mars", "Tony Hawk's Pro Skater 3", "Dungeon Siege", "The Elder Scrolls III: Morrowind", "Tactics Ogre: The Knight of Lodis", "Dragon Ball Z: The Legacy of Goku", "Looney Tunes: Space Race", "The House of the Dead III", "Digimon World 3", "Neverwinter Nights", "Shantae", "Warcraft III: Reign of Chaos", "Duke Nukem Advance", "Medieval: Total War", "Armored Core 3", "Armored Core", "Battlefield 1942", "Mega Man Zero", "Kingdom Hearts", "Dynasty Tactics", "Divine Divinity", "Super Mario Advance 3: Yoshi's Island", "Spyro 2: Season of Flame", "Hitman 2: Silent Assassin", "Virtua Tennis", "Mario Party 4", "Suikoden III", "NHL 2K3", "MechAssault", "Tom Clancy's Splinter Cell", "Ninja Assault", "Star Wars Jedi Knight II: Jedi Outcast", "Steel Battalion", "Gauntlet: Dark Legacy", "Final Fantasy Tactics", "Xenogears", "Yoshi's Story", "SaGa Frontier", "Panzer Dragoon Saga", "Star Ocean: The Second Story", "Commandos: Behind Enemy Lines", "Heart of Darkness", "Parasite Eve", "Caesar III", "Pokémon Blue", "Pokémon Red", "Pokémon Yellow", "Half-Life", "The Legend of Zelda: Ocarina of Time", "Star Wars: Rogue Squadron", "Baldur's Gate", "Falcon 4.0", "Civilization II", "Super Mario 64", "Star Ocean", "Tekken 2", "Madden NFL 97", "Master of Orion II", "Command & Conquer: Red Alert", "Dead or Alive", "Dragon Force", "Bust-a-Move", "Battle Arena Toshinden", "Chrono Trigger", "Super Bomberman 3", "Bomberman", "Twisted Metal", "Warcraft II: Tides of Darkness", "Tales of Phantasia", "World of Warcraft: The Burning Crusade", "Europa Universalis III", "Sonic the Hedgehog", "Jade Empire", "Theme Park", "S.T.A.L.K.E.R.: Shadow of Chernobyl", "Medal of Honor: Vanguard", "Command & Conquer 3: Tiberium Wars", "Guitar Hero II", "Guitar Hero", "Pokémon Pearl", "Pokémon Diamond", "Odin Sphere", "Mario Party 8", "Overlord", "Pokémon Battle Revolution", "Super Stardust HD", "Dynasty Warriors DS: Fighter's Battle", "Shin Megami Tensei: Persona 3", "The Settlers II", "Medieval II: Total War: Kingdoms", "Warhawk", "Medal of Honor: Airborne", "Skate", "Neverwinter Nights 2: Mask of the Betrayer", "Project Gotham Racing 4", "The Legend of Spyro: The Eternal Night", "Syphon Filter: Logan's Shadow", "Final Fantasy Tactics: The War of the Lions", "FIFA Soccer 08", "Half-Life 2", "Team Fortress 2", "Team Fortress", "Age of Empires III: The Asian Dynasties", "The Eye of Judgment", "Hellgate: London", "The Witcher", "Viva Piñata: Party Animals", "Fire Emblem: Radiant Dawn", "Call of Duty 4: Modern Warfare", "Silent Hill: Origins", "Super Mario Galaxy", "Enchanted", "Medal of Honor: Heroes 2", "WWE SmackDown vs. Raw 2008", "Kane & Lynch: Dead Men", "Orcs & Elves", "SimCity Societies", "Assassin's Creed", "Unreal Tournament 3", "Mass Effect", "Psychonauts", "Nights: Journey of Dreams", "SimCity 4", "Devil May Cry 2", "Dead or Alive Xtreme Beach Volleyball", "Capcom vs. SNK EO", "Tom Clancy's Splinter Cell", "Dark Cloud 2", "Dark Cloud", "Freelancer", "Pokémon Ruby and Sapphire", "Amplitude", "Batman: Dark Tomorrow", "Dragon Ball Z: Ultimate Battle 22", "Midnight Club II", "Burnout 2: Point of Impact", "Golden Sun: The Lost Age", "Ikaruga", "Castlevania: Aria of Sorrow", "Rise of Nations", "Midnight Club II", "Wario World", "Arc the Lad: Twilight of the Spirits", "Warcraft III: The Frozen Throne", "WWE Wrestlemania XIX", "Anarchy Online: The Shadowlands", "Homeworld 2", "Homeworld", "Freedom Fighters", "Viewtiful Joe", "Time Crisis 3", "Tony Hawk's Underground", "Fire Emblem", "Onimusha Tactics", "Monster Rancher 4", "Monster Rancher 3", "Counter-Strike", "Prince of Persia: The Sands of Time", "Victoria: An Empire Under the Sun", "Beyond Good & Evil", "1080° Avalanche", "Silent Hill 3", "Saints Row 2", "Mirror's Edge", "Moon", "Skate 2", "Flower", "Halo Wars", "Killzone 2", "Killzone", "Tomb Raider: Underworld", "Let's Golf", "Resident Evil 5", "Mega Man 2", "Worms", "Sacred 2: Fallen Angel", "Punch-Out", "inFamous", "Red Faction: Guerrilla", "Anno 1404", "Blood Bowl", "NCAA Football 10", "Battlefield 1943", "Shatter", "Fat Princess", "Trials HD", "Madden NFL 10", "Metroid Prime", "Tomb Raider II", "Fate/unlimited codes", "IL-2 Sturmovik: Birds of Prey", "Mario & Luigi: Bowser's Inside Story", "Streets of Rage", "Scribblenauts", "Marvel: Ultimate Alliance", "Marvel: Ultimate Alliance 2", "Professor Layton and the Diabolical Box", "Kingdom Hearts 358/2 Days", "Canabalt", "Fieldrunners", "UmJammer Lammy", "Half-Minute Hero", "Brütal Legend", "Machinarium", "Tropico 3", "Trine", "Oddworld: Abe's Exoddus", "Borderlands", "Forza Motorsport 3", "Tekken 6", "Bayonetta", "Ninja Blade", "Dragon Age: Origins", "Jak and Daxter: The Lost Frontier", "Call of Duty: Modern Warfare", "Assassin's Creed: Bloodlines", "Angry Birds", "Uncharted 2: Among Thieves", "Minecraft", "Batman: Arkham Asylum", "Forza Motorsport 3", "Forza Motorsport 2", "Retro City Rampage", "The Cave", "Wrath of the White Witch", "Skulls of the Shogun", "Fire Emblem Awakening", "Sly Cooper: Thieves in Time", "Crysis 3", "Crysis 2", "Crysis", "Metal Gear Rising: Revengeance", "Super Hexagon", "SimCity", "Hotline Miami", "Terraria", "Canabalt HD", "Wizorb", "Ninja Gaiden 3: Razor's Edge", "Age of Empires II: HD Edition", "Motocross Madness", "Gemini Rue", "Surgeon Simulator 2013", "Dragon's Dogma: Dark Arisen", "Carmageddon", "Dragon's Lair", "Ratchet & Clank: Full Frontal Assault", "Limbo", "Neverwinter", "TowerFall", "Rogue Legacy", "Crazy Taxi", "Dynasty Warriors 8", "Dropchord", "Dragon's Crown", "Tales of Xillia", "Mario & Luigi: Dream Team", "Gone Home", "Plants vs. Zombies 2: It's About Time", "Final Fantasy XIV: A Realm Reborn", "Valhalla Knights 3", "Battlefield 4", "Crimson Dragon", "Dead Rising 3", "Madden NFL 25", "Peggle 2", "Peggle", "The Stanley Parable", "Dr. Luigi", "Dota 2", "Rayman Legends", "Army of Two: The 40th Day", "Chronos Twins DX", "Dark Void", "Silent Hill: Shattered Memories", "White Knight Chronicles", "Shiren the Wanderer", "Dynasty Warriors: Strikeforce", "Risen", "Rayman 2", "Lunar: Silver Star Harmony", "Infinite Space", "Dragon Age: Origins - Awakening", "Perfect Dark", "Cave Story", "Just Cause 2", "Flotilla", "Dark Void Zero", "Lost Planet 2", "Split Second: Velocity", "Blue Dragon: Awakened Shadow", "Phoenix Wright: Ace Attorney", "Super Mario Galaxy 2", "Blur", "Alpha Protocol", "Dune II", "Mega Man 4", "Ultima Underworld: The Stygian Abyss", "Kirby's Dream Land", "Super Mario Kart", "Virtua Racing", "Mortal Kombat", "Star Control II", "Star Control", "Sonic the Hedgehog 2", "Alone in the Dark", "The Legend of Zelda: A Link to the Past", "Metroid II: Return of Samus", "F-Zero", "Alien Breed", "Lemmings", "Another World", "Snake's Revenge", "Smash TV", "Ultima VI: The False Prophet", "Metal Gear 2: Solid Snake", "Dr. Mario", "Wing Commander", "Super Mario World", "Commander Keen", "Railroad Tycoon", "DuckTales", "Teenage Mutant Ninja Turtles", "Mother", "Castlevania III: Dracula's Curse", "Tetris", "Minesweeper", "Shadow of the Beast", "Altered Beast", "Ninja Gaiden", "Ghouls 'n Ghosts", "Double Dragon II: The Revenge", "Mario Kart 64", "Vandal Hearts", "The Last Express", "Harvest Moon", "Breath of Fire III", "Fallout", "Panzer General II", "Total Annihilation", "Crash Bandicoot 2: Cortex Strikes Back", "Diddy Kong Racing", "Bomberman 64", "Wing Commander: Prophecy", "Cyberpunk 2077", "Death Stranding", "Evil Genius 2", "Evil Genius", "Metroid Prime 4", "Ori and the Will of the Wisps", "Unreal Tournament", "The Talos Principle 2", "The Talos Principle", "System Shock 3", "Spelunky 2", "Spelunky", "Serious Sam 4", "Serious Sam 2", "Mount & Blade II: Bannerlord", "Mount & Blade", "Quake Champions", "Quake", "Total War: Arena", "The Sinking City", "Terraria: Otherworld", "Gintama Rumble", "SteamWorld Dig", "Rust", "Pac-Man Championship Edition 2 Plus", "Conan Exiles", "Donkey Kong Country: Tropical Freeze", "State of Decay 2", "State of Decay", "Call of Duty: Black Ops 4", "Concrete Genie", "Crackdown 3", "Crackdown 2", "Crackdown", "DayZ", "Fortnite", "Metro Exodus", "Ōkami HD", "Ōkami", "Shenmue III", "Shenmue II", "Shenmue", "Soulcalibur VI", "Soulcalibur", "Soulcalibur 4", "Sunless Skies", "Total War Saga: Thrones of Britannia", "We Happy Few", "Xenonauts 2", "World of Warcraft: Battle for Azeroth", "Wolfenstein II: The New Colossus", "Wolfenstein", "Wargroove", "Rampage", "Gravity Rush 2", "Dragon Quest VIII: Journey of the Cursed King", "Pokémon Duel", "Resident Evil 7: Biohazard", "Fire Emblem Heroes", "Poochy & Yoshi's Woolly World", "Husk", "Nioh", "WWE 2K17", "For Honor", "Sniper Elite 4", "Halo Wars 2", "Psychonauts in the Rhombus of Ruin", "Torment: Tides of Numenera", "Little Inferno", "Snipperclips", "The Binding of Isaac: Afterbirth+", "The Legend of Zelda: Breath of the Wild", "World of Goo", "Nier: Automata", "Tom Clancy's Ghost Recon Wildlands", "Ultimate Marvel vs. Capcom 3", "Mass Effect: Andromeda", "Rain World", "Thimbleweed Park", "Drawn to Death", "Persona 5", "Cosmic Star Heroine", "Full Throttle Remastered", "Full Throttle", "Cities: Skylines", "Syberia III", "What Remains of Edith Finch", "Expeditions: Vikings", "Mario Kart 8 Deluxe", "The Legend of Heroes: Trails in the Sky the 3rd", "To the Moon", "Injustice 2", "Phantom Dust Remaster", "Phantom Dust", "Thumper", "Chroma Squad", "Fire Emblem Echoes: Shadows of Valentia", "Shadow Warrior 2", "Vanquish", "Rime", "Guilty Gear Xrd Rev.2", "Star Trek: Bridge Crew", "Tokyo 42", "Dirt 4", "Dirt 3", "Farming Simulator 18", "Arms", "Valkyria Revolution", "Final Fantasy XII: The Zodiac Age", "Splatoon 2", "Splatoon", "Fable Fortune", "Pyre", "Tacoma", "Hellblade: Senua's Sacrifice", "LawBreakers", "Nidhogg 2", "Sonic Mania", "Undertale", "Uncharted: The Lost Legacy", "Absolver", "Ark: Survival Evolved", "ReCore Definitive Edition", "Windjammers", "Destiny 2", "Destiny", "Divinity: Original Sin II", "Divinity: Original Sin", "NHL 18", "NBA Live 18", "Dishonored: Death of the Outsider", "Dishonored", "NBA 2K18", "Guild Wars 2: Path of Fire", "Hob", "Total War: Warhammer II", "Cuphead", "Star Fox 2", "Star Fox", "Layton's Mystery Journey", "Oxenfree", "Megaton Rainfall", "The Mummy Demastered", "Assassin's Creed: Origins", "Super Mario Odyssey", "Hand of Fate 2", "Doom", "Batman: The Telltale Series", "L.A. Noire", "Rocket League", "Pokémon Ultra Sun and Ultra Moon", "Xenoblade Chronicles 2", "Xenoblade Chronicles", "Never Stop Sneakin'", "Romancing SaGa 2", "Oddworld: Soulstorm", "Way of the Passive Fist", "Punch Club 2: Fast Forward", "Death’s Gambit", "Warhammer Quest", "WWE Immortals", "Blackguards 2", "Ironclad Tactics", "Resident Evil HD Remaster", "Heroes of Might and Magic III: HD Edition", "Grow Home", "Evolve", "Monster Hunter 4 Ultimate", "Dead or Alive 5 Last Round", "The Sims 4", "The Book of Unwritten Tales 2", "The Book of Unwritten Tales", "The Order: 1886", "Homeworld Remastered Collection", "Homeworld", "DmC: Definitive Edition", "Ori and the Blind Forest", "Sid Meier's Starships", "Code Name: S.T.E.A.M.", "Jamestown+", "Mario Party 10", "Bloodborne", "Metal Slug 3", "Dark Souls II: Scholar of the First Sin", "Bastion", "Mortal Kombat X", "Titan Souls", "EA Sports UFC", "Monument Valley", "Invisible, Inc.", "Geometry Wars 3: Dimensions", "Heroes of the Storm", "Transistor", "Fallout Shelter", "PlanetSide 2", "Dragon Quest VI: Realms of Revelation", "Infinifactory", "Samurai Warriors Chronicles 3", "Skullgirls 2nd Encore", "The Fall", "Lost Dimension", "Brothers: A Tale of Two Sons", "Armello", "Year Walk", "80 Days", "Might & Magic Heroes VII", "Lost Horizon 2", "Rebel Galaxy", "Guitar Hero Live", "PixelJunk Shooter Ultimate", "Tales of Zestiria", "Galak-Z: The Dimensional", "Anno 2205", "Assassin's Creed Syndicate", "Helldivers", "SteamWorld Heist", "Metal Gear Solid V: The Phantom Pain", "The Witcher 3: Wild Hunt", "Journey", "Shovel Knight", "Fallout 4", "Star Wars Battlefront", "Ballblazer", "Arkanoid", "Advance Wars 2: Black Hole Rising", "Dragon Age: Inquisition", "Super Meat Boy", "F-Zero", "Wipeout", "Bully", "Alone in the Dark", "Spider-Man 2", "Space Channel 5", "Cave Story", "Ori and the Blind Forest", "Fable 2", "Star Fox 64", "Company of Heroes", "Batman: Arkham Asylum", "Marble Madness", "Nine Hours, Nine Persons, Nine Doors", "Gravity Rush", "Firewatch", "Aladdin", "Ninja Gaiden", "TimeSplitters 2", "GoldenEye 007", "Railroad Tycoon", "The Chronicles of Riddick: Escape From Butcher Bay", "Donkey Kong Jr.", "River City Ransom", "Picross 3D", "Electroplankton", "Plants vs. Zombies", "Boulder Dash", "The Witcher 2: Assassins of Kings", "Professor Layton and the Unwound Future", "Hitman Go", "Final Fantasy X", "Sonic Colors", "Wolfenstein: The New Order", "Psi-Ops: The Mindgate Conspiracy", "Jetpack Joyride", "Super Castlevania 4", "Need for Speed: Most Wanted", "WWF No Mercy", "Devil May Cry", "Indiana Jones And The Fate Of Atlantis", "Galaxian", "Space Invaders", "Bejeweled", "Snatcher", "Qix", "Power Stone 2", "Gran Turismo", "Missile Command", "Military Madness", "Metro 2033", "Fire Emblem Fates", "Sid Meier's Alpha Centauri", "Grim Fandango", "The Elder Scrolls IV: Oblivion", "Rhythm Heaven", "Drop7", "Kingdom Rush", "Power Stone", "Legacy of Kain: Soul Reaver", "Deus Ex Machina", "Thief: The Dark Project", "Star Wars Knights of the Old Republic 2: The Sith Lords", "Tiger Woods PGA Tour 12", "LittleBigPlanet", "Mirror's Edge", "Braid", "Frogger", "Wizardry: Proving Grounds of the Mad Overlord", "Silent Hill", "Jumpman Junior", "International Karate +", "Fire Emblem Awakening", "Devil's Crush", "Beatmania", "Ant Attack", "Lumines", "Metal Gear Solid 4: Guns of the Patriots", "Paper Mario: The Thousand Year Door", "Daytona USA", "FTL: Faster Than Light", "Star Wars: X-Wing", "Super Mario Land 2: Six Golden Coins", "Castle Crashers", "Joust", "Contra 3: The Alien Wars", "Fantastic Contraption", "Balance of Power", "Stunt Car Racer", "Return to Castle Wolfenstein", "Max Payne 2", "Dungeons and Dragons: Pool of Radiance", "Yakuza 0", "Threes", "Quadrilateral Cowboy", "Populous", "Hot Shots Golf", "Deus Ex", "The Legend of Zelda: Majora's Mask", "Samurai Shodown", "Marvel vs. Capcom: Clash of Super Heroes", "Lunar Lander", "Gunpoint", "Dungeon Keeper", "Descent", "Battlezone", "Ikaruga", "Breakout", "Super Smash Bros. Brawl", "Towerfall", "Chrono Cross", "Age of Empires", "Tempest", "Tempest 2000", "Day of the Tentacle", "The Legend of Zelda: A Link Between Worlds", "Thief: Deadly Shadows", "The World Ends With You", "Sonic CD", "Proteus", "God Hand", "Assassin's Creed 4: Black Flag", "Kirby's Dreamland", "Gauntlet", "Super Mario Sunshine", "Mario 64", "Max Payne", "Ico", "Wasteland", "Ultima 7: The Black Gate", "Tenchu: Stealth Assassins", "Shadow Hearts: Covenant", "Quake 3: Arena", "Phoenix Wright: Ace Attorney", "Marvel vs. Capcom 2: New Age of Heroes", "Heroes of Might and Magic 3", "Fatal Frame 2", "Sonic The Hedgehog 2", "Fez", "Demon's Souls", "Donkey Kong Country", "King's Quest", "Maniac Mansion", "Secret of Monkey Island", "Castlevania 3: Dracula's Curse", "The Jackbox Party Pack", "Castlevania", "X-COM: UFO Defense", "Monster Hunter Generations", "Flashback", "Soulcalibur", "Tomb Raider", "Jet Grind Radio", "Warcraft 2: Tides of Darkness", "Burnout Revenge", "Zero Escape: Virtue's Last Reward", "WarioWare: Twisted!", "Street Fighter Alpha 3", "Mini Metro", "Metal Gear Solid V: The Phantom Pain", "Mega Man X", "WarioWare, Inc.: Mega Microgames!", "Metal Gear Solid 3: Snake Eater", "Bushido Blade 2", "Animal Crossing", "30 Flights of Loving", "Overwatch", "Mario Kart 64", "Dragon's Dogma", "Myst", "P.T.", "City of Heroes", "StarCraft 2: Wings of Liberty", "Vagrant Story", "System Shock 2", "Superhot VR", "Streets of Rage 2", "Planescape Torment", "Monster Hunter Ultimate 4", "Giants: Citizen Kabuto", "Galaga", "Dragon Quest 8: Journey of the Cursed King", "Defender", "Castlevania: Aria of Sorrow", "Geometry Wars", "Wolfenstein 3D", "The Legend of Zelda: Link's Awakening", "No One Lives Forever", "Super Smash Bros.", "EverQuest", "The Oregon Trail", "Phantasy Star Online", "Kirby's Adventure", "Hearthstone", "Kirby: Canvas Curse", "Vampire the Masquerade - Redemption", "Rock Band", "Uncharted 2: Among Thieves", "Mike Tyson's Punch Out!!", "Diablo", "Device 6", "Hitman: Blood Money", "Super Mario Maker", "Papers, Please", "Burnout Paradise", "Elite", "Warlords", "The Sentinel", "Manic Miner", "Robotron: 2084", "Dragon Warrior", "Eve Online", "Metroid", "NetHack", "Doom 2", "Katamari Damacy", "Portal", "Portal 2", "Adventure", "Star Wars: Knights of the Old Republic", "Guild Wars 2", "Space Invaders", "Secret of Mana", "M.U.L.E.", "Habitat", "Ultima Online", "The Elder Scrolls 5: Skyrim", "Burnout 3: Takedown", "Harvest Moon", "League of Legends", "Splinter Cell: Chaos Theory", "Madden NFL 2005", "ESPN NFL 2K5", "Pong", "NHL '94", "Elite Beat Agents", "SimCity 2000", "Dance Dance Revolution", "Half-Life", "Football Manager", "Quest for Glory: So You Want to Be a Hero", "The Sims", "Halo: Combat Evolved", "Wii Sports", "The Legend of Zelda: Ocarina of Time", "Zork", "Gone Home", "Spelunky", "EarthBound", "NBA Jam", "Metal Gear Solid", "Dwarf Fortress", "Rogue", "FIFA 12", "Castlevania: Symphony of the Night", "SimCity", "StarCraft", "Final Fantasy 6", "Super Metroid", "Street Fighter 2", "Ms. Pac-Man"];

var populateState = function populateState(_ref) {
  var array = _ref.array,
      state = _ref.state;

  array.forEach(function (input) {
    var a = fns.arrayMaker({ input: input });
    fns.addToState({ array: a, state: state });
  });
};

var create = function create(_ref2) {
  var state = _ref2.state;
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { amount: 2 };
    var amount = options.amount,
        seed = options.seed;

    return fns.createChain({ state: state, amount: amount, seed: seed });
  };
};

var Markov = function Markov() {
  var state = {
    entry: [],
    exit: [],
    node: {}
  };

  populateState({ array: titles, state: state });
  return { create: create({ state: state }) };
};

var consoles = {
  0: ['NES', 'Master System', 'Atari 7800', 'Atari XEGS'],
  1: ['TurboGrafx-16', 'Genesis', 'Neo Geo', 'Super NES', 'Sega CD', 'LaserActive', 'Game Boy', 'Atari Lynx', 'Game Gear', 'TurboExpress'],
  2: ['NOMAD', 'Game Boy Color', 'Neo Geo Pocket', 'WonderSwan'],
  3: ['3DO', 'Jaguar', 'Saturn', 'PlayStation', 'N64'],
  4: ['Game Boy Advance', 'N-Gage'],
  5: ['Dreamcast', 'Playstation 2', 'GameCube', 'Xbox'],
  6: ['Xbox 360', 'Playstation 3', 'Wii', 'Nintendo DS', 'PSP'],
  7: ['Nintendo 3DS', 'Vita'],
  8: ['Wii U', 'Playstation 4', 'Xbox One', 'Nintendo Switch']
};

var generator = function generator() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var amount = obj.amount,
      seed = obj.seed;

  var consoleArray = Object.values(consoles);
  var generation = fns.sample({ array: consoleArray, seed: seed }).slice();

  if (amount === undefined) {
    var amountArray = [];
    for (var i = 0; i < generation.length; i++) {
      amountArray.push(i + 1);
    }

    amount = fns.sample({ array: amountArray, seed: seed });
  }

  var result = [];
  for (var _i = 0; _i < amount; _i++) {
    var console = fns.sample({ array: generation, seed: seed });
    var consoleIndex = generation.indexOf(console);
    result.push(generation.splice(consoleIndex, 1).pop());
  }

  return result;
};

var parsedUrl = urlFns.parseUrl();
var isHomePage = parsedUrl.length === 0;
var container = document.querySelector('.container');

console.log({ parsedUrl: parsedUrl });

if (isHomePage) {
  paintHomePage(container);
} else {
  var _parsedUrl = slicedToArray(parsedUrl, 2),
      title = _parsedUrl[0],
      number = _parsedUrl[1];

  var Title = Markov();

  var list = [];
  for (var i = number; i > 0; i--) {
    var seed = title + 1;
    var item = {};
    item.title = Title.create({ amount: 1, seed: seed });
    item.releases = generator({ amount: 3, seed: seed });
  }
  paintListPage(container, list);
}

}($));
