const formElement = document.getElementById("formulario");
const salida = document.getElementById("resultado");
let prestamos = [];

document.getElementById("btnCalcular").addEventListener("click", (event) => {
  event.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let prestamo = parseFloat(document.getElementById("prestamo").value);
  let meses = parseInt(document.getElementById("meses").value);
  let interes = parseFloat(document.getElementById("interes").value);

  let calculo_cuota = prestamo * ((Math.pow(1 + interes, meses) * interes) / (Math.pow(1 + interes, meses) - 1)
  );

  if (!nombre || isNaN(prestamo) || isNaN(meses) || isNaN(interes)) {
    alert("Por favor llena todos los campos correctamente.");
    return;
  }

  let transaccion = { nombre, prestamo, meses, interes, calculo_cuota };
  prestamos.push(transaccion);

  salida.value = `${nombre} debe pagar $${calculo_cuota.toFixed(2)} cada mes por el préstamo de $${prestamo} a ${meses} meses con el interés del ${(interes * 100).toFixed(2)}%`;
});

document.getElementById("btnCuotasMayores").addEventListener("click", () => {
  let cuotasMayores = prestamos.filter(p => p.calculo_cuota > 300000);
  salida.value = "b) Cuotas \n" + cuotasMayores.map(p => `${p.nombre} Prestamo: ${p.prestamo.toFixed(0)} Meses: ${p.meses} Interes: ${(p.interes*100).toFixed(0)} Cuota: $${p.calculo_cuota.toFixed(0)}`)
  .join("\n");
});

document.getElementById("btnMenosDeUnAño").addEventListener("click", () => {
  let menosDeunAño = prestamos.filter(p => p.meses < 12);
  salida.value = "c) Meses < 12 \n" + menosDeunAño.map(p => `${p.nombre} Prestamo: ${p.prestamo.toFixed(0)} Meses: ${p.meses} Interes: ${(p.interes*100).toFixed(0)} Cuota: $${p.calculo_cuota.toFixed(0)}`)
  .join("\n");
});

document.getElementById("btnPrestamoMayor5M").addEventListener("click", () => {
  let prestamosMayor5M = prestamos.find(p => p.prestamo > 5000000);

  if (prestamosMayor5M) {
    salida.value = "d) Prestamo > 5M\n" +
      `Nombre: ${prestamosMayor5M.nombre}\n` +
      `Prestamo: $${prestamosMayor5M.prestamo.toFixed(0)}\n` +
      `Meses: ${prestamosMayor5M.meses}\n` +
      `Interés: ${(prestamosMayor5M.interes*100).toFixed(0)}%\n` +
      `Cuota: $${prestamosMayor5M.calculo_cuota.toFixed(0)}`;
  } else {
    salida.value = "d) No hay préstamos mayores a 5M";
  }
});

document.getElementById("btnInteresMenor2").addEventListener("click", () => {
  let interesMenor2 = prestamos.find(p => p.interes < 0.02);

  if (interesMenor2) {
    salida.value = "e) Interés < 2%\n" +
      `Nombre: ${interesMenor2.nombre}\n` +
      `Prestamo: $${interesMenor2.prestamo.toFixed(0)}\n` +
      `Meses: ${interesMenor2.meses}\n` +
      `Interés: ${(interesMenor2.interes*100).toFixed(0)}%\n` +
      `Cuota: $${interesMenor2.calculo_cuota.toFixed(0)}`;
  } else {
    salida.value = "e) No hay préstamos con interés < 2%";
  }
});

document.getElementById("btnIncrementarCuotas").addEventListener("click", () => {
  let incrementoCuotas = prestamos.map(p => ({...p, calculo_cuota: p.calculo_cuota + 90000}))
 salida.value = "f) Incremento en 90K \n" + incrementoCuotas.map(p => `${p.nombre} Cuota incrementada: ${p.calculo_cuota.toFixed(0)}`).join("\n");
});

document.getElementById("btnDecrementarPrestamos").addEventListener("click", () =>{
  let decrementoPrestamo = prestamos.map(p => ({...p, prestamo: p.prestamo - 90000}));
  salida.value = "g) Decremento en 90K \n" + decrementoPrestamo.map(p => `${p.nombre} Prestamo: $${p.prestamo.toFixed(2)}, Cuota: $${p.calculo_cuota.toFixed(2)}, Meses: ${p.meses}, Interés: ${(p.interes*100).toFixed(2)}%`
  ).join("\n");
});

document.getElementById("btnSoloCuotas").addEventListener("click", () => {
  salida.value = "h) Solo Cuotas \n" + prestamos.map(p => `${p.nombre} Cuota: $${p.calculo_cuota.toFixed(2)}`).join("\n");
});

document.getElementById("btnMostrar").addEventListener("click", () => {
  if (prestamos.length === 0) {
    salida.value = "No hay registros aún.";
    return;
  }
  salida.value = prestamos.map(p => `${p.nombre}: $${p.calculo_cuota.toFixed(2)} /mes por $${p.prestamo} a ${p.meses} meses (${(p.interes*100).toFixed(2)}%)`
  ).join("\n");
});

