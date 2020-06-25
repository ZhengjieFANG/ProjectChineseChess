function showAccueil(){
    if(hash==null){
        show("labelAccueil",inline-block);
        show("labelSeConnecter",inline-block);
        hide("labelProfil");
        hide("labelChat");
        hide("labelDeconnecter");
        hide("labelQuitter");
        hide("chercherAmis");
        show("accueil");
        hide("connexion");
        hide("profil");
        hide("salon");
        hide("jeu");
    }else{
        show("labelAccueil",inline-block);
        hide("labelSeConnecter");
        show("labelProfil",inline-block);
        show("labelChat",inline-block);
        show("labelDeconnecter",inline-block);
        hide("labelQuitter");
        show("chercherAmis",inline-block);
        show("accueil");
        hide("connexion");
        hide("profil");
        hide("salon");
        hide("jeu");
    }
}

function showConnextion(){
    show("labelAccueil",inline-block);
    show("labelSeConnecter",inline-block);
    hide("labelProfil");
    hide("labelChat");
    hide("labelDeconnecter");
    hide("labelQuitter");
    hide("chercherAmis");
    hide("accueil");
    show("connexion");
    hide("profil");
    hide("salon");
    hide("jeu");
}

function showProfil(){
    show("labelAccueil",inline-block);
    hide("labelSeConnecter");
    show("labelProfil",inline-block);
    show("labelChat",inline-block);
    show("labelDeconnecter",inline-block);
    hide("labelQuitter");
    show("chercherAmis",inline-block);
    hide("accueil");
    hide("connexion");
    show("profil");
    hide("salon");
    hide("jeu");
}

function showSalon(){
    show("labelAccueil",inline-block);
    hide("labelSeConnecter");
    show("labelProfil",inline-block);
    show("labelChat",inline-block);
    show("labelDeconnecter",inline-block);
    hide("labelQuitter");
    show("chercherAmis",inline-block);
    hide("accueil");
    hide("connexion");
    hide("profil");
    show("salon");
    hide("jeu");
}

function showJeu(){
    hide("labelAccueil");
    hide("labelSeConnecter");
    hide("labelProfil");
    hide("labelChat");
    hide("labelDeconnecter");
    show("labelQuitter",inline-block);
    hide("chercherAmis");
    hide("accueil");
    hide("connexion");
    hide("profil");
    hide("salon");
    show("jeu");
}