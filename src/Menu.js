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
        // let player = new Player(this, 250, 250, 100, 0xff0000, 1);
        let thing = new Phaser.GameObject.BuildGameObject(this, 100, 100, 40, 0, 360, false, 0xff0000, 1);
        // this.add.existing(player);
        // this.add.existing(player);

        let ball = this.add.circle(100, 100, 20, 0xff0000);
        this.physics.add.existing(ball);
        ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        // .setDrag(100);
        ball.body.setVelocity(100, 0);
        // ball.body.drawDebug(new Phaser.GameObjects.Graphics(this));
        // ball.body.x = 500;
        console.log("yvelocity is = ", ball.body.velocity.y);
        console.log("xvelocity is = ", ball.body.velocity.x);
        // ball.body.debugShowVelocity = true;
        // ball.body.setAcceleration(100, 0);
        // ball.body.setCollideWorldBounds(true);
        // ball.body.setBounce(1);
        // ball.body.setGravity(0, 10);
    }
    update(){
        // let ball = this.add.circle(100, 100, 20, 0xffffff);
        // console.log(ball.body);
    }
}