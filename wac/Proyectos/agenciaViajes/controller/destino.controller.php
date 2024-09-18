<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: Controlador de productos con Kardex

require_once('../model/destino.model.php');
error_reporting(0);
$destino = new Destino;

switch ($_GET["op"]) {
        // TODO: Operaciones de productos

    case 'todos': // Procedimiento para cargar todos los productos
        $datos = array();
        $datos = $destino->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;

    case 'uno': // Procedimiento para obtener un producto por ID
        if (!isset($_POST["idDestino"])) {
            echo json_encode(["error" => "Destino ID no especificado."]);
            exit();
        }
        $idDestino = intval($_POST["idDestino"]);
        $datos = array();
        $datos = $destino->uno($idDestino);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar un nuevo producto y actualizar el kardex
        if (!isset($_POST["nombre"]) || !isset($_POST["pais"]) || !isset($_POST["ciudad"]) || !isset($_POST["descripcion"]) || !isset($_POST["costo"]) ) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $nombre = $_POST["nombre"];
        $pais = $_POST["pais"];
        $ciudad = $_POST["ciudad"];
        $descripcion = $_POST["descripcion"];
        $costo = $_POST["costo"];

        $datos = array();
        $datos = $destino->insertar($nombre, $pais, $ciudad, $descripcion, $costo);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar un producto existente
        if (!isset($_POST["idDestino"]) || !isset($_POST["nombre"]) || !isset($_POST["pais"]) || !isset($_POST["ciudad"]) || !isset($_POST["descripcion"]) || !isset($_POST["costo"]) ) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        
        $idDestino = intval($_POST["idDestino"]);
        $nombre = $_POST["nombre"];
        $pais = $_POST["pais"];
        $ciudad = $_POST["ciudad"];
        $descripcion = $_POST["descripcion"];
        $costo = $_POST["costo"];

        $datos = array();
        $datos = $destino->actualizar($idDestino, $nombre, $pais, $ciudad, $descripcion, $costo);
        echo json_encode($datos);
        break;


    case 'eliminar': // Procedimiento para eliminar un producto
        if (!isset($_POST["idDestino"])) {
            echo json_encode(["error" => "Destino ID not specified."]);
            exit();
        }
        $idDestino = intval($_POST["idDestino"]);
        $datos = array();
        $datos = $producto->eliminar($idDestino);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
