# Documentacion de uso - Facturador Offline (app movil)

Guia de uso por pantalla y flujo, enfocada en el usuario final. No incluye endpoints ni detalles tecnicos internos.

## Indice rapido

- Inicio de sesion
- Inicio (Resumen del dia)
- Menu rapido (boton +)
- Productos
- Clientes
- Facturas
- Cambios
- Devoluciones
- Gastos
- Configuracion
- Reportes rapidos del dia
- Impresion Bluetooth

## Inicio de sesion

**Proposito**: permitir el acceso a la app con usuario y contrasena.

**Flujo tipico**

1. Abre la app.
2. Ingresa Usuario y Contrasena.
3. Presiona Iniciar sesion.
4. Espera la carga inicial de datos.

**Acciones**

- Iniciar sesion: se habilita cuando hay datos en ambos campos.

**FAQ**

- "No puedo entrar" -> Verifica usuario y contrasena. Si hay error, intenta de nuevo con conexion activa.

## Inicio (Resumen del dia)

**Proposito**: ver el resumen general del dia y acceder a reportes rapidos.

**Flujo tipico**

1. Revisa tarjetas de resumen (contado, credito, total, devoluciones, gastos, abonos, total neto).
2. Abre el reporte de cambios o el reporte de productos.
3. Usa el boton + para crear un nuevo registro.

**Acciones**

- Ver reporte de cambios: muestra productos y cantidades de cambios del dia.
- Ver reporte de productos: muestra productos vendidos y cantidades del dia.
- Crear nuevo registro: usa el boton +.
- Cerrar sesion: desde el icono de logout.

**FAQ**

- "Como veo los reportes del dia?" -> En Inicio, toca "Ver reporte de cambios" o "Ver reporte de productos".

## Menu rapido (boton +)

**Proposito**: crear registros rapidamente.

**Flujo tipico**

1. Toca el boton +.
2. Elige el tipo de registro.
3. Completa el flujo correspondiente.

**Acciones**

- Crear factura
- Crear reporte de cambio
- Crear reporte de devolucion
- Crear reporte de gasto

**FAQ**

- "Como creo un registro nuevo?" -> Toca el boton + y elige el tipo.

## Productos

**Proposito**: consultar el catalogo de productos y existencias.

**Flujo tipico**

1. Abre Productos en el menu lateral.
2. Busca por nombre si necesitas filtrar.
3. Revisa precio y cantidad disponible.

**Acciones**

- Buscar: escribe en el campo de busqueda.

**FAQ**

- "No veo un producto" -> Usa la busqueda por nombre.

## Clientes

**Proposito**: consultar los clientes registrados.

**Flujo tipico**

1. Abre Clientes en el menu lateral.
2. Busca por nombre si necesitas filtrar.
3. Revisa telefono y direccion.

**Acciones**

- Buscar: escribe en el campo de busqueda.

**FAQ**

- "No aparece un cliente" -> Usa la busqueda y verifica que este sincronizado.

## Facturas

**Proposito**: revisar, imprimir, compartir o editar facturas del dia.

**Flujo tipico**

1. Abre Facturas en el menu lateral.
2. Cambia de pestana (Todas, Pagado, No pagado).
3. Toca una factura para abrir acciones.

**Acciones**

- Ver factura: muestra el detalle completo.
- Imprimir: envia a impresora Bluetooth.
- Compartir: genera PDF.
- Editar: disponible si no esta sincronizada.
- Eliminar: disponible si no esta sincronizada.

**FAQ**

- "Como edito una factura?" -> Abre la factura y selecciona Editar (solo si no esta sincronizada).
- "Como elimino una factura?" -> Abre la factura y selecciona Eliminar (solo si no esta sincronizada).

## Cambios

**Proposito**: gestionar reportes de cambio (producto en mal estado).

**Flujo tipico**

1. Abre Cambios en el menu lateral.
2. Busca por cliente si necesitas filtrar.
3. Toca un reporte para abrir acciones.

**Acciones**

- Ver: detalle de productos y cantidades.
- Imprimir: envia a impresora Bluetooth.
- Compartir: genera PDF.
- Editar: disponible si no esta sincronizado.
- Eliminar: disponible si no esta sincronizado.

**FAQ**

- "Como reimprimo un cambio?" -> Abre el reporte y elige Imprimir.

## Devoluciones

**Proposito**: gestionar reportes de devolucion.

**Flujo tipico**

1. Abre Devoluciones en el menu lateral.
2. Busca por cliente si necesitas filtrar.
3. Toca un reporte para abrir acciones.

**Acciones**

- Ver: detalle de productos y montos.
- Imprimir: envia a impresora Bluetooth.
- Compartir: genera PDF.
- Editar: disponible si no esta sincronizado.
- Eliminar: disponible si no esta sincronizado.

**FAQ**

- "Como reimprimo una devolucion?" -> Abre el reporte y elige Imprimir.

## Gastos

**Proposito**: registrar y consultar gastos del dia.

**Flujo tipico**

1. Abre Gastos en el menu lateral.
2. Revisa la lista agrupada por fecha.
3. Toca un gasto para eliminarlo si es necesario.

**Acciones**

- Eliminar: disponible si no esta sincronizado.

**FAQ**

- "No puedo eliminar un gasto" -> Si ya esta sincronizado, no se puede eliminar.

## Configuracion

**Proposito**: sincronizar datos y actualizar informacion.

**Flujo tipico**

1. Abre Configuracion en el menu lateral.
2. Elige el tipo de sincronizacion.
3. Espera a que termine el proceso.

**Acciones**

- Sincronizacion general: sube pendientes y actualiza datos.
- Sincronizar clientes: actualiza la lista de clientes.

**FAQ**

- "Como sincronizo?" -> En Configuracion, usa Sincronizacion general.

## Crear factura

**Proposito**: registrar una venta al cliente.

**Flujo tipico**

1. Toca el boton + y elige "Crear factura".
2. Selecciona un cliente de la lista.
3. Selecciona productos y cantidades.
4. Confirma la factura (estado y pago).
5. Guarda, exporta o imprime.

**Acciones**

- Seleccionar cliente: abre la pantalla de productos para ese cliente.
- Facturar: pasa a la confirmacion.
- Guardar / Exportar / Imprimir: finaliza el registro.

**FAQ**

- "Como facturo a un cliente?" -> Boton +, "Crear factura", selecciona cliente, agrega productos y confirma.

## Seleccionar cliente (factura, cambio o devolucion)

**Proposito**: elegir el cliente antes de agregar productos.

**Flujo tipico**

1. Busca el cliente por nombre.
2. Toca el cliente para continuar.

**Acciones**

- Buscar cliente: escribe en el campo de busqueda.

**FAQ**

- "Veo un monto al lado del cliente" -> Es el saldo de credito acumulado del cliente.

## Seleccionar productos (factura)

**Proposito**: armar la lista de productos a vender.

**Flujo tipico**

1. Busca un producto por nombre.
2. Presiona "Agregar".
3. Ajusta cantidad con + y -.
4. Presiona "Facturar".

**Acciones**

- Agregar: incluye el producto con cantidad 1.
- + / -: aumenta o reduce la cantidad.

**FAQ**

- "Como quito un producto?" -> Presiona el boton - hasta que se elimine.

## Confirmar factura

**Proposito**: revisar y finalizar la venta.

**Flujo tipico**

1. Verifica productos y precios.
2. Ajusta precio si aplica descuento.
3. Selecciona el estado (contado o credito).
4. Si es credito, ingresa el monto pagado.
5. Elige Guardar, Exportar o Imprimir.

**Acciones**

- Guardar: crea la factura sin imprimir ni compartir.
- Exportar: genera PDF para compartir.
- Imprimir: abre la pantalla de impresoras Bluetooth.

**FAQ**

- "Como registro un abono?" -> Selecciona credito e ingresa el monto pagado.

## Editar factura

**Proposito**: corregir una factura pendiente.

**Flujo tipico**

1. Abre Facturas y toca una factura.
2. Selecciona "Editar".
3. Ajusta cantidades y precios.
4. Guarda, exporta o imprime.

**Acciones**

- Editar: solo disponible si la factura no esta sincronizada.

**FAQ**

- "No veo editar" -> Solo aparece en facturas con status pendiente.

## Crear reporte de cambio

**Proposito**: registrar productos en mal estado.

**Flujo tipico**

1. Boton + -> "Crear reporte de cambio".
2. Selecciona cliente.
3. Selecciona productos y cantidades.
4. Confirma el reporte.

**Acciones**

- Guardar / Exportar / Imprimir: finaliza el reporte.

**FAQ**

- "Como hago un cambio?" -> Boton +, selecciona cliente, agrega productos y confirma.

## Seleccionar productos (cambio)

**Proposito**: elegir productos y cantidades del cambio.

**Flujo tipico**

1. Busca un producto.
2. Usa + y - para ajustar cantidad.
3. Presiona "Cambios" para continuar.

**Acciones**

- + / -: ajusta cantidad.

**FAQ**

- "Como reinicio la busqueda?" -> Usa el boton de limpiar para borrar el texto.

## Confirmar reporte de cambio

**Proposito**: revisar y finalizar el reporte.

**Flujo tipico**

1. Verifica la lista de productos.
2. Elige Guardar, Exportar o Imprimir.

**Acciones**

- Guardar: registra el reporte sin imprimir.
- Exportar: genera PDF para compartir.
- Imprimir: abre la pantalla de impresoras Bluetooth.

**FAQ**

- "Como comparto un cambio?" -> Usa Exportar en la pantalla del reporte.

## Editar reporte de cambio

**Proposito**: corregir un reporte pendiente.

**Flujo tipico**

1. Abre Cambios y toca un reporte.
2. Selecciona "Editar".
3. Ajusta productos y cantidades.
4. Guarda, exporta o imprime.

**Acciones**

- Editar: solo disponible si el reporte no esta sincronizado.

**FAQ**

- "No veo editar" -> Solo aparece en reportes con status pendiente.

## Crear reporte de devolucion

**Proposito**: registrar la devolucion de productos.

**Flujo tipico**

1. Boton + -> "Crear reporte de devolucion".
2. Selecciona cliente.
3. Selecciona productos y cantidades.
4. Confirma el reporte.

**Acciones**

- Guardar / Exportar / Imprimir: finaliza el reporte.

**FAQ**

- "Como registro una devolucion?" -> Boton +, selecciona cliente, agrega productos y confirma.

## Seleccionar productos (devolucion)

**Proposito**: elegir productos a devolver.

**Flujo tipico**

1. Busca un producto.
2. Presiona "Agregar".
3. Ajusta cantidad con + y -.
4. Presiona "Devolucion" para continuar.

**Acciones**

- Agregar: incluye el producto.
- + / -: ajusta cantidad.

**FAQ**

- "No encuentro un producto" -> Usa la busqueda por nombre.

## Confirmar reporte de devolucion

**Proposito**: revisar montos y finalizar el reporte.

**Flujo tipico**

1. Verifica productos y total.
2. Elige Guardar, Exportar o Imprimir.

**Acciones**

- Guardar: registra el reporte sin imprimir.
- Exportar: genera PDF para compartir.
- Imprimir: abre la pantalla de impresoras Bluetooth.

**FAQ**

- "Como comparto una devolucion?" -> Usa Exportar en la pantalla del reporte.

## Editar reporte de devolucion

**Proposito**: corregir un reporte pendiente.

**Flujo tipico**

1. Abre Devoluciones y toca un reporte.
2. Selecciona "Editar".
3. Ajusta productos y montos.
4. Guarda, exporta o imprime.

**Acciones**

- Editar: solo disponible si el reporte no esta sincronizado.

**FAQ**

- "No veo editar" -> Solo aparece en reportes con status pendiente.

## Crear reporte de gasto

**Proposito**: registrar un gasto del dia.

**Flujo tipico**

1. Boton + -> "Crear reporte de gasto".
2. Selecciona el tipo de gasto.
3. Ingresa el monto.
4. Presiona "Crear gasto".

**Acciones**

- Seleccionar tipo: marca una categoria.
- Crear gasto: registra el gasto.

**FAQ**

- "No me deja crear" -> Verifica que el monto sea numerico y mayor a cero.

## Reportes rapidos del dia

**Proposito**: ver resúmenes por producto en el dia.

**Flujo tipico**

1. Desde Inicio, abre el reporte de cambios o productos.
2. Revisa cantidades y listas.
3. Imprime si necesitas un ticket.

**Acciones**

- Reporte de cambios: imprime el resumen del dia.
- Reporte de productos: solo lectura.

**FAQ**

- "Como imprimo el reporte de cambios?" -> En Inicio, abre "Ver reporte de cambios" y pulsa Imprimir.

## Impresion Bluetooth

**Proposito**: imprimir facturas y reportes en impresoras Bluetooth.

**Flujo tipico**

1. Presiona Imprimir en el registro.
2. Selecciona un dispositivo Bluetooth.
3. Espera la conexion y el envio del ticket.

**Acciones**

- Seleccionar dispositivo: inicia la impresion.
- Reintentar: si falla la conexion, selecciona de nuevo.

**FAQ**

- "No encuentra la impresora" -> Verifica Bluetooth activo y permisos en Android.
