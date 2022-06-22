
// You can write more code here

/* START OF COMPILED CODE */

class FuelBar extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
	
		
		// lifeBarfillBg
		const lifeBarfillBg = scene.add.image(90, -8, "lifeBarfillBg");
		this.add(lifeBarfillBg);
		
		// lifeBarfill
		const lifeBarfill = scene.add.image(17, -9, "lifeBarfill");
		lifeBarfill.setOrigin(0, 0.5);
		this.add(lifeBarfill);
		
		// fuelBarFrame
		const fuelBarFrame = scene.add.sprite(90, -9, "fuelBarFrame");
		this.add(fuelBarFrame);
		
		this.lifeBarfill = lifeBarfill;
		
		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Image} */
	lifeBarfill;
	
	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
