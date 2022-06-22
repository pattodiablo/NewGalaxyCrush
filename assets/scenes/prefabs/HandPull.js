
// You can write more code here

/* START OF COMPILED CODE */

class HandPull extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "hand", frame);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		var handAnim = this.scene.tweens.createTimeline();
		handAnim.add({
			targets: this,
			scale:0.1,
			duration: 50,
			ease: 'Linear',
			repeat: 0,
		

			});
			handAnim.add({
				targets: this,
				scale:1.1,
				duration: 50,
				ease: 'Linear',
				repeat: 0,
			
	
				});
			
				handAnim.add({
					targets: this,
					scale:0.7,
					duration: 50,
					ease: 'Linear',
					repeat: 0,
				
		
					});

					handAnim.add({
						targets: this,
						scale:0.7,
						duration: 500,
						ease: 'Linear',
						repeat: 0,
					
			
						});

						handAnim.add({
							targets: this,
							x:this.x-100,
							y:this.y+100,
							duration: 500,
							ease: 'Linear',
							repeat: 2,
							yoyo:true
						
				
							});
							handAnim.add({
								targets: this,
								alpha:0,
								duration: 500,
								ease: 'Linear',
								repeat: 0,
								callbackScope: this,
								onComplete: function () {
									this.destroy();
								}
					
								});

			handAnim.play();
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
