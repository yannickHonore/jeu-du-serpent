const container = document.getElementById("container");
let txContainer = container.offsetWidth;
let tyContainer = container.offsetHeight;
const taille = 50;
const tailleMaxi = Math.floor(Math.floor(txContainer / taille) * Math.floor(tyContainer / taille));
let score = -1;
let serpent = [];
let posiBouffe = {};

/**
 * Fonction permetant d'afficher le score
 */
function afficherScore(){
    score++;
    document.getElementById("score").innerHTML = score;
}

// On affiche une premiere fois le score
afficherScore();

/**
 * Fonction permetant de créer une div
 * @param {taille actuel du serpent en nombre de block} nbSerpent 
 * @returns retourne l'objet créé
 */
function creationDiv(name, longueur){
    let maDiv = document.createElement("div");
    maDiv.classList.add(name);
    maDiv.style.width = taille + "px";
    maDiv.style.height = taille + "px";
    maDiv.id = name+longueur;
    return maDiv;
}

container.appendChild(creationDiv("bouffe",""));
const bouffe = document.getElementById("bouffe");
/**
 * Fonction permetant d'ajouter une case au serpent
 */
function ajoutSerpent(direction){
    // On crée la div
    let maDiv = creationDiv("serpent", serpent.length);
    maDiv.style.borderRadius = taille / 2 +"px";
    let x = 0;
    let y = 0;

    // On défini la position de la nouvelle div en fonction de la direction qu'on choisi
    if(serpent.length != 0){
        // On determine la derniere position x et y
        x = serpent[serpent.length - 1].x;
        y = serpent[serpent.length - 1].y;

        // On determine la prochaine position x et y en fonction de la direction choisie
        if(direction !== undefined){
            switch(direction){
                case "ArrowLeft":
                    x = x - taille;
                    break;
            case "ArrowRight":
                    x = x + taille;
                    break;
            case "ArrowUp":
                    y = y - taille;
                    break;
            case "ArrowDown":
                    y = y + taille;
                    break; 
            }
        }
    }

    // On crée l'objet case pour l'ajouter au tableau du serpent
    let caseSerpent = {
        x: x,
        y: y,
        laDiv: maDiv,
    };

    // On ajoute la case au tableau du serpent
    serpent.push(caseSerpent);

    // On donne la position a la nouvelle case
    maDiv.style.left = x + "px";
    maDiv.style.top = y + "px";

    // On met la class tete si le serpent fait qu'une case
    if(serpent.length == 1){
        maDiv.classList.add("tete");
    }

    //On affiche la nouvelle case
    container.appendChild(maDiv);
}

// On crée notre premiere div
ajoutSerpent();

/**
 * Fonction permetant de générer un nombre aléatoire qui ne dépasse pas la taille de la div container et avec un increment de la taille de la variable taille
 * @param {Valeur maxi que l'on veux} maxi 
 * @returns Valeur retournée
 */
function nombreAleatoire(maxi){
    let nombre = 0;
    do{
        nombre = Math.floor(Math.random() * maxi);
        nombre = Math.floor(nombre / taille);
        nombre = nombre * taille;
    }while(nombre + taille > maxi);
    return nombre;
}

/**
 * Fonction permetant de vérifier si on va sur le serpent
 * @param {position en x} x 
 * @param {position en y} y 
 * @param {tableau de position à vérifier} aVerifier 
 * @returns Retourne un boolean (true) s'il y a colition
 */
 function verifColitionSerpent(x, y, aVerifier){
    let valid = false;
    let result = [];
    for(let i = 0; i < aVerifier.length; i++){
        if(aVerifier[i].x == x && aVerifier[i].y == y){
            result.push(false);
        }
    }

    valid = result.includes(false);
    return valid;
}

/**
 * Fonction permetant de créer une position aléatoire de bouffe
 */
function positionBouffe(){
    let nok = [false];
    let x = 0;
    let y = 0;
    let colision = true;
    let position;
    if(tailleMaxi > serpent.length){
        do{
            do{
                x = nombreAleatoire(txContainer);
                y = nombreAleatoire(tyContainer);

                for(let i = 0; i < serpent.length; i++){
                    if(serpent[i].x != x && serpent[i].y != y){
                        nok.push(true);
                    }
                }

            }while(!nok.includes(true));
            
            position = {
                x: x,
                y: y,
            };
            colision = verifColitionSerpent(position.x, position.y, serpent);
        }while(colision);

        posiBouffe = position;
        bouffe.style.left = x + "px";
        bouffe.style.top = y + "px";
    }
    else{
        alert("Vous avez gagné.\nVotre score est de : " + score);
        location.reload();
    }
}

// On positionne une premiere fois la bouffe
positionBouffe();


/**
 * Fonction permetant de déplacer le serpent
 * @param {Valeur de la touche enfoncé} cle 
 */
function deplacer(cle, deplacer){
    let left = serpent[serpent.length - 1].x;
    let top = serpent[serpent.length - 1].y;
    let tempDiv = serpent[0].laDiv;
    let colition;
    let possible = false;
    let sensTete = 0;
    
    if(deplacer){
        switch(cle){
            case "ArrowLeft":
                if(serpent[serpent.length - 1].x > 0){
                    left = serpent[serpent.length - 1].x - taille;
                    colition = verifColitionSerpent(left, top, serpent);
                    possible = true;
                    sensTete = 90;
                }
                break;
            case "ArrowUp":
                if(serpent[serpent.length - 1].y > 0){
                    top = serpent[serpent.length - 1].y - taille;
                    colition = verifColitionSerpent(left, top, serpent);
                    possible = true;
                    sensTete = 180;
                }
                break;
            case "ArrowRight":
                if((serpent[serpent.length - 1].x + (taille * 2)) < txContainer){
                    left = serpent[serpent.length - 1].x + taille;
                    colition = verifColitionSerpent(left, top, serpent);
                    possible = true;
                    sensTete = -90;
                }
                break;
            case "ArrowDown":
                if((serpent[serpent.length - 1].y + (taille * 2)) < tyContainer){
                    top = serpent[serpent.length - 1].y + taille;
                    colition = verifColitionSerpent(left, top, serpent);
                    possible = true;
                    sensTete = 0;
                }
                break;
        }
    }
    
    if(!colition && possible){
        // On deplace la l'index 0 au dernier index du tableau serpent
        serpent.push({x: left, y: top, laDiv: tempDiv});
        serpent.shift();

        // On positionne le serpent déplacer
        for(let i = 0; i < serpent.length; i++){
            let leX = serpent[i].x;
            let leY = serpent[i].y;
            let leDiv = serpent[i].laDiv;
            leDiv.style.left = leX + "px";
            leDiv.style.top = leY + "px";
        }

        // On met la tete du serpent en tete
        for(let i = 0; i < serpent.length; i++){
            serpent[i].laDiv.classList.remove("tete");
        }
        serpent[serpent.length - 1].laDiv.classList.add("tete");
        serpent[serpent.length - 1].laDiv.style.transform = "rotate(" + sensTete + "deg)";
    }
    
    // On ajoute la tete de mort, on affiche le score et on recharge la page si on ce mord
    if(colition && possible){
        document.getElementsByClassName("tete")[0].classList.add("mort");
        document.getElementById("scoreFin").innerHTML = score;
        let addScore = document.getElementById("addScore");
        addScore.classList.remove("hidden");
        let formAddScore = document.getElementById("formAddScore");
        formAddScore.setAttribute("action", "addScore.php?score=" + score);
    }
}

/**
 * Fonction permetant de vérifier la positin de la bouffe
 * @param {Position de la bouffe} positionBouf 
 * @param {Position du serpent} positionSerpent 
 * @param {Touche qui a été pressé} direction 
 */
function verifPossBouffe(positionBouf, positionSerpent, direction){
    let xBouffe = positionBouf.x;
    let yBouffe = positionBouf.y;
    let xSerpent = positionSerpent[positionSerpent.length - 1].x;
    let ySerpent = positionSerpent[positionSerpent.length - 1].y;
    let deplacer = true;
    let sensTete = 0;

    switch (direction){
        case "ArrowLeft":
            if(xBouffe == xSerpent - taille && yBouffe == ySerpent){
                ajoutSerpent(direction);
                deplacer = false;
                sensTete = 90;
            }
            break;
        case "ArrowUp":
            if(yBouffe == ySerpent - taille && xBouffe == xSerpent){
                ajoutSerpent(direction);
                deplacer = false;
                sensTete = 180;
            }
            break;
        case "ArrowRight":
            if(xBouffe == xSerpent + taille && yBouffe == ySerpent){
                ajoutSerpent(direction);
                deplacer = false;
                sensTete = 270;
            }
            break;
        case "ArrowDown":
            if(yBouffe == ySerpent + taille && xBouffe == xSerpent){
                ajoutSerpent(direction);
                deplacer = false;
                sensTete = 0;
            }
            break;
    }

    if(xBouffe == serpent[serpent.length - 1].x && yBouffe == serpent[serpent.length - 1].y){
        afficherScore();
        positionBouffe();
        document.getElementsByClassName("tete")[0].classList.remove("tete");
        serpent[serpent.length - 1].laDiv.classList.add("tete");
        serpent[serpent.length - 1].laDiv.style.transform = "rotate(" + sensTete + "deg)";
    }

    return deplacer;
}

// Variable qui contien la fonction setInterval
let start;

/**
 * Fonction qui permet de faire avancer le serpent suivant un interval de temps
 * @param {direction choisi} direction 
 */
function avancer(direction){
    if(!start){
        start = setInterval(function(){
            deplacer(direction.key, verifPossBouffe(posiBouffe, serpent, direction.key));
        }, 200);
    }
}

function stop(){
    clearInterval(start);
    start = null;
}

// On detecte quand une touche est enfoncé
document.addEventListener("keydown", function(e){
    stop();
    avancer(e);
});

/**
 * On gére l'affichage de la fenettre d'info
 */
let info = document.getElementById("info");
document.getElementById("bt-info").addEventListener("click", function(){
    info.classList.toggle("hidden");
});

document.getElementById("fermetureInfo").addEventListener("click", function(){
    info.classList.toggle("hidden");
});

/**
 * On gére l'affichage des scores
 */
let hiScore = document.getElementById("hi-score");
document.getElementById("bt-score").addEventListener("click", function(){
    hiScore.classList.toggle("hidden");
});

document.getElementById("fermetureScore").addEventListener("click", function(){
    hiScore.classList.toggle("hidden");
});