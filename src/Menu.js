class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    create(){
        this.x = this.cameras.main.worldView.x + this.cameras.main.width;
        this.y = this.cameras.main.worldView.y + this.cameras.main.height;

        this.add.text(this.x / 2, this.y * 0.2, "PhysX BALL", {
            fontFamily: "Tahoma",
            color: '#000',
            fontSize: 80,
        }).setOrigin(0.5, 0.5);
        this.add.text(this.x * 0.5, this.y * 0.5, "Press space to begin.", {
            fontFamily: "Tahoma",
            color: '#000',
            fontSize: 24,
        }).setOrigin(0.5, 0.5);

        this.input.keyboard.on("keydown-SPACE", event=>{
            this.scene.start("Tutorial");
        });
    }
}