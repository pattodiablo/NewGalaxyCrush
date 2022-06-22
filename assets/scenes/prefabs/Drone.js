
// You can write more code here

/* START OF COMPILED CODE */

class Drone extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 2, y ?? 2, texture || "drone", frame ?? "idle instance 10000");

		// this (components)
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "idle";
		new Physics(this);

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

		create(){

		this.isReady = false;
		this.isFiring = false;
			
		}

		checkDitance() {

			this.distanceToPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
	
		
				if (this.distanceToPlayer <= 300) {
					if(this.x>this.scene.player.x){
						this.flipX=false;
					}else{

						this.flipX=true;
					}

				if(this.distanceToPlayer <= 180 && this.y<this.scene.player.y){

					if(!this.isReady){
					
										
						this.Reloadtimer = this.scene.time.addEvent({
							delay: 2000,                // ms
							callback: function(){
							
								
										this.readyAnimation = this.play("droneReady", true);
									this.isReady = false;

									this.wdrone_lock_01Available = this.scene.sound.get("wdrone_lock_01"); 
									if(this.wdrone_lock_01Available){
										this.scene.wdrone_lock_01.play();
									}
										
									this.fireTimer = this.scene.time.addEvent({
										delay: 1000,                // ms
										callback: function(){
											this.readyAnimation = this.play("droneFire", true);
											const energyBullet0000 = new DroneShot(this.scene, this.x, this.y);
										
											this.wdrone_shot_01Available = this.scene.sound.get("wdrone_shot_01"); 
											if(this.wdrone_shot_01Available){
												this.scene.wdrone_shot_01.play();
											}
											
										
								
											this.scene.add.existing(energyBullet0000);
											

										},
										//args: [],
										callbackScope: this,
										loop: false
										
									});
								
								

									

							
								
									
							},
							//args: [],
							callbackScope: this,
							loop: false
						});

						this.isReady = true;
					}
					
				}else{
					this.play("idle", true);
				}	
			}
	
	
	
	
		}

		update(){
			if(this.active){
				this.checkDitance();
			}else{

				this.Reloadtimer.remove();
			}


		}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
