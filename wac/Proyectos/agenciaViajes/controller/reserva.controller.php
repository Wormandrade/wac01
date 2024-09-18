<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

// TODO: controlador de facturas Tienda Cel@g

require_once('../model/reserva.model.php');
error_reporting(0);
$reserva = new Reserva;

switch ($_GET["op"]) {
        // TODO: operaciones de facturas

    case 'todos': // Procedimiento para cargar todas las facturas
        $datos = array();
        $datos = $reserva->todos();
        while ($row = mysqli_fetch_assoc($datos)) {
            $todas[] = $row;
        }
        echo json_encode($todas);
        break;

    case 'uno': // Procedimiento para obtener una reserva por ID
        if (!isset($_POST["idReserva"])) {
            echo json_encode(["error" => "Reserva ID not specified."]);
            exit();
        }
        $idReserva = intval($_POST["idReserva"]);
        $datos = array();
        $datos = $reserva->uno($idReserva);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;

    case 'insertar': // Procedimiento para insertar una nueva reserva
        if (!isset($_POST["idTurista"]) || !isset($_POST["idDestino"]) || !isset($_POST["forma_pago"]) || !isset($_POST["comentario"]) || !isset($_POST["fecha"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idTurista = intval($_POST["idTurista"]);
        $idDestino = intval($_POST["idDestino"]);
        $forma_pago = $_POST["forma_pago"];
        $comentario = $_POST["comentario"];
        $fecha = $_POST["fecha"];

        $datos = array();
        $datos = $reserva->insertar($idTurista, $idDestino, $forma_pago, $comentario, $fecha);
        echo json_encode($datos);
        break;

    case 'actualizar': // Procedimiento para actualizar una reserva existente
        if (!isset($_POST["idReserva"]) || !isset($_POST["idTurista"]) || !isset($_POST["idDestino"]) || !isset($_POST["forma_pago"]) || !isset($_POST["comentario"]) || !isset($_POST["fecha"])) {
            echo json_encode(["error" => "Missing required parameters."]);
            exit();
        }

        $idReserva = intval($_POST["idReserva"]);
        $idTurista = intval($_POST["idTurista"]);
        $idDestino = intval($_POST["idDestino"]);
        $forma_pago = $_POST["forma_pago"];
        $comentario = $_POST["comentario"];
        $fecha = $_POST["fecha"];

        $datos = array();
        $datos = $reserva->actualizar($idReserva, $idTurista, $idDestino, $forma_pago, $comentario, $fecha);
        echo json_encode($datos);
        break;

    case 'eliminar': // Procedimiento para eliminar una reserva
        if (!isset($_POST["idReserva"])) {
            echo json_encode(["error" => "Reserva ID not specified."]);
            exit();
        }
        $idReserva = intval($_POST["idReserva"]);
        $datos = array();
        $datos = $reserva->eliminar($idReserva);
        echo json_encode($datos);
        break;

    default:
        echo json_encode(["error" => "Invalid operation."]);
        break;
}
