
// You can write more code here

/* START OF COMPILED CODE */

class MenuPanel extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		
		// energyPanel
		const energyPanel = scene.add.sprite(0, 34, "energyPanel");
		this.add(energyPanel);
		
		// musicBtn
		const musicBtn = scene.add.sprite(0, -41, "musicBtn");
		this.add(musicBtn);
		
		// fxBtn
		const fxBtn = scene.add.sprite(1, 28, "fxBtn");
		this.add(fxBtn);
		
		// howToBtn
		const howToBtn = scene.add.sprite(1, 104, "howToBtn");
		this.add(howToBtn);
		
		// energyPanel (components)
		new FixedToCamera(energyPanel);
		energyPanel.emit("components-awake");
		
		// musicBtn (components)
		new FixedToCamera(musicBtn);
		musicBtn.emit("components-awake");
		
		// fxBtn (components)
		new FixedToCamera(fxBtn);
		fxBtn.emit("components-awake");
		
		// howToBtn (components)
		new FixedToCamera(howToBtn);
		howToBtn.emit("components-awake");
		
		this.musicBtn = musicBtn;
		this.fxBtn = fxBtn;
		this.howToBtn = howToBtn;
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	musicBtn;
	/** @type {Phaser.GameObjects.Sprite} */
	fxBtn;
	/** @type {Phaser.GameObjects.Sprite} */
	howToBtn;
	
	/* START-USER-CODE */

	create() {
		this.setDepth(11);
		this.originalY = this.y;
		this.isMusicEnabled = true;
		this.isFxEnabled = true;
		this.isWarningOpen = false;


		this.musicBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {

			this.parentContainer.toogleMusic();

		});

		this.fxBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {

			this.parentContainer.toogleFx();

		});


		this.howToBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
			if(!this.isWarningOpen){
				this.scene.Warning.open();
				this.isWarningOpen = true;

			}else{
				this.scene.Warning.close();
				this.isWarningOpen = false;
			}



		});


	}


	toogleMusic() {

		if (!this.scene.game.playerData.isMusicMuted) {
			this.scene.disableMusic();
			this.musicBtn.setTint(0x6d6d6d);
			this.scene.game.playerData.isMusicMuted = true;
		} else {

			this.scene.enableMusic();
			this.musicBtn.setTint(0xffffff);
			this.scene.game.playerData.isMusicMuted = false;
		}

	}


	toogleFx() {

		if (!this.scene.game.playerData.isFxMuted) {
			this.scene.disableFx();
			this.fxBtn.setTint(0x6d6d6d);
			this.scene.game.playerData.isFxMuted = true;
		} else {

			this.scene.enableFx();
			this.fxBtn.setTint(0xffffff);
			this.scene.game.playerData.isFxMuted = false;
		}

	}


	open() {
		this.scene.player.body.enable = false;
		this.scene.tweens.add({
			targets: this,
			y: this.scene.cameras.main.centerY,
			ease: 'Quadratic.Out',
			duration: 250,

		});

	}


	close() {
		this.scene.player.body.enable = true;
		this.scene.tweens.add({
			targets: this,
			y: this.originalY,
			ease: 'Quadratic.Out',
			duration: 250,
			callbackScope: this,
			onComplete: function () {

			}
		});



	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
