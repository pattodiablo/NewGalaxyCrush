
// You can write more code here

/* START OF COMPILED CODE */

class EnemyBody extends Phaser.GameObjects.Container {

	constructor(scene, x, y) {
		super(scene, x ?? -17, y ?? -59);

		// EnemyBody
		const enemyBody = scene.add.sprite(17, 59, "sector3");
		this.add(enemyBody);

		// EnemyHead
		const enemyHead = new EnemyHead(scene, 19, -48);
		this.add(enemyHead);

		// LeftArm
		const leftArm = new BossArm(scene, -184, 129);
		this.add(leftArm);

		// RightArm
		const rightArm = new BossArm(scene, 222, 128);
		rightArm.flipX = true;
		rightArm.flipY = false;
		this.add(rightArm);

		// rightArm (prefab fields)
		rightArm.brazoOpuesto = true;

		this.enemyBody = enemyBody;
		this.enemyHead = enemyHead;
		this.leftArm = leftArm;
		this.rightArm = rightArm;

		/* START-USER-CTR-CODE */
		this.createEvent =	this.scene.events.once(Phaser.Scenes.Events.UPDATE, this.create, this);

		/* END-USER-CTR-CODE */
	}

	/** @type {Phaser.GameObjects.Sprite} */
	enemyBody;
	/** @type {EnemyHead} */
	enemyHead;
	/** @type {BossArm} */
	leftArm;
	/** @type {BossArm} */
	rightArm;

	/* START-USER-CODE */

	create(){

		this.originalY = this.y;
		this.turnoSecuencia = 0;
		this.etapa = 0;
		this.LeftArmHealth = 10;
		this.RightArmHealth = 10;
		this.isHeadCracked = false;

		this.iniciarMovimientos();

		this.scene.finalBossActiveParts.push(this.leftArm);
		this.scene.finalBossActiveParts.push(this.rightArm);
	}

	iniciarMovimientos(){


		if(this.etapa==0){
			this.secuenciadeEventos = ['respirar','subir','respirar','bajar','respirar','respirar'];
			this.cualAccion = this.secuenciadeEventos[this.turnoSecuencia];
			
		}

		if(this.etapa ==1){
			if(this.rightArm.isDestroyed && this.leftArm.isDestroyed && !this.isHeadCracked){
				this.scene.cameras.main.shake(500,0.03);
				this.scene.cameras.main.flash();
				this.enemyHead.replaceHead();
				this.enemyHead.canDamage = true;
				this.isHeadCracked = true;
			}
			this.secuenciadeEventos = ['respirar','subir','respirar','meteorito','bajar','respirar'];
			this.cualAccion = this.secuenciadeEventos[this.turnoSecuencia];
		
		}

		if(this.etapa ==2){
			this.secuenciadeEventos = ['respirar','subir','meteorito','bajar'];
			this.cualAccion = this.secuenciadeEventos[this.turnoSecuencia];
		
		}

		this.turnoSecuencia++;
		if(this.turnoSecuencia>this.secuenciadeEventos.length-1){
			this.turnoSecuencia=0;
		}

		switch (this.cualAccion) {
			case 'respirar':
				this.respirar();
				break;

			case 'subir':
				this.Subir();
				break;

			case 'bajar':
				this.Bajar();
				break;

			case 'meteorito':

				this.Meteorito();
				break;


			default:
				this.respirar();
				break;
		}




	}

	prepararBrazoDerecho(){
			if(!this.rightArm.isDestroyed){
					this.swingBrazo = this.scene.tweens.createTimeline();
					this.swingBrazo.add({
						targets: this.rightArm,
						y: this.rightArm.y+10,
						duration: 600,
						ease: 'Linear',
						repeat: 2,
						yoyo:true,
						callbackScope: this,
						onComplete: function () {

							this.punchBrazoDerecho();
							
						}

					});

					this.swingBrazo.play();
					this.scene.finalboss_armhit_01.play();
					
					
			}else{
				this.etapa=1;
				this.iniciarMovimientos();
			}


	}

	prepararBrazoIzquierdo(){
		if(!this.leftArm.isDestroyed){
					this.swingBrazo = this.scene.tweens.createTimeline();
					this.swingBrazo.add({
						targets: this.leftArm,
						y: this.leftArm.y-10,
						duration: 600,
						ease: 'Linear',
						repeat: 2,
						yoyo:true,
						callbackScope: this,
						onComplete: function () {

							this.punchBrazoIzquierdo();

						}

					});

					this.swingBrazo.play();
					this.scene.finalboss_armhit_01.play();
					
					
		}else{
			this.etapa=1;
			this.prepararBrazoDerecho();
		}


	}

	punchBrazoIzquierdo(){

		this.originalLeftX = this.leftArm.x;
		this.originalLeftY = this.leftArm.y;

		this.xposition=this.scene.player.x-this.leftArm.width;
		console.log('xposition' + this.xposition);
		if(this.xposition>-125){
			this.xposition=-125;
		}
		this.punchingBrazoIz = this.scene.tweens.createTimeline();
		this.punchingBrazoIz.add({
			targets: this.leftArm,
			x: this.xposition,
			duration: 300,
			ease: 'Linear',
			repeat: 0
		});

		this.punchingBrazoIz.add({
			targets: this.leftArm,
			y: this.leftArm.y-10,
			duration: 200,
			ease: 'Linear',
			repeat: 0,
		});

		this.punchingBrazoIz.add({
			targets: this.leftArm,
			y: this.scene.player.y,
			duration: 300,
			ease: 'Linear',
			repeat: 0,
			yoyo:true
		});

		this.punchingBrazoIz.add({
			targets: this.leftArm,
			x: this.originalLeftX,
			y: this.originalLeftY,
			duration: 500,
			ease: 'Linear',
			repeat: 0,
			callbackScope: this,
			onComplete: function () {

				this.prepararBrazoDerecho();

			}
		});


		this.punchingBrazoIz.play();
		this.scene.finalboss_handstomp_01.play();
		


	}



	punchBrazoDerecho(){

		this.originalLeftX = this.rightArm.x;
		this.originalLeftY = this.rightArm.y;

		this.xposition=this.scene.player.x;
		console.log('xposition' + this.xposition);
		if(this.xposition<150){
			this.xposition=150;
		}
		this.punchingBrazoDer = this.scene.tweens.createTimeline();
		this.punchingBrazoDer.add({
			targets: this.rightArm,
			x: this.xposition,
			duration: 300,
			ease: 'Linear',
			repeat: 0
		});

		this.punchingBrazoDer.add({
			targets: this.rightArm,
			y: this.rightArm.y+10,
			duration: 200,
			ease: 'Linear',
			repeat: 0,
		});

		this.punchingBrazoDer.add({
			targets: this.rightArm,
			y: this.scene.player.y,
			duration: 300,
			ease: 'Linear',
			repeat: 0,
			yoyo:true
		});

		this.punchingBrazoDer.add({
			targets: this.rightArm,
			x: this.originalLeftX,
			y: this.originalLeftY,
			duration: 500,
			ease: 'Linear',
			repeat: 0,
			callbackScope: this,
			onComplete: function () {

				this.iniciarMovimientos();

			}
		});


		this.punchingBrazoDer.play();
		this.scene.finalboss_handstomp_01.play();


	}





	Bajar(){

		if(typeof this.respirarAnim!=="undefined"){
			this.respirarAnim.stop();
		}

		if(typeof this.moverArriba!=="undefined"){
			this.moverArriba.stop();
		}



		this.moverAbajo = this.scene.tweens.createTimeline();
		this.moverAbajo.add({
			targets: this,
			y: this.originalY,
			duration: 3500,
			ease: 'Linear',
			repeat: 0,
			callbackScope: this,
			onComplete: function () {

				this.iniciarMovimientos();

			}

		});

		this.moverAbajo.play();
		this.scene.finalboss_upanddown_02.play();
	}

	Subir(){


		if(typeof this.respirarAnim!=="undefined"){
			this.respirarAnim.stop();
		}


		if(typeof this.moverAbajo!=="undefined"){
			this.moverAbajo.stop();
		}


		this.moverArriba = this.scene.tweens.createTimeline();
		this.moverArriba.add({
			targets: this,
			y: this.y-60,
			duration: 3500,
			ease: 'Linear',
			repeat: 0,
			callbackScope: this,
			onComplete: function () {
				this.prepararBrazoIzquierdo();
			//	this.prepararBrazoDerecho();
				//this.iniciarMovimientos();

			}

		});

		this.moverArriba.play();
		this.scene.finalboss_upanddown_02.play();

	}

	respirar(){

		
			if(typeof this.moverArriba!=="undefined"){
				this.moverArriba.stop();
			}

			if(typeof this.moverAbajo!=="undefined"){
				this.moverAbajo.stop();
			}



		this.respirarAnim = this.scene.tweens.createTimeline();
		this.respirarAnim.add({
			targets: this.enemyBody,
			y: this.enemyBody.y-10,
			duration: 600,
			ease: 'Linear',
			repeat: 1,
			callbackScope: this,
			onComplete: function () {

				this.iniciarMovimientos();

			},
			yoyo: true

		});

		this.respirarAnim.play();
		this.scene.finalboss_idle_01.play();


	}

	Meteorito(){
		this.enemyHead.flashEyes();
		this.scene.finalboss_laugh_01.play();
		this.MeteorX = [-150,-30,30,70,150];
		this.MeteorY = [-500,-800,-1200,-1500,-1800,-2100,-2400];
		
		for(var i=0;i<=this.MeteorX.length-1;i++){
			const meteorito = new Meteorito(this.scene,this.MeteorX[i],this.MeteorY[i]);
			meteorito.setOrigin(0.5,0.5)
			this.add(meteorito);
		}


			this.iniciarMovimientos();




	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
