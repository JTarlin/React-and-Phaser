import Phaser from 'phaser';
import MainMenu from './scenes/MainMenu';
import Scene1 from './scenes/Scene1';


export const config = {
    parent: 'gameParent',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.NONE,
    },
    backgroundColor: '#3498db',
    physics: {
        default: 'arcade',
    },
    scene: MainMenu
};

export const scenes = [MainMenu, Scene1];