# 🍽️ Sistema de Control de Comidas

Sistema moderno y responsivo para gestionar personas y registrar sus comidas diarias (desayuno, almuerzo y cena).

## ✨ Características

- 👥 **Gestión de Personas**: Registra personas con nombre completo
- 📋 **Control de Comidas**: Crea registros con nombre personalizado (desayuno, almuerzo o cena)
- ✅ **Seguimiento**: Marca quién ha comido y quién falta
- 🕐 **Registro de Hora**: Guarda automáticamente la fecha y hora de entrega de cada comida
- 📊 **Estadísticas**: Ve en tiempo real cuántos comieron y cuántos faltan
- 🔴 **Alertas Visuales**: Borde rojo en comidas con personas pendientes
- 💾 **Exportación**: Descarga los datos en formato TXT con fecha/hora de entrega
- ☁️ **Base de Datos**: Soporta Supabase (PostgreSQL) o LocalStorage
- 📱 **Responsivo**: Funciona perfectamente en móviles, tablets y escritorio
- 🎨 **Diseño Moderno**: Interfaz intuitiva con colores atractivos

## 🚀 Cómo usar

### Instalación

```bash
npm install
```

### Configurar Base de Datos (Opcional)

El sistema funciona con **LocalStorage** por defecto. Para usar **Supabase**:

1. Lee la guía completa: `CONFIGURAR_SUPABASE.md`
2. Crea un proyecto en Supabase
3. Ejecuta el script `supabase-schema.sql`
4. Copia `.env.example` a `.env` y configura tus credenciales

### Ejecutar en modo desarrollo

```bash
npm run dev
```

El sistema se abrirá en `http://localhost:5173`

### Compilar para producción

```bash
npm run build
```

## 📖 Guía de uso

### 1. Registrar Personas
- Ve a la pestaña "👥 Personas"
- Ingresa el nombre completo
- Haz clic en "➕ Agregar Persona"
- Puedes editar o eliminar personas en cualquier momento

### 2. Crear Comida
- Ve a la pestaña "📋 Comidas"
- Ingresa un nombre para la comida (ej: "Desayuno del Viernes")
- Selecciona el tipo: Desayuno 🌅, Almuerzo ☀️ o Cena 🌙
- Haz clic en "➕ Crear"
- Se creará automáticamente con la fecha actual

### 3. Registrar Asistencia
- Haz clic en cada persona para marcar si comió o no
- Se registra automáticamente la fecha y hora de entrega
- Las estadísticas se actualizan en tiempo real
- Verde ✅ = Comió (muestra hora de entrega)
- Gris ⏳ = Pendiente
- Borde rojo 🔴 = Comida con personas pendientes

### 4. Exportar Datos
- Haz clic en "💾 Exportar a TXT"
- Se descargará un archivo con todo el historial

## 💾 Almacenamiento

El sistema soporta dos modos de almacenamiento:

### LocalStorage (Por defecto)
- Los datos se guardan en el navegador
- No requiere configuración
- Funciona sin internet
- Los datos son locales a cada navegador

### Supabase (Opcional)
- Base de datos PostgreSQL en la nube
- Acceso desde cualquier dispositivo
- Datos sincronizados en tiempo real
- Requiere configuración (ver `CONFIGURAR_SUPABASE.md`)

## 🎨 Tecnologías

- React 18
- Vite 5
- Supabase (PostgreSQL)
- CSS moderno con gradientes
- LocalStorage como fallback

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Móviles iOS y Android
- ✅ Tablets
- ✅ Escritorio

---

Desarrollado con ❤️ para facilitar el control de comidas
