
// You can write more code here

/* START OF COMPILED CODE */

class EggBomb extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "eggBomb", frame);
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

		create(){

			this.isBossShot=true; //fix para que cuando supa haga drop no trate de eliminar este objeto

			this.body.gravity.y = 100;
			this.initColliders();

			
		
		}

	

		
		initColliders(){

			this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.playerhurt,false,this.scene.player);
			this.scene.physics.add.collider(this.scene.layer, this, this.destroyEgg ,false,this);

		}

		destroyEgg(layer,Egg){

			this.play("supa/jetPack", true);

					// explotion
					const explotion = new Explotion(this.scene, this.x, this.y);
					this.scene.add.existing(explotion);		
					// explotion (prefab fields)
					explotion.emit("prefab-awake");
			this.scene.eggbomb_explotion_01.play();
			this.destroy();
			
		}
		
		update(){
			
		
		}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
