
var URL_BASE = "./data";
var hash = null;
var etatPage=null;
var pseudoGlo = null;




function signIn(pseudo,password) {
	console.log("signIn");
	$.ajax({
		type: "GET",
		url: URL_BASE+"/authenticate.php",
		data: {"pseudo":pseudo,"password":password},
		success: function(oRep){
			console.log("signIn success");
            console.log(oRep);
            hash = oRep.hash;
			etatPage=oRep.etatPage;
			pseudoGlo = oRep.pseudo;
			showAccueil();
		},
		error:function(oRep){
			console.log("signIn failed");
			alert(oRep.message);
		},
		dataType: "json"
	});
}

function signUp(pseudo,password) {
    $.ajax({
        type: "GET",
		url: URL_BASE+"/authenticate.php",
        data: {"pseudo":pseudo,"password":password,"enregistrer":"1"},
        success: function(oRep){
			console.log("signUp success");
            console.log(oRep);
            hash = oRep.hash;
			etatPage=oRep.etatPage;
            alert("Sing up success");
            showAccueil();
        },
		error:function(){
			console.log("signUp failed");
			alert(oRep.message);
		},
        dataType: "json"
    });
}

function changerEtatPage(etatPage) {
	$.ajax({
		type: "GET",
		url: apiRoot + "/etat.php",
		data: {"hash":hash,"etatPage":etatPage},
		success: function(oRep){
			console.log(oRep);
			etatPage=oRep.etatPage;
		},
		error:function(oRep){
			console.log(oRep);
		},
		dataType: "json"
	});
}


function getStatistiques(showStatistique){
	$.ajax({
		type: "GET",
		url: apiRoot + "/profil.php",
        data: {"hash":hash},
		success: showStatistique(oRep),
		dataType: "json"
	});
}

function getAmis(showAmis){
	$.ajax({
		type: "GET",
		url: apiRoot + "/amis.php",
		data: {"hash":hash},
		success: showAmis(oRep),
		dataType: "json"
	});
}

function getEtatTable(idTable){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/salon.php",
        data: {"idTable":idTable,"getEtatTable" : "1"},
        success: function(oRep){
			//{"sit1":"0","sit2":"0","sit1Ready":"0","sit2Ready":"0","onReady":"0"}
			console.log(oRep);
			if(oRep.sit1!="0"){
				var nomSit = "chaise" + idTable + "1";
				$("#"+nomSit).css("background-color","black");
				$("#"+nomSit).text(oRep.pseudo1);
			}else{
				var nomSit = "chaise" + idTable + "1";
				$("#"+nomSit).css("background-color","lightgray");
				$("#"+nomSit).text("");
			}

			if(oRep.sit2!="0") {
				var nomSit = "chaise" + idTable + "2";
				$("#" + nomSit).css("background-color", "black");
				$("#" + nomSit).text(oRep.pseudo2);
			}else{
				var nomSit = "chaise" + idTable + "2";
				$("#"+nomSit).css("background-color","lightgray");
				$("#"+nomSit).text("");
			}

			var nomTable = "table" + idTable;
			if (oRep.onReady == 0) $("#"+nomTable).text("table incomplet");
			if (oRep.onReady == 1) $("#"+nomTable).text("table not ready");
			if (oRep.onReady == 2) $("#"+nomTable).text("table ready");
			// var etatTable
			// setTimeout(getEtatTable(idTable),100000);
		},
		dataType: "json"
	});
}

function sitTable(idTable,position){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/salon.php",
		data: {"hash":hash,"idTable":idTable,"position":position},
		success: function(oRep){
            console.log(oRep);
		},
		dataType: "json"
	});
}

function setReady(){
	var idSit = $(".chaise[text=pseudoGlo]").attr('id');
	console.log(idSit);
	// $.ajax({
	// 	type: "GET",
	// 	url: URL_BASE + "/salon.php",
	// 	data: {"hash":hash,"setReady":1},
	// 	success: function(oRep){
	// 		console.log(oRep);
	// 	},
	// 	dataType: "json"
	// });
}

function assisterPartie(idTable){

	$.ajax({
		type: "GET",
		url: apiRoot + "/salon.php",
        data: {"hash":hash,"idTable":idTable},
		success: function(oRep){
		    console.log(oRep);
	},
	dataType: "json"
	});
}

function inviterAmi(idAmi,idTable){
	$.ajax({
		type: "GET",
		url: apiRoot + "/salon.php",
        data: {"hash":hash,"idTable":idTable,"idAmi":idAmi},
		success: function(oRep){
		    console.log(oRep);
	},
	dataType: "json"
	});
}


function ajouterAmi(idAmi,idTable){
    $.ajax({
        type: "GET",
        url: apiRoot + "/salon.php",
        data: {"hash":hash,"idAmi":idAmi,"idTable":idTable},
        success: function(oRep){
            console.log(oRep);
        },
        dataType: "json"
    });
}

function creerPartie(idUser1,idUser2,idTable,configuration){
    $.ajax({
        type: "GET",
        url: apiRoot + "/salon.php",
        data: {"idUser1":idUser1,"idUser2":idUser2,"idTable":idTable,"configuration":configuration},
        success: function(oRep){
            console.log(oRep);
        },
        dataType: "json"
    });
}

function quitterPartie(idPartie) {
    $.ajax({
        type: "GET",
        url: apiRoot + "/salon.php",
        data: {"hash": hash, "idPartie": idPartie},
        success: function (oRep) {
            console.log(oRep);
        },
        dataType: "json"
    });
}

function envoyerMessage(message){
    $.ajax({
        type: "GET",
        url: apiRoot + "/jeu.php",
        data: {"hash": hash, "message": message},
        success: function (oRep) {
            console.log(oRep);
        },
        dataType: "json"
    });
}



