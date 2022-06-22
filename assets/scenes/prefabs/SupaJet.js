
// You can write more code here

/* START OF COMPILED CODE */

class SupaJet extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "jetpackSuitOffline", frame);
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		
		this.scene.physics.add.overlap(this.scene.player, this, this.getSuit,false,this);	
	}

	getSuit(player,suit){
		
		player.body.velocity.x = 0;
		player.body.velocity.y = 0;
		player.body.setAccelerationX(0);
		player.PowerX = 0;
		player.PowerY = 0;
		player.scene.exitJetPack.visible=true;
		player.activateJetPack();
		suit.visible = false;
		suit.body.enable = false;

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
