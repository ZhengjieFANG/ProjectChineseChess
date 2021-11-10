
var URL_BASE = "./data";
var hash = null;
var etatPage=-1;
var pseudoGlo = null;
var nomChaiseTable = {"chaise11":"0","chaise12":"0","chaise21":"0","chaise22":"0","chaise31":"0","chaise32":"0",
	"chaise41":"0","chaise42":"0"};
var idChaiseTable = {"chaise11":"0","chaise12":"0","chaise21":"0","chaise22":"0","chaise31":"0","chaise32":"0",
	"chaise41":"0","chaise42":"0"};
var yourSit = "0";
var yourPartie = "0";
var onReadyUser = "0";
var onReadyTable = {"table1" : "0", "table2" : "0","table3" : "0","table4" : "0"}

var styleEchiquier="stype2";
var nombreRegrette=3;
var TempsRest=3*60;

function signIn(pseudo,password){
	console.log("signIn");
	$.ajax({
		type: "GET",
		url: URL_BASE+"/authenticate.php",
		data: {"pseudo":pseudo,"password":password},
		success: function(oRep){
			console.log(oRep);
			if(oRep.success){
				console.log("signIn success");
				hash = oRep.hash;
				etatPage=oRep.etatPage;
				pseudoGlo = oRep.pseudo;
				showAccueil();
			}else{
				alert(oRep.message);
				console.log("signIn failed:Pseudo or password incorrect");
			}
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
			console.log(oRep);
			if(oRep.success){
				console.log("signUp success");
				hash = oRep.hash;
				etatPage=oRep.etatPage;
				if(confirm("Sign up success!Do you want to sign in now?")){
					console.log("signIn");
					signIn(pseudo,password);
				}else{
					showConnextion();
				}
			}else{
				alert(oRep.message);
			}

		},
		dataType: "json"
	});
}

function signOut() {
	setEtatPage(-1);
	setEtatReady(pseudoGlo,0);
	hash=null;
	pseudoGlo = null;
	yourSit = "0";
	yourPartie = "0";
}

function setEtatPage(etat) {
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

function setEtatReady(pseudo, etat){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/ready.php",
		data: {"pseudo":pseudo,"setReady":etat},
		success: function(oRep){
			console.log("set onReady status: ");
			console.log(oRep);
			onReadyUser=oRep.setReady;
		},
		dataType: "json"
	});
}

function checkEtatTable(){
	if(onReadyUser=="0") return "0";
	if(onReadyUser=="1"){
		var str = yourSit;
		var idTable = str.substring(6, 7);
		var Table = "table" + idTable;
		if (onReadyTable[Table]="2"){
			return "2";
		}
		return "1";
	}
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
			console.log("getAmisInSalon");
			$("#amiListBlock").html("<h3>Amis List</h3>");
			var tabPseudoAmis=oRep.amis;
			for(var i=0;i<tabPseudoAmis.length;i++){
				var jLabelAmisClone=jLabelPeusoAmis.clone(true)
					.html(tabPseudoAmis[i]);
				var jBtnInviterAmiClone=jBtnInviterAmi.clone(true);
				var jBarAmisClone=jBarAmis.clone(true);
				jBarAmisClone.append(jLabelAmisClone)
					.append(jBtnInviterAmiClone);
				$("#amiListBlock").append(jBarAmisClone);
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
			// console.log(oRep);
			if(oRep.sit1!="0"){
				var nomSit = "chaise" + idTable + "1";
				$("#"+nomSit).css("background-color","dimgrey");
				$("#"+nomSit).html(oRep.pseudo1);
				nomChaiseTable[nomSit]=oRep.pseudo1;
				idChaiseTable[nomSit]=oRep.sit1;
				if(oRep.pseudo1==pseudoGlo) yourSit=nomSit;
			}else{
				var nomSit = "chaise" + idTable + "1";
				$("#"+nomSit).css("background-color","lightgray");
				$("#"+nomSit).text("");
				nomChaiseTable[nomSit]="0";
				idChaiseTable[nomSit]="0";
			}

			if(oRep.sit2!="0"){
				var nomSit = "chaise" + idTable + "2";
				$("#" + nomSit).css("background-color", "dimgrey");
				$("#" + nomSit).html(oRep.pseudo2);
				nomChaiseTable[nomSit]=oRep.pseudo2;
				idChaiseTable[nomSit]=oRep.sit2;
				if(oRep.pseudo2==pseudoGlo) yourSit=nomSit;
			}else{
				var nomSit = "chaise" + idTable + "2";
				$("#"+nomSit).css("background-color","lightgray");
				$("#"+nomSit).text("");
				nomChaiseTable[nomSit]="0";
				idChaiseTable[nomSit]="0";
			}

			var nomTable = "table" + idTable;
			if (oRep.onReady == 0) {
				$("#"+nomTable).text("table incomplet");
				onReadyTable[nomTable] = 0;
			}
			if (oRep.onReady == 1) {
				$("#"+nomTable).text("table not ready");
				onReadyTable[nomTable] = 1;
			}
			if (oRep.onReady == 2) {
				$("#"+nomTable).text("table ready");
				onReadyTable[nomTable] = 2;
			}
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
			if(oRep.success){
				alert("Ajouter ami "+oRep.pseudoAmi+" success");
			}else{
				alert(oRep.message);
			}
		},
		dataType: "json"
	});
}

function inviterAmi(pseudoAmi){
	if(yourSit==0){
		alert("You should sit on a chaise before inviting a friend");
		return;
	}else{
		var idTable=yourSit.substring(6,7);
		var idSit=yourSit.substring(7,8);
		if(idSit=="1"){
			var chaiseOpposite="chaise"+idTable+"2";
			if(nomChaiseTable[chaiseOpposite]!="0"){
				alert("The chaise opposite is already occupied");
				return;
			}else{
				sitTable(pseudoAmi,idTable,"2",pseudoAmi);
			}
		}
		if(idSit=="2"){
			var chaiseOpposite="chaise"+idTable+"1";
			if(nomChaiseTable[chaiseOpposite]!="0"){
				alert("The chaise opposite is already occupied");
				return;
			}else{
				sitTable(pseudoAmi,idTable,"1",pseudoAmi);
			}
		}
	}
}

function sitTable(pseudo,idTable,position){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/salon.php",
		data: {"pseudo":pseudo,"idTable":idTable,"position":position},
		success: function(oRep){
			console.log(oRep);
			if(oRep.success){
				setEtatReady(pseudo,"0");
			}else{
				alert(oRep.message);
			}
		},
		dataType: "json"
	});
}

function quitterTable(pseudo,idTable,position){
	$.ajax({
		type: "GET",
		url: URL_BASE + "/salon.php",
		data: {"pseudo":pseudo,"idTable":idTable,"position":position,"quitterTable":"1"},
		success: function(oRep){
			console.log(oRep);
			setEtatReady(pseudo,"0");
			yourSit="0";
		},
		dataType: "json"
	});
}


function creerPartie(idTable){
	var sit1="chaise" + idTable + "1";
	var sit2="chaise" + idTable + "2";
	if ((idChaiseTable[sit1]!=0) && (idChaiseTable[sit2]!=0)){
		var idUser1=idChaiseTable[sit1];
		var idUser2=idChaiseTable[sit2];
		console.log("creerPartie: "+sit1 + " est " + idUser1);
		console.log("creerPartie: "+sit2 + " est " + idUser2);
		$.ajax({
			type: "GET",
			url: URL_BASE + "/creerPartie.php",
			data: {"idUser1":idUser1,"idUser2":idUser2,"idTable":idTable},  //,"configuration":configuration
			success: function(oRep){
				console.log(oRep);
				console.log("creer partie success");
				yourPartie = oRep.idPartie;
			},
			dataType: "json"
		});
	}else{
		console.log("table " + idTable + " not ready");
	}
}

function quitterPartie(idPartie) {
	var nomSit=yourSit;
	var idTable = nomSit.substring(6, 7);
	var idSit = nomSit.substring(7,8);
	$.ajax({
		type: "GET",
		url: URL_BASE + "/quitterPartie.php",
		data: {"hash":hash,"idPartie": idPartie},
		success: function (oRep) {
			console.log("quitter partie success");
			console.log(oRep);
			quitterTable(pseudoGlo,idTable,idSit);
			showSalon();
			yourPartie="0";
			clearInterval(intevalPlayRefresh);
		},
		dataType: "json"
	});
}


function checkPartie(idTable){
	if(etatPage==1){
		if (onReadyTable[idTable]="2"){
			var chaise1 = "chaise" + idTable + "1";
			var chaise2 = "chaise" + idTable + "2";
			var idUser1 = idChaiseTable[chaise1];
			var idUser2 = idChaiseTable[chaise2];
			$.ajax({
				type: "GET",
				url: URL_BASE + "/checkPartie.php",
				data: {"idUser1":idUser1,"idUser2":idUser2},
				success: function(oRep){
					yourPartie = oRep.idPartie;
					if(yourPartie!="0") showJeu();
				},
				dataType: "json"
			});
		}
	}
}

function  setPartieConfiguration() {
	TempsRest=$('input[name="tempsParCoup"]').val();
	nombreRegrette=$('input[name="nbRegrette"]').val();
	var sytle=$('input[name="styleEchiquier"]:checked').val();
	if(sytle=="stype2")	styleEchiquier="stype2";
	if(sytle=="stype1")	styleEchiquier="stype1";
}

var messageListLength=0;
function listerMessages(idParite) {
	$.ajax({
		type: "GET",
		url: URL_BASE + "/chat.php",
		data: {"idPartie": yourPartie,"listerMessages":"1"},
		success: function (oRep) {
			console.log(oRep);
			console.log("listerMessages");
			for(var i=messageListLength;i<oRep.messageList.length;i++){
				var pseudo=oRep.messageList[i].pseudoAuteur;
				var texte=oRep.messageList[i].texte;
				var jpMessageClone=jpMessage.clone(true);
				jpMessageClone.html("["+pseudo+"]: "+texte);
				if(pseudo==pseudoGlo){
					jpMessageClone.css("color","#5994b8");
				}else{
					jpMessageClone.css("color","#d1711c");
				}
				$("#chatContenu").append(jpMessageClone);
			}
			messageListLength=oRep.messageList.length;
		},
		dataType: "json"
	});

}

function envoyerMessage(message){
    $.ajax({
        type: "GET",
        url: URL_BASE + "/chat.php",
        data: {"idPartie": yourPartie,"pseudo":pseudoGlo, "message": message},
        success: function (oRep) {
            console.log(oRep);
			console.log("envoyerMessage success");
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




