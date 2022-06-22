
// You can write more code here

/* START OF COMPILED CODE */

class MenuBtn extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "menuBtn", frame);
		
		// this (components)
		new FixedToCamera(this);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		this.isOpen = false;
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		this.setDepth(11);
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
			
			if(!this.isOpen){
				this.scene.menuPanel.open();
				this.isOpen = true;

			}else{
				this.scene.menuPanel.close();
				this.isOpen = false;
			}
	
	

	});
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
