class testscene extends LevelTemplate{
    constructor(){
        super("testscene");
    }
    create(){
        this.add.text(400, 400, "fard");

        this.player = this.makePlayer(100, 100, 20);
        this.goal = this.makeGoal(600, 500, 10, this.player);
        this.tracker = this.makeStats();

        this.setupMovement(this.player, this.tracker);
        this.setupWin(this.player, this.goal, 0, this.tracker);

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

class Level1 extends LevelTemplate{
    constructor(){
        super("Level1");
    }
    create(){
        this.add.text(400,400, "four hundred thousand dollas");
    }
}