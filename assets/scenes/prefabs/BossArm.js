
// You can write more code here

/* START OF COMPILED CODE */

class BossArm extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "Sector3", frame);

		this.scaleX = -1;

		// this (components)
		new Physics(this);
		const thisPhysicsBody = new PhysicsBody(this);
		thisPhysicsBody.bodyWidth = 60;

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
	
		/* END-USER-CTR-CODE */
	}

	/** @type {boolean} */
	brazoOpuesto = false;

	/* START-USER-CODE */

	create(){

		this.Health = 10;
		this.isDestroyed = false;
		this.initColliders();
	
		this.body.immovable = true;

		if(!this.brazoOpuesto){
		
			this.body.setOffset(230,0);
			this.direction=1;

		}else{
			this.direction=-1;
		}


	}

	initColliders(){

		this.scene.physics.add.collider(this.scene.player, this, this.killPlayer,null,this);	

	}

	destroyPart(){

		this.isDestroyed = true;
		this.setTexture("damagedBossArm")
		this.swingBrazo = this.scene.tweens.createTimeline();
		this.swingBrazo.add({
			targets: this,
			rotation: this.rotation-0.5*this.direction,
			duration: 600,
			ease: 'Linear',

		});

		this.swingBrazo.play();


		this.body.enable=false;
		this.ExplodingTimer = this.scene.time.addEvent({
		delay: 200,                // ms
		callback: function(){
			if(!this.brazoOpuesto){
				this.randomXPos = Math.random()*this.width/2;
				
			}else{
				this.randomXPos = Math.random()*this.width/2+this.x;
			
			}
				this.randomYPos = 400;	
			const explotion = new Explotion(this.scene, this.randomXPos, this.randomYPos );
			this.scene.add.existing(explotion);		
			explotion.emit("prefab-awake");
			this.scene.finalboss_minedestroy_01.play();
		},
		//args: [],
		callbackScope: this,
		repeat: 12,
		
	});



	}

	killPlayer(){
		
		if(!this.body.touching.up){
			this.scene.player.playerhurt();
		
		}
	
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
