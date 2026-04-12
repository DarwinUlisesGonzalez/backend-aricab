# Documentacion de uso (app escritorio)

Este documento describe como usar cada apartado de la aplicacion. Esta pensado para alimentar un chatbot de soporte a usuarios finales. No incluye endpoints ni detalles tecnicos.

## Navegacion general

- Sidebar a la izquierda con accesos directos: Inicio, Productos, Clientes, Rutas, Facturas, Cambios, Devoluciones, Creditos, Recuperaciones, Gastos, Personal.
- El sidebar se puede colapsar o expandir con el boton de flechas.
- En la parte inferior hay un switch de Dark mode para cambiar tema claro/oscuro.
- Muchas acciones importantes abren modales. Se cierran con la X o haciendo click fuera.
- Algunos menus contextuales se abren con click derecho sobre una tarjeta (por ejemplo Facturas y Rutas).
- En modo sin conexion se muestra una pantalla con mensaje y un juego de 3 en raya. No es un error; es un modo offline.

## Convenciones utiles

- Doble click sobre un nombre (producto o cliente) abre edicion.
- Click derecho sobre un nombre (producto o cliente) muestra opcion de eliminar.
- Boton Guardar/Imprimir/Exportar suele generar PDF y termina el flujo.
- Los filtros por fecha usan calendario; si no seleccionas fecha, muestra alerta.

## Inicio

**Proposito**: ver resumen general y reportes rapidos.

**Flujo tipico**

1. Revisa tarjetas de resumen (facturas de credito, monto total, estado del sistema).
2. Genera un reporte rapido con rango de fechas.
3. Consulta la comparacion semanal (global y por ruta).

**Acciones**

- Reportes rapidos: seleccionar Fecha inicio y Fecha final, luego Crear reporte.
- En el reporte: puedes Imprimir o Guardar.
- Comparacion semanal: grafico de ventas de las ultimas dos semanas.
- Comparacion semanal por ruta: seleccionar una ruta y ver el grafico de esa ruta.

**FAQ**

- "Como genero un reporte?" -> En Inicio, selecciona fechas y presiona Crear reporte. Luego Imprimir o Guardar.
- "Como comparo ventas entre semanas?" -> En Inicio, mira la grafica de comparacion semanal.

## Productos

**Proposito**: administrar catalogo y costos.

**Flujo tipico**

1. Buscar productos por nombre.
2. Agregar un producto nuevo.
3. Editar o eliminar productos existentes.
4. Imprimir precios sugeridos.

**Acciones**

- Agregar producto: nombre, cantidad, precio compra, precio venta.
- Editar producto: doble click en el nombre para abrir el modal.
- Eliminar producto: click derecho sobre el nombre para abrir el boton de eliminar.
- Precios sugeridos: boton que pide confirmacion y genera PDF.

**Notas visibles**

- No permite precio compra mayor al precio venta.
- Resumen muestra total compra, total venta y diferencia.

**FAQ**

- "Como edito un producto?" -> Doble click en el nombre dentro de la tabla.
- "Como elimino un producto?" -> Click derecho en el nombre y confirmar.
- "Como imprimo precios sugeridos?" -> Boton Precios sugeridos y confirma.

## Clientes

**Proposito**: gestionar clientes y su saldo.

**Flujo tipico**

1. Buscar cliente por nombre.
2. Agregar nuevo cliente.
3. Editar o eliminar un cliente.

**Acciones**

- Agregar cliente: nombres, telefono y direccion.
- Editar cliente: doble click en el nombre.
- Eliminar cliente: click derecho en el nombre.

**Notas visibles**

- El saldo del cliente se calcula con facturas de credito pendientes.

**FAQ**

- "No encuentro un cliente" -> Usa el buscador por nombre.
- "Como edito un cliente?" -> Doble click en su tarjeta.

## Rutas

**Proposito**: administrar rutas, inventario y registros (hojas).

**Vista principal de rutas**

- Agregar ruta: usuario, contrasena y dias asignados.
- Productos: abre la gestion de productos por ruta.
- Inventario: muestra resumen por producto (compra, venta, diferencia).
- Menu contextual (click derecho) con acciones avanzadas.

**Menu contextual de ruta**

- Editar ruta: actualiza usuario y contrasena.
- Permiso admin: habilita permiso administrativo para esa ruta.
- Imprimir registro: genera PDF del registro seleccionado.
- Resumen de registro: abre el resumen de un registro terminado.
- Terminar registro: finaliza el registro activo.
- Eliminar registro: borra un registro terminado.
- Eliminar ruta: elimina la ruta completa.

**Productos por ruta**

1. Selecciona dia.
2. Selecciona hoja (registro) activa de esa ruta.
3. Ajusta cantidades con + y - o editando el input.
4. Presiona Guardar para aplicar cambios.

**Crear hoja (registro)**

- Se crea desde Productos por ruta.
- Selecciona fecha de inicio y fecha final.
- Genera un registro nuevo con productos en 0.

**Resumen de registros**

- Desde Rutas puedes generar un resumen conjunto de varios registros.
- Selecciona registros y presiona Generar.

**FAQ**

- "No puedo cambiar de hoja" -> Si ya editaste una hoja, debes Guardar antes de cambiar.
- "Como termino un registro?" -> Click derecho en ruta y selecciona Terminar registro.

## Facturas

**Proposito**: crear, revisar y administrar facturas.

**Crear factura (Administrador)**

1. Presiona Crear factura.
2. Selecciona cliente.
3. Selecciona productos y cantidades.
4. En resumen puedes ajustar precio, tipo (credito/contado) y monto pagado.
5. Elige Guardar, Exportar o Imprimir.

**Acciones en facturas existentes**

- Click derecho sobre una factura para abrir el menu.
- Ver factura: detalle de productos, total, pagado y saldo.
- Info factura: desglose venta/compra/ganancia.
- Editar factura: solo si fue creada por Administrador.
- Guardar o Imprimir: genera PDF.
- Abonar: disponible solo si hay saldo pendiente.
- Eliminar: requiere confirmacion.

**Filtros y vista**

- Filtros: por rango de fechas, por cliente o solo creditos no cancelados.
- Filtro por ruta en el header.
- Tabs: Todas / Pagadas / No pagadas.

**Informacion del dia**

- Boton Informacion del dia muestra resumen de ventas.
- Puedes filtrar por ruta para ver compras, ventas, descuentos, devoluciones, gastos y total.

**FAQ**

- "Como abono una factura?" -> Click derecho sobre la factura y selecciona Abonar.
- "Como filtro facturas por cliente?" -> Usa Filtros y elige cliente.

## Cambios

**Proposito**: ver cambios de productos registrados por ruta.

**Flujo tipico**

1. Filtrar por fecha.
2. Filtrar por ruta.
3. Ver detalle o eliminar registro.
4. Ver resumen por producto.

**Acciones**

- Ver: abre modal con lista de productos y cantidades.
- Eliminar: requiere confirmacion.
- Ver resumen: muestra conteo por producto en el periodo filtrado.

**FAQ**

- "Como veo el resumen de cambios?" -> Boton Ver resumen.
- "Como filtro por fecha?" -> Selecciona fecha y presiona Filtrar.

## Devoluciones

**Proposito**: revisar devoluciones y su detalle.

**Flujo tipico**

1. Filtrar por fecha.
2. Abrir un registro con Ver.
3. Eliminar si es necesario.

**Acciones**

- Ver: muestra detalle con productos y montos.
- Eliminar: requiere confirmacion.

**FAQ**

- "Como veo el detalle de una devolucion?" -> Boton Ver en la tarjeta.
- "Como elimino una devolucion?" -> Boton Eliminar y confirmar.

## Creditos

**Proposito**: administrar creditos con proveedores.

**Flujo tipico**

1. Crear credito (proveedor, monto, abono, fecha inicio/fin).
2. Abonar montos parciales.
3. Cancelar (pagar todo) o eliminar.

**Acciones**

- Crear credito: formulario con fechas.
- Abonar: abre modal para ingresar monto.
- Cancelar: paga el saldo restante.
- Eliminar: borra el credito.

**FAQ**

- "Como registro un credito?" -> Boton Crear credito.
- "Como pago todo el credito?" -> Boton Cancelar.

## Recuperaciones

**Proposito**: ver cobros de recuperacion por fecha.

**Flujo tipico**

1. Filtrar por fecha.
2. Revisar monto recuperado.
3. Eliminar si es necesario.

**Acciones**

- Eliminar: requiere confirmacion.

**FAQ**

- "Como filtro recuperaciones?" -> Selecciona fecha y presiona Filtrar.

## Gastos

**Proposito**: revisar gastos por ruta y fecha.

**Flujo tipico**

1. Filtrar por fecha.
2. Revisar total filtrado.
3. Eliminar un gasto.

**Acciones**

- Eliminar: requiere confirmacion.

**FAQ**

- "Como elimino un gasto?" -> Boton Eliminar en la tarjeta.

## Personal

**Proposito**: gestionar expedientes del personal.

**Flujo tipico**

1. Agregar personal con datos completos y foto.
2. Editar expediente.
3. Eliminar registro.

**Validaciones visibles**

- Cedula: formato 000-000000-0000A
- Fecha: formato dd-mm-aaaa
- Telefono: formato 0000-0000

**Acciones**

- Agregar personal: abre formulario completo.
- Editar expediente: boton en la tarjeta del empleado.
- Eliminar registro: requiere confirmacion.

**FAQ**

- "No me acepta la cedula" -> Usa el formato 000-000000-0000A.
- "Como cambio la foto?" -> En el formulario, boton Actualizar foto.

## Glosario rapido

- Ruta: usuario o facturador asignado a dias de trabajo.
- Hoja / Registro: periodo de trabajo por ruta (inicio/fin) con productos.
- Cambios: ajustes de productos por ruta o cliente.
- Devoluciones: productos devueltos y su monto total.
- Creditos: cuentas por pagar a proveedores.
- Recuperaciones: cobros de saldos a clientes.
- Gastos: egresos operativos por ruta.
