
// You can write more code here

/* START OF COMPILED CODE */

class Misile_Vertical extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "misile", frame !== undefined && frame !== null ? frame : "misileOff instance 10000");
		
		this.setOrigin(0.5, 1);
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/* START-USER-CODE */

	create(){
		
		this.velocityY = 3;
		this.origin_misileY = this.y;
		//this.originY = this.y;
		this.angle=-10;
		this.initAnimation();
		this.isAlerting = false;
		this.canlaunch = false;
		
		

		
		if(this.scaleY < 0){
			
			this.body.setOffset(this.height,0);
		}
		

		this.particles = this.scene.add.particles('flares');
	
		this.particles.createEmitter({
			frame:"flare10000",
			scale: { start: 0.4, end: 0.1 },
			blendMode: 'ADD',
			lifespan:300,
			
			follow: this
		});

		this.scene.createMisileAlert(this.x,this);
		this.initColliders();

	
		
	}

	initColliders(){

		this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.dieAnimation,false,this.scene.player);
	}



	initAnimation(){

		var floating = this.scene.tweens.createTimeline();
		floating.add({
		targets: this,
		x: this.x+5,
		angle:10,
		duration: 500,
		ease: 'Phaser.Easing.Bounce.Out',
		loop: true,
		repeat: -1,
		yoyo: true,

		});

	

		floating.play();
	}

	
	update(){

		//lansamiento horizontal
		//if(this.angle = 0){

			if(this.scene.player.x>=this.x-30 && this.scene.player.x<=this.x+30 && !this.canlaunch){
				this.canlaunch = true;
			
			}
	
		
			if(this.canlaunch){
			
				if(this.scaleY>0){
					this.body.velocity.y = -130;
				}else{
					this.body.velocity.y = 130;
				}
			
				this.canlaunch=false;
			}
	
			if(this.scaleY>0){
				if(this.y<=-100){
					this.y = this.origin_misileY;
					this.body.velocity.y = 0;
					if(!this.isAlerting){
						this.scene.createMisileAlert(this.x,this);
						this.isAlerting=true;
						this.canlaunch = true;
					}
				}
	
			}else{
				if(this.y>=this.scene.layer.width+100){
					this.y = this.origin_misileY;
					this.body.velocity.y = 0;
					if(!this.isAlerting){
						this.scene.createMisileAlert(this.x,this);
						this.isAlerting=true;
						this.canlaunch = true;
					}
				}
	
			}
			

		
		
	
	
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
