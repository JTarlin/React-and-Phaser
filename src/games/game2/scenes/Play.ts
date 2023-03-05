import Phaser from 'phaser';

import Keyboard from '../ts/Keyboard';

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
    //sounds
    private jumpSound!: Phaser.Sound.BaseSound;
    private coinSound!: Phaser.Sound.BaseSound;
    private deadSound!: Phaser.Sound.BaseSound;
    private musicWarped!: Phaser.Sound.BaseSound;
    
    create ()
    {
        console.log("scene 1 create");
        //add physics to scene
        this.physics.world.gravity.y = 400;
        //Create empty static group for walls
        this.walls = this.physics.add.staticGroup();
        this.buildLevel();

        //Sounds
        this.jumpSound = this.sound.add('jump');
        this.coinSound = this.sound.add('coin');
        this.deadSound = this.sound.add('dead');
        this.musicWarped = this.sound.add('music');
        this.musicWarped.play({loop:true});
        
        // Load the character sprite sprite
        this.player = this.physics.add.sprite(250, 170, 'lilguy');
        //anims
        this.anims.create({
            key: 'right',
            frames:this.anims.generateFrameNumbers('lilguy',{frames: [1,2]}),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'left',
            frames:this.anims.generateFrameNumbers('lilguy',{frames: [3,4]}),
            frameRate: 8,
            repeat: -1,
        });

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

        menuBtn.on('pointerup', ()=>{
            this.musicWarped.stop();
            this.scene.start('MainMenu', {score: this.score});
        });
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
                this.player.body.position.y=0;
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
            this.player.anims.play('left', true);
        } else if(this.keys.getRight()){
            this.player.body.velocity.x=200;
            this.player.anims.play('right', true);
        } else {
            this.player.body.velocity.x*=0.9;
            this.player.setFrame(0);
        }
        //up-down arrows give up-down speed
        if(this.keys.getUp() && this.player.body.onFloor()) {
            this.player.body.velocity.y=-350;
            this.jumpSound.play();
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

        this.deadSound.play();

        //hide player
        this.player.setAlpha(0);

        //change to menu again
        setTimeout(()=>{
            this.musicWarped.stop();
            this.scene.start('MainMenu', {score: this.score});
        }, 1500);
    }

    takeCoin() {
        this.coinSound.play();
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

    buildLevel() {
        //empty the map before rebuilding
        if(this.walls){
            this.walls.children.each((wall)=>{wall.destroy()});
        }
        //vertical
        //left
        this.walls.create(10, 170, 'wallV');
        this.walls.create(10, 500, 'wallV');
        //right
        this.walls.create(790, 170, 'wallV');
        this.walls.create(790, 500, 'wallV');
        //horizontal
        let layouts = [
            [{x:0, y:50},{x:800, y:50},{x:400, y:100},{x:0, y:150},{x:800, y:150}],
            [{x:0, y:50},{x:400, y:100},{x:800, y:150}],
        ]
        //place one wall layout for each of the three layers of the level
        const levelLayers = 3;
        for(let i=0;i<levelLayers;i++){
            let layout = Phaser.Math.RND.pick(layouts);
            for(let j=0;j<layout.length;j++){
                this.walls.create(layout[j].x, layout[j].y+200*i, 'wallH');
            }
        }
    }
}