import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {

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

        text.on('pointerup', ()=>{
            console.log('Starting scene 1');
            this.scene.start('Scene1');
        });
    }
}