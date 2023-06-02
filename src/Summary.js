class Summary extends Phaser.Scene{
    constructor(){
        super("Summary");
    }
    init(data){
        this.prevlvl = data.level;
        this.time = data.stats.time;
        this.moves = data.stats.moves;
        this.bounces = data.stats.bounces;
        this.accuracy = data.stats.missed;
    }
    create(){
        this.add.text(100, 100, "Goal!");
        this.add.text("trying")
        this.add.text("Press Space to Continue...");
        console.log(this.prevlvl,", ", this.time,", ",  this.moves,", ",  this.bounces,", ",  this.accuracy);
        // switch(level){
        //     case 1:
        //         this.scene.start("level2");
        //         break;
        //     case 2:
        //         this.scene.start("level3");
        //         break;
        //     case 3:
        //         this.scene.start("level4");
        //         break;
        //     case 4:
        //         this.scene.start("level5");
        //         break;
        //     default:
        //         this.scene.start("Menu");
        // }
    }
}