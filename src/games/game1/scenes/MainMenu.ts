import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload () {}
    
    create ()
    {
        var text = this.add.text(
            400, 
            300, 
            'Play', 
            {
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5);
        text.setFontSize(20);
    }
}