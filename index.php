<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./asset/css/style.css">

    <title>Jeu du serpent</title>
</head>
<body>
    <div id="hi-score" class="hidden">
        <div>
            <span class="fermeture" id="fermetureScore">X</span>
            <h2>Tableau des 20 meilleurs score</h2>
            <table>
                <tr><th>#</th><th>Pseudo</th><th>Score</th></tr>
                <?php 
                    require("infoConnect.php");
                    $db = new PDO("mysql:host=$host;dbname=$data;charset=utf8", $user, $pass);
                    $requete = "SELECT * FROM score ORDER BY score DESC LIMIT 20";
                    $res = $db->query($requete);
                    $score = $res->fetchAll(PDO::FETCH_OBJ);

                    for($i = 0; $i < sizeof($score); $i++){ ?> 
                        <tr><td><?= $i + 1 ?></td><td><?= $score[$i]->user ?></td><td><?= $score[$i]->score ?></td></tr>
                    <?php } ?>
            </table>
        </div>
    </div>
    <div id="addScore" class="hidden">
        <div>
            <h2>Entrer votre speudo</h2>
            <p>Vous venez de perdre car vous vous êtes manger. <br>
                Votre score est de : <span id="scoreFin"></span></p>
                <form method="POST" action="addScore.php" id="formAddScore">
                    <label for="pseudo">Speudo : </label>
                    <input type="text" name="pseudo" autofocus>
                    <button>Envoyer</button>
                </form>
        </div>
    </div>
    <div id="info" class="hidden">
        <div>
            <span class="fermeture" id="fermetureInfo">X</span>
            <h2>Informations</h2>
            <h2>Réglement</h2>
            <p>Le but du jeu est de faire avancer le serpent pour manger la souris.<br>
            Le serpent grandit à chaque fois que vous mangez une souris.<br>
            Vous perdez quand vous vous mangez.</p>
            <h2>Déplacements</h2>
            <p>Les déplacements se font à l'aide des touches du pavé directionnel</p>
        </div>
    </div>
    <header>
        <h1>Jeu du serpent</h1>
    </header>
    <main>
        <div>
            <p>Score : <span id="score"></span> <button id="bt-score">Hi-scrore</button> </span><button id="bt-info">Information</button></p>
        </div>
        <div id="container">
        </div>
    </main>
    <footer>
        <p>Jeu du serpent réalisé en JavaScript dans le cadre de la formation developeur Web de webForce3.<br>
        Le code source du jeu est disponible sur mon <a href="https://github.com/yannickHonore/jeu-du-serpent">GitHub</a></p>
    </footer>
    <script src="./asset/js/script.js"></script>
</body>
</html>