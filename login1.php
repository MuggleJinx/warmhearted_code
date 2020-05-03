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


$cur_date = date('Y/m/d H:i:s');
$logf = fopen("log.txt", "a");
$log_msg = "$cur_date,login:$login_id,$ip--\n";
fwrite($logf, $log_msg);
fclose($logf);
$sql = "SELECT UserEmail,UserPassword FROM UserInfo";
$result1 = $conn->query($sql);

if ($result1->num_rows > 0) {
	while($row = mysqli_fetch_array($result1)){
		$login_id = $row['UserEmail'];
		$user_password = $row['UserPassword'];
		$login =$_POST ['login'];	
		$password=$_POST['password'];
			if  (strcasecmp($login_id,$login)==0){
				if ($user_password==$password){
				echo "<font color='red'>hello.welcome!</font>";
				echo " $login_id";
			}
				
				
			else{
				echo "<BR>$login<BR>";
				exit('Your password does not match with this account. Please enter it again! Click <a href="javascript:history.back(-1);">here</a> to try again<BR> <BR> Or click <a href="SignupPage.html">here</a> to create an account'); 
			}
			break;
		}
	}
	exit(); 


	 
	
	//exit(' doesn not exist  <a href="javascript:history.back(-1);">here</a> to try again'); 
		
	
	
}


?>