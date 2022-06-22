
// You can write more code here

/* START OF COMPILED CODE */

class EnemyBarrel extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "enemyCreator instance 10000");
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		
		this.body.immovable = true;
		this.scene.physics.add.collider(this.scene.player, this);	
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
