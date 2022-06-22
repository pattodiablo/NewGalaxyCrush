
// You can write more code here

/* START OF COMPILED CODE */

class EnemyCreator extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		// enemyCreator
		const enemyCreator = scene.add.sprite(0, 0, "propsNew", "enemyCreator instance 10000");
		this.add(enemyCreator);
		
		this.enemyCreator = enemyCreator;
		
		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Sprite} */
	enemyCreator;
	/** @type {number} */
	creationTime = 5000;
	/** @type {string} */
	enemyID = "";
	/** @type {string} */
	PodID = "pod1";
	
	/* START-USER-CODE */

	create(){
		//FX
	

		
	}

	revivir(enemy){

		

		var creationTimer = this.scene.time.addEvent({
			delay: this.creationTime,                // ms
			callback: function(){

				this.envi_monsterspawn01Available = this.scene.sound.get("envi_monsterspawn01"); 
									if(this.envi_monsterspawn01Available){
										this.scene.envi_monsterspawn01.play();
									}


			
				
				var delayAnimation = this.scene.time.addEvent({
					delay: 1490,                // ms
					callback: function(){
						this.openHatch = this.enemyCreator.play("enemyBorn",true);
						this.openHatch.once('animationcomplete', () => {

							enemy.visible=true;
							enemy.body.enable = true;
							enemy.createCoins();
							enemy.initMovement();
							this.enemyCreator.playReverse("enemyBorn",true);

							});
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

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
