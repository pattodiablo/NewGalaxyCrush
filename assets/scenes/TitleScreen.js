
// You can write more code here

/* START OF COMPILED CODE */

class TitleScreen extends Phaser.Scene {

	constructor() {
		super("TitleScreen");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// red
		const red = this.add.sprite(0, 0, "red");
		red.setOrigin(0, 0);

		// playBtn
		const playBtn = this.add.image(161, 402, "playBtn");
		playBtn.scaleX = 0.10;
		playBtn.scaleY = 0.10;

		// titleBg
		const titleBg = this.add.sprite(312, 231, "title");

		this.red = red;
		this.playBtn = playBtn;
		this.titleBg = titleBg;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	red;
	/** @type {Phaser.GameObjects.Image} */
	playBtn;
	/** @type {Phaser.GameObjects.Sprite} */
	titleBg;

	/* START-USER-CODE */

	create() {

		this.GGJ2022_ost03 = this.sound.add('GGJ2022_ost03');
		this.GGJ2022_ost03.loop = true;
		this.GGJ2022_ost03.play();

		this.editorCreate();


		this.red.displayWidth=this.cameras.main.width;
		this.red.displayHeight=this.cameras.main.height;

		this.playBtn.x=  this.cameras.main.centerX;
		this.playBtn.y= this.cameras.main.centerY+200;

		this.titleBg.x=  this.cameras.main.centerX;
		this.titleBg.y= this.cameras.main.centerY;

		this.input.keyboard.on("keydown_ENTER", this.enterPressed, this);
		this.input.on("pointerdown", this.enterPressed, this);

		this.crearParticulas();

		var logointro = this.tweens.createTimeline();
		logointro.add({
			targets: this.playBtn,
			scale: 1.2,
			duration: 100,
			ease: 'Linear',
			repeat: 0

		});
		logointro.add({
			targets: this.playBtn,
			scale: 1,
			y:this.playBtn.y,
			duration: 100,
			ease: 'Linear',
			repeat: 0

		});
		logointro.add({
			targets: this.playBtn,
			y:this.playBtn.y-=10,
			duration: 2500,
			ease: 'Linear',
			repeat: -1,
			yoyo:true


		});


		logointro.play();


		var supaTitle = this.tweens.createTimeline();
		supaTitle.add({
			targets: this.supaTitle,
			scale: 1.2,
			duration: 100,
			ease: 'Linear',
			repeat: 0,
			delay:200

		});
		supaTitle.add({
			targets: this.supaTitle,
			scale: 1,
			duration: 100,
			ease: 'Linear',
			repeat: 0,


		});
		supaTitle.add({
			targets: this.supaTitle,
			scale: 1.1,
			duration: 2500,
			ease: 'Linear',
			repeat: -1,
			yoyo:true


		});


		supaTitle.play();


		var PlayBtn = this.tweens.createTimeline();
		PlayBtn.add({
			targets: this.playBtn,
			scale: 1.2,
			duration: 100,
			ease: 'Linear',
			repeat: 0,
			delay:300

		});
		PlayBtn.add({
			targets: this.playBtn,
			scale: 1,
			duration: 100,
			ease: 'Linear',
			repeat: 0

		});

		PlayBtn.add({
			targets: this.playBtn,
			scale: 1.2,
			duration: 500,
			ease: 'Linear',
			repeat: -1,
			yoyo:true


		});



		PlayBtn.play();



	}


	crearParticulas() {

		this.particles3 = this.add.particles('inkDot');

		this.particles3.createEmitter({

			blendMode: 'MULTIPLY',

			quantity: 10,
			frequency: 200,
			scale: {start: 0, end: 1.5},
			rotate: { min: 0, max: 360 },
			angle: { min: 0, max: 360 },
			speed: 200	,
			gravityY: 0,
			x:this.cameras.main.centerX,
			y:this.cameras.main.centerY,
			lifespan: { min: 1000, max: 4000 },
			start: true
		});


		this.particles3.setDepth(1);
		this.playBtn.setDepth(2);


	}



	enterPressed() {
	//	this.scene.start("IntroMovie");
		this.GGJ2022_ost03.stop();
		this.scene.start("NewLevel0");

		//this.scene.start(this.game.playerData.level);



	}



	update() {

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
