class Summary extends Phaser.Scene{
    constructor(){
        super("Summary");
    }
    init(data){
        this.prevlvl = data.level;
        console.log("time now: ", this.time.now);
        this.time = data.stats.time / 1000;
        this.moves = data.stats.moves;
        this.bounces = data.stats.bounces;
        this.accuracy = data.stats.missed - 1;
    }
    create(){
        this.x = this.cameras.main.worldView.x + this.cameras.main.width;
        this.y = this.cameras.main.worldView.y + this.cameras.main.height;
        let edge = this.x*0.13;
        this.add.text(edge,this.y*0.13, "Goal!", {fontFamily: "Tahoma",color: '#000000',fontSize: 80,});
        this.add.text(edge,this.y*0.75, "Press Right Arrow to Continue...\nPress Left Arrow to go back to Menu...", {fontFamily: "Tahoma",color: '#000000',fontSize: 24,});
        let statString = "Time: " + this.time+"\nMoves: "+this.moves+"\nBounces: "+this.bounces+"\nMisses: "+this.accuracy;
        this.add.text(edge,this.y*0.4, statString, {fontFamily: "Tahoma",color: '#000000',fontSize: 24,});
        // can't figure out why I can't use a delayed call, oh well...
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
                        this.scene.start("Victory");
                        break;
                    default:
                        console.log("ooops summary scene broke");
                };
            });
            this.input.keyboard.on("keydown-LEFT", ()=>{
                this.scene.start("Menu");
            });
    }
}