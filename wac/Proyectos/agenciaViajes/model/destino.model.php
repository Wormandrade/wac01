<?php
// TODO: Clase de Destino
require_once('../config/config.php');

class Destino
{
    public function todos() // select * from destinos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT d.* FROM `destinos` d";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($idDestino) // select * from destinos where id = $idDestino
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT d.* FROM `destinos` d WHERE d.`idDestino` = $idDestino";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar()
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();

            // Insertar el destino
            $cadenaDestino = "INSERT INTO `destinos`(`nombre`, `pais`, `ciudad`,`descripcion`, `costo`) 
                               VALUES ('$nombre', '$pais', '$ciudad', '$descripcion', '$costo')";

            if (mysqli_query($con, $cadenaDestino)) {
                $destinoId = $con->insert_id; // Obtener el ID del destino recién creado
            } else {
                return $con->error; // Error en el destino
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function actualizar($idDestino, $nombre, $pais, $ciudad, $descripcion, $costo ) // update destinos set ... where id = $idDestino
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `destinos` SET 
                       `nombre`='$nombre',
                       `pais`='$pais',
                       `ciudad`='$ciudad',
                       `descripcion`=`$descripcion`,
                       `costo`=`$costo`
                       WHERE `idDestino` = $idDestino";
            if (mysqli_query($con, $cadena)) {
                return $idDestino; // Éxito, devolver el ID actualizado
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }

    public function eliminar($idDestino) // delete from destinos where id = $idDestino
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "delete from `destinos` WHERE `idDestino`=$idDestino";
            if (mysqli_query($con, $cadena)) {
                return 1; // Éxito
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
