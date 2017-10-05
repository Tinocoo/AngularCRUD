<?php  
	require_once 'connection.php';
	$data = json_decode(file_get_contents("php://input"));
	if(count($data) > 0)  {
		$type = mysqli_real_escape_string($connect, $data->type);
		switch ($type) {
			case 'view':
				$result = $connect->query("SELECT * FROM dados;");
			    $json = array();
			    while($row =mysqli_fetch_assoc($result)){
			        $json[] = $row;
			    }
			    $connect->close();
			    echo json_encode($json);
				break;
			case 'add':
				$nome = mysqli_real_escape_string($connect, $data->nome);
				$email = mysqli_real_escape_string($connect, $data->email);
				$phone = mysqli_real_escape_string($connect, $data->phone);
				$end = mysqli_real_escape_string($connect, $data->end);
				$query = "INSERT INTO dados(nome, email, phone, end) VALUES ('$nome', '$email',  '$phone', '$end')";  
				if(mysqli_query($connect, $query)){  
				   echo "Contato Criado com Sucesso!";  
				}  
				else{  
				   echo 'Error';  
				}  
				break;
			case 'update':
				$id = mysqli_real_escape_string($connect, $data->id);
				$nome = mysqli_real_escape_string($connect, $data->nome);
				$email = mysqli_real_escape_string($connect, $data->email);
				$phone = mysqli_real_escape_string($connect, $data->phone);
				$end = mysqli_real_escape_string($connect, $data->end);
				$query = "UPDATE dados SET id = '$id', nome = '$nome', email = '$email', phone = '$phone', end = '$end' WHERE id = '$id'";
				if(mysqli_query($connect, $query)){  
				   echo "Contato atualizado com Sucesso!";  
				}  
				else{  
				   echo 'Error';  
				}
				break;
			case 'remove':
				$id = mysqli_real_escape_string($connect, $data->id);
				$query = "DELETE FROM dados WHERE id = '$id.'";
				if(mysqli_query($connect, $query)){  
				   echo "Contato apagado com Sucesso!";  
				}  
				else{  
				   echo 'Error';  
				}
				break;
			default:
				echo "opção invalida";
				break;
		}
	}else{
		echo "Arquivo vazio.";
	}
?>