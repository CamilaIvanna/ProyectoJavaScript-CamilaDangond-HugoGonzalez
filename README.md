# 🏦 Banco Acme - Aplicación Web de Autogestión Bancaria

<p align="center">
  <img src="imagenes/iconLogo.png" alt="Logo Banco Acme" width="150">
</p>

Aplicación desarrollada como 
 integral de autogestión para los usuarios del Banco Acme. Permite el registro de usuarios, la gestión de cuentas, realización de transacciones, pagos de servicios, generación de extractos y certificados. Toda la información se persiste en el navegador usando `localStorage` con estructuras JSON.

---

## Diseño UX UIS

👉 [Figma: Proyecto JavaScript - Camila Dangond & Hugo González](https://www.figma.com/design/gWPi8ylS6TtW7UXMly8LJ4/ACME-bank?node-id=0-1&t=GuPT4Gccgh4mcN09-1)
---

## 🌐 Repositorio

👉 [GitHub: Proyecto JavaScript - Camila Dangond & Hugo González](https://github.com/CamilaIvanna/ProyectoJavaScript-CamilaDangond-HugoGonzalez)

---

## 👨‍💻 Creadores

- **Hugo Andrés González**
- **Camila Ivanna Dangond**

---



## 🔑 Funcionalidades Principales

### Inicio de Sesión
- Formulario con tipo/número de identificación y contraseña.
- Validación y redirección al `dashboard`.

### Registro de Usuario
- Formulario con validación en tiempo real.
- Generación automática de número de cuenta y fecha de creación.
- Resumen final del registro.

### Recuperación de Contraseña
- Validación por número de documento y correo electrónico.
- Generación de nueva contraseña con confirmación.

### Panel de Usuario (Dashboard)
- Tarjeta con resumen de cuenta.
- Acceso a todas las funciones principales:
  - Resumen de transacciones.
  - Consignación electrónica.
  - Retiros.
  - Pagos de servicios.
  - Generación de extracto.
  - Certificado bancario.

### Generación de Documentos
- Archivos imprimibles para:
  - Certificados
  - Extractos
  - Comprobantes de transacción

### Persistencia de Datos
- Uso de `localStorage` para guardar usuarios, cuentas, transacciones y configuraciones.

---

## 📱 Diseño y Estilo

- **Responsive**: compatible con móviles, tablets y pantallas grandes.
- **Estilos personalizados**: múltiples archivos CSS por módulo.
- **Paleta profesional**: colores institucionales, íconos y fuentes modernas.

---

## 🚀 Instrucciones para Ejecutar el Proyecto

1. Clona el repositorio:
   ```bash
   git clone https://github.com/CamilaIvanna/ProyectoJavaScript-CamilaDangond-HugoGonzalez 

## 📁 Estructura del Proyecto
```bash
ProyectoJavaScript-CamilaDangond-HugoGonzalez/
├── html/
│   ├── certificado.html
│   ├── consignaciones.html
│   ├── dashboard.html
│   ├── extracto.html
│   ├── footer.html
│   ├── navbar.html
│   ├── recargar.html
│   ├── recuperacionPsw.html
│   ├── registro.html
│   ├── retiro.html
│   ├── servicios.html
│   └── transacciones.html
├── imagenes/
│   └── logo.png
├── js/
│   ├── certificado.js
│   ├── comprobantes.js
│   ├── dashboard.js
│   ├── recargar.js
│   ├── recuperarPsw.js
│   ├── registro.js
│   ├── resumen.js
│   ├── retorno.js
│   └── script.js
├── styles/
│   ├── certificado.css
│   ├── comprobantes.css
│   ├── dashboard.css
│   ├── footer.css
│   ├── index.css
│   ├── navbar.css
│   ├── normalize.css
│   ├── recuperarPsw.css
│   ├── registro.css
│   ├── style.css
│   └── transacciones.css
├── index.html
└── README.md

   
