let config = {
    // type: Phaser.AUTO,
    scale:{
        autoCenter: Phaser.Scale.CENTER_BOTH,
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    physics:{
        default: "arcade",
        gravity: 0,
        drag: 10,
        arcade: {debug: true},
    },
    backgroundColor: 0xA000B6,
    // scene: [Menu, Select, Level1, Level2, Level3, Level4, Level5, Summary]
    scene: Menu,
    title: "PhysX Ball",
}

let game = new Phaser.Game(config);