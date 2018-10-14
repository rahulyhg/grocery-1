<?php
require 'config.php';
require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app->post('/login','login'); /* User login */
$app->post('/signup','signup'); /* User Signup  */
$app->post('/order','order'); /* Orders  */
$app->post('/addTocart','addTocart'); /* Orders  */
$app->get('/getProduct','getProduct'); /*  Products  */
$app->post('/product', 'product');
$app->run();
/************************* USER LOGIN *************************************/
/* ### User login ### */
function login() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    try {
        $db = getDB();
        $userData ='';
        $sql = "SELECT user_id, name, email, username FROM users WHERE (username=:username or email=:username) and password=:password ";
        $stmt = $db->prepare($sql);
        $stmt->bindParam("username", $data->username, PDO::PARAM_STR);
        $password=hash('sha256',$data->password);
        $stmt->bindParam("password", $password, PDO::PARAM_STR);
        $stmt->execute();
        $mainCount=$stmt->rowCount();
        $userData = $stmt->fetch(PDO::FETCH_OBJ);
        if(!empty($userData))
        {
            $user_id=$userData->user_id;
            $userData->token = apiToken($user_id);
        }
        $db = null;
         if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Bad request wrong username and password"}}';

            }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';

    }
}
/* ### User registration ### */
function signup() {
    $request = \Slim\Slim::getInstance()->request();
    $data = json_decode($request->getBody());
    $email=$data->email;
    $name=$data->name;
    $username=$data->username;
    $password=$data->password;
    try {
        $username_check = preg_match('~^[A-Za-z0-9_]{4,20}$~i', $username);
        $email_check = preg_match('~^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z]{1,20})$~i', $email);
        $password_check = preg_match('~^[A-Za-z0-9!@#$%^&*()_]{6,20}$~i', $password);
       // echo $email_check.'<br/>'.$email;
        if (strlen(trim($username))>0 && strlen(trim($password))>0 && strlen(trim($email))>0 && $email_check>0 && $username_check>0 && $password_check>0)
        {

            $db = getDB();
            $userData = '';
            $sql = "SELECT user_id FROM users WHERE username=:username or email=:email";
            $stmt = $db->prepare($sql);
            $stmt->bindParam("username", $username,PDO::PARAM_STR);
            $stmt->bindParam("email", $email,PDO::PARAM_STR);
            $stmt->execute();
            $mainCount=$stmt->rowCount();
            $created=time();
            if($mainCount==0)
            {
                /*Inserting user values*/
                $sql1="INSERT INTO users(username,password,email,name)VALUES(:username,:password,:email,:name)";
                $stmt1 = $db->prepare($sql1);
                $stmt1->bindParam("username", $username,PDO::PARAM_STR);
                $password=hash('sha256',$data->password);
                $stmt1->bindParam("password", $password,PDO::PARAM_STR);
                $stmt1->bindParam("email", $email,PDO::PARAM_STR);
                $stmt1->bindParam("name", $name,PDO::PARAM_STR);
                $stmt1->execute();
                $userData=internalUserDetails($email);
               }
             if(!empty($userData))

        {

            $user_id=$userData->user_id;

            $userData->token = apiToken($user_id);

        }
            $db = null;
            if($userData){
               $userData = json_encode($userData);
                echo '{"userData": ' .$userData . '}';
            } else {
               echo '{"error":{"text":"Enter valid data"}}';
            }
        }
    }
    catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';

    }
}
/*##GET Products##*/
function getProduct(){
    try {
        if(1){
            $productData = '';
            $db = getDB();
               $sql = "SELECT * FROM products  ORDER BY id DESC";
                $stmt = $db->prepare($sql);
                $stmt->bindParam("id", $id, PDO::PARAM_INT);
                $stmt->bindParam("created", $created, PDO::PARAM_STR);
                $stmt->execute();
                $productData = $stmt->fetchAll(PDO::FETCH_OBJ);
                $db = null;
                if($productData)
                echo '{"productData": ' . json_encode($productData) . '}';
                else
                echo '{"productData": ""}';
                } else{
                echo '{"error":{"text":"No access"}}';
               }
               } 
               catch(PDOException $e) {
          echo '{"error":{"text":'. $e->getMessage() .'}}';

    }
}

function product(){

    $request = \Slim\Slim::getInstance()->request();

    $data = json_decode($request->getBody());

    $user_id=$data->user_id;

    $token=$data->token;

    $lastCreated = $data->lastCreated;

    $systemToken=apiToken($user_id);

   

    try {

         

        if($systemToken == $token){

            $productData = '';

            $db = getDB();

            if($lastCreated){

                $sql = "SELECT * FROM products WHERE p_id=:user_id AND created < :lastCreated ORDER BY p_id DESC LIMIT 5";

                $stmt = $db->prepare($sql);

                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);

                $stmt->bindParam("lastCreated", $lastCreated, PDO::PARAM_STR);

            }

            else{

                $sql = "SELECT * FROM products WHERE p_id";

                $stmt = $db->prepare($sql);

                $stmt->bindParam("user_id", $user_id, PDO::PARAM_INT);

            }

            $stmt->execute();

            $productData = $stmt->fetchAll(PDO::FETCH_OBJ);

           

            $db = null;



            if($productData)

            echo '{"productData": ' . json_encode($productData) . '}';

            else

            echo '{"productData": ""}';

        } else{

            echo '{"error":{"text":"No access"}}';

        }

       

    } catch(PDOException $e) {

        echo '{"error":{"text":'. $e->getMessage() .'}}';

    }



}









function order(){

    $request = \Slim\Slim::getInstance()->request();

    $data = json_decode($request->getBody());

    $user_id=$data->user_id;

    $token=$data->token;

    $orderD=$data->orderD;

    $systemToken=apiToken($user_id);

    try {

        if(1){

            $db = getDB();

            $sql = "INSERT INTO orders(p_name,p_price) VALUES(:p_name,:p_price)";

            $stmt = $db->prepare($sql);

            $stmt->bindParam("p_name", $user_id, PDO::PARAM_INT);

            $stmt->bindParam("p_price", $orderD, PDO::PARAM_STR);

            $stmt->execute();

            $db = null;

            echo '{"success":{"status":"uploaded"}}';

        } else{

            echo '{"error":{"text":"No access"}}';

        }

    } catch(PDOException $e) {

        echo '{"error":{"text":'. $e->getMessage() .'}}';

    }

}

$app->post('/addTocart', 'addTocart');

function addTocart(){

    $request = \Slim\Slim::getInstance()->request();

    $data = json_decode($request->getBody());

    $user_id=$data->user_id;

    $token=$data->token;

    $cartData=$data->cartData;

    $systemToken=apiToken($user_id);

    try {

        if(1){

            $db = getDB();

            $sql = "INSERT INTO cart (p_name, p_price) VALUES(:p_name,:user_id)";

            $stmt = $db->prepare($sql);

            $stmt->bindParam("user_id", $user_id, PD::PARAM_INT);

            $stmt->bindParam("p_name", $cartData, PDO::PARAM_STR);

            $stmt->execute();

            $db = null;

            echo '{"success":{"status":"uploaded"}}';

        } else{

            echo '{"error":{"text":"No access"}}';

        }

    } catch(PDOException $e) {

        echo '{"error":{"text":'. $e->getMessage() .'}}';

    }

}





$app->post('/getCarts', 'getCarts');

function getCarts(){

    $request = \Slim\Slim::getInstance()->request();

    $data = json_decode($request->getBody());

    $user_id=$data->user_id;

    $token=$data->token;

    

    $systemToken=apiToken($user_id);

    try {

        if(1){

            $db = getDB();

            $sql = "SELECT p_price FROM cartData";

            $stmt = $db->prepare($sql);

           

            $stmt->execute();

            $cartData = $stmt->fetchAll(PDO::FETCH_OBJ);

            $db = null;

            echo '{"cartData": ' . json_encode($cartData) . '}';

        } else{

            echo '{"error":{"text":"No access"}}';

        }

    } catch(PDOException $e) {

        echo '{"error":{"text":'. $e->getMessage() .'}}';

    }

}




?>

