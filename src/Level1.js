class Level1 extends Phaser.Scene{
    constructor(){
        super("Level1");
    }
    preload(){
    }
    create(){
        // storing player input into object movement
        let xDelta = 0;
        let yDelta = 0;

        // conditionals for checking if a key is already pressed.
        // I know there are probably better ways but im prototyping fast here so whatever
        let isRight = false;
        let isLeft = false;
        let isUp = false;
        let isDown = false;

        // adjustable parameters for movement
        let moveDelta = 50;
        let maxDelta = 1000;
        let minDelta = 0;

        // player ball
        let ball = this.add.circle(100, 100, 20, 0xff0000);
        this.physics.add.existing(ball);
        ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setDamping(true)
        .setDrag(0.5);
        // ball.body.setVelocity(5000, 0);

        // key right movement
        this.input.keyboard.on("keydown-RIGHT", event=>{
            isRight = true;
            if(isLeft){
                console.log("Left triggered while Right already held, cancelling movement.");
                xDelta = 0;
            }
            else if(xDelta < maxDelta){
                console.log("Charge Right");
                xDelta += moveDelta;
            }
        });
        this.input.keyboard.on("keyup-RIGHT", event=>{
            isRight = false;
            xDelta += minDelta;
            console.log("Release Right, xDelta = ", xDelta);
            ball.body.setVelocity(ball.body.velocity.x + xDelta, ball.body.velocity.y);
            xDelta = 0;
        });

        // key left movement
        this.input.keyboard.on("keydown-LEFT", event=>{
            isLeft = true;
            if(isRight){
                console.log("Right triggered while Left already held, cancelling movement.");
                xDelta = 0;
            }
            else if(xDelta > -maxDelta){
                console.log("Charge Left");
                xDelta-= moveDelta;
            }
        });
        this.input.keyboard.on("keyup-LEFT", event=>{
            isLeft = false;
            xDelta -= minDelta;
            console.log("Release Left, xDelta = ", xDelta);
            ball.body.setVelocity(ball.body.velocity.x + xDelta, ball.body.velocity.y);
            xDelta = 0;
        });

        // key up movement
        this.input.keyboard.on("keydown-UP", event=>{
            isUp = true;
            if(isDown){
                console.log("Down triggered while Up already held, cancelling movement.");
                yDelta = 0;
            }
            else if(yDelta > -maxDelta){
                console.log("Charge Up");
                yDelta-=moveDelta;
            }
        });
        this.input.keyboard.on("keyup-UP", event=>{
            isUp = false;
            yDelta -= minDelta;
            console.log("Release Up, yDelta = ", yDelta);
            ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y+yDelta);
            yDelta=0;
        });

        // key down movement
        this.input.keyboard.on("keydown-DOWN", event=>{
            isDown = true;
            if(isUp){
                console.log("Up triggered while Down already held, cancelling buffer movement.");
                yDelta = 0;
            }
            else if(yDelta < maxDelta){
                console.log("Charge Down");
                yDelta+=moveDelta;
            }
        });
        this.input.keyboard.on("keyup-DOWN", event=>{
            isDown = false;
            yDelta += minDelta;
            console.log("Release Down, yDelta = ", yDelta);
            ball.body.setVelocity(ball.body.velocity.x, ball.body.velocity.y+yDelta);
            yDelta=0;
        });

    }
    update(){
    }
}