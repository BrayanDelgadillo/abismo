
import { normalizeAnswer } from "../utils/normalizeAnswer";

export const ballSports = [
  // Deportes populares
  "Fútbol",
  "Básquet",
  "Baloncesto",
  "Vóley",
  "Voleibol",
  "Tenis",
  "Tenis de mesa",
  "Ping pong",
  "Béisbol",
  "Sóftbol",
  "Rugby",
  "Balonmano",
  "Fútbol americano",
  "Fútbol australiano",
  "Fútbol sala",
  "Futsal",
  "Fútbol playa",
  "Vóley playa",

  // Deportes de raqueta
  "Bádminton",
  "Squash",
  "Pádel",
  "Frontón",
  "Racquetball",
  "Pickleball",
  "Pelota vasca",
  "Jai alai",

  // Deportes acuáticos
  "Waterpolo",
  "Polo acuático",
  "Vóley acuático",

  // Deportes de precisión
  "Golf",
  "Boccia",
  "Bocce",
  "Petanca",
  "Billar",
  "Pool",
  "Snooker",

  // Deportes tradicionales y regionales
  "Sepak takraw",
  "Pato",
  "Chaza",
  "Pelota valenciana",
  "Pelota mixteca",
  "Lacrosse",
  "Hockey sobre césped",
  "Hockey sobre hielo",
  "Hockey sala",
  "Críquet",
  "Rounders",

  // Otros deportes
  "Balón prisionero",
  "Dodgeball",
  "Quemados",
  "Kickball",
  "Korfball",
  "Netball",
  "Tchoukball",
  "Floorball",
  "Bossaball",
  "Fistball",
  "Polo",
  "Polo sobre elefante",
  "Hurling",
  "Camogie",
  "Gaelic football",
  "Footgolf",
  "Disc golf",
  "Croquet",
  "Bowling",
  "Boliche",
];

export const ballSportSet = new Set(
  ballSports.map((sport) => normalizeAnswer(sport))
);

export function isBallSport(answer) {
  return ballSportSet.has(normalizeAnswer(answer));
}
