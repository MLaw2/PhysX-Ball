class Menu extends Phaser.Scene{
    constructor(){
        super("Menu");
    }
    preload(){
        // this.load.image("redball", "../assets/istockphoto-895119304-612x612.jpg");
    }
    create(){
        let test = this.physics.add.existing(new Player(this, 400, 400));
    }
}