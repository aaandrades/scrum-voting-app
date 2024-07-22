export const getRandomColor = (): string => {
  const colors = [
    "#556E81",
    "#D24136",
    "#6E61AD",
    "#532B74",
    "#25481A",
    "#648C6E",
    "#E65736",
    "#1A4A68",
    "#4AB8B2",
    "#471845",
    "#C52658",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getRandomName = (): string => {
  const names = [
    "ElegantElephant",
    "CuriousKangaroo",
    "WittyWhale",
    "FriendlyFox",
    "CleverCat",
    "PolitePenguin",
    "DapperDolphin",
    "JoyfulJellyfish",
    "GraciousGiraffe",
    "CheerfulCheetah",
    "WiseOwl",
    "CharmingChameleon",
    "AmiableAntelope",
    "PlayfulPanda",
    "SereneSloth",
    "GentleGazelle",
    "HappyHippo",
    "SillySeal",
    "RadiantRabbit",
    "EloquentEagle",
    "FancyFlamingo",
    "JollyJaguar",
    "PolishedPanther",
    "SincereSquirrel",
    "SwiftSwan",
    "VivaciousVixen",
    "GrinningGoat",
    "MarvelousMongoose",
    "WiseWalrus",
    "ElegantEmu",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

export const buildAvatar = (user: string): string => {
  const name = user.split(" ");
  if (name.length === 1) {
    return name[0].charAt(0).toUpperCase() + name[0].charAt(1).toUpperCase();
  }
  return name[0].charAt(0).toUpperCase() + name[1].charAt(0).toUpperCase();
};
