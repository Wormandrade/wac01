<?php
// TODO: Clase de reserva Tienda Cel@g
require_once('../config/config.php');

class Reserva
{
    public function todos() // select * from reserva
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT r.idReserva, t.nombre, t.apellido, d.nombre as paquete, d.pais, d.ciudad, r.fecha FROM `reserva` r INNER JOIN `destinos` d on d.idDestino = r.idDestino
                                            INNER JOIN `turista` t on t.idTurista = r.idTurista";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idReserva) // select * from factura where id = $idFactura
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT r.idReserva, t.nombre, t.apellido, d.nombre as paquete, d.pais, d.ciudad, r.fecha FROM `reserva` r INNER JOIN `destinos` d on d.idDestino = r.idDestino
                                            INNER JOIN `turista` t on t.idTurista = r.idTurista WHERE r.`idReserva` = $idReserva";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($idTurista, $idDestino, $forma_pago, $comentario, $fecha) // insert 
      {  
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `reserva`(`idTurista`, `idDestino`, `forma_pago`, `comentario`, `fecha`) 
                       VALUES ('$idTurista', '$idDestino', '$forma_pago', '$comentario', '$fecha')";
            //echo $cadena;
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id; // Return the inserted ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idReserva, $idTurista, $idDestino, $forma_pago, $comentario, $fecha) // update 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `reserva` SET 
                       `idTurista`='$idTurista',
                       `idDestino`='$idDestino',
                       `forma_pago`='$forma_pago',
                       `comentario`='$comentario',
                       `fecha`='$fecha'
                       WHERE `idReserva` = $idReserva";
            if (mysqli_query($con, $cadena)) {
                return $idTurista; // Return the updated ID
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idTurista) // delete 
     {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `reserva` WHERE `idTurista`= $idTurista";
            if (mysqli_query($con, $cadena)) {
                return 1; // Success
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}
