function trace(s) {
	// affiche une trace avec console.log
	console.log(s);
}

var __utils_compteur=0; // variable globale 
var __utils_MAX=5;

function debug(s) {
	if (s == null) trace("Compteur = " + __utils_compteur);
	if (__utils_compteur++<__utils_MAX) {
		trace(s);
	}
	// affiche un nombre de messages limité par un compteur
	// affiche le compteur si s n'est pas fourni
	// e.g. après 10 affichages, la fonction ne fait plus rien 
	// comment remettre à 0 le compteur ?
	// SOL 1 : passer un paramètre particulier, par exemple "raz" 
	// pour déclencher cette remise à zéro 
	// compteur=0 n'importe où 
	// SUPER DANGEREUX !! 
  // SOLUTION : fermeture / "closure"
}

// Fonctions très similaires à celles de jquery

function show(refOrId,display) {
	// affiche l'élément dont la référence ou l'id est fourni
	// le paramètre display doit valoir block par défaut
	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId);

	if (display == null) display="block";

	refOrId.style.display = display; 
}

function hide(refOrId) {
	// cache l'élément dont la référence ou l'id est fourni

	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	if (refOrId == null) trace("hide : Argument incorrect");
	else refOrId.style.display = "none";
}


function html(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; si val n'est pas fourni, on renvoie son contenu
	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	if (val == null) return refOrId.innerHTML; 

	refOrId.innerHTML = val; 
}

function val(refOrId, val) {
	// affecte une valeur à l'élément dont la référence ou l'id est fourni; 
	// si val n'est pas fourni, on renvoie son contenu
	// l'élément est un champ de formulaire
	// NB : cette fonction doit pouvoir traiter les checkbox 
	if (typeof refOrId == "string")
		refOrId = document.getElementById(refOrId); 

	if (refOrId.type =="checkbox") {
		if (val == null) return refOrId.checked; 
		refOrId.checked = val; 
	}

	if (val == null) return refOrId.value; 
	refOrId.value = val; 
}

trace("Chargement Librairie utils.js (trace, debug, html, val, show, hide) OK");


function showAccueil(){
	if(hash==null){
		show("labelAccueil","inline-block");
		show("labelSeConnecter","inline-block");
		hide("labelProfil");
		hide("labelSalon");
		hide("labelDeconnecter");
		hide("labelQuitter");
		hide("chercherAmis");
		show("accueil");
		hide("connexion");
		hide("profil");
		hide("salon");
		hide("jeu");
		setEtatPage(-1);
		console.log("showAccueil, hash="+hash+", etatPage="+etatPage);
	}else{
		show("labelAccueil","inline-block");
		hide("labelSeConnecter");
		show("labelProfil","inline-block");
		show("labelSalon","inline-block");
		show("labelDeconnecter","inline-block");
		hide("labelQuitter");
		show("chercherAmis","inline-block");
		show("accueil");
		hide("connexion");
		hide("profil");
		hide("salon");
		hide("jeu");
		setEtatPage(0);
		setEtatReady(pseudoGlo,0);
		console.log("showAccueil, hash="+hash+", etatPage="+etatPage);
	}
}

function showConnextion(){
	show("labelAccueil","inline-block");
	show("labelSeConnecter","inline-block");
	hide("labelProfil");
	hide("labelSalon");
	hide("labelDeconnecter");
	hide("labelQuitter");
	hide("chercherAmis");
	hide("accueil");
	show("connexion");
	hide("profil");
	hide("salon");
	hide("jeu");
	setEtatPage(-1);
	console.log("showConnextion, etatPage="+etatPage);
}

function showProfil(){
	show("labelAccueil","inline-block");
	hide("labelSeConnecter");
	show("labelProfil","inline-block");
	show("labelSalon","inline-block");
	show("labelDeconnecter","inline-block");
	hide("labelQuitter");
	show("chercherAmis","inline-block");
	hide("accueil");
	hide("connexion");
	show("profil");
	hide("salon");
	hide("jeu");
	getStatistiques();
	getAmisInProfil();
	setEtatPage(0);
	setEtatReady(pseudoGlo,0);
	console.log("showProfil, etatPage="+etatPage);
}

function showSalon(){
	show("labelAccueil","inline-block");
	hide("labelSeConnecter");
	show("labelProfil","inline-block");
	show("labelSalon","inline-block");
	show("labelDeconnecter","inline-block");
	hide("labelQuitter");
	show("chercherAmis","inline-block");
	hide("accueil");
	hide("connexion");
	hide("profil");
	show("salon");
	hide("jeu");
	getAmisInSalon();
	setEtatPage(1);
	console.log("showSalon, etatPage="+etatPage);
}

function showJeu(){
	hide("labelAccueil");
	hide("labelSeConnecter");
	hide("labelProfil");
	hide("labelSalon");
	hide("labelDeconnecter");
	show("labelQuitter","inline-block");
	hide("chercherAmis");
	hide("accueil");
	hide("connexion");
	hide("profil");
	hide("salon");
	show("jeu");
	setPartieConfiguration()
	com.init(styleEchiquier);
	play.init();
	com.show();
	$("#chatContenu").after(divEnvoyerMessage);
	setInterval(listerMessages,1000,yourPartie);
	setEtatPage(2);
	console.log("showSalon, etatPage="+etatPage);
	console.log("styleEchiquier="+styleEchiquier);
}



