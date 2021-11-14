import { Scene } from 'phaser';
import { loadWeb3, faucet, enterGamePlay } from '../../web3/web3'

let button:any;
let button_1:any;

export class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';

    // PLAYER LOADING
    this.load.image('king', 'sprites/king.png');
    this.load.image('wallpaper', 'tilemaps/tiles/gimli.jpg');
    this.load.image('start', 'tilemaps/tiles/start.png');
    this.load.image('faucet', 'tilemaps/tiles/faucet.png');

    this.load.atlas('a-king', 'spritesheets/a-king.png', 'spritesheets/a-king_atlas.json');

    // MAP LOADING
    this.load.image({
      key: 'tiles',
      url: 'tilemaps/tiles/dungeon-16-16.png',
    });
    this.load.tilemapTiledJSON('dungeon', 'tilemaps/json/dungeon.json');

    // CHEST LOADING
    this.load.spritesheet('tiles_spr', 'tilemaps/tiles/dungeon-16-16.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create(): void {
    let mainPic = this.add.image(0, 0, "wallpaper");
    let self = this;

    loadWeb3()

    this.add
      .text(this.sys.game.canvas.width / 9, 50, "Connect Metamask and help mighty king to reclaim his homeland!!", {
        font: "30px Courier"
      })
    
    button_1 = this.physics.add.image(710, 490, 'faucet')
    .setInteractive()

    button = this.physics.add.image(710, 640, 'start')
    .setInteractive()

    Phaser.Display.Align.In.Center(
      mainPic,
      this.add.zone(
        700,
        500,
        this.sys.game.canvas.width / 2,
        this.sys.game.canvas.height / 2,
      )
    );
    
    button_1.on(
      "pointerdown",
      function (pointer: any) {
        faucet()
      }
    );

    button.on(
      "pointerdown",
      async function (pointer: any) {
        let enter = await enterGamePlay()
        console.log(enter);
        
        if (enter === true) {
          // alert('triggered')
          //console.log("selected peter character");
          self.scene.start('level-1-scene');
          self.scene.start('ui-scene');
        }
      }
    );
  }
}
