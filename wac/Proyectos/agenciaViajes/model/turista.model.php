<?php
// TODO: Clase de Clientes Tienda Cel@g
require_once('../config/config.php');

class Turista
{
    // TODO: Implementar los métodos de la clase


    public function buscar($textp) // select * from Turista
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `turista` where nombre='$textp'";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }
    public function todos() // select * from Turista
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `turista`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idTurista) // select * from Turista where id = $idCTurista
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `turista` WHERE `idTurista` = $idTurista";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $apellido, $correo, $telefono) // insert into Turista
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `turista`(`nombre`, `apellido`, `correo`, `telefono`) 
                       VALUES ('$nombre', '$apellido', '$correo', '$telefono')";
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

    public function actualizar($idTurista, $nombre, $apellido, $correo, $telefono) // update turista 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `clientes` SET 
                       `nombre`='$nombre',
                       `apellido`='$apellido',
                       `correo`='$correo',
                       `telefono`='$telefono'
                       WHERE `idTurista` = $idTurista";
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

    public function eliminar($idTurista) // delete from turista where id = $idTurista
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `turista` WHERE `idTurista`= $idTurista";
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
