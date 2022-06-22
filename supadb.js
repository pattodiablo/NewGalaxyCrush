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

var db;
var tempdata;
var request = window.indexedDB.open("SupaDB", 1);

var dbfirsttime = false;

request.onerror = function (event) {
    console.log("error: ");
};

request.onsuccess = function (event) {
    db = request.result;
    console.log("success: " + db);
   // remove();
   if(!dbfirsttime){
    const objectStore = db.transaction(['gameData'], "readwrite").objectStore('gameData');
  
    const objectStoreDataRequest = objectStore.get(1);
    
    objectStoreDataRequest.onsuccess = () => {
        
        const result = objectStoreDataRequest.result;
       tempdata = result.data;
    }
  }
};


// var playerData={gotCard:false,
//     coins: 75

// };

request.onupgradeneeded = function (event) {
    var db = event.target.result;
    if (event.oldVersion < 1) {
        var objectStore = db.createObjectStore("gameData",{ keyPath: "id", autoIncrement:true});
      }
    objectStore.add({
        data: {
            gotCard: false,
			coins: 0,
			level: "Level1",
			life: 10,
			isMusicMuted:false,
            doubleJump: true,
			isFxMuted:false
        }
    });
  dbfirsttime = true;
};




// function updatear(datos) {
//   // Abra una transacción como de costumbre
//   const objectStore = db.transaction(['gameData'], "readwrite").objectStore('gameData');

//   const objectStoreDataRequest = objectStore.get(1);
  
//   objectStoreDataRequest.onsuccess = () => {
      
//       const result = objectStoreDataRequest.result;
//       //data.notified = "yes";
//       result.data = datos;

//       const updateDataRequest = objectStore.put(result);

//       updateDataRequest.onsuccess = () => {
//              var dbupdate = true;
//           };
//   }
// };






// // Obtener el objeto de la lista de tareas pendientes que tiene este título como título
// const objectStoreTitleRequest = objectStore.get(title);

// objectStoreTitleRequest.onsuccess = () => {
//   // Coge el objeto de datos devuelto como resultado
//   const data = objectStoreTitleRequest.result;

//   // Actualiza el valor notificado en el objeto a "sí"
//   data.notified = "yes";

//   // Crea otra solicitud que inserta el elemento nuevamente en la base de datos
//   const updateTitleRequest = objectStore.put(data);

//   // Registra la transacción que originó esta solicitud
//   console.log("The transaction that originated this request is " + updateTitleRequest.transaction);

//   // Cuando esta nueva solicitud tenga éxito, ejecute la función displayData () nuevamente para actualizar la pantalla
//   updateTitleRequest.onsuccess = () => {
//     displayData();
//   };
// };








