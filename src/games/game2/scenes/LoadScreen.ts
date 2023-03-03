

export default class LoadScreen extends Phaser.Scene {
    preload() {
        //load our character asset
        this.load.image('lilguy', require('../../shared/assets/player.png'));
        //load wall assets
        this.load.image('wallV', require('../../shared/assets/wallVertical.png'));
        this.load.image('wallH', require('../../shared/assets/wallHorizontal.png'));
        //load coin asset
        this.load.image('coin', require('../../shared/assets/coin.png'));
        //enemies
        this.load.image('enemy', require('../../shared/assets/enemy.png'));
        //load the main menu background texture thing
        this.load.image('background', require('../../shared/assets/background.png'));

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