
// You can write more code here

/* START OF COMPILED CODE */

class wallText extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "emptyWall", frame);

		// this (components)
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}

	/** @type {boolean} */
	isActive = true;

	/* START-USER-CODE */

	create(){
		this.initColliders();
		this.body.immovable=true;

		}

		initColliders(){

			this.scene.physics.add.overlap(this.scene.player, this, this.activarProceso,false,this);	

		}

		activarProceso(){
		console.log('overlap')
			if(this.isActive){

					console.log("activar Text");	

				}
				else{
					console.log("desactivar Text");
				}
				this.isActive = false;
			}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
