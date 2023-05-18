class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        // this.load.image("ball", "../assets/ball.jpg");
    }
    create(){
        // let test = this.physics.add.existing(new Player(this, 400, 400));

        // IMAGE PHYSICS
        // this.add.image(300, 300, "ball");
        // let image = this.physics.add.image(500, 500, "ball");

        // GAMEOBJECT PHYSICS
        let ball = this.add.circle(100, 100, 20, 0xff0000);
        this.physics.add.existing(ball);
        ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        // .setDrag(100);
        ball.body.setVelocity(1, 0);
        // ball.body.drawDebug(new Phaser.GameObjects.Graphics(this));
        // ball.body.x = 500;
        console.log(ball.body.velocity.y);
        // ball.body.debugShowVelocity = true;
        // ball.body.setAcceleration(100, 0);
        // ball.body.setCollideWorldBounds(true);
        // ball.body.setBounce(1);
        // ball.body.setGravity(0, 10);
    }
}