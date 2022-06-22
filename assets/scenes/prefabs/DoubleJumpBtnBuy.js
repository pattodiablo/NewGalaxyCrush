
// You can write more code here

/* START OF COMPILED CODE */

class DoubleJumpBtnBuy extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "Symbol 31 instance 10000");
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	itemValue = 10;
	
	/* START-USER-CODE */

	create(){
		//this.envi_button_01 = this.scene.sound.add('envi_button_01');
		//this.envi_button_01.loop = false;

		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
		console.log('apachurre dj');
		const saldo = this.parentContainer.comprarDJump(this.itemValue);
		
		//this.envi_button_01.play();
		
	});
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
