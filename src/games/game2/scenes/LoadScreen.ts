import WebFontFile from '../../shared/ts/WebFontFile';

export default class LoadScreen extends Phaser.Scene {
    private loadLabel!: Phaser.GameObjects.Text;

    preload() {
        /////// SPRITES
        console.log('loading sprites');
        //load our character asset
        this.load.spritesheet('lilguy', require('../../shared/assets/player2.png'),
        {
            frameWidth:20,
            frameHeight:20
        });
        //load tilemap
        this.load.image('tileset', require('../../shared/assets/tileset.png'));
        this.load.tilemapTiledJSON('map', require('../../shared/assets/map.json'));
        //load coin asset
        this.load.image('coin', require('../../shared/assets/coin.png'));
        //enemies
        this.load.image('enemy', require('../../shared/assets/enemy.png'));
        //load the main menu background texture thing
        this.load.image('background', require('../../shared/assets/background.png'));
        //load particle pixel
        this.load.image('pixel', require('../../shared/assets/pixel.png'));

        ////SOUNDS
        console.log('loading sounds');
        // Jump sound
        this.load.audio('jump', [require('../../shared/assets/jump.mp3'), require('../../shared/assets/jump.ogg')])
        // Coin sound
        this.load.audio('coin', [require('../../shared/assets/coin.mp3'), require('../../shared/assets/coin.ogg')])
        // Death sound
        this.load.audio('dead', [require('../../shared/assets/dead.mp3'), require('../../shared/assets/dead.ogg')])
        // Game Music
        this.load.audio('music', require('../../shared/assets/warped.mp3'));

        ////FONTS
        console.log('loading fonts');
        this.load.addFile(new WebFontFile(this.load, 'Geo'));

        //display loading label
        this.loadLabel = this.add.text(400,300, 'LOADING\n0%',
        {
            color: '#fff',
            font: '50px Arial',
            align: 'center',
        }).setOrigin(0.5,0.5);
        this.load.on('progress', this.progress, this)
    }

    create() {
        this.scene.start('MainMenu');
    }

    progress(value: number){
        let percentage = Math.round(value*100)+'%'

        this.loadLabel.setText('LOADING\n'+percentage);
    }
}