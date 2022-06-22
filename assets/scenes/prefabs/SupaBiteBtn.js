
// You can write more code here

/* START OF COMPILED CODE */

class SupaBiteBtn extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "Symbol 11 instance 10000");
		
		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "readyCanonButton";
		new FixedToCamera(this);
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
	
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){


		this.isActive=true;
		this.OriginalX = this.x;
		this.OriginalY = this.y;
		this.isOnScreen=false;
		
		this.setInteractive().on('pointerdown', function(pointer, localX, localY, event){

				if(this.isActive){
				
					this.isActive=false;
					this.scene.pwrup_activate_03.play();
					this.scene.player.wannaBite = true;
					
					this.tint = 0x383838;

					var entrandoTimeline = this.scene.tweens.createTimeline();
					entrandoTimeline.add({
						targets: this,
						y: this.OriginalY-20,
						ease: 'Quadratic.Out',
						duration: 200,
					});

					entrandoTimeline.add({
						targets: this,
						y: this.scene.cameras.main.height + 100,
						ease: 'Quadratic.Out',
						duration: 1000,
					});

					entrandoTimeline.play();

					this.reloadTimer = this.scene.time.addEvent({
						delay: 3000,                // ms
						callback: function(){

							this.isActive=true;
							this.tint = 0xffffff;
								if(!this.scene.player.isBiting){
								var readyTimeline = this.scene.tweens.createTimeline();
														
															readyTimeline.add({
																targets: this,
																y: this.scene.cameras.main.height-100,
																ease: 'Quadratic.Out',
																duration: 1000,
															});

															readyTimeline.play();

															this.reloadTimer.destroy();
								}
							

						},
						//args: [],
						callbackScope: this,
						loop: true
					});


				}
			
			
		

		
		});

	}

	activateBtn(){
		
		this.isActive=true;
	if(!this.isOnScreen && !this.scene.player.isBiting ){
	
		this.scene.tweens.add({
			targets: this,
			y: this.scene.cameras.main.height-100,
			ease: 'Quadratic.Out',
			duration: 300,
		});
		this.isOnScreen=true;
	}

	}

	deactivateBtn(){

		this.isActive=false;
		this.scene.tweens.add({
			targets: this,
			y:  this.scene.cameras.main.height+100,
			ease: 'Quadratic.Out',
			duration: 300,
		});
		this.isOnScreen=false;
		
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
