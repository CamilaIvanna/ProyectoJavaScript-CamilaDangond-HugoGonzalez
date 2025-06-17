# Banco Acme - Aplicación Web de Autogestión Bancaria

Aplicación desarrollada como solución integral de autogestión para los usuarios del Banco Acme. Permite el registro, gestión de cuenta, movimientos financieros, pagos y generación de extractos y certificados. Todo con persistencia de datos en el navegador usando JSON.

---

## 🌐 Link del Repositorio

👉 [https://github.com/CamilaIvanna/ProyectoJavaScript-CamilaDangond-HugoGonzalez](https://github.com/CamilaIvanna/ProyectoJavaScript-CamilaDangond-HugoGonzalez)

---

## 👩‍💻 Creadores

- **Hugo Andrés González**
- **Camila Ivanna Dangond**

---
### 📂 Estructura del Proyecto  
**ProyectoJavaScript-CamilaDangond-HugoGonzalez/**  
├── **html/**  
│   ├── certificado.html – Certificado bancario  
│   ├── consignaciones.html – Enviar dinero  
│   ├── dashboard.html – Panel principal del usuario  
│   ├── extracto.html – Generar extracto mensual  
│   ├── footer.html – Pie de página  
│   ├── navbar.html – Barra de navegación  
│   ├── recargar.html – Recarga de cuenta  
│   ├── recuperacionPsw.html – Recuperación de contraseña  
│   ├── registro.html – Registro de usuario  
│   ├── retiro.html – Retiro de dinero  
│   ├── servicios.html – Pago de servicios  
│   └── transacciones.html – Resumen de movimientos  
├── **imagenes/** – Íconos, logos e imágenes usadas en la interfaz  
├── **js/**  
│   ├── certificado.js – Lógica para generar certificados  
│   ├── comprobantes.js – Generación de comprobantes  
│   ├── dashboard.js – Interacciones en el dashboard  
│   ├── recargar.js – Lógica para recargas  
│   ├── recuperarPsw.js – Manejo de recuperación de contraseña  
│   ├── re


## 🧾 Funcionalidades Completadas

### 🔐 Inicio de Sesión
- Formulario con tipo y número de identificación + contraseña.
- Validación de credenciales con mensajes de éxito o error.
- Enlaces a "Crear cuenta" y "Recuperar contraseña".

### 📝 Registro de Usuario
- Formulario completo con validación en tiempo real.
- Generación de número de cuenta y fecha automática.
- Muestra resumen del registro.
- Botones de cancelar y redirección al login.

### 🔑 Recuperación de Contraseña
- Verificación por identificación y correo electrónico.
- Asignación de nueva contraseña con validación.
- Botón cancelar para volver al login.

### 🏠 Dashboard Principal
- Resumen estilizado de cuenta (tarjeta con número de cuenta, saldo y fecha de creación).
- Menú de navegación con las siguientes opciones:
  - **Resumen de Transacciones** (últimas 10 transacciones + opción de imprimir).
  - **Consignación Electrónica** (formulario, actualización de saldo, impresión de resumen).
  - **Retiros de Dinero** (formulario, validación, impresión).
  - **Pago de Servicios Públicos** (servicio seleccionado, referencia y valor, impresión).
  - **Extracto Bancario** (por mes y año, reporte con movimientos).
  - **Certificado Bancario** (descargable/imprimible).
  - **Cerrar Sesión** (redirección al login).

### 💾 Persistencia de Datos
- Uso de `localStorage` para guardar:
  - Información de usuarios
  - Cuentas bancarias
  - Transacciones
- Estructura de datos en formato JSON.

---

## 📱 Diseño Responsive

- Compatible con dispositivos **móviles**, **tablets** y **desktop**.
- Utiliza **fuentes modernas** (Google Fonts).
- Paleta de colores profesional:
- Interfaz clara y mensajes de error/success destacados.

---

## 🚀 Instrucciones para Instalar y Ejecutar

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/CamilaIvanna/ProyectoJavaScript-CamilaDangond-HugoGonzalez
