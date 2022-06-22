
// You can write more code here

/* START OF COMPILED CODE */

class CloseBtn extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "closeBtn", frame);
		
		/* START-USER-CTR-CODE */
		new FixedToCamera(this);
		this.scene.events.on("create", () => this.create());
	
		/* END-USER-CTR-CODE */
	}
	
	/** @type {number} */
	itemValue = 10;
	
	/* START-USER-CODE */

	create(){
		
		this.envi_button_01 = this.scene.sound.add('envi_button_01');
		this.envi_button_01.loop = false;
		this.scene.fxcontainer.push(this.envi_button_01);
		
			this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			
					this.parentContainer.close();
			
			this.envi_button_01.play();
			});

	}

	activateBtn(){
	
	this.isActive=true;
	this.scene.tweens.add({
		targets: this,
		y: 860,
		ease: 'Quadratic.Out',
		duration: 1000,
		
	});
	
	}

	deactivateBtn(){

		this.isActive=false;
		this.scene.tweens.add({
			targets: this,
			y: this.scene.layer.height + 100,
			ease: 'Quadratic.Out',
			duration: 1000,
			
		});
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
