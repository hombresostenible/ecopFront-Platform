import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5173, // Aquí se cambia el puerto en el front
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para producción        -----Agregué esto para poder descargar los Excels de registro masivo de Activos, Productos, etc
    assetsDir: 'assets', // Carpeta de activos en producción    -----Agregué esto para poder descargar los Excels de registro masivo de Activos, Productos, etc
  },
})