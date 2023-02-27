import Phaser from 'phaser';

//scene imports
import Scene1 from './Scene1';

export default class MainMenu extends Phaser.Scene {
    // init () {
    //     this.scene.add('Scene1', Scene1);
    //     this.scene.add('MainMenu', MainMenu);
    // }

    create ()
    {
        //The button to send us into the game scene
        var text = this.add.text(
            400, 
            300, 
            'Play', 
            {
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5, 0.5);
        text.setFontSize(20);

        text.setInteractive();

        text.on('pointerup', ()=>{this.scene.start('Scene1')});
    }
}