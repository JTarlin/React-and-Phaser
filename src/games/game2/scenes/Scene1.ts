import Phaser from 'phaser';

export default class Scene1 extends Phaser.Scene {

    //player object
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //controls
    private arrow!: Phaser.Types.Input.Keyboard.CursorKeys;
    //walls
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    //coin
    private coin!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //score
    private scoreLabel!: Phaser.GameObjects.Text;
    private score!: number;

    preload ()
    {
        console.log("scene 1 preload");
        //load our character asset
        this.load.image('lilguy', require('../../shared/assets/player.png'));
        //load wall assets
        this.load.image('wallV', require('../../shared/assets/wallVertical.png'));
        this.load.image('wallH', require('../../shared/assets/wallHorizontal.png'));
        //load coin asset
        this.load.image('coin', require('../../shared/assets/coin.png'));

    }
    
    create ()
    {
        console.log("scene 1 create");
        //add physics to scene
        this.physics.world.gravity.y = 400;
        //Create empty static group for walls
        this.walls = this.physics.add.staticGroup();
        //create walls in group
        //vertical
        //left
        this.walls.create(10, 170, 'wallV');
        this.walls.create(10, 500, 'wallV');
        //right
        this.walls.create(790, 170, 'wallV');
        this.walls.create(790, 500, 'wallV');
        //horizontal
        //top
        this.walls.create(650, 10, 'wallH');
        this.walls.create(150, 10, 'wallH');
        //middle
        this.walls.create(100, 150, 'wallH');
        this.walls.create(700, 200, 'wallH');
        this.walls.create(400, 270, 'wallH');
        this.walls.create(170, 340, 'wallH');
        this.walls.create(460, 400, 'wallH');
        this.walls.create(400, 520, 'wallH');
        //bottom
        this.walls.create(650, 590, 'wallH');
        this.walls.create(150, 590, 'wallH');
        
        // Load the character sprite sprite
        this.player = this.physics.add.sprite(250, 170, 'lilguy');

        //coin sprite
        this.coin = this.physics.add.sprite(400, 210, 'coin');
        this.coin.body.setAllowGravity(false);

        //create score tracker
        this.scoreLabel = this.add.text(500, 25, 'Score: 0',
            {font: '18px Arial', color: '#fff'}).setOrigin(0.5, 0.5);
        this.score=0;

        // Start with controls
        this.arrow = this.input.keyboard.createCursorKeys();

        //The button to send us to main menu
        var menuBtn = this.add.text(
            25, 
            25, 
            'Menu', 
            {
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5, 0.5);
        menuBtn.setFontSize(20);

        menuBtn.setInteractive();

        menuBtn.on('pointerup', ()=>{this.scene.start('MainMenu')});
    }

    update() {
        // add collision detection
        this.physics.collide(this.player, this.walls);

        //update player based on input
        if (this.player){
            this.movePlayer();

            //destroy players that fell out
            if(this.player.body.position.y>600){
                this.gameOver();
            }

            if(this.physics.overlap(this.player, this.coin)){
                this.takeCoin();
            }
        }
    }

    movePlayer() {
        //left-right arrows give left-right speed
        if(this.arrow.left.isDown) {
            this.player.body.velocity.x=-200;
        } else if(this.arrow.right.isDown){
            this.player.body.velocity.x=200;
        } else {
            this.player.body.velocity.x*=0.9;
        }
        //up-down arrows give up-down speed
        if(this.arrow.up.isDown && this.player.body.onFloor()) {
            this.player.body.velocity.y=-350;
        }
    }

    gameOver() {
        //Display 'Game Over' text
        var gameOver = this.add.text(
            400, 
            300, 
            'GAME OVER', 
            {
                color: "#ffffff",
                fontStyle: "bold"
            }
        ).setOrigin(0.5, 0.5);
        gameOver.setFontSize(100);

        //change to menu again
        setTimeout(()=>{
            this.scene.start('MainMenu');
        }, 1500);
    }

    takeCoin() {
        const newX = Phaser.Math.RND.between(20, 780);
        const newY = Phaser.Math.RND.between(20, 580);
        this.coin.setPosition(newX, newY);
        this.score+=5;
        this.scoreLabel.setText('Score: '+this.score);
    }
}