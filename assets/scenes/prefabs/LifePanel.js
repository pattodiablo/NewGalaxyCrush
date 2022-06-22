
// You can write more code here

/* START OF COMPILED CODE */

class LifePanel extends Phaser.GameObjects.Container {
	
	constructor(scene, x, y) {
		super(scene, x, y);
		
		this.scaleX = 0.75;
		this.scaleY = 0.75;
		
		// lifepanel
		const lifepanel = scene.add.sprite(10, 0, "lifepanel");
		this.add(lifepanel);
		
		// lifeBar1
		const lifeBar1 = scene.add.image(-14, 0, "lifeBar");
		this.add(lifeBar1);
		
		// lifeBar2
		const lifeBar2 = scene.add.image(-4, 0, "lifeBar");
		this.add(lifeBar2);
		
		// lifeBar3
		const lifeBar3 = scene.add.image(6, 0, "lifeBar");
		this.add(lifeBar3);
		
		// lifeBar4
		const lifeBar4 = scene.add.image(16, 0, "lifeBar");
		this.add(lifeBar4);
		
		// lifeBar5
		const lifeBar5 = scene.add.image(26, 0, "lifeBar");
		this.add(lifeBar5);
		
		// lifeBar6
		const lifeBar6 = scene.add.image(36, 0, "lifeBar");
		this.add(lifeBar6);
		
		// lifeBar7
		const lifeBar7 = scene.add.image(46, 0, "lifeBar");
		this.add(lifeBar7);
		
		// lifeBar8
		const lifeBar8 = scene.add.image(56, 0, "lifeBar");
		this.add(lifeBar8);
		
		// lifeBar9
		const lifeBar9 = scene.add.image(66, 0, "lifeBar");
		this.add(lifeBar9);
		
		// lifeBar10
		const lifeBar10 = scene.add.image(76, 0, "lifeBar");
		this.add(lifeBar10);
		
		this.lifeBar1 = lifeBar1;
		this.lifeBar2 = lifeBar2;
		this.lifeBar3 = lifeBar3;
		this.lifeBar4 = lifeBar4;
		this.lifeBar5 = lifeBar5;
		this.lifeBar6 = lifeBar6;
		this.lifeBar7 = lifeBar7;
		this.lifeBar8 = lifeBar8;
		this.lifeBar9 = lifeBar9;
		this.lifeBar10 = lifeBar10;
		
		/* START-USER-CTR-CODE */
		this.scene.events.on("create", () => this.create());
		/* END-USER-CTR-CODE */
	}
	
	/** @type {Phaser.GameObjects.Image} */
	lifeBar1;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar2;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar3;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar4;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar5;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar6;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar7;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar8;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar9;
	/** @type {Phaser.GameObjects.Image} */
	lifeBar10;
	
	/* START-USER-CODE */

	create(){
		this.setDepth(3);
		this.allBars = [this.lifeBar1,this.lifeBar2,this.lifeBar3,this.lifeBar4,this.lifeBar5,this.lifeBar6,this.lifeBar7,this.lifeBar8,this.lifeBar9,this.lifeBar10];
		this.lastBarNumber = this.allBars.length;
		this.apagarTodasLasBarras();
	}



	calcularBarrasEncendidas(){
	console.log("calculando barras");
		this.maxLife = this.scene.game.playerData.maxLife;
		this.currentLife = this.scene.player.playerLife;

		console.log("maxLife " + this.maxLife);

		console.log("currentLife " + this.currentLife);

		if(this.currentLife>=this.maxLife){
			this.currentLife=this.maxLife
		}

		this.lifeLost = this.lastBarNumber -  this.currentLife;
	//console.log("current life " + this.currentLife);
		for(var i=0; i<this.currentLife; i++){
	
			this.allBars[i].alpha=1;
		}
		for(var j=this.lastBarNumber-1; j>=this.currentLife; j--){
		
			this.allBars[j].alpha=0.2;
		}

		for(var k=9; k>=this.maxLife; k--){
		
			this.allBars[k].alpha=0;
		}

		this.scene.game.playerData.life = this.currentLife;
	}
	

	encenderTodasLasBarras(){
		this.allBars.forEach(function(bar){
			bar.alpha=1;
		})	
	}

	apagarTodasLasBarras(){
		this.allBars.forEach(function(bar){
			bar.alpha=0.5;
		})	
	}


	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
