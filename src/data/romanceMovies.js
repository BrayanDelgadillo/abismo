
import { normalizeAnswer } from "../utils/normalizeAnswer";

export const romanceMovies = [
  // Clásicos y populares
  "Titanic",
  "Diario de una pasión",
  "Mujer bonita",
  "Ghost: la sombra del amor",
  "Baile caliente",
  "Romeo y Julieta",
  "Orgullo y prejuicio",
  "Sensatez y sentimientos",
  "Moulin Rouge: amor en rojo",
  "Realmente amor",
  "Un lugar llamado Notting Hill",
  "10 cosas que odio de ti",
  "Un paseo para recordar",
  "Votos de amor",
  "Querido John",
  "La última canción",
  "Yo antes de ti",
  "Bajo la misma estrella",
  "A dos metros de ti",
  "Lo mejor de mí",

  // Comedias románticas
  "Cómo perder a un hombre en 10 días",
  "Si tuviera 30",
  "27 bodas",
  "La propuesta",
  "Locamente millonarios",
  "A todos los chicos de los que me enamoré",
  "Con todos menos contigo",
  "Tu casa o la mía",
  "Ni idea",
  "El diario de Bridget Jones",
  "Como si fuera la primera vez",
  "Hitch: especialista en seducción",
  "El descanso",
  "Mientras dormías",
  "La boda de mi mejor amigo",
  "El organizador de bodas",
  "Una esposa de mentira",
  "Mi primer beso",
  "Ella es así",

  // Dramas románticos
  "La La Land: una historia de amor",
  "Eterno resplandor de una mente sin recuerdos",
  "Antes del amanecer",
  "Antes del atardecer",
  "Antes de la medianoche",
  "Blue Valentine: una historia de amor",
  "Llámame por tu nombre",
  "Expiación, deseo y pecado",
  "Carol",
  "Secreto en la montaña",
  "Deseando amar",
  "Ella",
  "Vidas pasadas",
  "Retrato de una mujer en llamas",
  "Los puentes de Madison",
  "Siempre el mismo día",
  "Recuérdame",
  "La mujer del viajero en el tiempo",
  "La luz entre los océanos",
  "El paciente inglés",

  // Películas latinoamericanas y españolas
  "Como agua para chocolate",
  "No se aceptan devoluciones",
  "A través de mi ventana",
  "Tres metros sobre el cielo",
  "Tengo ganas de ti",
  "El lado bueno de las cosas",
  "El secreto de sus ojos",
  "La misma luna",
  "Amar te duele",
  "Culpa mía",
  "Palmeras en la nieve",
  "Ocho apellidos vascos",

  // Romance asiático
  "Your Name: tu nombre",
  "El tiempo contigo",
  "La clásica",
  "Mi chica descarada",
  "Arquitectura 101",
  "El día de tu boda",
  "Una chica del siglo XX",
  "Sintonía de amor",
  "Estar contigo",
  "La doncella",
  "El cadaver de la novia",
  "El diario de Noah",
];

export const romanceMovieSet = new Set(
  romanceMovies.map((movie) => normalizeAnswer(movie))
);

export function isRomanceMovie(answer) {
  return romanceMovieSet.has(normalizeAnswer(answer));
}
