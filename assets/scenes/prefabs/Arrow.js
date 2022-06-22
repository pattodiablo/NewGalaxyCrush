
// You can write more code here

/* START OF COMPILED CODE */

class Arrow extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "arrow", frame);
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.isNewArrow = true;
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
 
		this.body.setCircle(30,-20,68);
		this.scene.physics.add.overlap(this.scene.enemies, this, this.destroyEnemy,false,this);	
		//this.arrowPointer = this.scene.add.sprite(this.x, this.y-60,"");
		//this.arrowPointer.texture = Phaser.Cache.DEFAULT;
	}

	destroyEnemy(enemy,arrow){
		if(this.isNewArrow){
			console.log("destruir enemigo");
			enemy.destroySequence();
			enemy.body.enable=false;
			this.isNewArrow=false;
		}


	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
