var what = false;
class LevelTemplate extends Phaser.Scene{

    player;
    goal;
    thing = new Player();

    constructor(){
        super("LevelTemplate");
    }
    testFunc(){
        console.log("transition to new scene");
    }
    preload(){
        this.load.image("ball", "./assets/ball.jpg");
    }
    create(){

        // setting up goal
        this.goal = this.add.circle(250, 250, 10, 0x39FF14)
        .setOrigin(0.5, 0.5);
        this.physics.add.existing(this.goal);
        this.goal.body.setCircle(10);
        this.goal.body.onOverlap = true;

        // setting up player
        this.player = {
            movement: {
                // storing player input into object movement
                xDelta: 0,
                yDelta: 0,
                // adjustable parameters for movement
                moveDelta: 50,
                maxDelta: 1000,
                minDelta: 0,
            },
            input: {
                // conditionals for checking if a key is already pressed.
                isRight: false,
                isLeft: false,
                isUp: false,
                isDown: false,
            },
            // player ball object
            ball: this.add.circle(0, 0, 20, 0xff0000).setOrigin(0.5),
            inGoal: false,
        }

        // print out player data
        // console.log(this.player);

        // adding physics to player ball
        this.physics.add.existing(this.player.ball)
        this.player.ball.body.setCircle(20)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setDamping(true)
        .setDrag(0.5);

        // key right movement
        this.input.keyboard.on("keydown-RIGHT", event=>{
            this.player.input.isRight = true;
            if(this.player.input.isLeft){
                // console.log("Left triggered while Right already held, cancelling movement.");
                this.player.movement.xDelta = 0;
            }
            else if(this.player.movement.xDelta < this.player.movement.maxDelta){
                // console.log("Charge Right");
                this.player.movement.xDelta += this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-RIGHT", event=>{
            this.player.input.isRight = false;
            this.player.movement.xDelta += this.player.movement.minDelta;
            // console.log("Release Right, xDelta = ", this.player.movement.xDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x + this.player.movement.xDelta, this.player.ball.body.velocity.y);
            this.player.movement.xDelta = 0;
        });

        // key left movement
        this.input.keyboard.on("keydown-LEFT", event=>{
            this.player.input.isLeft = true;
            if(this.player.input.isRight){
                // console.log("Right triggered while Left already held, cancelling movement.");
                this.player.movement.xDelta = 0;
            }
            else if(this.player.movement.xDelta > -this.player.movement.maxDelta){
                // console.log("Charge Left");
                this.player.movement.xDelta-= this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-LEFT", event=>{
            this.player.input.isLeft = false;
            this.player.movement.xDelta -= this.player.movement.minDelta;
            // console.log("Release Left, xDelta = ", this.player.movement.xDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x + this.player.movement.xDelta, this.player.ball.body.velocity.y);
            this.player.movement.xDelta = 0;
        });

        // key up movement
        this.input.keyboard.on("keydown-UP", event=>{
            this.player.input.isUp = true;
            if(this.player.input.isDown){
                // console.log("Down triggered while Up already held, cancelling movement.");
                this.player.movement.yDelta = 0;
            }
            else if(this.player.movement.yDelta > -this.player.movement.maxDelta){
                // console.log("Charge Up");
                this.player.movement.yDelta-=this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-UP", event=>{
            this.player.input.isUp = false;
            this.player.movement.yDelta -= this.player.movement.minDelta;
            // console.log("Release Up, yDelta = ", this.player.movement.yDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x, this.player.ball.body.velocity.y+this.player.movement.yDelta);
            this.player.movement.yDelta=0;
        });

        // key down movement
        this.input.keyboard.on("keydown-DOWN", event=>{
            this.player.input.isDown = true;
            if(this.player.input.isUp){
                // console.log("Up triggered while Down already held, cancelling buffer movement.");
                this.player.movement.yDelta = 0;
            }
            else if(this.player.movement.yDelta < this.player.movement.maxDelta){
                // console.log("Charge Down");
                this.player.movement.yDelta+=this.player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-DOWN", event=>{
            this.player.input.isDown = false;
            this.player.movement.yDelta += this.player.movement.minDelta;
            // console.log("Release Down, yDelta = ", this.player.movement.yDelta);
            this.player.ball.body.setVelocity(this.player.ball.body.velocity.x, this.player.ball.body.velocity.y+this.player.movement.yDelta);
            this.player.movement.yDelta=0;
        });

        // test level
        let wall1 = this.add.rectangle(500, 500, 100, 100, 0xffffff);
        let wall2 = this.add.rectangle(100, 399, 20, 100, 0xffffff);
        let wall3 = this.add.rectangle(300, 300, 20, 20, 0xffffff);
        this.physics.add.existing(wall1);
        this.physics.add.existing(wall2);
        this.physics.add.existing(wall3);
        wall1.body.setImmovable();
        wall2.body.setImmovable();
        wall3.body.setImmovable();
        this.physics.add.collider(this.player.ball, [wall1, wall2, wall3]);

        // adding overlap check with ball and goal
        this.physics.add.overlap(this.player.ball, this.goal);
        // this.physics.add.collider(this.player.ball, this.goal);

        // spacebar variable for checking spacebar input
        var spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // getting errors trying to put this into the listeners directly, so i'll just pass it into a variable
        let temp2 = this.goal;
        let temp1 = this.player.ball;

        this.physics.add.overlap(this.goal, this.player.ball, function (){
            if(spacebar.isDown && spacebar.getDuration() < 300){
                this.testFunc();
            }
        });
    }
    update(){
    }
}