import Phaser from 'phaser';
import MainMenu from './scenes/MainMenu';
import Scene1 from './scenes/Scene1';

export const config = {
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
    backgroundColor: '#4aa138',
    scene: [MainMenu]
};

export const scenes = [MainMenu, Scene1]
