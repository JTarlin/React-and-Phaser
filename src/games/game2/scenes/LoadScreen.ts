

export default class LoadScreen extends Phaser.Scene {
    preload() {

        /////// SPRITES
        //load our character asset
        this.load.spritesheet('lilguy', require('../../shared/assets/player2.png'),
        {
            frameWidth:20,
            frameHeight:20
        });
        //load wall assets
        this.load.image('wallV', require('../../shared/assets/wallVertical.png'));
        this.load.image('wallH', require('../../shared/assets/wallHorizontal.png'));
        //load coin asset
        this.load.image('coin', require('../../shared/assets/coin.png'));
        //enemies
        this.load.image('enemy', require('../../shared/assets/enemy.png'));
        //load the main menu background texture thing
        this.load.image('background', require('../../shared/assets/background.png'));

        ////SOUNDS
        // Jump sound
        this.load.audio('jump', [require('../../shared/assets/jump.mp3'), require('../../shared/assets/jump.ogg')])
        // Coin sound
        this.load.audio('coin', [require('../../shared/assets/coin.mp3'), require('../../shared/assets/coin.ogg')])
        // Death sound
        this.load.audio('dead', [require('../../shared/assets/dead.mp3'), require('../../shared/assets/dead.ogg')])
        // Game Music
        this.load.audio('music', require('../../shared/assets/warped.mp3'));

        //display loading label
        let loadLabel = this.add.text(400,300, 'LOADING',
        {
            color: '#fff',
            font: '50px Arial',
        }).setOrigin(0.5,0.5);
    }

    create() {
        this.scene.start('MainMenu');
    }
}