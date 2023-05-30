class Level1 extends Phaser.Scene{

    player;
    goal;

    constructor(){
        super("Level1");
    }
    preload(){
        this.load.image("ball", "./assets/ball.jpg");
    }
    create(){
        // setting up player
        this.player = {
            movement: {
                xDelta: 0,
                yDelta: 0,
                moveDelta: 50,
                maxDelta: 1000,
                minDelta: 0,
            },
            input: {
                isRight: false,
                isLeft: false,
                isUp: false,
                isDown: false,
            },
            ball: this.add.circle(0, 0, 20, 0xff0000).setOrigin(0.5),
        }
        this.physics.add.existing(this.player.ball)
        this.player.ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setDamping(true)
        .setDrag(0.5);

        // // storing player input into object movement
        // let xDelta = 0;
        // let yDelta = 0;

        // // conditionals for checking if a key is already pressed.
        // // I know there are probably better ways but im prototyping fast here so whatever
        // let isRight = false;
        // let isLeft = false;
        // let isUp = false;
        // let isDown = false;

        // // adjustable parameters for movement
        // let moveDelta = 50;
        // let maxDelta = 1000;
        // let minDelta = 0;

        // // testing Goal class
        // // let thing = new Goal(Level1, 600, 600, "ball");

        // // player ball
        // let ball = this.add.circle(100, 100, 20, 0xff0000);
        // this.physics.add.existing(ball);
        // ball.body.setCircle(20)
        // .setCollideWorldBounds(true)
        // .setBounce(1)
        // .setDamping(true) // required for smooth ball movement
        // .setDrag(0.5);
        // ball.body.setVelocity(5000, 0);

        // key right movement
        this.input.keyboard.on("keydown-RIGHT", event=>{
            this.player.input.isRight = true;
            if(this.player.input.isLeft){
                console.log("Left triggered while Right already held, cancelling movement.");
                this.player.movement.xDelta = 0;
            }
            else if(this.player.movement.xDelta < this.player.movement.maxDelta){
                console.log("Charge Right");
                this.player.movement.xDelta += this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-RIGHT", event=>{
            this.player.input.isRight = false;
            this.player.movement.xDelta += this.player.movement.minDelta;
            console.log("Release Right, xDelta = ", this.player.movement.xDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x + this.player.movement.xDelta, this.player.ball.body.velocity.y);
            this.player.movement.xDelta = 0;
        });

        // key left movement
        this.input.keyboard.on("keydown-LEFT", event=>{
            this.player.input.isLeft = true;
            if(this.player.input.isRight){
                console.log("Right triggered while Left already held, cancelling movement.");
                this.player.movement.xDelta = 0;
            }
            else if(this.player.movement.xDelta > -this.player.movement.maxDelta){
                console.log("Charge Left");
                this.player.movement.xDelta-= this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-LEFT", event=>{
            this.player.input.isLeft = false;
            this.player.movement.xDelta -= this.player.movement.minDelta;
            console.log("Release Left, xDelta = ", this.player.movement.xDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x + this.player.movement.xDelta, this.player.ball.body.velocity.y);
            this.player.movement.xDelta = 0;
        });

        // key up movement
        this.input.keyboard.on("keydown-UP", event=>{
            this.player.input.isUp = true;
            if(this.player.input.isDown){
                console.log("Down triggered while Up already held, cancelling movement.");
                this.player.movement.yDelta = 0;
            }
            else if(this.player.movement.yDelta > -this.player.movement.maxDelta){
                console.log("Charge Up");
                this.player.movement.yDelta-=this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-UP", event=>{
            this.player.input.isUp = false;
            this.player.movement.yDelta -= this.player.movement.minDelta;
            console.log("Release Up, yDelta = ", this.player.movement.yDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x, this.player.ball.body.velocity.y+this.player.movement.yDelta);
            this.player.movement.yDelta=0;
        });

        // key down movement
        this.input.keyboard.on("keydown-DOWN", event=>{
            this.player.input.isDown = true;
            if(this.player.input.isUp){
                console.log("Up triggered while Down already held, cancelling buffer movement.");
                this.player.movement.yDelta = 0;
            }
            else if(this.player.movement.yDelta < this.player.movement.maxDelta){
                console.log("Charge Down");
                this.player.movement.yDelta+=this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-DOWN", event=>{
            this.player.input.isDown = false;
            this.player.movement.yDelta += this.player.movement.minDelta;
            console.log("Release Down, yDelta = ", this.player.movement.yDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x, this.player.ball.body.velocity.y+this.player.movement.yDelta);
            this.player.movement.yDelta=0;
        });

        // level geometry (FOR TESTING STUFF)
        // let wall = this.physics.add.staticGroup({
            
        // });
        
        let wall1 = this.add.rectangle(500, 500, 100, 100, 0xffffff);
        let wall2 = this.add.rectangle(100, 399, 20, 100, 0xffffff);
        this.physics.add.existing(wall1);
        this.physics.add.existing(wall2);
        wall1.body.setImmovable();
        wall2.body.setImmovable();
        // test level
        // wall.create(50, 50);
        this.physics.add.collider(this.player.ball, [wall1, wall2]);

        const goal = this.add.circle(250, 250, 10, 0x39FF14)
        .setOrigin(0.5, 0.5);
        this.physics.add.existing(goal);
        goal.body.setCircle(10);
        goal.body.onOverlap = true;
        this.physics.add.overlap(this.player.ball, goal);
        let temp = this.player.ball;
        this.physics.world.on("overlap",(temp, goal)=>{
            console.log("pee");
        });
    }
    update(){
    }
}