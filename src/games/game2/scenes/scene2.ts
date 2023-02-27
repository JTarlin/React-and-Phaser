import Phaser from 'phaser';

class Scene1 extends Phaser.Scene {

    preload ()
    {
        this.load.setBaseURL('http://labs.phaser.io');
    
        this.load.image('sky', 'assets/skies/space3.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo.png');
        this.load.image('red', 'assets/particles/red.png');
    }
    
    create ()
    {
        this.add.image(400, 300, 'sky');
    
        var particles = this.add.particles('blue');
    
        var emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });
    
        var logo = this.physics.add.image(400, 100, 'logo');
    
        logo.setVelocity(200, 300);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    
        emitter.startFollow(logo);
    }
}

export default Scene1;