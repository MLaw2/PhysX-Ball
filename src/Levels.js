class Tutorial extends LevelTemplate{
    constructor(){
        super("Tutorial");
    }
    create(){
        this.add.text(this.x * 0.5, this.y * 0.1, "Use arrow keys to move the ball,\nHold arrow keys to charge bigger moves.", {
            fontFamily: "Tahoma",
            fontSize: 24,
            color: '#000',
        }).setOrigin(0.5, 0.5);
        this.add.text(this.x * 0.5, this.y * 0.7, "Press spacebar when you hit the green goal to finish the level.", {
            fontFamily: "Tahoma",
            fontSize: 24,
            color: '#000',
        }).setOrigin(0.5, 0.5);

        this.player = this.makePlayer(this.x * 0.1, this.y * 0.5, 20);
        this.goal = this.makeGoal(this.x * 0.9, this.y * 0.5, 10, this.player);
        this.tracker = this.makeStats();

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 0, this.tracker);
    }
}

class Level1 extends LevelTemplate{
    constructor(){
        super("Level1");
    }
    create(){
        this.player = this.makePlayer(this.x * 0.1, this.y * 0.5, 20);
        this.goal = this.makeGoal(this.x*0.9,this.y*0.5, 10, this.player);
        this.tracker = this.makeStats();

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 1, this.tracker);

        // level geometry
        let wall1 = this.add.rectangle(this.x*0.5, this.y*0.5,30, 350, 0xffffff);
        this.physics.add.existing(wall1);
        wall1.body.setImmovable();
        this.physics.add.collider(this.player.ball, [wall1])
    }
}
class Level2 extends LevelTemplate{
    constructor(){
        super("Level2");
    }
    create(){
        this.player = this.makePlayer(this.x * 0.45, this.y * 0.4, 20);
        this.goal = this.makeGoal(this.x*0.9,this.y*0.5, 10, this.player);
        this.tracker = this.makeStats();

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 2, this.tracker);

        // level geometry
        let wall1 = this.add.rectangle(this.x*0.7, this.y*0.65,30, 430, 0xffffff);
        let wall2 = this.add.rectangle(this.x*0.47, this.y*0.3,400, 30, 0xffffff);
        let wall3 = this.add.rectangle(this.x*0.21, this.y*0.55,30, 330, 0xffffff);
        this.physics.add.existing(wall1);
        this.physics.add.existing(wall2);
        this.physics.add.existing(wall3);
        wall1.body.setImmovable();
        wall2.body.setImmovable();
        wall3.body.setImmovable();
        this.physics.add.collider(this.player.ball, [wall1, wall2, wall3]);
    }
}
class Level3 extends LevelTemplate{
    constructor(){
        super("Level3");
    }
    create(){
        this.player = this.makePlayer(this.x * 0.1, this.y * 0.9, 20);
        this.goal = this.makeGoal(this.x*0.9,this.y*0.5, 10, this.player);
        this.tracker = this.makeStats();

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 3, this.tracker);

        // level geometry
        let wall1 = this.add.rectangle(this.x*0.44, this.y*0.65,30, 430, 0xffffff);
        let wall2 = this.add.rectangle(this.x*0.1, this.y*0.7,200, 30, 0xffffff);
        let wall3 = this.add.rectangle(this.x*0.3, this.y*0.45,200, 30, 0xffffff);
        let wall4 = this.add.rectangle(this.x*0.3, this.y*0.1,500, 30, 0xffffff);
        this.physics.add.existing(wall1);
        this.physics.add.existing(wall2);
        this.physics.add.existing(wall3);
        this.physics.add.existing(wall4);
        wall1.body.setImmovable();
        wall2.body.setImmovable();
        wall3.body.setImmovable();
        wall4.body.setImmovable();
        this.physics.add.collider(this.player.ball, [wall1, wall2, wall3, wall4]);
    }
}
class Level4 extends LevelTemplate{
    constructor(){
        super("Level4");
    }
    create(){
        this.player = this.makePlayer(this.x * 0.05, this.y * 0.5, 20);
        this.goal = this.makeGoal(this.x*0.9,this.y*0.5, 10, this.player);
        this.tracker = this.makeStats();

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 4, this.tracker);

        // level geometry
        let wall1 = this.add.rectangle(this.x*0.5, this.y*0.5,500,30, 0xffffff);

        let wall2 = this.add.rectangle(this.x*0.35,this.y*0.9,30,250,0xffffff);
        let wall3 = this.add.rectangle(this.x*0.65,this.y*0.9,30,250,0xffffff);

        let wall4 = this.add.rectangle(this.x*0.3,this.y*0.25,30,30,0xffffff);
        let wall5 = this.add.rectangle(this.x*0.45,this.y*0.35,30,30,0xffffff);
        let wall6 = this.add.rectangle(this.x*0.5,this.y*0.1,30,30,0xffffff);
        let wall7 = this.add.rectangle(this.x*0.7,this.y*0.25,30,30,0xffffff);
        this.physics.add.existing(wall1);
        this.physics.add.existing(wall2);
        this.physics.add.existing(wall3);
        this.physics.add.existing(wall4);
        this.physics.add.existing(wall5);
        this.physics.add.existing(wall6);
        this.physics.add.existing(wall7);
        wall1.body.setImmovable();
        wall2.body.setImmovable();
        wall3.body.setImmovable();
        wall4.body.setImmovable();
        wall5.body.setImmovable();
        wall6.body.setImmovable();
        wall7.body.setImmovable();
        this.physics.add.collider(this.player.ball, [wall1, wall2, wall3, wall4, wall5, wall6, wall7]);
    }
}
class Victory extends Phaser.Scene{
    constructor(){
        super("Victory");
    }
    create(){
        this.x = this.cameras.main.worldView.x + this.cameras.main.width;
        this.y = this.cameras.main.worldView.y + this.cameras.main.height;
        this.add.text(this.x*0.13,this.y*0.13, "Game Complete!", {fontFamily: "Tahoma",color: '#000000',fontSize: 80,});
        this.add.text(this.x*0.13,this.y*0.75, "Thanks for playing!\nPress Left Arrow to go back to Menu", {fontFamily: "Tahoma",color: '#000000',fontSize: 24,});
        this.input.keyboard.on("keydown-LEFT", ()=>{
            this.scene.start("Menu");
        });
    }
}