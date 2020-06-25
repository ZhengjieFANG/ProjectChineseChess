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






