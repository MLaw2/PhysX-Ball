class Summary extends Phaser.Scene{
    constructor(){
        super("Summary");
    }
    init(data){
        this.prevlvl = data.level;
        this.time = data.time;
        this.moves = data.moves;
        this.bounces = data.bounces;
        this.accuracy = data.accuracy;
    }
    create(){
        this.add.text(100, 100, "Goal!");
        this.add.text("trying")
        this.add.text("Press Space to Continue...");
        switch(level){
            case 1:
                this.scene.start("level2");
                break;
            case 2:
                this.scene.start("level3");
                break;
            case 3:
                this.scene.start("level4");
                break;
            case 4:
                this.scene.start("level5");
                break;
            default:
                this.scene.start("Menu");
        }
    }
}