<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de clientes Tienda Cel@g

require_once('../model/turista.model.php');
error_reporting(0);
$turista = new Turista;

switch ($_GET["op"]) {
        //TODO: operaciones de clientes
    case 'buscar': // Procedimiento para cargar todos los datos de los clientes
        if (!isset($_POST["texto"])) {
            echo json_encode(["error" => "Turista ID not specified."]);
            exit();
        }
        $texto = intval($_POST["texto"]);
        $datos = array();
        $datos = $turista->buscar($texto);
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'todos': // Procedimiento para cargar todos los datos de los clientes
        $datos = array();
        $datos = $turista->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un registro de la base de datos
        if (!isset($_POST["idTurista"])) {
            echo json_encode(["error" => "Turista ID not specified."]);
            exit();
        }
        $idTurista = intval($_POST["idTurista"]);
        $datos = array();
        $datos = $turista->uno($idTurista);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un cliente en la base de datos
        if (!isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["correo"]) || !isset($_POST["telefono"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $correo = $_POST["correo"];
        $telefono = $_POST["telefono"];

        $datos = array();
        $datos = $turista->insertar($nombre, $apellido, $correo, $telefono);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un cliente en la base de datos
        if (!isset($_POST["idTurista"]) || !isset($_POST["nombre"]) || !isset($_POST["apellido"]) || !isset($_POST["correo"]) || !isset($_POST["telefono"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idTurista = intval($_POST["idTurista"]);
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $correo = $_POST["correo"];
        $telefono = $_POST["telefono"];

        $datos = array();
        $datos = $turista->actualizar($idTurista, $nombre, $apellido, $correo, $telefono);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar un cliente en la base de datos
        if (!isset($_POST["idTurista"])) {
            echo json_encode(["error" => "Turista ID not specified."]);
            exit();
        }
        $idTurista = intval($_POST["idTurista"]);
        $datos = array();
        $datos = $turista->eliminar($idTurista);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
