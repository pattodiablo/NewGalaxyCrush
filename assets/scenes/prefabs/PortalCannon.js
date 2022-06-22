
// You can write more code here

/* START OF COMPILED CODE */

class PortalCannon extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "targetRing", frame);

		this.scaleX = 0.7;
		this.scaleY = 0.7;
		this.tintBottomLeft = 16700885;

		// this (components)
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/** @type {boolean} */
	IsFirstCannon = false;

	/* START-USER-CODE */

	create(){

		this.isRotationActive =  false;

		this.on('pointerdown', function (pointer) {

			this.setTint(0xff0000);

		if(!this.isRotationActive){ //toogle rotation

			this.ring.x = this.x;
			this.ring.y = this.y;
			this.ring.visible=true;	
			this.isRotationActive =  true;

		}else if(this.isRotationActive){

			this.ring.x = this.x;
			this.ring.y = this.y;
			this.ring.visible=false;	
			this.isRotationActive =  false;

		}

		this.scene.coinText.text = this.scene.game.playerData.coins;





		});

			if(this.IsFirstCannon){
					var timeline = this.scene.tweens.createTimeline();
					timeline.add({
						targets: this,
						scale: 0.8,
						duration: 300,
						ease: 'Linear',
						yoyo: true,
						repeat: -1

					});

					timeline.play();
			}
	

		this.on('pointerout', function (pointer) {

			this.clearTint();

		});

		this.on('pointerup', function (pointer) {



			this.clearTint();

		});

			// ring
			const ring = new Ring(this.scene, this.x, this.y);
			this.scene.add.existing(ring);

			// ring (prefab fields)
			ring.emit("prefab-awake");
			this.ring =  ring;
			this.ring.visible=false;
			this.ring.parentCanon = this;	

			this.body.innmovale = true;
			this.scene.portalCannons.push(this);
	}



	update(){

		this.distanceToPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
		
		if(this.IsFirstCannon){
			if(this.distanceToPlayer <=150){

				this.scene.player.isCannonNearby = true;
	
	
			}
		}
		

		this.setInteractive();
		this.scene.input.setDraggable(this);
		this.scene.input.on('drag', function (pointer, cannonObj, dragX, dragY) {

			if(cannonObj.texture.key == "portelCannon"){

				cannonObj.scene.player.isCannonPositioned = true;
				cannonObj.ring.visible=false;	
				cannonObj.isRotationActive =  false;
				cannonObj.scene.player.body.enable=false;
				cannonObj.scene.player.alpha = 0.5;
				//cannonObj.x = dragX;
				//cannonObj.y = dragY;

			}



		});

		this.scene.input.on('dragend', function (pointer, cannonObj, dragX, dragY) {

			if(cannonObj.texture.key == "portelCannon"){

					var timer = cannonObj.scene.time.addEvent({
				delay: 500,                // ms
				callback: function(){
					cannonObj.scene.player.isCannonPositioned = false;	
					cannonObj.scene.player.alpha = 1;
					cannonObj.scene.player.body.enable=true;
				},
				//args: [],
				callbackScope: this,
				loop: false
			});
			}






		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
