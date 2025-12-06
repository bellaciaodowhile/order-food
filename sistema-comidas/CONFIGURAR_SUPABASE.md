# 🚀 Guía de Configuración de Supabase

## 📋 Requisitos Previos

- Cuenta en Supabase (gratuita): https://supabase.com
- Node.js instalado
- Proyecto React ya creado

## 🔧 Paso 1: Crear Proyecto en Supabase

1. Ve a https://supabase.com y crea una cuenta
2. Haz clic en "New Project"
3. Completa los datos:
   - **Name**: sistema-comidas (o el nombre que prefieras)
   - **Database Password**: Crea una contraseña segura (guárdala)
   - **Region**: Selecciona la más cercana a tu ubicación
4. Haz clic en "Create new project"
5. Espera 2-3 minutos mientras se crea el proyecto

## 📊 Paso 2: Crear las Tablas

1. En tu proyecto de Supabase, ve a **SQL Editor** (icono de base de datos en el menú lateral)
2. Haz clic en "New query"
3. Abre el archivo `supabase-schema.sql` de este proyecto
4. Copia TODO el contenido del archivo
5. Pégalo en el editor SQL de Supabase
6. Haz clic en "Run" (botón verde en la esquina inferior derecha)
7. Verifica que aparezca el mensaje "Success. No rows returned"

## 🔑 Paso 3: Obtener las Credenciales

1. En Supabase, ve a **Settings** (⚙️ en el menú lateral)
2. Haz clic en **API**
3. Encontrarás dos valores importantes:

   **Project URL:**
   ```
   https://tu-proyecto-id.supabase.co
   ```

   **anon public (API Key):**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. Copia ambos valores (los necesitarás en el siguiente paso)

## 🔐 Paso 4: Configurar Variables de Entorno

1. En la raíz de tu proyecto React, crea un archivo llamado `.env`
2. Copia el contenido de `.env.example` al nuevo archivo `.env`
3. Reemplaza los valores con tus credenciales:

```env
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Guarda el archivo

⚠️ **IMPORTANTE**: El archivo `.env` NO debe subirse a Git. Ya está incluido en `.gitignore`

## 📦 Paso 5: Instalar Dependencias

```bash
npm install
```

Esto instalará `@supabase/supabase-js` y todas las demás dependencias.

## 🚀 Paso 6: Ejecutar el Proyecto

```bash
npm run dev
```

Si todo está configurado correctamente, verás:
- Badge "☁️ Conectado a Supabase" en el header
- El sistema funcionará con la base de datos en la nube

## ✅ Verificar que Funciona

1. Ve a la pestaña "👥 Personas"
2. Agrega una persona de prueba
3. Ve a Supabase → **Table Editor** → **personas**
4. Deberías ver la persona que acabas de agregar

## 🔍 Verificar las Tablas Creadas

En Supabase, ve a **Table Editor** y verifica que existan estas tablas:

- ✅ **personas** - Almacena las personas registradas
- ✅ **comidas** - Almacena las comidas creadas
- ✅ **asistencias** - Almacena quién comió en cada comida

También deberías ver estas vistas:
- ✅ **vista_estadisticas_comidas** - Estadísticas de cada comida
- ✅ **vista_detalle_asistencias** - Detalle completo de asistencias

## 🛠️ Funciones Especiales

El esquema incluye una función especial:

**crear_comida_con_asistencias**: Crea una comida y automáticamente genera registros de asistencia para todas las personas activas.

## 📊 Estructura de Datos

### Tabla: personas
```sql
- id (UUID) - Identificador único
- nombre_completo (VARCHAR) - Nombre completo de la persona
- activo (BOOLEAN) - Si la persona está activa
- created_at (TIMESTAMP) - Fecha de creación
- updated_at (TIMESTAMP) - Fecha de actualización
```

### Tabla: comidas
```sql
- id (UUID) - Identificador único
- nombre (VARCHAR) - Nombre de la comida
- tipo (VARCHAR) - Desayuno, Almuerzo o Cena
- fecha (DATE) - Fecha de la comida
- created_at (TIMESTAMP) - Fecha de creación
- updated_at (TIMESTAMP) - Fecha de actualización
```

### Tabla: asistencias
```sql
- id (UUID) - Identificador único
- comida_id (UUID) - Referencia a la comida
- persona_id (UUID) - Referencia a la persona
- comio (BOOLEAN) - Si la persona comió
- fecha_hora_entrega (TIMESTAMP) - Cuándo se entregó la comida
- created_at (TIMESTAMP) - Fecha de creación
- updated_at (TIMESTAMP) - Fecha de actualización
```

## 🔒 Seguridad (RLS)

El esquema incluye Row Level Security (RLS) configurado para permitir todas las operaciones. 

⚠️ **Para producción**, deberías ajustar las políticas según tus necesidades:

```sql
-- Ejemplo: Solo permitir lectura
CREATE POLICY "Solo lectura" ON personas
  FOR SELECT USING (true);

-- Ejemplo: Requerir autenticación
CREATE POLICY "Requiere auth" ON personas
  FOR ALL USING (auth.uid() IS NOT NULL);
```

## 🐛 Solución de Problemas

### Error: "Invalid API key"
- Verifica que copiaste correctamente la API key
- Asegúrate de usar la clave "anon public", no la "service_role"

### Error: "Failed to fetch"
- Verifica que la URL del proyecto sea correcta
- Verifica tu conexión a internet
- Revisa la consola del navegador para más detalles

### No aparece el badge de Supabase
- Verifica que el archivo `.env` esté en la raíz del proyecto
- Verifica que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo (`npm run dev`)

### Las tablas no se crearon
- Verifica que ejecutaste TODO el script SQL
- Revisa si hay errores en el SQL Editor de Supabase
- Intenta ejecutar el script por partes

## 💾 Modo Fallback (LocalStorage)

Si no configuras Supabase, el sistema automáticamente usará LocalStorage como respaldo. Verás el badge "💾 Modo Local (LocalStorage)".

Esto es útil para:
- Desarrollo sin conexión
- Pruebas locales
- Demostración sin base de datos

## 🔄 Migrar de LocalStorage a Supabase

Si ya tienes datos en LocalStorage y quieres migrarlos a Supabase:

1. Exporta los datos a TXT desde el sistema
2. Configura Supabase siguiendo esta guía
3. Registra manualmente las personas y comidas
4. O usa el siguiente script en la consola del navegador:

```javascript
// Obtener datos de LocalStorage
const data = JSON.parse(localStorage.getItem('sistema_comidas_data'));

// Luego registra manualmente cada persona y comida en el nuevo sistema
console.log('Personas:', data.personas);
console.log('Comidas:', data.comidas);
```

## 📚 Recursos Adicionales

- Documentación de Supabase: https://supabase.com/docs
- Supabase JavaScript Client: https://supabase.com/docs/reference/javascript
- PostgreSQL Documentation: https://www.postgresql.org/docs/

## 🎉 ¡Listo!

Tu sistema ahora está conectado a Supabase y todos los datos se guardarán en la nube. Puedes acceder desde cualquier dispositivo con las mismas credenciales.

---

**Nota**: Supabase ofrece un plan gratuito generoso que incluye:
- 500 MB de base de datos
- 1 GB de almacenamiento de archivos
- 2 GB de ancho de banda
- 50,000 usuarios activos mensuales

Esto es más que suficiente para la mayoría de los casos de uso.
