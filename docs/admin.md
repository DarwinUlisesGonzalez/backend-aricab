# Documentacion de uso - Facturador Offline (app movil)

Guia de uso por pantalla y flujo, enfocada en el usuario final. No incluye endpoints ni detalles tecnicos internos.

## Indice rapido

- Inicio de sesion
- Inicio (Resumen del dia)
- Clientes
- Facturas

## Inicio de sesion

**Proposito**: permitir el acceso a la app con usuario y contrasena.

**Flujo tipico**

1. Abre la app.
2. Ingresa Usuario y Contrasena.
3. Presiona Iniciar.
4. Si las credenciales son correctas, accedes al menu principal.

**Acciones**

- Iniciar: valida las credenciales y entra a la app.
- Usar FaceID (solo iOS): intenta autenticar con FaceID.

**FAQ**

- "No puedo entrar" -> Verifica usuario y contrasena. Si hay error, intenta de nuevo.
- "No aparece FaceID" -> Solo esta disponible en iOS y si el dispositivo tiene FaceID configurado.

## Inicio

**Proposito**: mostrar una lista de usuarios y permitir asignar permiso de administrador.

**Flujo tipico**

1. Entra a la pestaña principal (Inicio).
2. Ves la lista de usuarios.
3. Tocas un usuario para otorgar permiso de administrador.
4. Confirmas la accion en el aviso.

**Acciones**

- Tocar usuario: abre una confirmacion para dar permiso de administrador.
- Cancelar: no realiza cambios.
- Si: confirma el permiso de administrador.

**FAQ**

- "No veo usuarios" -> Si la lista esta vacia, espera a que cargue o verifica conexion.

## Clientes

**Proposito**: ver, buscar, agregar, editar y eliminar clientes.

**Flujo tipico**

1. Entra a la pestaña Clientes.
2. Usa el buscador para filtrar por nombre.
3. Toca un cliente para abrir opciones.
4. Elige Editar o Eliminar.
5. Para agregar, toca Agregar Cliente y completa el formulario.

**Acciones**

- Buscar cliente: filtra por nombre mientras escribes.
- Tocar cliente: abre el menu de opciones (Editar o Eliminar).
- Agregar Cliente: abre un formulario para crear un nuevo cliente.
- Crear: guarda el nuevo cliente.
- Cerrar: cierra el formulario de alta.
- Editar Cliente: abre el formulario de edicion con datos actuales.
- Editar: guarda los cambios del cliente.
- Eliminar Cliente: solicita confirmacion antes de eliminar.

**FAQ**

- "No aparece el cliente" -> Usa el buscador o revisa que el nombre este escrito correctamente.
- "No me deja crear" -> Todos los campos son obligatorios.
- "El cliente no se actualiza" -> Sal y vuelve a entrar a Clientes para recargar la lista.

## Facturas

**Proposito**: consultar y administrar las facturas del dia.

**Flujo tipico**

1. Entra a la pestaña Facturas.
2. Revisa la lista con nombre, facturador, fecha, hora y totales.
3. Toca una factura para abrir el menu de acciones.
4. Elige Cambiar cliente o Eliminar factura.

**Acciones**

- Tocar factura: abre el menu de acciones.
- Cambiar cliente: abre el buscador de clientes y solicita confirmacion.
- Buscar cliente: filtra clientes por nombre (muestra hasta 20 resultados).
- Eliminar factura: solicita confirmacion antes de eliminar.
- Cerrar: cierra el modal de seleccion de cliente.

**FAQ**

- "No hay facturas" -> Si no hay facturas del dia, la lista aparecera vacia.
- "No veo clientes al cambiar" -> Escribe en el buscador para filtrar.
