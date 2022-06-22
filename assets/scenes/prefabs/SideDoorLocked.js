
// You can write more code here

/* START OF COMPILED CODE */

class SideDoorLocked extends Phaser.GameObjects.Sprite {
	
	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "propsNew", frame !== undefined && frame !== null ? frame : "sideDoor instance 10000");
		
		this.tintTopLeft = 15612474;
		this.tintTopRight = 15347503;
		this.tintBottomLeft = 16218746;
		this.tintBottomRight = 16490041;
		
		// this (components)
		new Physics(this);
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {string} */
	LockedBy = "1";
	/** @type {string} */
	doorID = "1";
	
	/* START-USER-CODE */

		create(){

			this.initColliders();
			this.body.immovable = true;
			this.isopen = false;
			this.isLocked = true;
			this.scene.sideDoors.push(this);
			
		}

		initColliders(){

			this.scene.physics.add.collider(this.scene.player, this, this.collidingDoor,false,this.scene.player);
			this.scene.physics.add.collider(this.scene.enemies, this, this.collidingDoor);
		}

		collidingDoor(player,door){

			console.log("no puede pasar")
		}
		

		checkDitance() {

			this.distanceToPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);
	
			if(this.distanceToPlayer<120 && this.scene.player.y < this.y + 70 && this.scene.player.y > this.y - 70 && !this.isLocked){

				if(!this.isopen){
				
					this.openDoor = this.play("sideDoorOpen", true);
					this.isopen=true;	
					this.openDoor.on('animationcomplete', function(){
					
						this.body.enable=false;
				
					}, this);


				
				}
			
			}else{

				
				if(this.isopen){
					this.closeDoor = this.playReverse("sideDoorClosed", true);
					this.isopen=false;
					this.closeDoor.on('animationcomplete', function(){
					
						this.body.enable=true;
				
					}, this);
				
				}

			}
		}


		update(){
			this.checkDitance();
			
		}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
