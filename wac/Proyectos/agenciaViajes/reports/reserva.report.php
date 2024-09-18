<?php
require('fpdf/fpdf.php');
require_once("../model/reserva.model.php");
$pdf = new FPDF();
$pdf->AddPage();
$reserva = new Reserva();


$pdf->Image('https://www.muchoarticulo.com/wp-content/uploads/2016/09/art4-Batch8034-kw3-agencia-de-viajes-quito.jpg', 0, 2, 30, 0, 'JPG');
$pdf->SetFont('Arial', 'B', 20);
$pdf->Text(70, 15, 'RUTAS DEL ECUADOR');
$pdf->Ln(7);
$pdf->SetFont('Arial', 'B', 16);
$texto = 'Reporte de reservas';
$pdf->MultiCell(0, 40, iconv('UTF-8', 'windows-1252', $texto), 0, 'J');

//uso de POO para reporte
$listaReserva = $reserva->todos();
$pdf->SetFont('Arial','B',12);
$pdf->SetFillColor(0,0,0);
$pdf->SetTextColor(255);
$pdf->Cell(10, 8, "#", 1, 0, "C", 1);
$pdf->Cell(40, 8, "NOMBRES", 1, 0,"C",1);
$pdf->Cell(40, 8, "PAQUETE", 1, 0,"C",1);
$pdf->Cell(30, 8, "PAIS", 1, 0,"C",1);
$pdf->Cell(30, 8, "CIUDAD", 1, 0,"C",1);
$pdf->Cell(35, 8, "FECHA", 1, 0,"C",1);

$index = 1;
$pdf->Ln();
$pdf->SetFont('Arial', '', 12);
$pdf->SetTextColor(0);
while ($lista = mysqli_fetch_assoc($listaReserva)) {
    //      Ancho   alto de la celda
    $pdf->Cell(10, 8, $index, 1);
    $pdf->Cell(40, 8, $lista["nombre"]." ".$lista["apellido"], 1);
    $pdf->Cell(40, 8, $lista["paquete"], 1);
    $pdf->Cell(30, 8, $lista["pais"], 1);
    $pdf->Cell(30, 8, $lista["ciudad"], 1);
    $pdf->Cell(35, 8, $lista["fecha"], 1);
    $pdf->Ln();
    $index++;
}
$pdf->Ln(20);
$pdf->Cell(0, 10, 'Pag. ' . $pdf->PageNo(), 0, 0, 'C');
$pdf->Output();
