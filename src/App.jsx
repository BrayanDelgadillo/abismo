
import { useEffect, useState, useCallback } from "react";
import "./App.css";
import Cave from "./components/Cave";
import { categories } from "./data/categories";
import { rarities } from "./data/rarities";
import { selectGameCategories } from "./data/selectCategories";
import { normalizeAnswer } from "./utils/normalizeAnswer";
import { isMichaelJacksonSong } from "./data/songs/michaelJackson";
import { isChemicalElement } from "./data/elements";
import { isCountry } from "./data/countries";
import { isInstrument } from "./data/instruments";
import { isFoodFranchise } from "./data/foodFranchises";
import { isBallSport } from "./data/ballSports";
import { isDeity } from "./data/deities";
import { isMakeupBrand } from "./data/makeupBrands";
import { isClothingBrand } from "./data/clothingBrands";
import { isRomanceMovie } from "./data/romanceMovies";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const [currentRound, setCurrentRound] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);

  const [feedback, setFeedback] = useState("");
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isDescending, setIsDescending] = useState(false);
  const [showingRarity, setShowingRarity] = useState(false);
  const [descentRequest, setDescentRequest] = useState(null);

  const [gameCategories, setGameCategories] = useState([]);
  const category = gameCategories[currentRound];

  // Avanzar a la siguiente ronda o terminar el juego
  const advanceRound = useCallback(() => {
    setIsDescending(false);
    setShowingRarity(false);
    setDescentRequest(null);

    if (currentRound + 1 >= gameCategories.length) {
      setGameFinished(true);
      return;
    }

    setCurrentRound((current) => current + 1);
    setAnswer("");
    setTimeLeft(20);
    setFeedback("");
    setHasAnswered(false);
  }, [currentRound, gameCategories.length]);

  // Temporizador
  useEffect(() => {
    if (
      !gameStarted ||
      gameFinished ||
      isDescending ||
      showingRarity ||
      hasAnswered ||
      timeLeft <= 0
    ) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [
    gameStarted,
    gameFinished,
    isDescending,
    showingRarity,
    hasAnswered,
    timeLeft,
  ]);

  
  
  // Cuando se acaba el tiempo, pasar a la siguiente ronda sin descender
  useEffect(() => {
    if (
      !gameStarted ||
      gameFinished ||
      timeLeft !== 0 ||
      hasAnswered ||
      isDescending ||
      showingRarity
    ) {
      return;
    }

    setFeedback("¡Se acabó el tiempo!");

    const timeout = setTimeout(() => {
      advanceRound();
    }, 1500);

    return () => clearTimeout(timeout);
  }, [
    gameStarted,
    gameFinished,
    timeLeft,
    hasAnswered,
    isDescending,
    showingRarity,
    advanceRound,
  ]);



  // Mostrar el mensaje de rareza durante 2 segundos
  useEffect(() => {
    if (!showingRarity) return;

    const timeout = setTimeout(() => {
      advanceRound();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [showingRarity, advanceRound]);


  // Enviar respuesta
function handleSubmit(event) {
  event.preventDefault();

  const normalized = normalizeAnswer(answer);

  if (!normalized || timeLeft <= 0 || hasAnswered) {
    return;
  }

  let rarityKey;

  // 1. Canciones de Michael Jackson
  if (category.id === "mj-songs") {
    if (!isMichaelJacksonSong(answer)) {
      setFeedback("No encontramos esa canción en nuestro catálogo.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 2. Elementos químicos
  } else if (category.id === "elements") {
    if (!isChemicalElement(answer)) {
      setFeedback("Eso no es un elemento químico válido.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 3. Países
  } else if (category.id === "countries") {
    if (!isCountry(answer)) {
      setFeedback("Eso no es un país válido.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 4. Instrumentos musicales
  } else if (category.id === "instruments") {
    if (!isInstrument(answer)) {
      setFeedback("Eso no es un instrumento musical válido.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 5. Franquicias de comida
  } else if (category.id === "food-franchises") {
    if (!isFoodFranchise(answer)) {
      setFeedback("No reconocemos esa cadena de comida.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 6. Deportes con pelota
  } else if (category.id === "ball-sports") {
    if (!isBallSport(answer)) {
      setFeedback("Eso no es un deporte válido que use una pelota.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 7. Dioses y deidades
  } else if (category.id === "deities") {
    if (!isDeity(answer)) {
      setFeedback("No reconocemos esa deidad.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 8. Marcas de maquillaje
  } else if (category.id === "makeup") {
    if (!isMakeupBrand(answer)) {
      setFeedback("No reconocemos esa marca de maquillaje.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 9. Marcas de ropa
  } else if (category.id === "clothing") {
    if (!isClothingBrand(answer)) {
      setFeedback("No reconocemos esa marca de ropa.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 10. Películas de romance
  } else if (category.id === "romance-movies") {
    if (!isRomanceMovie(answer)) {
      setFeedback("No reconocemos esa película romántica.");
      return;
    }
    rarityKey = category.answers[normalized] || "exotic";

  // 11. Resto de categorías
  } else {
    rarityKey = category.answers[normalized];

    if (!rarityKey) {
      setFeedback("Respuesta no registrada. Intenta otra.");
      return;
    }
  }

  const rarity = rarities[rarityKey];

  if (!rarity) {
    setFeedback("Esta respuesta tiene una rareza inválida.");
    return;
  }

  const newAnswer = {
    round: currentRound + 1,
    category: category.name,
    text: answer.trim(),
    normalized,
    points: rarity.points,
    rarity: rarity.name,
    depth: rarity.depth,
  };

  setAnswers((current) => [...current, newAnswer]);
  setScore((current) => current + rarity.points);

  setHasAnswered(true);
  setIsDescending(true);
  setAnswer("");
  setFeedback(rarity.name);

  // Solicitar el descenso a Phaser
  setDescentRequest({
    depth: rarity.depth,
  });
}


  // Phaser llama esta función cuando termina la animación
  function handleDescentComplete() {
    setIsDescending(false);
    setShowingRarity(true);
  }

  // Comenzar o reiniciar el juego
  function startGame() {

    const selectedCategories = selectGameCategories(categories);

    setGameCategories(selectedCategories);

    setCurrentRound(0);
    setScore(0);
    setAnswers([]);
    setAnswer("");
    setTimeLeft(20);
    setFeedback("");
    setHasAnswered(false);
    setIsDescending(false);
    setShowingRarity(false);
    setDescentRequest(null);
    setGameFinished(false);
    setGameStarted(true);
  }

  function returnToHome() {
    setGameStarted(false);
    setGameFinished(false);
    setIsDescending(false);
    setShowingRarity(false);
    setDescentRequest(null);
  }

  return (
    <main className="app">
      {!gameStarted ? (
        <>
          <div className="cave-background">
            <div className="cave-glow" />
          </div>

          <header className="topbar">
            <span className="brand">
              A<span>.</span>
            </span>
            <span className="round-info">
              UN JUEGO DE EXPLORACIÓN
            </span>
          </header>

          <section className="hero">
            <p className="eyebrow">
              ¿HASTA DÓNDE PUEDES LLEGAR?
            </p>

            <h1>ABISMO</h1>

            <p className="description">
              Cada respuesta te lleva más profundo.
              Atrévete a descubrir qué hay al fondo.
            </p>

            <button className="start-button" onClick={startGame}>
              Comenzar descenso <span>↓</span>
            </button>

            <p className="game-details">
              7 RONDAS <span>·</span> 20 SEGUNDOS POR RONDA
            </p>
          </section>

          <footer className="footer">
            <span>PREPÁRATE PARA DESCENDER</span>
            <span>01 — 07</span>
          </footer>
        </>
      ) : (
        <section className="game-screen">
          <Cave
            descentRequest={descentRequest}
            onDescentComplete={handleDescentComplete}
          />

          {gameFinished ? (
            <div className="result-screen">
              <p className="interface-label">
                DESCENSO COMPLETADO
              </p>

              <h1>FIN DEL ABISMO</h1>
              <h1>
                Llegaste lejos, amorcito <br />
                Mañana llegarás más lejos <br />
                TE AMO
              </h1>

              <div>
                <span className="interface-label">
                  PUNTUACIÓN FINAL
                </span>
                <strong>{score}</strong>
              </div>

              <div>
                <span className="interface-label">
                  PROFUNDIDAD ALCANZADA
                </span>
                <strong>
                  {answers.reduce(
                    (total, item) => total + item.depth,
                    0
                  )} m
                </strong>
              </div>

              <p>
                Respondiste {answers.length} de {gameCategories.length} rondas.
              </p>

              <button className="start-button" onClick={startGame}>
                Volver a jugar
              </button>

              <button className="back-button" onClick={returnToHome}>
                ← Volver al inicio
              </button>
            </div>
          ) : showingRarity ? (
            <div className="rarity-message">
              <p className="interface-label">
                DESCENSO COMPLETADO
              </p>
              <h1>{feedback}</h1>
            </div>
          ) : !isDescending ? (
            <div className="game-interface">
              <div className="game-top">
                <div>
                  <span className="interface-label">
                    RONDA {currentRound + 1} / {gameCategories.length}
                  </span>
                  <h2>{category.name}</h2>
                </div>

                <div className="timer">
                  <span className="interface-label">TIEMPO</span>
                  <strong>{timeLeft}s</strong>
                </div>
              </div>

              <div className="question-panel">
                <p className="interface-label">TU DESAFÍO</p>

                <h2>{category.question}</h2>

                {timeLeft > 0 ? (
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      placeholder="Escribe tu respuesta..."
                      autoComplete="off"
                      disabled={hasAnswered}
                    />

                    <button
                      className="start-button"
                      type="submit"
                      disabled={hasAnswered}
                    >
                      Responder
                    </button>
                  </form>
                ) : null
                }

                <p className="feedback">{feedback}</p>
              </div>

              <div className="game-bottom">
                <div>
                  <span className="interface-label">PUNTUACIÓN</span>
                  <strong>{score}</strong>
                </div>

                <div>
                  <span className="interface-label">RESPUESTAS</span>
                  <strong>{answers.length}</strong>
                </div>
              </div>

              <div className="answer-list">
                {answers.map((item) => (
                  <div className="answer-item" key={item.round}>
                    <span>{item.text}</span>
                    <strong>+{item.points}</strong>
                  </div>
                ))}
              </div>

              <button className="back-button" onClick={returnToHome}>
                ← Volver al inicio
              </button>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}

export default App;
