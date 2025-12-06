# ⚡ Instalación Rápida

## 🚀 Opción 1: Modo Local (Sin Base de Datos)

### Paso 1: Instalar dependencias
```bash
cd sistema-comidas
npm install
```

### Paso 2: Ejecutar
```bash
npm run dev
```

### Paso 3: Abrir
```
http://localhost:5173
```

✅ **Listo!** El sistema funcionará con LocalStorage.

---

## ☁️ Opción 2: Con Supabase (Base de Datos en la Nube)

### Paso 1: Instalar dependencias
```bash
cd sistema-comidas
npm install
```

### Paso 2: Crear proyecto en Supabase
1. Ve a https://supabase.com
2. Crea una cuenta (gratis)
3. Crea un nuevo proyecto
4. Espera 2-3 minutos

### Paso 3: Crear las tablas
1. En Supabase, ve a **SQL Editor**
2. Abre el archivo `supabase-schema.sql`
3. Copia TODO el contenido
4. Pégalo en el editor SQL
5. Haz clic en **Run**

### Paso 4: Obtener credenciales
1. En Supabase, ve a **Settings** → **API**
2. Copia:
   - **Project URL**
   - **anon public key**

### Paso 5: Configurar variables de entorno
1. Copia el archivo `.env.example` a `.env`
```bash
cp .env.example .env
```

2. Edita `.env` y pega tus credenciales:
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-aqui
```

### Paso 6: Ejecutar
```bash
npm run dev
```

### Paso 7: Abrir
```
http://localhost:5173
```

✅ **Listo!** Verás el badge "☁️ Conectado a Supabase"

---

## 🔍 Verificar que Funciona

### Modo Local
- Badge: "💾 Modo Local (LocalStorage)"
- Los datos se guardan en el navegador

### Modo Supabase
- Badge: "☁️ Conectado a Supabase"
- Los datos se guardan en la nube

---

## 🆘 Problemas Comunes

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Error: "Invalid API key"
- Verifica que copiaste correctamente la clave
- Usa la clave "anon public", no "service_role"

### No aparece el badge de Supabase
- Verifica que el archivo `.env` esté en la raíz
- Reinicia el servidor: `Ctrl+C` y luego `npm run dev`

### Puerto 5173 ocupado
```bash
npm run dev -- --port 3000
```

---

## 📚 Más Información

- **Guía completa de Supabase**: `CONFIGURAR_SUPABASE.md`
- **Documentación general**: `README.md`
- **Instrucciones de uso**: `INSTRUCCIONES.md`

---

## 🎉 ¡Disfruta del Sistema!

Ahora puedes:
- ✅ Registrar personas
- ✅ Crear comidas con nombre personalizado
- ✅ Marcar asistencias
- ✅ Ver fecha/hora de entrega
- ✅ Exportar a TXT
- ✅ Acceder desde cualquier dispositivo (con Supabase)
