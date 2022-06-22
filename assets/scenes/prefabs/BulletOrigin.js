
// You can write more code here

/* START OF COMPILED CODE */

class BulletOrigin extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x ?? 0, y ?? 0, texture || "black", frame);

		this.scaleX = 0.5;
		this.scaleY = 0.5;

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.scene.events.on("update", () => this.update())
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create(){
	
		this.visible=false;

		this.scene.input.on('pointerdown', function (pointer) {

	
			const bullet = new PlayerBullet(this.scene,this.x, this.y);

			if(!this.scene.player.isRedFireActive){

				bullet.isRedBullet=false;
				this.scene.GGJ2022_laser01.play();
			}

			this.scene.add.existing(bullet);
			
			this.scene.playerBullets.push(bullet);
			this.scene.GGJ2022_laser02.play();

			const hit10004 = new hit1(this.scene,this.x, this.y);
			this.scene.add.existing(hit10004);

		}, this);

		
	


	}

	getXposition(){
	
		return this.x;
	}

	
	getYposition(){
		return this.y;
	}


	update(){
		

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
