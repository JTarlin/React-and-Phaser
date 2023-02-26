import Phaser from 'phaser';
import MainMenu from './scenes/MainMenu';

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
    scene: [MainMenu]
};

export default config;