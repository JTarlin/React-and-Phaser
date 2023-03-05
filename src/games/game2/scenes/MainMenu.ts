import Phaser from 'phaser';

export default class MainMenu extends Phaser.Scene {

    create(data: {score:number})
    {
        let score = data.score ? data.score : 0;
    
        //display background image
        this.add.image(400,300, 'background').setScale(2,2);

        const title = this.add.text(
            400, -50, 'S.C.E.R.B.A',
            {
                font: '120px Geo',
                color: '#fff',
            }
        ).setOrigin(0.5, 0.5);
        this.tweens.add({
            targets: title,
            y: 120,
            duration:1000,
            ease: 'bounce.out',
        });

        const subtitle = this.add.text(
            400, 200, 'Super Coin Eat Red Box Avoider',
            {
                font: '30px Geo',
                color: '#fff',
            }
        ).setOrigin(0.5, 0.5);
        this.tweens.add({
            targets: subtitle,
            angle: { from: -1, to: 1 },
            duration: 1000,
            yoyo: true,
            repeat: -1,

        });

        //display score 
        this.add.text(400,350,`Score: ${score}`,
        {
            font: '20px Arial',
            color: '#fff',
        }).setOrigin(0.5, 0.5);
        //display high score if we have one!
        const highScore = localStorage.getItem('highScore')
        if(highScore!=null){
            this.add.text(400,375,`High Score: ${highScore}`,
            {
                font: '20px Arial',
                color: '#fff',
            }).setOrigin(0.5, 0.5);
        };

        //The button to send us into the game scene
        var text = this.add.text(
            400, 
            450, 
            'Play', 
            {
                color: "#ffffff",
                font: "36px Geo"
            }
        ).setOrigin(0.5, 0.5);

        text.setInteractive();

        text.on('pointerup', ()=>{
            console.log('Starting play scene');
            this.scene.start('Play');
        });
    }
}