class LevelTemplate extends Phaser.Scene{

    player;
    goal;
    thing = new Player();

    constructor(){
        super("LevelTemplate");
    }
    makeGoal(x, y, size, player){
        // setting up goal
        let goal = this.add.circle(x, y, size, 0x39FF14)
        .setOrigin(0.5, 0.5);
        this.physics.add.existing(goal);
        goal.body.setCircle(size);
        goal.body.onOverlap = true;
        // adding overlap check with ball and goal
        this.physics.add.overlap(player.ball, goal);
        return goal;
    }
    makePlayer(x, y, size){
        // setting up player
        let player = {
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
            ball: this.add.circle(x, y, size, 0xff0000).setOrigin(0.5),
            inGoal: false,
        }

        // adding physics to player ball
        this.physics.add.existing(player.ball)
        player.ball.body.setCircle(size)
        .setCollideWorldBounds(true)
        .setBounce(1)
        .setDamping(true)
        .setDrag(0.5);

        return player;
    }
    makeStats(){
        // creating stat tracker
        let tracker = {
            time: 0,
            moves: 0,
            bounces: 0,
            missed: 0,
        }
        return tracker;
    }
    setupMovement(player, stats){
        // key right movement
        this.input.keyboard.on("keydown-RIGHT", event=>{
            player.input.isRight = true;
            if(player.input.isLeft){
                // console.log("Left triggered while Right already held, cancelling movement.");
                player.movement.xDelta = 0;
            }
            else if(player.movement.xDelta < player.movement.maxDelta){
                // console.log("Charge Right");
                player.movement.xDelta += player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-RIGHT", event=>{
            player.input.isRight = false;
            player.movement.xDelta += player.movement.minDelta;
            // console.log("Release Right, xDelta = ", this.player.movement.xDelta);
            // if(player.movement.xDelta !=)
            player.ball.body.setVelocity(player.ball.body.velocity.x + player.movement.xDelta, player.ball.body.velocity.y);
            player.movement.xDelta = 0;
        });

        // key left movement
        this.input.keyboard.on("keydown-LEFT", event=>{
            player.input.isLeft = true;
            if(player.input.isRight){
                // console.log("Right triggered while Left already held, cancelling movement.");
                player.movement.xDelta = 0;
            }
            else if(player.movement.xDelta > -player.movement.maxDelta){
                // console.log("Charge Left");
                player.movement.xDelta-= player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-LEFT", event=>{
            player.input.isLeft = false;
            player.movement.xDelta -= player.movement.minDelta;
            // console.log("Release Left, xDelta = ", this.player.movement.xDelta);
            player.ball.body.setVelocity(player.ball.body.velocity.x + player.movement.xDelta, player.ball.body.velocity.y);
            player.movement.xDelta = 0;
        });

        // key up movement
        this.input.keyboard.on("keydown-UP", event=>{
            player.input.isUp = true;
            if(player.input.isDown){
                // console.log("Down triggered while Up already held, cancelling movement.");
                player.movement.yDelta = 0;
            }
            else if(player.movement.yDelta > -player.movement.maxDelta){
                // console.log("Charge Up");
                player.movement.yDelta-=player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-UP", event=>{
            player.input.isUp = false;
            player.movement.yDelta -= player.movement.minDelta;
            // console.log("Release Up, yDelta = ", this.player.movement.yDelta);
            player.ball.body.setVelocity(player.ball.body.velocity.x, player.ball.body.velocity.y+player.movement.yDelta);
            player.movement.yDelta=0;
        });

        // key down movement
        this.input.keyboard.on("keydown-DOWN", event=>{
            player.input.isDown = true;
            if(player.input.isUp){
                // console.log("Up triggered while Down already held, cancelling buffer movement.");
                player.movement.yDelta = 0;
            }
            else if(player.movement.yDelta < player.movement.maxDelta){
                // console.log("Charge Down");
                player.movement.yDelta+=player.movement.moveDelta;
            }
        });
        this.input.keyboard.on("keyup-DOWN", event=>{
            player.input.isDown = false;
            player.movement.yDelta += player.movement.minDelta;
            // console.log("Release Down, yDelta = ", this.player.movement.yDelta);
            player.ball.body.setVelocity(player.ball.body.velocity.x, player.ball.body.velocity.y+player.movement.yDelta);
            player.movement.yDelta=0;
        });
    }
    setupWin(player, goal, level, startTime, record){
        // spacebar variable for checking spacebar input
        var spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // getting errors trying to put this into the listeners directly, so i'll just pass it into a variable
        let temp = player.ball;

        this.physics.world.on('overlap', (temp, goal)=>{
            if(spacebar.isDown && spacebar.getDuration() <= 400){
                // record.time = this.time.now - startTime;
                console.log("transition to new scene");
                console.log(spacebar.getDuration());
                this.scene.start("Summary", {level: level, stats: record});
            }
        })
    }
    transition(level, record){
    }
    preload(){
        this.load.image("ball", "./assets/ball.jpg");
    }
    create(){


    }
    update(){
    }
}

class testscene extends LevelTemplate{
    constructor(){
        super("testscene");
    }
    create(){
        this.add.text(400, 400, "fard");

        this.player = this.makePlayer(100, 100, 20);
        this.goal = this.makeGoal(600, 600, 10, this.player);
        this.tracker = this.makeStats();
        // this.tStart = this.time.now;
        this.tStart = 1;

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 1, this.tStart, this.tracker);
        this.tracker.time = 1;
        this.tracker.moves = 2;
        this.tracker.bounces = 3;
        this.tracker.missed = 4;

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

    }
}
