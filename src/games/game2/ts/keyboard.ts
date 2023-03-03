import Phaser from "phaser";

export default class Keyboard {
    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.spacebar = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.enter = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    }

    scene: Phaser.Scene;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spacebar: Phaser.Input.Keyboard.Key;
    enter: Phaser.Input.Keyboard.Key;

    getUp() {
        return this.cursors.up.isDown || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown;
      }
    
      getDown() {
        return this.cursors.down.isDown || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown;
      }
    
      getLeft() {
        return this.cursors.left.isDown || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A).isDown;
      }
    
      getRight() {
        return this.cursors.right.isDown || this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown;
      }
    
      isSpaceJustDown() {
        return Phaser.Input.Keyboard.JustDown(this.spacebar);
      }
    
      isEnterJustDown() {
        return Phaser.Input.Keyboard.JustDown(this.enter);
      }
}