
// You can write more code here

/* START OF COMPILED CODE */

class Ring extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// ring
		const ring = scene.add.sprite(0, 0, "ring");
		this.add(ring);
		
		// knobCannon
		const knobCannon = scene.add.sprite(0, 0, "knobCannon");
		this.add(knobCannon);
		
		this.ring = ring;
		this.knobCannon = knobCannon;
		this.knobCannon.ring = ring;
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.update, this);
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	ring;
	/** @type {Phaser.GameObjects.Sprite} */
	knobCannon;
	
	/* START-USER-CODE */

	create(){

		this.knobCannon.setInteractive();

	
	}

	update(){
		this.scene.input.setDraggable(this.knobCannon);

		this.scene.input.on('drag', function (pointer, ringObjt, dragX, dragY) {

			if(ringObjt.texture.key == "knobCannon"){

				ringObjt.x = dragX;
				ringObjt.y = dragY;
				this.rad = Phaser.Math.Angle.Between(ringObjt.x, ringObjt.y, ringObjt.ring.x, ringObjt.ring.y);
				this.deg = Phaser.Math.RadToDeg(this.rad);


				ringObjt.ring.angle = this.deg+90;
				ringObjt.parentContainer.parentCanon.angle = this.deg+90;
				ringObjt.scene.player.isCannonPositioned = true;
				ringObjt.scene.player.body.enable=false;
				ringObjt.scene.player.alpha = 0.5;
				ringObjt.scene.player.isCannonPositioned = true;	

			}
	

			});

			this.scene.input.on('dragend', function (pointer, ringObjt, dragX, dragY) {
				if(ringObjt.texture.key == "knobCannon"){
					ringObjt.scene.player.isCannonPositioned = false;	
					ringObjt.parentContainer.visible=false;
					ringObjt.scene.player.alpha = 1;
					ringObjt.scene.player.body.enable=true;
					ringObjt.scene.player.isCannonPositioned = false;	
				}

			});	

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
