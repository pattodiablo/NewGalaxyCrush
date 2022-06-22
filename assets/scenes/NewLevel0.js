
// You can write more code here

/* START OF COMPILED CODE */

class NewLevel0 extends BaseScene {

	constructor() {
		super("NewLevel0");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// mapa
		const mapa = this.add.tilemap("new_level0");
		mapa.addTilesetImage("level0", "level0");

		// tilespriteBG
		const tilespriteBG = this.add.tileSprite(0, 0, 64, 64, "background");
		tilespriteBG.setOrigin(0, 0);

		// nocollide
		mapa.createLayer("nocollide", [], 0, 0);

		// nocollide2
		mapa.createLayer("nocollide2", ["level0"], 0, 0);

		// layer
		const layer = mapa.createLayer("collide", ["level0"], 0, 0);

		// bullet
		const bullet = new PlayerBullet(this, 324, 1383);
		this.add.existing(bullet);

		// bulletOrigin
		const bulletOrigin = new BulletOrigin(this, 279, 1397);
		this.add.existing(bulletOrigin);

		// player
		const player = new Player(this, 206, 1407);
		this.add.existing(player);

		// brazoderecho
		const brazoderecho = new BrazoDerecho(this, 198, 1370);
		this.add.existing(brazoderecho);

		// howToPlay
		const howToPlay = this.add.image(270, 850, "howToPlay");

		// gameOver
		const gameOver = this.add.sprite(1014, 1220, "gameOver");

		// lists
		const doors = [];
		const switches = [];
		const enemies = [];
		const platforms = [];
		const coins = [];
		const catapultas = [];
		const revivingPods = [];
		const tutorials = [];

		this.tilespriteBG = tilespriteBG;
		this.layer = layer;
		this.bulletOrigin = bulletOrigin;
		this.player = player;
		this.brazoderecho = brazoderecho;
		this.howToPlay = howToPlay;
		this.gameOver = gameOver;
		this.mapa = mapa;
		this.doors = doors;
		this.switches = switches;
		this.enemies = enemies;
		this.platforms = platforms;
		this.coins = coins;
		this.catapultas = catapultas;
		this.revivingPods = revivingPods;
		this.tutorials = tutorials;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	tilespriteBG;
	/** @type {Phaser.Tilemaps.TilemapLayer} */
	layer;
	/** @type {BulletOrigin} */
	bulletOrigin;
	/** @type {Player} */
	player;
	/** @type {BrazoDerecho} */
	brazoderecho;
	/** @type {Phaser.GameObjects.Image} */
	howToPlay;
	/** @type {Phaser.GameObjects.Sprite} */
	gameOver;
	/** @type {Array<any>} */
	doors;
	/** @type {Array<any>} */
	switches;
	/** @type {Array<any>} */
	enemies;
	/** @type {Array<any>} */
	platforms;
	/** @type {Array<any>} */
	coins;
	/** @type {Array<any>} */
	catapultas;
	/** @type {Array<any>} */
	revivingPods;
	/** @type {Array<any>} */
	tutorials;

	/* START-USER-CODE */






	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
