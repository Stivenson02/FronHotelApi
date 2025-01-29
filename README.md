# Frontend del Sistema de Gestión Hotelera

Este proyecto es el frontend del sistema de gestión hotelera, desarrollado en React con TypeScript.

## Requisitos previos

Asegúrate de tener instalado:

- Node.js en la versión **22.13.1**

Puedes verificar tu versión de Node con el siguiente comando:

```sh
node -v
```

## Instalación

1. Clona el repositorio en tu máquina local:
   ```sh
   git clone <URL_DEL_REPOSITORIO>
   ```
2. Accede al directorio del proyecto:
   ```sh
   cd hotel-management-frontend
   ```
3. Instala las dependencias con:
   ```sh
   npm install
   ```

## Configuración

Si el proyecto requiere configuraciones especiales, agrégalas en un archivo `.env` en la raíz del proyecto.

## Ejecución del Proyecto

Para iniciar el servidor de desarrollo, usa:

```sh
npm run dev
```

Esto iniciará la aplicación en modo desarrollo y podrás acceder a ella desde tu navegador en la URL indicada en la terminal.

## Construcción para Producción

Si deseas generar una versión optimizada para producción, ejecuta:

```sh
npm run build
```

Esto creará una carpeta `dist` con los archivos listos para ser desplegados en un servidor.

## Notas Adicionales

- Asegúrate de tener configurada la API backend correctamente para que el frontend pueda comunicarse sin problemas.
- Si hay cambios en la API, podría ser necesario actualizar el archivo de configuración de Axios (`api/axios.js`).

