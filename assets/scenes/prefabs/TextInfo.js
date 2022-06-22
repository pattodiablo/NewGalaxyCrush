
// You can write more code here

/* START OF COMPILED CODE */

class TextInfo extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "textInfo", frame);

		this.setOrigin(0, 0);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}

	/** @type {string} */
	textToDisplay = "Save Sput hurry...";
	/** @type {boolean} */
	activateLater = true;

	/* START-USER-CODE */

	create(){
		if(!this.activateLater){
			this.scene.createTextBox(this.x,this.y, this.textToDisplay);
			
		}	
		this.visible=false;
	}

	dispText(texto) {
		this.scene.createTextBox(this.x,this.y, texto);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
