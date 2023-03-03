import Phaser from 'phaser';
import LoadScreen from './scenes/LoadScreen';
import MainMenu from './scenes/MainMenu';
import Play from './scenes/Play';

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
    scene: [LoadScreen]
};

export const scenes = [LoadScreen, MainMenu, Play]
