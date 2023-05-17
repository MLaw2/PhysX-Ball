let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    // scene: [Menu, Select, Level1, Level2, Level3, Level4, Level5, Summary]
    scene: Menu
}

let game = new Phaser.Game(config);