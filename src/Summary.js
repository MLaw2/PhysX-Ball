class Summary extends Phaser.Scene{
    constructor(){
        super("Summary");
    }
    init(data){
        this.prevlvl = data.level;
        console.log("time now: ", this.time.now);
        this.time = data.stats.time;
        this.moves = data.stats.moves;
        this.bounces = data.stats.bounces;
        this.accuracy = data.stats.missed;
    }
    create(){
        this.add.text(100, 100, "Goal!");
        this.add.text(100, 200, "trying")
        this.add.text(100, 300, "Press Right Arrow to Continue...");
        this.add.text(100, 400, "Press Left Arrow to go back to Menu...");
        // console.log(this.prevlvl,", ", this.time,", ",  this.moves,", ",  this.bounces,", ",  this.accuracy);
        // can't figure out why I can't use a delayed call, oh well...
        // Phaser.Time.Clock.delayedCall(100, ()=>{
            this.input.keyboard.on("keydown-RIGHT", ()=>{
                switch(this.prevlvl){
                    case 0:
                        this.scene.start("Level1");
                        break;
                    case 1:
                        this.scene.start("Level2");
                        break;
                    case 2:
                        this.scene.start("Level3");
                        break;
                    case 3:
                        this.scene.start("Level4");
                        break;
                    case 4:
                        this.scene.start("Level5");
                        break;
                    default:
                        console.log("ooops summary scene broke");
                };
            });
            // this.input.keyboard.on("keydown-LEFT", ())
        // });
    }
}