
// You can write more code here

/* START OF COMPILED CODE */

class StarEarn extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// star
		const star = scene.add.sprite(0, 0, "star");
		star.alpha = 0.3;
		star.alphaTopLeft = 0.3;
		star.alphaTopRight = 0.3;
		star.alphaBottomLeft = 0.3;
		star.alphaBottomRight = 0.3;
		this.add(star);
		
		// starOn
		const starOn = scene.add.sprite(0, 0, "star");
		starOn.alpha = 0;
		starOn.alphaTopLeft = 0;
		starOn.alphaTopRight = 0;
		starOn.alphaBottomLeft = 0;
		starOn.alphaBottomRight = 0;
		this.add(starOn);
		
		this.starOn = starOn;
		
		/* START-USER-CTR-CODE */
	
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	starOn;
	
	/* START-USER-CODE */

	tunrOnStar(){

		var showStar = this.scene.tweens.createTimeline();
		showStar.add({
			targets: this.starOn,
			alpha: 0,
			duration: 1000,
			callbackScope: this,
			ease: 'Linear',
	
			});

		showStar.add({
		targets: this.starOn,
		alpha: 1,
		rotation: Phaser.Math.DegToRad(260),
		scale: 1.1,
		angle: 360,
		callbackScope: this,
		ease: 'Bounce',

		});
		showStar.add({
			targets: this.starOn,
			scale: 1,
			duration: 200,
			callbackScope: this,
			ease: 'Linear',
	
			});
	

	
		showStar.play();



	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
