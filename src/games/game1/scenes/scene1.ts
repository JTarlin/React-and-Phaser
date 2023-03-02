import Phaser from 'phaser';

export default class Scene1 extends Phaser.Scene {

    //player object
    private player!: Phaser.GameObjects.Sprite;

    //controls
    private arrow!: Phaser.Types.Input.Keyboard.CursorKeys;

    //walls
    private walls!: Phaser.Physics.Arcade.StaticGroup;

    preload ()
    {
        console.log("scene 1 preload");
        //load ship asset
        this.load.image('ship', require('../assets/ship.png'));
        //load wall assets
        this.load.image('wallV', require('../assets/wallVertical.png'));
        this.load.image('wallH', require('../assets/wallHorizontal.png'));

    }
    
    create ()
    {
        console.log("scene 1 create");
        //Create empty static group for walls
        this.walls = this.physics.add.staticGroup();
        //create walls in group
        this.walls.create(10, 170, 'wallV');
        this.walls.create(170, 340, 'wallH');
        

        // Load the ship sprite to test
        this.player = this.physics.add.sprite(250, 170, 'ship');
        this.player.setScale(0.1,0.1);

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
        this.movePlayer();

        //decelerate
        this.player.body.velocity.x*=0.99;
        this.player.body.velocity.y*=0.99;
        //stop if too slow
        if (this.player.body.velocity.x<10 && this.player.body.velocity.x>-10){
            this.player.body.velocity.x=0;
        }
        if (this.player.body.velocity.y<10 && this.player.body.velocity.y>-10){
            this.player.body.velocity.y=0;
        }
    }

    movePlayer() {
        //left-right arrows give left-right speed
        if(this.arrow.left.isDown) {
            this.player.body.velocity.x=-200;
        } else if(this.arrow.right.isDown){
            this.player.body.velocity.x=200;
        }
        //up-down arrows give up-down speed
        if(this.arrow.up.isDown) {
            this.player.body.velocity.y=-200;
        } else if(this.arrow.down.isDown){
            this.player.body.velocity.y=200;
        }
    }
}