import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {

    create(data: {score:number})
    {
        let score = data.score ? data.score : 0;
    
        //display background image
        this.add.image(400,300, 'background').setScale(2,2);

        const title = this.add.text(
            400, 120, 'SCERBA',
            {
                font: '120px',
                color: '#fff',
            }
        ).setOrigin(0.5, 0.5);

        const subtitle = this.add.text(
            400, 200, 'Super Coin Eat Red Box Avoider',
            {
                font: '30px Arial',
                color: '#fff',
            }
        ).setOrigin(0.5, 0.5);

        //display score 
        this.add.text(400,350,`Score: ${score}`,
        {
            font: '20px Arial',
            color: '#fff',
        }).setOrigin(0.5, 0.5);

        //The button to send us into the game scene
        var text = this.add.text(
            400, 
            450, 
            'Play', 
            {
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5, 0.5);
        text.setFontSize(20);

        text.setInteractive();

        text.on('pointerup', ()=>{
            console.log('Starting play scene');
            this.scene.start('Play');
        });
    }
}