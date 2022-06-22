
// You can write more code here

/* START OF COMPILED CODE */

class EnergyPanel extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? 0, y ?? -183);

		// energyPanel
		const energyPanel = scene.add.sprite(37, 48, "energyPanel");
		this.add(energyPanel);

		// closeBtn
		const closeBtn = new CloseBtn(scene, 150, -74);
		this.add(closeBtn);

		// heartBtn
		const heartBtn = new HeartBtn(scene, -29, 34);
		heartBtn.scaleX = 0.9164983142977117;
		heartBtn.scaleY = 0.9164983142977117;
		this.add(heartBtn);

		// healthText
		const healthText = scene.add.text(-29, 62, "", {});
		healthText.setOrigin(0.5, 0);
		healthText.text = "10";
		healthText.setStyle({"color":"#f9f9f9ff","fontFamily":"Arial","fontSize":"20px"});
		this.add(healthText);

		// energyRode
		const energyRode = new EnergyRode(scene, -29, -44);
		this.add(energyRode);

		// lifeRode
		const lifeRode = new LifeRode(scene, -29, 114);
		this.add(lifeRode);

		// energyRodeText
		const energyRodeText = scene.add.text(-29, -19, "", {});
		energyRodeText.setOrigin(0.5, 0);
		energyRodeText.text = "10";
		energyRodeText.setStyle({"color":"#f9f9f9ff","fontFamily":"Arial","fontSize":"20px"});
		this.add(energyRodeText);

		// lifeRodeText
		const lifeRodeText = scene.add.text(-29, 140, "", {});
		lifeRodeText.setOrigin(0.5, 0);
		lifeRodeText.text = "10";
		lifeRodeText.setStyle({"color":"#f9f9f9ff","fontFamily":"Arial","fontSize":"20px"});
		this.add(lifeRodeText);

		// explain1
		const explain1 = scene.add.text(0, -36, "", {});
		explain1.text = "Refill Jetpack gas";
		explain1.setStyle({"fontSize":"12px"});
		this.add(explain1);

		// explain1_1
		const explain1_1 = scene.add.text(0, -52, "", {});
		explain1_1.text = "Energy rode";
		explain1_1.setStyle({"fontSize":"12px","fontStyle":"bold"});
		this.add(explain1_1);

		// explain1_1_1
		const explain1_1_1 = scene.add.text(0, 18, "", {});
		explain1_1_1.text = "Life heart";
		explain1_1_1.setStyle({"fontSize":"12px","fontStyle":"bold"});
		this.add(explain1_1_1);

		// explain1_2
		const explain1_2 = scene.add.text(0, 34, "", {});
		explain1_2.text = "Refill one life bar";
		explain1_2.setStyle({"fontSize":"12px"});
		this.add(explain1_2);

		// explain1_1_1_1
		const explain1_1_1_1 = scene.add.text(0, 104, "", {});
		explain1_1_1_1.text = "Life bar";
		explain1_1_1_1.setStyle({"fontSize":"12px","fontStyle":"bold"});
		this.add(explain1_1_1_1);

		// explain1_2_1
		const explain1_2_1 = scene.add.text(0, 120, "", {});
		explain1_2_1.text = "Adds one life bar";
		explain1_2_1.setStyle({"fontSize":"12px"});
		this.add(explain1_2_1);

		// energyRode (prefab fields)
		energyRode.itemValue = 3;

		this.energyPanel = energyPanel;
		this.heartBtn = heartBtn;
		this.healthText = healthText;
		this.energyRode = energyRode;
		this.lifeRode = lifeRode;
		this.energyRodeText = energyRodeText;
		this.lifeRodeText = lifeRodeText;

		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	energyPanel;
	/** @type {HeartBtn} */
	heartBtn;
	/** @type {Phaser.GameObjects.Text} */
	healthText;
	/** @type {EnergyRode} */
	energyRode;
	/** @type {LifeRode} */
	lifeRode;
	/** @type {Phaser.GameObjects.Text} */
	energyRodeText;
	/** @type {Phaser.GameObjects.Text} */
	lifeRodeText;

	/* START-USER-CODE */

	create(){


		this.setDepth(12);
		this.close();

	//	this.doubleJumpText.text =  this.doubleJumpBuy.itemValue;
	//	this.cannonStrikeText.text =  this.biteBtn.itemValue;
		this.healthText.text =  this.heartBtn.itemValue;
		this.energyRodeText.text =  this.energyRode.itemValue;
		this.lifeRodeText.text =  this.lifeRode.itemValue;

		this.x=this.scene.cameras.main.centerX;


	}

	activatebtns(){

		let coinsRemain = this.scene.game.playerData.coins;

		if(coinsRemain<this.heartBtn.itemValue || this.scene.game.playerData.life >= this.scene.game.playerData.maxLife ){

			this.heartBtn.tint = 0x383838;
		}else{
			this.heartBtn.tint = 0xffffff;
		}

		if(coinsRemain<this.lifeRode.itemValue || this.scene.game.playerData.life >= 10 ){

			this.lifeRode.tint = 0x383838;
		}else{
			this.lifeRode.tint = 0xffffff;
		}



		this.largoBarra = this.scene.fuelBarFrame.lifeBarfill.width;
		this.fuelRemain = Math.round(this.largoBarra * this.scene.fuelBarFrame.lifeBarfill.scaleX);
		this.fuelNeeded = 146 - this.fuelRemain;
		if(this.fuelNeeded<=0){
			this.fuelNeeded=0;
		}
		this.energyRodeText.text =  this.energyRode.itemValue*this.fuelNeeded;


		if(coinsRemain<this.energyRode.itemValue || this.fuelRemain >= 146 ){

			this.energyRode.tint = 0x383838;
		}else{
			this.energyRode.tint = 0xffffff;
		}
/*
		if(coinsRemain<this.biteBtn.itemValue  || this.scene.player.supaBiteChances >= 1){
			this.biteBtn.tint = 0x383838;
		}else{
			this.biteBtn.tint = 0xffffff;
		}

		if(coinsRemain<this.doubleJumpBuy.itemValue || this.scene.player.supaDJumps ){
			this.doubleJumpBuy.tint = 0x383838;
		}else{
			this.doubleJumpBuy.tint = 0xffffff;
		}

*/

	}




comprarBite(itemValue){

	let coinsRemain = this.scene.game.playerData.coins;
	if(coinsRemain>=itemValue && this.scene.player.supaBiteChances <1 ){
		this.scene.game.playerData.coins -= itemValue;
		this.scene.game.playerData.gotCannon = true;
		this.scene.player.supaBiteChances++;
		this.scene.cameras.main.flash();

		this.scene.envi_success_03.play();
		this.scene.coinText.text = this.scene.game.playerData.coins;

	}else{
		console.log("no puede comprar nalgas");

		this.scene.cameras.main.shake();
		this.scene.envi_error_01.play();
	}

	this.activatebtns();

}

comprarEnergyRode(itemValue){
	let coinsRemain = this.scene.game.playerData.coins;

	this.largoBarra = this.scene.fuelBarFrame.lifeBarfill.width;
	this.fuelRemain = Math.round(this.largoBarra * this.scene.fuelBarFrame.lifeBarfill.scaleX);


	console.log(itemValue   )
	console.log(this.fuelRemain  )

	if(coinsRemain>=itemValue && this.fuelRemain < 146 ){ //146 es el largo de la barra verde

			this.scene.game.playerData.coins -= itemValue*this.fuelNeeded;
			this.scene.coinText.text = this.scene.game.playerData.coins;
			this.scene.cameras.main.flash();
			this.scene.envi_success_03.play();
			this.scene.lifepanel.calcularBarrasEncendidas();

		this.blinkingBar = this.scene.tweens.createTimeline();
		this.blinkingBar.add({
			targets: this.scene.fuelBarFrame.lifeBarfill,
			alpha: 0.5,
			duration: 100,
			ease: 'Linear',
			repeat: -1,
			yoyo:true

		});

		this.blinkingBar.play();

		this.gasNeeded = 146 - this.fuelRemain;
		console.log("poniendo gasolina " + this.gasNeeded );
		this.count=0;

		this.refilltimer = this.scene.time.addEvent({
			delay: 20,                // ms
			callback: function(){
				if(this.count<=this.gasNeeded){
					this.scene.fuelBarFrame.lifeBarfill.displayWidth +=1
				}else{
					this.refilltimer.remove();
					this.blinkingBar.stop();
					this.activatebtns();
				}

				this.count++;
			},
			//args: [],
			callbackScope: this,
			loop: true
		});



	}
}

comprarLifeRode(itemValue){
	let coinsRemain = this.scene.game.playerData.coins;
	if(coinsRemain>=itemValue &&  this.scene.game.playerData.maxLife<10){
		console.log("aumentando vida");
		console.log(itemValue)
		this.scene.game.playerData.coins -= itemValue;
		this.scene.game.playerData.maxLife++;
		this.scene.cameras.main.flash();
		this.scene.envi_success_03.play();
		this.scene.lifepanel.calcularBarrasEncendidas();
		this.scene.coinText.text = this.scene.game.playerData.coins;
	}else{
		this.scene.cameras.main.shake();
		this.scene.envi_error_01.play();
	}
	this.activatebtns();
}

comprarDJump(itemValue){

	let coinsRemain = this.scene.game.playerData.coins;
	if(coinsRemain>=itemValue &&  !this.scene.player.supaDJumps){
		this.scene.game.playerData.coins -= itemValue;
		this.scene.game.playerData.doubleJump = true;
		this.scene.player.supaDJumps = true;
		this.scene.cameras.main.flash();

		this.scene.envi_success_03.play();
		this.scene.coinText.text = this.scene.game.playerData.coins;
	}else{
		console.log("no puede comprar nalgas");

		this.scene.cameras.main.shake();
		this.scene.envi_error_01.play();
	}
	this.activatebtns();

}

comprarHeart(itemValue){

	let coinsRemain = this.scene.game.playerData.coins;
	if(coinsRemain>=itemValue && this.scene.game.playerData.life < this.scene.game.playerData.maxLife ){
		this.scene.game.playerData.coins -= itemValue;

		this.scene.player.playerLife++
		this.scene.lifepanel.calcularBarrasEncendidas();
		this.scene.cameras.main.flash();

		this.scene.envi_success_03.play();
		this.scene.coinText.text = this.scene.game.playerData.coins;
	}else{
		console.log("no puede comprar nalgas");
		this.scene.cameras.main.shake();
		this.scene.envi_error_01.play();
	}

	this.activatebtns();

}



comprarCannonRelay(itemValue){

	let coinsRemain = this.scene.game.playerData.coins;
	if(coinsRemain>=itemValue){
		this.scene.game.playerData.coins -= itemValue;

		this.scene.player.playerLife++
		this.scene.lifepanel.calcularBarrasEncendidas();
		this.scene.cameras.main.flash();

		this.scene.envi_success_03.play();
		this.scene.coinText.text = this.scene.game.playerData.coins;
	}else{
		console.log("no puede comprar nalgas");
		this.scene.cameras.main.shake();
		this.scene.envi_error_01.play();
	}

	this.activatebtns();

}


	open(){
		this.visible=true;
		this.scene.tweens.add({
			targets: this,
			y:  this.scene.cameras.main.centerY,
			ease: 'Quadratic.Out',
			duration: 300,

		});
		this.activatebtns();
	}	

	close(){

		this.scene.tweens.add({
			targets: this,
			y:  this.scene.cameras.main.height+90,
			ease: 'Quadratic.Out',
			duration: 300,
			callbackScope: this,
			onComplete: function () {
				this.scene.player.exitPod();
				this.visible=false;
			}
		});

		this.scene.player.wannaEnterPod = false;
		this.scene.envi_leavepowerupstation_01.play();

	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
