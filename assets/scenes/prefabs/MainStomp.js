
// You can write more code here

/* START OF COMPILED CODE */

class MainStomp extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "stomper", frame);
		
		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyX = 12;
		thisPhysicsBody.bodyY = 30;
		thisPhysicsBody.bodyWidth = 60;
		thisPhysicsBody.bodyHeight = 12;
		
		/* START-USER-CTR-CODE */
			this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
			//this.scene.events(Phaser.Scenes.Events.UPDATE, this.update, this);
		
			this.retardo = 0; // retardo de accion 
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		
		this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.playerhurt,false,this.scene.player);
		this.body.immovable = true;
		this.isBossShot=true; //fix para que cuando supa haga drop no trate de eliminar este objeto

		//FX
		//this.envi_stomper_01 = this.scene.sound.add('envi_stomper_01');
		//this.envi_stomper_01.loop = false;

		
	}

	setimmovable(){
		this.body.immovable = true;
	}

	iniciarstomp(){

		this.scene.tweens.add({
			targets: this,
			y: this.y + 75,
			duration: 2000,
			//this.envi_stomper_01.play();
			ease: 'Linear',
			yoyo: true,
			delay: this.retardo,
			repeat: -1
			
		});
	}

	update(){
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
