
// You can write more code here

/* START OF COMPILED CODE */

class ProxySpyke extends Phaser.GameObjects.Sprite {

	constructor(scene, x, y, texture, frame) {
		super(scene, x, y, texture || "spike", frame !== undefined && frame !== null ? frame : "SpikeOff0000");

		// this (components)
		new Physics(this);
		const thisStartAnimation = new StartAnimation(this);
		thisStartAnimation.animationKey = "SpikeOff";

		/* START-USER-CTR-CODE */
		this.createEvent = this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		this.updateEvent = this.scene.events.on("update", () => this.update());
		/* END-USER-CTR-CODE */
	}

	/* START-USER-CODE */

	create() {

		this.isBossShot=true; //fix para que cuando supa haga drop no trate de eliminar este objeto

		this.initColliders();
		this.body.enable = false;
		this.body.gravity.y = 200;
		this.distanceToPlayer = 0;
		this.originSpikeY = this.y;
		this.bodyOriginSpikeY = this.body.y;
		this.isArmed = true;
		this.isLaunched = false;


	}



	initColliders() {

		this.scene.physics.add.overlap(this.scene.player, this, this.scene.player.playerhurt, false, this.scene.player);
		
	}

	checkDitance() {

		this.distanceToPlayer = Phaser.Math.Distance.Between(this.scene.player.x, this.scene.player.y, this.x, this.y);

		if (this.isLaunched) {
			this.play("SpikeOn", true);
			
			
		} else {
			if (this.distanceToPlayer <= 70) {
				if (this.isArmed) {
					this.body.enable = true;
					this.isArmed = false;

					this.isLaunched = true;
					this.scene.envi_proxyspike_01.play();
				}

			} else if (this.distanceToPlayer <= 100) {
				this.play("SpikeAlert", true);
			}
			else if (this.distanceToPlayer > 100) {
				this.play("SpikeAlert", false);
				this.isArmed = true;
			}
		}




	}

	cehckIfDestroy() {

		if (this.y >= this.scene.layer.height + 100) {


			this.body.velocity.y = 0;
			this.body.enable = false;
			this.visible = false;

			var realoadTime = this.scene.time.addEvent({
				delay: 2000,                // ms
				callback: function () {
					this.visible = true;
					this.y = this.originSpikeY;
					this.isLaunched = false;
					//	this.body.y = this.bodyoriginSpikeY;

					var armedTime = this.scene.time.addEvent({
						delay: 5000,                // ms
						callback: function () {
							this.isArmed = true;

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


		}

	}
	update() {
		this.checkDitance();
		this.cehckIfDestroy();
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
