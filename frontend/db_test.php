<?php 

$db = mysqli_connect("127.0.0.1", "root","root", "cs174_db"); 


$query ="SELECT * FROM customer";
$result = mysqli_query($db, $query);
$num_rows = mysqli_num_rows($result);

echo "Number of rows is $query is  $num_rows "; 
$num_fields = mysqli_num_fields($result);

for($j = 1; $j <= $num_rows; $j++)
{
	$row = mysqli_fetch_array($result);
	print_r($row);
}

mysqli_close($db); 
