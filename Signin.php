<?php
$servername = "47.100.96.248";
$username = "LittleMonster";
$password = "Jza123456";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("failed to connect" . $conn->connect_error);
} 

if (!empty($_SERVER['HTTP_CLIENT_IP'])){ 
	$ip = $_SERVER['HTTP_CLIENT_IP'];
}
else if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){ 
	$ip = $_SERVER['HTTP_X_FORWARDED_FOR']; 
}
else { 
	$ip = $_SERVER['REMOTE_ADDR'];
}

//Get Input Value
$sql = "SELECT UserEmail FROM UserInfo";
$result = $conn->query($sql);
$email = $_POST['email'];
$password = $_POST['password'];
$name = "";
$info = "";
$date =  date('Y/m/d H:i:s');
$isexist = false;

if($result->num_rows == 0){
    $sql1 = "INSERT INTO UserInfo(UserEmail, UserPassword, UserName, UserInfo, RegisterDate) VALUES ('$email', '$password', '$name', '$info', '$date')";
    if ($conn->query($sql1) == TRUE) {
        echo "新记录插入成功\n";
    }
    echo "插入完成0";
    //$isexist = true;
}
else if($result->num_rows > 0){
    while($row = mysqli_fetch_array($result)){
        $login_id = $row['UserEmail'];
        //echo '$login_id\n';
        //echo '$email\n';
		if  ($login_id == $email){
			$isexist = true;
		}
    }
        
    if($isexist == false){//数据库中没有这个邮箱，可以注册
        $sql1 = "INSERT INTO UserInfo(UserEmail, UserPassword, UserName, UserInfo, RegisterDate) VALUES ('$email', '$password', '$name', '$info', '$date')";
        if ($conn->query($sql1) == TRUE) {
            echo "新记录插入成功\n";
        }
        echo "插入完成1";
    }
    else{//数据库中有这个邮箱，不能注册
        echo "存在该邮箱";
    }
        
}


mysqli_close($conn);
?>