
var URL_BASE = "./data";
var hash = null;
var etatPage=null;




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
			showAccueil();
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
        dataType: "json"
    });
}

function changerEtatPage(etat) {
	$.ajax({
		type: "GET",
		url: URL_BASE + "/etat.php",
		data: {"hash":hash,"etatPage":etat},
		success: function(oRep){
			console.log(oRep);
			etatPage=oRep.etatPage;
		},
		dataType: "json"
	});
}


function getStatistiques(){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/profil.php",
        data: {"hash":hash},
		success: function(oRep){
			console.log(oRep);
			$("#pseudoLabel").html(oRep.pseudo);
			$("#userId").html("ID : "+oRep.id);
			$("#mmr").html("Mmr : "+oRep.mmr);
		},
		dataType: "json"
	});
}

function getAmisInProfil(){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/amis.php",
		data: {"hash":hash},
		success: function(oRep){
			console.log(oRep);
			$("#amisBlock").html("");
			$("#amisBlock").append(jTireAmisBlock);
			var tabPseudoAmis=oRep.amis;
			for(var i=0;i<tabPseudoAmis.length;i++){
				var jLabelAmisClone=jPeusoAmis.clone(true)
					.html(tabPseudoAmis[i])
				$("#amisBlock").append(jLabelAmisClone);
			}
		},
		dataType: "json"
	});
}

function getAmisInSalon(){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/amis.php",
		data: {"hash":hash},
		success: function(oRep){
			console.log(oRep);
			$("#amiListBlock").html("<h3>Amis List</h3>");
			var tabPseudoAmis=oRep.amis;
			for(var i=0;i<tabPseudoAmis.length;i++){
				var jLabelAmisClone=jPeusoAmis.clone(true)
					.html(tabPseudoAmis[i])
				$("#amiListBlock").append(jLabelAmisClone);
			}
		},
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
				$("#"+nomSit).text(oRep.sit1);
			}
			if(oRep.sit2!="0"){
				var nomSit = "chaise" + idTable + "2";
				$("#"+nomSit).css("background-color","black");
				$("#"+nomSit).text(oRep.sit2);
			}
			var nomTable = "table" + idTable;
			if (oRep.onReady == 0) $("#"+nomTable).text("table incomplet");
			if (oRep.onReady == 1) $("#"+nomTable).text("table not ready");
			if (oRep.onReady == 2) $("#"+nomTable).text("table ready");
			// var etatTable
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

function assisterPartie(idTable){

	$.ajax({
		type: "GET",
		url: URL_BASE + "/salon.php",
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
		url: URL_BASE + "/salon.php",
        data: {"hash":hash,"idTable":idTable,"idAmi":idAmi},
		success: function(oRep){
		    console.log(oRep);
	},
	dataType: "json"
	});
}


function ajouterAmi(pseudoAmi){
    $.ajax({
        type: "GET",
        url: URL_BASE + "/amis.php",
        data: {"hash":hash,"pseudoAmi":pseudoAmi},
        success: function(oRep){
            console.log(oRep);
            alert("Ajouter ami "+oRep.pseudoAmi+" success");
        },
        dataType: "json"
    });
}

function creerPartie(idUser1,idUser2,idTable,configuration){
    $.ajax({
        type: "GET",
        url: URL_BASE + "/salon.php",
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
        url: URL_BASE + "/salon.php",
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
        url: URL_BASE + "/jeu.php",
        data: {"hash": hash, "message": message},
        success: function (oRep) {
            console.log(oRep);
        },
        dataType: "json"
    });
}




