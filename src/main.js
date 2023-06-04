let config = {
    // type: Phaser.AUTO,
    scale:{
        autoCenter: Phaser.Scale.CENTER_BOTH,
        // mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    physics:{
        default: "arcade",
        gravity: 0,
        arcade: {debug: false},
    },
    backgroundColor: 0xA0B0B6,
    scene: [Menu, Tutorial, Summary, Level1, Level2, Level3, Level4, Victory],
    title: "PhysX Ball",
}

let game = new Phaser.Game(config);