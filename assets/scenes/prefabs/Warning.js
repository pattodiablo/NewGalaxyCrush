
// You can write more code here

/* START OF COMPILED CODE */

class Warning extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		this.scaleX = 0.8;
		this.scaleY = 0.8;
		
		// energyPanel
		const energyPanel = scene.add.sprite(0, 34, "energyPanel");
		this.add(energyPanel);
		
		// yesBtn
		const yesBtn = scene.add.sprite(-4, 41, "yesBtn");
		this.add(yesBtn);
		
		// noBtn
		const noBtn = scene.add.sprite(-1, 110, "noBtn");
		this.add(noBtn);
		
		// text
		const text = scene.add.text(-102, -56, "", {});
		text.text = "Are you sure?\nAll data will be lost";
		text.setStyle({"align":"center"});
		this.add(text);
		
		// energyPanel (components)
		new FixedToCamera(energyPanel);
		energyPanel.emit("components-awake");
		
		// yesBtn (components)
		new FixedToCamera(yesBtn);
		yesBtn.emit("components-awake");
		
		// noBtn (components)
		new FixedToCamera(noBtn);
		noBtn.emit("components-awake");
		
		// text (components)
		new FixedToCamera(text);
		text.emit("components-awake");
		
		this.yesBtn = yesBtn;
		this.noBtn = noBtn;
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	yesBtn;
	/** @type {Phaser.GameObjects.Sprite} */
	noBtn;
	
	/* START-USER-CODE */

	create() {
		this.setDepth(11);
		this.originalY = this.y;


		this.yesBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {

			this.scene.game.playerData = {
				levelsPassed: [],
				gotCard: false,
				coins: coins,
				level: "NewLevel0", 
				life: 5,
				maxLife: 5,
				isMusicMuted: false,
				doubleJump: isDoubleJump,
				isFxMuted: false,
				timesDead: 0
			};

			updatear(this.scene.game.playerData);

			location.reload();

		});

		this.noBtn.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {

		this.parentContainer.close();

		});



	}



	open() {
		this.scene.tweens.add({
			targets: this,
			y: this.scene.cameras.main.centerY,
			ease: 'Quadratic.Out',
			duration: 250,

		});

	}


	close() {
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
