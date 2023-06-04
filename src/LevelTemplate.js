class LevelTemplate extends Phaser.Scene{

    player;
    goal;

    constructor(key){
        super(key);
    }
    init(){
        this.x = this.cameras.main.worldView.x + this.cameras.main.width;
        this.y = this.cameras.main.worldView.y + this.cameras.main.height;
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
        player.ball.body.onCollide = true;
        player.ball.body.onWorldBounds = true;

        return player;
    }
    makeStats(){
        // creating stat tracker
        let tracker = {
            time: 0,
            moves: 0,
            bounces: 0,
            missed: 0,  // missed is a misnomer but oh well
        }
        return tracker;
    }
    setupMovement(player, stats){
        // setup collision tracking for world bounds
        this.physics.world.on("worldbounds", (player)=>{
            stats.bounces += 1;
        })
        // setup collision tracking body to body collision
        this.physics.world.on("collide", (player)=>{
            stats.bounces+=1;
        })
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
            if(player.movement.xDelta > 0){
                stats.moves+=1;
            }
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
            if(player.movement.xDelta < 0){
                stats.moves+=1;
            }
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
            if(player.movement.yDelta < 0){
                stats.moves+=1;
            }
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
            if(player.movement.yDelta > 0){
                stats.moves+=1;
            }
            player.ball.body.setVelocity(player.ball.body.velocity.x, player.ball.body.velocity.y+player.movement.yDelta);
            player.movement.yDelta=0;
        });
    }
    setupWin(player, goal, level, record){
        // spacebar variable for checking spacebar input
        var spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // recording # of spacebar inputs
        // and yes, holding the spacebar down counts as multiple (to encourage accurate presses)
        this.input.keyboard.on("keydown-SPACE", event=>{
            record.missed+=1;
        })

        // getting errors trying to put this into the listeners directly, so i'll just pass it into a variable
        let temp = player.ball;

        this.physics.world.on('overlap', (temp, goal)=>{
            if(spacebar.isDown && spacebar.getDuration() <= 400){
                record.time = this.time.now;
                this.scene.start("Summary", {level: level, stats: record});
            }
        })
    }
}