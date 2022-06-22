
// You can write more code here

/* START OF COMPILED CODE */

class ExitJetPackBtn extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew2", frame !== undefined && frame !== null ? frame : "JetpackBtn instance 10000");
		
		// this (components)
		new FixedToCamera(this);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){

		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			this.endJetpack();
		
		});

	}

	endJetpack(){
		this.scene.player.isJetPackActive = false;
		this.scene.supaJet.visible = true;
		this.scene.supaJet.body.enable = true;

		this.visible = false;

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
