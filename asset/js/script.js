const container = document.getElementById("container");
let txContainer = container.offsetWidth;
let tyContainer = container.offsetHeight;
const bouffe = document.getElementById("bouffe");
const taille = 50;
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
function creationDiv(nbSerpent){
    let maDiv = document.createElement("div");
    maDiv.classList.add("serpent");
    maDiv.id = `serpent_${nbSerpent}`;
    return maDiv;
}

/**
 * Fonction permetant d'ajouter une case au serpent
 */
function ajoutSerpent(direction){
    // On crée la div
    let maDiv = creationDiv(serpent.length);
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
        nombre = nombre * 50;
    }while(nombre + taille > maxi);
    return nombre;
}

/**
 * Fonction permetant de créer une position aléatoire de bouffe
 */
function positionBouffe(){
    let nok = [false];
    let x = 0;
    let y = 0;
    do{
        x = nombreAleatoire(txContainer);
        y = nombreAleatoire(tyContainer);

        for(let i = 0; i < serpent.length; i++){
            if(serpent[i].x != x && serpent[i].y != y){
                nok.push(true);
            }
        }

    }while(!nok.includes(true));
    
    let position = {
        x: x,
        y: y,
    };

    posiBouffe = position;
    bouffe.style.left = x + "px";
    bouffe.style.top = y + "px";
}

// On positionne une premiere fois la bouffe
positionBouffe();

/**
 * Fonction permetant de déplacer le serpent
 * @param {Valeur de la touche enfoncé} cle 
 */
function deplacer(cle){
    let left = serpent[serpent.length - 1].x;
    let top = serpent[serpent.length - 1].y;
    let tempDiv = serpent[0].laDiv;
    let deplacer = false;
    
    switch(cle){
        case "ArrowLeft":
            if(serpent[serpent.length - 1].x > 0){
                left = serpent[serpent.length - 1].x - taille;
                deplacer = true;
            }
            break;
        case "ArrowUp":
            if(serpent[serpent.length - 1].y > 0){
                top = serpent[serpent.length - 1].y - taille;
                deplacer = true;
            }
            break;
        case "ArrowRight":
            if((serpent[serpent.length - 1].x + (taille * 2)) < txContainer){
                left = serpent[serpent.length - 1].x + taille;
                deplacer = true;
            }
            break;
        case "ArrowDown":
            if((serpent[serpent.length - 1].y + (taille * 2)) < tyContainer){
                top = serpent[serpent.length - 1].y + taille;
                deplacer = true;
            }
            break;
    }
    
    if(deplacer){
        serpent.push({x: left, y: top, laDiv: tempDiv});
        serpent.shift();

        for(let i = 0; i < serpent.length; i++){
            let leX = serpent[i].x;
            let leY = serpent[i].y;
            let leDiv = serpent[i].laDiv;
            leDiv.style.left = leX + "px";
            leDiv.style.top = leY + "px";
        }
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

    if(xBouffe == xSerpent && yBouffe == ySerpent){
        afficherScore();
        positionBouffe();
        ajoutSerpent(direction);
    }
}

// On detecte quand une touche est enfoncé
document.addEventListener("keydown", function(e){
    deplacer(e.key);
    verifPossBouffe(posiBouffe, serpent, e.key);
});