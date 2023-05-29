class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
    }
    preload(){
    }
    create(){
        // storing player input into object movement
        let xbuffer = 0;
        let ybuffer = 0;

        // conditionals for checking if a key is already pressed.
        // I know there are probably better ways but im prototyping fast here so whatever
        let isRight = false;
        let isLeft = false;
        let isUp = false;
        let isDown = false;

        // player ball
        let ball = this.add.circle(100, 100, 20, 0xff0000);
        this.physics.add.existing(ball);
        ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setDamping(true)
        .setDrag(0.5);
        ball.body.setVelocity(30, 20);

        // key right movement
        this.input.keyboard.on("keydown-RIGHT", event=>{
            isRight = true;
            if(isLeft){
                console.log("Left triggered while Right already held, cancelling buffer movement.");
                xbuffer = 0;
            }
            else{
                console.log("Rdown");
                xbuffer += 100;
            }
        });
        this.input.keyboard.on("keyup-RIGHT", event=>{
            isRight = false;
            console.log("Rup, xbuffer = ", xbuffer);
            ball.body.setVelocity(ball.body.velocity.x + xbuffer, ball.body.velocity.y);
            xbuffer = 0;
        });

        // key left movement
        this.input.keyboard.on("keydown-LEFT", event=>{
            isLeft = true;
            if(isRight){
                console.log("Right triggered while Left already held, cancelling buffer movement.");
                xbuffer = 0;
            }
            else{
                console.log("Ldown");
                xbuffer-= 100;
            }
        });
        this.input.keyboard.on("keyup-LEFT", event=>{
            isLeft = false;
            console.log("Lup, xbuffer = ", xbuffer);
            ball.body.setVelocity(ball.body.velocity.x + xbuffer, ball.body.velocity.y);
            xbuffer = 0;
        });

        // key up movement
        this.input.keyboard.on("keydown-UP", event=>{
            isUp = true;
            if(isDown){
                console.log("Down triggered while Up already held, cancelling buffer movement.");
                ybuffer = 0;
            }
            else{
                console.log("Udown");
                ybuffer-=100;
            }
        });
        this.input.keyboard.on("keyup-UP", event=>{
            isUp = false;
            console.log("Uup, ybuffer = ", ybuffer);
            ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y+ybuffer);
            ybuffer=0;
        });
        // key down movement
        this.input.keyboard.on("keydown-DOWN", event=>{
            isDown = true;
            if(isUp){
                console.log("Up triggered while Down already held, cancelling buffer movement.");
                ybuffer = 0;
            }
            else{
                console.log("Ddown");
                ybuffer+=100;
            }
        });
        this.input.keyboard.on("keyup-DOWN", event=>{
            isDown = false;
            console.log("Dup, ybuffer = ", ybuffer);
            ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y+ybuffer);
            ybuffer=0;
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