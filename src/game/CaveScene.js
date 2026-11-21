
import Phaser from "phaser";

export default class CaveScene extends Phaser.Scene {
  constructor() {
    super("CaveScene");
  }

    create() {
        const { width, height } = this.scale;

        this.worldHeight = 10000;
        this.initialY = 350;
        this.targetY = this.initialY;

        this.cameras.main.setBackgroundColor("#101c1a");
        this.cameras.main.setBounds(
        0,
        0,
        width,
        this.worldHeight
        );

        // Paredes de la cueva
        const cave = this.add.graphics();
        cave.fillStyle(0x263831, 1);

        cave.fillPoints(
        [
            { x: 0, y: 0 },
            { x: width * 0.22, y: 0 },
            { x: width * 0.28, y: 600 },
            { x: width * 0.34, y: 1200 },
            { x: width * 0.25, y: 2000 },
            { x: width * 0.32, y: 3000 },
            { x: width * 0.22, y: 4000 },
            { x: width * 0.3, y: this.worldHeight },
            { x: 0, y: this.worldHeight },
        ],
        true
        );

        cave.fillPoints(
        [
            { x: width * 0.78, y: 0 },
            { x: width, y: 0 },
            { x: width, y: this.worldHeight },
            { x: width * 0.7, y: this.worldHeight },
            { x: width * 0.78, y: 4000 },
            { x: width * 0.68, y: 3000 },
            { x: width * 0.75, y: 2000 },
            { x: width * 0.66, y: 1200 },
            { x: width * 0.72, y: 600 },
        ],
        true
        );

        // Cuerda anclada en la superficie
        this.rope = this.add.rectangle(
        width / 2,
        0,
        3,
        this.initialY - 24,
        0xb7a88a
        ).setOrigin(0.5, 0);

        // Exploradora
        this.explorer = this.add.container(
        width / 2,
        this.initialY
        );

        const graphics = this.add.graphics();

        graphics.fillStyle(0xd7a77e, 1);
        graphics.fillCircle(0, -24, 12);

        graphics.fillStyle(0xb6c6a2, 1);
        graphics.fillRoundedRect(-12, -10, 24, 30, 6);

        graphics.fillStyle(0xa66f48, 1);
        graphics.fillRoundedRect(-19, -8, 9, 18, 3);

        graphics.fillStyle(0xd1c1a1, 1);
        graphics.fillRect(-10, 18, 8, 20);
        graphics.fillRect(3, 18, 8, 20);

        this.explorer.add(graphics);

        // Animación de balanceo
        this.tweens.add({
        targets: this.explorer,
        angle: 4,
        duration: 1400,
        yoyo: true,
        repeat: -1,
        ease: "Sine.easeInOut",
        });

        // La cámara sigue a la exploradora
        this.cameras.main.startFollow(
        this.explorer,
        false,
        0.05,
        0.08
        );

        // Indicador de profundidad
        this.depthText = this.add.text(
        width / 2,
        20,
        "PROFUNDIDAD: 0 m",
        {
            fontSize: "13px",
            color: "#b6c6a2",
            letterSpacing: 2,
        }
        );

        this.depthText
            .setOrigin(0.5, 0)
            .setScrollFactor(0);
    }

  // Este método será llamado desde React
    descendBy(depth, onComplete) {
        this.targetY = Math.min(
            this.targetY + depth,
            this.worldHeight - 100
        );

        this.tweens.add({
            targets: this.explorer,
            y: this.targetY,
            duration: 1800,
            ease: "Sine.easeInOut",

            onComplete: () => {
            onComplete?.();
            },
        });
    }


    update() {
        // La cuerda se adapta a la posición de la exploradora
        this.rope.setSize(
        3,
        Math.max(1, this.explorer.y - 24)
        );

        const depth = Math.floor(
        (this.explorer.y - this.initialY)
        );

        this.depthText.setText(
        `PROFUNDIDAD: ${depth} m`
        );
    }
}
