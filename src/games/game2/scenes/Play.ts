import Phaser from 'phaser';

import Keyboard from '../ts/Keyboard';

export default class Play extends Phaser.Scene {

    //player object
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //controls
    private keys!: Keyboard;
    //walls
    private walls!: Phaser.Tilemaps.TilemapLayer;
    //coin
    private coin!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    //score
    private scoreLabel!: Phaser.GameObjects.Text;
    private score!: number;
    //enemies
    private enemies!: Phaser.Physics.Arcade.Group;
    private nextEnemy: number = 0;
    //sounds
    private jumpSound!: Phaser.Sound.BaseSound;
    private coinSound!: Phaser.Sound.BaseSound;
    private deadSound!: Phaser.Sound.BaseSound;
    private musicWarped!: Phaser.Sound.BaseSound;
    //Particle emitter
    private emitter!: Phaser.GameObjects.Particles.ParticleEmitter;
    
    create ()
    {
        console.log("scene 1 create");
        //add physics to scene
        this.physics.world.gravity.y = 400;
        //Build level using tilemap
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
        this.coin.setScale(0);
        this.tweens.add({
            targets:this.coin,
            scale:1,
            duration:300,
        });

        //Particle effect
        let particles = this.add.particles('pixel');
        this.emitter = particles.createEmitter({
            quantity:15,
            speed: {min: -150, max:150},
            scale: {start:2,end:0.1},
            lifespan:800,
            on:false,
        })

        //Add controls
        this.keys = new Keyboard(this)

        //create score tracker
        this.scoreLabel = this.add.text(500, 25, 'Score: 0',
            {font: '18px Arial', color: '#fff'}).setOrigin(0.5, 0.5);
        this.score=0;

        //enemies
        this.enemies = this.physics.add.group();

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
            this.setHighScore();
            this.scene.start('MainMenu', {score: this.score});
        });
    }

    update() {
        // add collision detection
        this.physics.collide(this.player, this.walls);
        this.physics.collide(this.enemies, this.walls);

        //update player based on input
        if (this.player.active){
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

        //Control enemy spawning
        let now = Date.now();
        
        if(this.nextEnemy < now){
            const startDifficulty = 4000;
            const endDifficulty = 1000;
            const endScore = 100;
            //Enemies spawn faster and faster as game goes on
            let enemyDelay = startDifficulty-(startDifficulty-endDifficulty)*(this.score/endScore);
            this.addEnemy();
            this.nextEnemy = now+enemyDelay;
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
        //kill player
        this.deadSound.play();
        this.cameras.main.shake(200, 0.02);
        this.emitter.explode(15, this.player.x, this.player.y);
        //hide player
        this.player.destroy();

        //set high score
        this.setHighScore();

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
            this.musicWarped.stop();
            this.scene.start('MainMenu', {score: this.score});
        }, 1500);
    }

    takeCoin() {
        this.coinSound.play();
        this.tweens.add({
            targets: this.player,
            scale: 1.3,
            duration: 100,
            yoyo: true,
        })
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

        this.coin.setScale(0);
        this.tweens.add({
            targets:this.coin,
            scale:1,
            duration:300,
        });
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
        let map = this.add.tilemap('map');
        let tileset = map.addTilesetImage('tileset', 'tileset');
        this.walls = map.createLayer('Tile Layer 1', tileset);

        this.walls.setCollision(1);
    }

    setHighScore() {
        if(localStorage.getItem('highScore')==null){
            localStorage.setItem('highScore','0');
        }
        if(this.score > parseInt(localStorage.getItem('highScore')!)){
            localStorage.setItem('highScore',`${this.score}`);
        }
    }
}