import Phaser from 'phaser';
import Scene1 from './scenes/scene2';

const config = {
    parent: 'gameParent',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Scene1]
};

export default config;