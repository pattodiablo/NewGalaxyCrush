var coins = 0;
var isDebug =  false;
var isDoubleJump = true;
var hasCannonPower = true;
var renderer;
var activeLeveles=[];
var timesDead = 0;

function getOS() {

	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		renderer = "Phaser.CANVAS";
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		renderer = "Phaser.CANVAS";
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		renderer = "Phaser.WEBGL";
	} else if (/Android/.test(userAgent)) {
		renderer = "Phaser.WEBGL";
	} else if (!os && /Linux/.test(platform)) {
		renderer = "Phaser.WEBGL";
	}

	return renderer;
}

getOS();

var db;
var tempdata;
window.addEventListener('load', function () {

	window.indexedDB = window.indexedDB || window.mozIndexedDB ||
		window.webkitIndexedDB || window.msIndexedDB;

	//prefixes of window.IDB objects
	window.IDBTransaction = window.IDBTransaction ||
		window.webkitIDBTransaction || window.msIDBTransaction;
	window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange ||
		window.msIDBKeyRange

	if (!window.indexedDB) {
		window.alert("Pleas open this game in the latest version of Google Chrome");
	}

	
	var request = window.indexedDB.open("SupaDB", 1);

	var dbfirsttime = false;

	request.onerror = function (event) {
		console.log("error: ");
	};

	request.onsuccess = function (event) {
		db = request.result;
		console.log("success: " + db);
		// remove();
		if (!dbfirsttime) {
			
			const objectStore = db.transaction(['gameData'], "readwrite").objectStore('gameData');

			const objectStoreDataRequest = objectStore.get(1);

			objectStoreDataRequest.onsuccess = () => {

				const result = objectStoreDataRequest.result;
				tempdata = result.data;
				crearjuego(tempdata);
			}
		}
		else{
			crearjuegoPrimeraVez();
		}
	};

	request.onupgradeneeded = function (event) {
		var db = event.target.result;
		if (event.oldVersion < 1) {
			var objectStore = db.createObjectStore("gameData",{ keyPath: "id", autoIncrement:true});
		  }
		objectStore.add({
			data: {
				levelsPassed: [],
				gotCard: true,
				coins: coins,
				level: "",
				gotCannon: hasCannonPower,
				doubleJump: isDoubleJump,
				life: 5,
				maxLife:5,
				isMusicMuted:false,
				isFxMuted:false,
				thimesDead: timesDead
			}
		});
	  dbfirsttime = true;
	};


   function crearjuegoPrimeraVez(){
	var game = new Phaser.Game({

		width: screen.availWidth,
		height: screen.availHeight,
		type: renderer,
		backgroundColor: "#000000",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			orientation: "portrait",
		},
		physics: {
			default: "arcade",
			arcade: {
				debug: isDebug				
			}			
		},
		fps: {
			target: 30,
			min: 30,
			forceSetTimeOut: false
		},
		render: {
			pixelArt: false
		},
		input: {
			activePointers: 1
		}
	});



	game.playerData = {
		levelsPassed: [],
		gotCard: false,
		coins: coins,
		level: "NewLevel0", 
		life: 5,
		maxLife:5,
		isMusicMuted: false,
		gotCannon: hasCannonPower,
		doubleJump: isDoubleJump,
		isFxMuted: false,
		timesDead: timesDead
	};

	


	game.scene.add("Boot", Boot, true);
   }


   function crearjuego(tempdata){
	var game = new Phaser.Game({

		width: window.innerWidth,
		height: window.innerHeight,
		type: renderer,
		backgroundColor: "#000000",
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			orientation: "portrait",
		},
		physics: {
			default: "arcade",
			arcade: {
				debug: isDebug
			}
		},
		fps: {
			target: 30,
			min: 30,
			forceSetTimeOut: false
		},
		render: {
			pixelArt: false
		},
		input: {
			activePointers: 1
		}
	});



	game.playerData = tempdata;
	


	game.scene.add("Boot", Boot, true);
   }

  

});

class Boot extends Phaser.Scene {

	preload() {

		this.load.pack("pack", "assets/preload-pack.json");
	

			this.load.video("pruebaVideo", "assets/video/pruebaVideo.mp4");
		//	this.load.video("ending", "assets/video/ending.mp4");
	
				this.load.scenePlugin({
					key: 'rexuiplugin',
					url: 'lib/rexuiplugin.min.js',
					sceneKey: 'rexUI'
				});

				
			
	}

	create() {

	
	
	 this.scene.start("Preloader");
	
	
	}

}

function updatear(datos) {
	// Abra una transacción como de costumbre
	const objectStore = db.transaction(['gameData'], "readwrite").objectStore('gameData');
  
	const objectStoreDataRequest = objectStore.get(1);
	
	objectStoreDataRequest.onsuccess = () => {
		
		const result = objectStoreDataRequest.result;
		//data.notified = "yes";
		result.data = datos;
  
		const updateDataRequest = objectStore.put(result);
  
		updateDataRequest.onsuccess = () => {
			   var dbupdate = true;
			   //console.log("db updated")
			};
	}
  };

  //REx Plugin para letreros hablados
  
const COLOR_PRIMARY = 0x000000;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const GetValue = Phaser.Utils.Objects.GetValue;
var createTextBox = function (scene, x, y, config) {
    var wrapWidth = GetValue(config, 'wrapWidth', 0);
    var fixedWidth = GetValue(config, 'fixedWidth', 0);
    var fixedHeight = GetValue(config, 'fixedHeight', 0);
	console.log("wrapWidth " + wrapWidth)
    var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,

	
           
			background: scene.add.rectangle(x, y, wrapWidth, wrapWidth, 0x2D2D2D).setOrigin(0),
       

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,
                icon: 10,
                text: 10,
            },
			
        })
        .setOrigin(0)
        .layout();

    textBox
        .setInteractive()
        .on('pointerdown', function () {
            var icon = this.getElement('action').setVisible(false);
            this.resetChildVisibleState(icon);
            if (this.isTyping) {
                this.stop(true);
            } else {
                this.typeNextPage();
            }
        }, textBox)
        .on('pageend', function () {
            if (this.isLastPage) {
                return;
            }

            var icon = this.getElement('action').setVisible(true);
            this.resetChildVisibleState(icon);
            icon.y -= 30;
            var tween = scene.tweens.add({
                targets: icon,
                y: '+=30', // '+=100'
                ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 500,
                repeat: 0, // -1: infinity
                yoyo: false
            });
        }, textBox)
    //.on('type', function () {
    //})
		console.log(textBox);
		textBox.blendMode=2;
    return textBox;
}

var getBuiltInText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
        .setFixedSize(fixedWidth, fixedHeight);
}

var getBBcodeText = function (scene, wrapWidth, fixedWidth, fixedHeight) {
    return scene.rexUI.add.BBCodeText(0, 0, '', {
        fixedWidth: fixedWidth,
        fixedHeight: fixedHeight,

        fontSize: '20px',
        wrap: {
            mode: 'word',
            width: wrapWidth
        },
        maxLines: 3
    })
}

