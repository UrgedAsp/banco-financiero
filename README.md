# Product Management App - React Native (Expo)

Este proyecto es una aplicación móvil desarrollada con **React Native** y **Expo** para la gestión de productos financieros. Se ha diseñado siguiendo estándares modernos de desarrollo para garantizar una aplicación robusta, escalable y fácil de mantener.

## 🚀 Instrucciones de Configuración

Sigue estos pasos para poner en marcha el proyecto en tu entorno local:

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno:**

- Renombra el archivo `.env.template` a `.env`.
- Edita el archivo `.env` y actualiza la variable `EXPO_PUBLIC_BANK_API_URL` con la URL de tu API local o remota.

_Ejemplo:_

```env
EXPO_PUBLIC_BANK_API_URL="http://192.168.0.1:3002/bp"

```

3. **Iniciar el proyecto:**

```bash
npm start

```

---

## 🏗️ Arquitectura y Stack Tecnológico

El proyecto se construyó bajo los siguientes pilares técnicos:

### 🏛️ Clean Architecture

Se aplicó una **Arquitectura Limpia** para separar la lógica de negocio de la lógica de interfaz. Esto permite que el núcleo de la aplicación sea independiente de marcos de trabajo o librerías externas, facilitando su mantenimiento y escalabilidad a largo plazo.

### 📝 Manejo de Formularios (Formik & Yup)

Para optimizar el manejo de formularios y validaciones, se utilizaron **Formik** y **Yup**. Esta combinación permite:

- Reducir significativamente el _boilerplate_ de código.
- Centralizar las reglas de validación en esquemas legibles.
- Facilitar el manejo de errores y estados de los campos en tiempo real.

### 🌐 Networking y Sincronización (Axios & TanStack Query)

Utilizamos **Axios** junto a **TanStack Query (React Query)** para gestionar la capa de red de manera eficiente. Esto nos ofrece utilidades clave para proyectos móviles:

- **Manejo de caché:** Mejora la velocidad de respuesta al evitar peticiones repetitivas.
- **Reintentos automáticos:** Mejora la resiliencia en caso de pérdidas temporales de conexión.
- **Manejo de estados:** Gestión nativa de estados de carga (`isLoading`) y errores.

### 🧠 Gestión de Estado (Zustand)

Se implementó **Zustand** para el manejo del estado global. Es una solución moderna, ligera y rápida que facilita la comunicación entre diferentes pantallas del aplicativo sin las complicaciones de Redux.

---

## 💡 Notas Importantes del Proyecto

- **Componentes UI optimizados:** Se crearon componentes como `InputDate` que despliegan un selector tipo modal en ambos sistemas (iOS/Android), asegurando una experiencia de usuario consistente.
- **Validaciones Avanzadas:** El formulario de registro incluye validación asíncrona para el ID del producto y cálculos automáticos de fechas (ej. la fecha de revisión se calcula automáticamente a un año de la fecha de liberación).
- **Asistencia con IA:** Se utilizó **Gemini 3 Flash** como colaborador estratégico durante el desarrollo para la resolución de dudas técnicas, redacción de documentación profesional y optimización de los tiempos de entrega de la prueba.

---
