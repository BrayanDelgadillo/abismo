
import { useEffect, useRef } from "react";
import Phaser from "phaser";
import CaveScene from "../game/CaveScene";

function Cave({ descentRequest, onDescentComplete }) {
  const gameContainer = useRef(null);
  const gameRef = useRef(null);
  const onCompleteRef = useRef(onDescentComplete);

  // Mantener actualizada la función de finalización
  useEffect(() => {
    onCompleteRef.current = onDescentComplete;
  }, [onDescentComplete]);

  // Crear Phaser
  useEffect(() => {
    const game = new Phaser.Game({
      type: Phaser.AUTO,
      parent: gameContainer.current,
      backgroundColor: "#101c1a",
      scale: {
        mode: Phaser.Scale.RESIZE,
        width: "100%",
        height: "100%",
      },
      scene: [CaveScene],
    });

    gameRef.current = game;

    return () => {
      game.destroy(true);
      gameRef.current = null;
    };
  }, []);

  // Recibir la orden de descenso
  useEffect(() => {
    if (!descentRequest) return;

    const scene = gameRef.current?.scene.getScene(
      "CaveScene"
    );

    if (scene && scene.scene.isActive()) {
      scene.descendBy(
        descentRequest.depth,
        () => onCompleteRef.current?.()
      );
    }
  }, [descentRequest]);

  return (
    <div
      className="cave-game"
      ref={gameContainer}
    />
  );
}

export default Cave;
