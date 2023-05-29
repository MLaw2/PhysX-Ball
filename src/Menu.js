class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
    }
    create(){
        // storing player input into object movement
        let xbuffer = 0;
        let ybuffer = 0;

        // player ball
        let ball = this.add.circle(100, 100, 20, 0xff0000);
        this.physics.add.existing(ball);
        ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setDrag(1000);
        // ball.body.setVelocity(100, 0);

        // key right movement
        this.input.keyboard.on("keydown-RIGHT", event=>{
            console.log("Rdown");
            // if(!this.input.keyboard.LEFT.isDown){
                xbuffer += 100;
            // }
        });
        this.input.keyboard.on("keyup-RIGHT", event=>{
            console.log("Rup, xbuffer = ", xbuffer);
            ball.body.setVelocity(ball.body.velocity.x + xbuffer, ball.body.velocity.y);
            xbuffer = 0;
        });

        // key left movement
        this.input.keyboard.on("keydown-LEFT", event=>{
            console.log("Ldown");
            // if(!this.input.keyboard.RIGHT.isDown){
                xbuffer-= 100;
            // }
        });
        this.input.keyboard.on("keyup-LEFT", event=>{
            console.log("Lup, xbuffer = ", xbuffer);
            ball.body.setVelocity(ball.body.velocity.x + xbuffer, ball.body.velocity.y);
            xbuffer = 0;
        });
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