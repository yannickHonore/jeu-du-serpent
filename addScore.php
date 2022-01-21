<?php 

var_dump($_POST);
var_dump($_GET);
if(!empty($_GET['score']) && !empty($_POST['pseudo'])){
  $score = $_GET['score'];
  settype($score, 'integer');

  $pseudo = htmlspecialchars($_POST['pseudo']);
  
  // On ce connecte a la base de donnée
  require("infoConnect.php");
  $db = new PDO("mysql:host=$host;dbname=$data;charset=utf8", $user, $pass);
  
  // On crée notre requete
  $insert = "INSERT INTO `score`(`score`, `user`) VALUES (:score, :pseudo)";
  // on écrit la requete dans la console MySQL (sans l'executer)
	$queryExecute = $db->prepare($insert);

	// on remlace les correspondance de la requete avec la valeur voulu
	$queryExecute->bindValue(':score', $score, PDO::PARAM_INT);
	$queryExecute->bindValue(':pseudo', $pseudo, PDO::PARAM_STR);

	// on execute la requete
	$res = $queryExecute->execute();

  if($res == TRUE){
    header("Location: ./");
  }else{
    $error = "Il y a eu une erreur dans l'ajout de votre score";
    $error = urlencode($error);
    header("Location: ./?error=$error");
  }
}

?>