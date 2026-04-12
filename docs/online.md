# Documentacion de uso - Facturador Online (app movil)

Guia de uso por pantalla y flujo, enfocada en el usuario final. No incluye endpoints ni detalles tecnicos internos.

## Inicio

**Proposito**: ver resumen general del dia y acceder a reportes rapidos.

**Flujo tipico**

1. Revisa tarjetas de resumen (contado, credito, total, devoluciones, gastos, abonos, total neto, recuperacion).
2. Consulta la comparacion con la semana pasada.
3. Usa el calendario para revisar otro dia.

**Acciones**

- Acciones rapidas: boton + para crear factura, reporte de cambio, reporte de devolucion o gasto.
- Reporte de cambios del dia: boton "Ver reporte de cambios".
- Reporte de productos del dia: boton "Ver reporte de productos".

**FAQ**

- "Como creo una factura?" -> En Inicio toca el boton + y elige "Crear factura".
- "Como creo un reporte de cambio?" -> En Inicio toca el boton + y elige "Crear reporte de cambio".
- "Como veo ventas de otro dia?" -> En Inicio usa el calendario y selecciona la fecha.

---

## Login

**Proposito**: ingresar a la app con usuario y contrasena.

**Flujo tipico**

1. Escribe usuario.
2. Escribe contrasena.
3. Presiona "Iniciar sesion".

**Acciones**

- Iniciar sesion: valida credenciales y entra al sistema.

**FAQ**

- "No puedo entrar" -> Verifica usuario/contrasena y conexion a internet.

---

## Productos

**Proposito**: ver inventario, precios y stock.

**Flujo tipico**

1. Buscar productos por nombre.
2. Revisar cantidad disponible y precio.
3. Imprimir reporte de existencias.

**Acciones**

- Buscar: escribir nombre en el buscador.
- Imprimir existencias: toca el icono de impresora, confirma y elige impresora Bluetooth.

**FAQ**

- "Como imprimo existencias?" -> En Productos, icono de impresora y selecciona el dispositivo Bluetooth.

---

## Clientes

**Proposito**: consultar clientes y su saldo.

**Flujo tipico**

1. Buscar por nombre.
2. Revisar telefono, direccion y saldo.

**Acciones**

- Buscar: escribir nombre en el buscador.

**FAQ**

- "Que significa el saldo?" -> Es el credito pendiente del cliente.

---

## Facturas

**Proposito**: consultar, filtrar y gestionar facturas.

**Flujo tipico**

1. Revisar pestañas: Todas, Pagado, No pagado.
2. Buscar por cliente.
3. Filtrar por fecha o cliente.
4. Tocar una factura para acciones.

**Acciones**

- Buscar por nombre de cliente.
- Filtrar por fecha: boton Filtrar -> Fecha -> seleccionar en calendario.
- Filtrar por cliente: boton Filtrar -> Cliente -> seleccionar.
- Limpiar filtro: boton "Limpiar filtro".
- Recargar: icono de recarga.
- Acciones en factura: Ver, Imprimir, Compartir, Editar, Abonar, Cancelar (segun estado).

**FAQ**

- "Como filtro por fecha?" -> En Facturas usa Filtrar por fecha y selecciona el dia.
- "Como abono una factura?" -> Toca la factura de credito con saldo y elige Abonar.
- "Como cancelarla?" -> Toca la factura y elige Cancelar factura.

---

## Ver factura (modal)

**Proposito**: ver el detalle de una factura.

**Flujo tipico**

1. Desde Facturas toca una factura.
2. Elige "Ver factura".
3. Revisa productos, descuento, total, pagado y saldo.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "Donde veo el saldo?" -> En Ver factura, debajo de total y pagado.

---

## Abonar factura (modal)

**Proposito**: registrar un abono en una factura a credito.

**Flujo tipico**

1. Desde Facturas elige Abonar.
2. Ingresa el monto.
3. Confirma.

**Acciones**

- Aceptar: guarda el abono.
- Cancelar: cierra sin cambios.

**FAQ**

- "Por que no me deja?" -> El monto no puede ser mayor al saldo.

---

## Crear factura - Seleccionar cliente

**Proposito**: elegir el cliente para la factura.

**Flujo tipico**

1. Buscar cliente por nombre.
2. Tocar el cliente para continuar.

**Acciones**

- Buscar: filtra la lista.

**FAQ**

- "No encuentro al cliente" -> Verifica el nombre o revisa la lista completa.

---

## Crear factura - Seleccionar productos

**Proposito**: elegir productos y cantidades.

**Flujo tipico**

1. Buscar producto.
2. Agregar o quitar cantidades.
3. Revisar total y cantidad de productos.
4. Tocar "Facturar".

**Acciones**

- Agregar: suma cantidad.
- Quitar: resta cantidad.
- Volver: regresa a seleccionar cliente.

**FAQ**

- "No puedo aumentar cantidad" -> No se puede exceder el stock disponible.

---

## Crear factura - Confirmar factura

**Proposito**: ajustar precios (si admin), elegir contado/credito y finalizar.

**Flujo tipico**

1. Revisar productos.
2. Ajustar precio (solo admin).
3. Elegir contado o credito.
4. Si es credito, ingresar pagado ahora.
5. Guardar, Exportar o Imprimir.

**Acciones**

- Guardar: guarda y vuelve a Home.
- Exportar: genera PDF y comparte.
- Imprimir: abre impresoras Bluetooth.

**FAQ**

- "No puedo editar precios" -> Necesitas permiso admin temporal.

---

## Cambios

**Proposito**: consultar y gestionar reportes de cambio.

**Flujo tipico**

1. Buscar por cliente.
2. Revisar lista agrupada por fecha.
3. Tocar un cambio para opciones.

**Acciones**

- Ver, Imprimir, Compartir o Editar.

**FAQ**

- "Como edito un cambio?" -> Toca el cambio y elige Editar.

---

## Ver cambio (modal)

**Proposito**: ver detalle de productos cambiados.

**Flujo tipico**

1. Desde Cambios toca un reporte.
2. Elige Ver.
3. Revisa productos y cantidades.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "Donde veo la fecha?" -> En el encabezado del modal.

---

## Crear cambio - Seleccionar productos

**Proposito**: registrar productos con mal estado y cantidad.

**Flujo tipico**

1. Buscar producto.
2. Agregar cantidad.
3. Tocar "Facturar" para confirmar.

**Acciones**

- Agregar: suma cantidad.
- Quitar: resta cantidad.

**FAQ**

- "Como agrego varios productos?" -> Repite agregar en la lista.

---

## Crear cambio - Confirmar reporte

**Proposito**: revisar y finalizar el reporte.

**Flujo tipico**

1. Revisar lista final.
2. Guardar, Exportar o Imprimir.

**Acciones**

- Guardar: guarda y vuelve a Home.
- Exportar: genera PDF y comparte.
- Imprimir: abre impresoras Bluetooth.

**FAQ**

- "Como imprimo el cambio?" -> En Confirmar reporte toca Imprimir.

---

## Devoluciones

**Proposito**: consultar y gestionar reportes de devolucion.

**Flujo tipico**

1. Buscar por cliente.
2. Revisar lista agrupada por fecha.
3. Tocar una devolucion para opciones.

**Acciones**

- Ver, Imprimir, Compartir o Editar.

**FAQ**

- "Como edito una devolucion?" -> Toca la devolucion y elige Editar.

---

## Ver devolucion (modal)

**Proposito**: ver detalle de la devolucion.

**Flujo tipico**

1. Desde Devoluciones toca un reporte.
2. Elige Ver.
3. Revisa productos, precios y total.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "Como veo el total?" -> En el resumen del modal.

---

## Crear devolucion - Seleccionar productos

**Proposito**: elegir productos devueltos.

**Flujo tipico**

1. Buscar producto.
2. Agregar cantidades.
3. Tocar "Facturar" para confirmar.

**Acciones**

- Agregar: suma cantidad.
- Quitar: resta cantidad.

**FAQ**

- "Puedo editar precios?" -> Solo con permiso admin temporal.

---

## Crear devolucion - Confirmar reporte

**Proposito**: revisar precios y total, y finalizar.

**Flujo tipico**

1. Revisar productos y total.
2. Ajustar precio si eres admin.
3. Guardar, Exportar o Imprimir.

**Acciones**

- Guardar: guarda y vuelve a Home.
- Exportar: genera PDF y comparte.
- Imprimir: abre impresoras Bluetooth.

**FAQ**

- "Como comparto la devolucion?" -> En Confirmar reporte toca Exportar.

---

## Crear gasto

**Proposito**: registrar un gasto del dia.

**Flujo tipico**

1. Selecciona el tipo de gasto.
2. Ingresa el monto.
3. Presiona "Crear gasto".

**Acciones**

- Tipos: comida, combustible, reparacion, parqueo, prestamo, otro.
- Crear gasto: guarda y vuelve a Home.

**FAQ**

- "No me deja crear gasto" -> Debes seleccionar tipo y monto mayor a 0.

---

## Reporte de cambios del dia (modal)

**Proposito**: ver resumen de cambios por producto y cantidad del dia.

**Flujo tipico**

1. En Inicio toca "Ver reporte de cambios".
2. Revisa la lista.
3. Imprime si es necesario.

**Acciones**

- Imprimir: abre impresoras Bluetooth.

**FAQ**

- "No hay cambios" -> El dia no tiene reportes de cambio.

---

## Reporte de productos del dia (modal)

**Proposito**: ver productos vendidos y cantidades del dia.

**Flujo tipico**

1. En Inicio toca "Ver reporte de productos".
2. Revisa la lista.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "No hay productos vendidos" -> No hay facturas con productos para ese dia.

---

## Impresoras Bluetooth (facturas)

**Proposito**: seleccionar impresora Bluetooth y emitir factura.

**Flujo tipico**

1. Selecciona la impresora.
2. Se conecta e imprime.

**Acciones**

- Cerrar: boton X.
- Reintentar: seleccionar de nuevo si falla.

**FAQ**

- "Error al conectarse" -> Vuelve a seleccionar la impresora o revisa Bluetooth.

---

## Impresoras Bluetooth (cambios)

**Proposito**: imprimir reporte de cambio.

**Flujo tipico**

1. Selecciona la impresora.
2. Se conecta e imprime.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "No aparece mi impresora" -> Asegurate de que este emparejada y con Bluetooth activo.

---

## Impresoras Bluetooth (devoluciones)

**Proposito**: imprimir reporte de devolucion.

**Flujo tipico**

1. Selecciona la impresora.
2. Se conecta e imprime.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "No imprime" -> Reintenta la conexion.

---

## Impresoras Bluetooth (existencias)

**Proposito**: imprimir reporte de existencias.

**Flujo tipico**

1. Selecciona la impresora.
2. Se conecta e imprime.

**Acciones**

- Cerrar: boton X.

**FAQ**

- "El reporte no muestra productos" -> Solo imprime productos con cantidad mayor a 0.

---

## Sin conexion a internet

**Proposito**: informar cuando no hay acceso a internet.

**Flujo tipico**

1. La pantalla aparece automaticamente si no hay conexion.
2. Se oculta al recuperar la conexion.

**Acciones**

- Ninguna. Solo esperar a que regrese la conexion.

**FAQ**

- "Por que no puedo usar la app?" -> No hay conexion activa.
