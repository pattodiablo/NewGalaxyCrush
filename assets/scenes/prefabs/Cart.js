
// You can write more code here

/* START OF COMPILED CODE */

class Cart extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "cart", frame !== undefined && frame !== null ? frame : "cart instance 10000");
		
		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyY = 5;
		thisPhysicsBody.bodyHeight = 55;
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		this.body.immovable = true;

		this.body.gravity.y = 980;
		this.body.bounce.x=0.2;
		this.body.setFrictionX(2);
		this.playerLocked = true;

		this.scene.physics.add.collider(this.scene.enemies, this);
		this.scene.physics.add.collider(this.scene.player, this, this.onCart);
		this.scene.physics.add.collider(this, this.scene.layer, null, null, this);
	}

	onCart(player,cart){
		player.overPlatform = true;
		player.wasOnPlatform = true;
		if(cart.body.touching.left ||cart.body.touching.right ){
			cart.body.immovable = false;
		}else{
			cart.body.immovable = true;
		}
	
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
