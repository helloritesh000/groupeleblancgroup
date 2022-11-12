liste_objets = [];
function Diaporama(nom_diapositives, reglages){
	this.nom_diapositives = nom_diapositives;
	this.reglages = reglages;//Nom de la diapositive (peut aussi être un objet)

	//Définition des variables en fonction des réglages donnés.
	if (!this.reglages.nom_diaporama){		this.reglages.nom_diaporama = "diaporama";	};//Nom du diaporama (utile quand il y en plusieurs)
	if (!this.reglages.delai_actions){		this.reglages.delai_actions = 3000;		};//Délai en mini-secondes, avant que les actions se masquent
	if (!this.reglages.temps_diapo){		this.reglages.temps_diapo = 10000;		};//Délai en mini-secondes, avant que la diapositive suivante s'affiche
	if (!this.reglages.depart_auto){		this.reglages.depart_auto = true;		;};//Si le diaporama commence tout seul ou non…
	if (!this.reglages.duree_transition){	this.reglages.duree_transition = 1.0;		;};//Durée de la transition en mini secondes

	//Sauvegardons l'objet :)
	liste_objets[this.reglages.nom_diaporama] = this;
	//nécessaire au fonctionnement du script
	this.liste_diapositives = [];
	this.diapositive_affiche = null;
	this.delai = null;

	this.initialiser();
}

Diaporama.prototype.initialiser = function(){
	//On masque les diapositives, et on les ajoutes à la liste
	diapositives = $(this.nom_diapositives).getElementsByClassName('diapo');
	for (i=0;i<diapositives.length;i++){
		Element.hide(diapositives[i]);
		this.liste_diapositives.push(diapositives[i]);
	}

	//pour le css des diapositives
	$(this.nom_diapositives).addClassName('diaporama_js');

	this.diapositive_affiche=-1;
	if (this.reglages.depart_auto==true){
		document.getElementById('diapos').style.display = '';
		this.demarrer();
	}
}

Diaporama.prototype.demarrer = function(){
	this.actions_affiche = true;
	this.suivante();
	this.m_lecture = setInterval("liste_objets['"+this.reglages.nom_diaporama+"'].lecture();",this.reglages.temps_diapo);
	this.lecture_automatique = true;
}

Diaporama.prototype.lecture = function(){
	this.suivante();
}

Diaporama.prototype.suivante = function(){
	if(this.diapositive_affiche==this.liste_diapositives.length-1){
		this.diapositive_affiche = -1;
	}
	this.diapositive_affiche+=1;
	this.masquer();
}

Diaporama.prototype.masquer = function(){
	this.actions_affiche = false;
	o = 0;
	for (i=0;i<this.liste_diapositives.length;i++){
		if (Element.visible(this.liste_diapositives[i])&&i!=this.diapositive_affiche){
			new Effect.Fade(this.liste_diapositives[i],{duration:this.reglages.duree_transition});
			o=1;
		}else if(this.diapositive_affiche==i&&!Element.visible(this.liste_diapositives[i])){
			new Effect.Appear(this.liste_diapositives[i],{duration:this.reglages.duree_transition});
		}
	}
	setTimeout("liste_objets['"+this.reglages.nom_diaporama+"'].actions_affiche=true",this.reglages.duree_transition*1000+100);
}