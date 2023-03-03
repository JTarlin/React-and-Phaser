import Phaser from 'phaser';

import Keyboard from '../ts/keyboard';

export default class Play extends Phaser.Scene {

    //player object
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //controls
    private keys!: Keyboard;
    //walls
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    //coin
    private coin!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //score
    private scoreLabel!: Phaser.GameObjects.Text;
    private score!: number;
    //enemies
    private enemies!: Phaser.Physics.Arcade.Group;
    
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

        //Add controls
        this.keys = new Keyboard(this)

        //create score tracker
        this.scoreLabel = this.add.text(500, 25, 'Score: 0',
            {font: '18px Arial', color: '#fff'}).setOrigin(0.5, 0.5);
        this.score=0;

        //enemies
        this.enemies = this.physics.add.group();
        this.time.addEvent({
            delay:2200,
            callback: ()=>this.addEnemy(),
            loop:true,
        });

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

        menuBtn.on('pointerup', ()=>{this.scene.start('MainMenu', {score: this.score})});
    }

    update() {
        // add collision detection
        this.physics.collide(this.player, this.walls);
        this.physics.collide(this.enemies, this.walls);

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

            if(this.physics.overlap(this.player, this.enemies)){
                this.gameOver();
            }
        }
    }

    movePlayer() {
        //left-right arrows give left-right speed
        if(this.keys.getLeft()) {
            this.player.body.velocity.x=-200;
        } else if(this.keys.getRight()){
            this.player.body.velocity.x=200;
        } else {
            this.player.body.velocity.x*=0.9;
        }
        //up-down arrows give up-down speed
        if(this.keys.getUp() && this.player.body.onFloor()) {
            this.player.body.velocity.y=-350;
        } else if(this.keys.getDown()) {
            this.player.body.velocity.y+=20;
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

        //hide player
        this.player.setAlpha(0);

        //change to menu again
        setTimeout(()=>{
            this.scene.start('MainMenu', {score: this.score});
        }, 1500);
    }

    takeCoin() {
        this.updateCoinPos();
        this.score+=5;
        this.scoreLabel.setText('Score: '+this.score);
    }

    updateCoinPos() {
        let positions = [
            {x:70, y:70},
            {x:60, y:250},
            {x:690, y:150},
            {x:400, y:210},
            {x:700, y:310},
            {x:420, y:320},
            {x:150, y:500},
            {x:650, y:550},
        ]

        //filter out current coin pos
        positions = positions.filter(coin=>coin.x !== this.coin.x);

        let newPos = Phaser.Math.RND.pick(positions);
        this.coin.setPosition(newPos.x,newPos.y);
    }

    addEnemy(){
        let enemy = this.enemies.create(400,-10,'enemy');

        enemy.body.velocity.x = Phaser.Math.RND.pick([-100,100]);
        enemy.body.bounce.x=1;

        this.time.addEvent({
            delay:10000,
            callback: ()=>enemy.destroy(),
        })
    }
}