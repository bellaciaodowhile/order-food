# 📝 Instrucciones Detalladas

## 🎯 Objetivo del Sistema

Este sistema te permite llevar un control completo de las comidas diarias de un grupo de personas, ideal para:
- Comedores escolares
- Empresas
- Residencias
- Eventos
- Cualquier lugar donde necesites controlar quién come

## 🔧 Instalación y Ejecución

### Paso 1: Instalar dependencias
```bash
npm install
```

### Paso 2: Ejecutar el proyecto
```bash
npm run dev
```

El sistema se abrirá automáticamente en tu navegador en `http://localhost:5173`

## 📚 Uso Paso a Paso

### Gestión de Personas

1. **Agregar una persona:**
   - Haz clic en la pestaña "👥 Personas"
   - Escribe el nombre en el primer campo
   - Escribe el apellido en el segundo campo
   - Presiona "➕ Agregar Persona"

2. **Editar una persona:**
   - Haz clic en el ícono ✏️ de la persona que quieres editar
   - Modifica el nombre o apellido
   - Presiona "✏️ Actualizar"

3. **Eliminar una persona:**
   - Haz clic en el ícono 🗑️ de la persona que quieres eliminar
   - Confirma la eliminación

### Gestión de Comidas

1. **Crear una nueva comida:**
   - Ve a la pestaña "📋 Comidas"
   - Selecciona el tipo de comida:
     - 🌅 Desayuno (mañana)
     - ☀️ Almuerzo (mediodía)
     - 🌙 Cena (noche)
   - Haz clic en "➕ Crear"
   - Se creará automáticamente con la fecha actual

2. **Registrar quién comió:**
   - Verás la lista de todas las personas registradas
   - Haz clic en cada persona para marcar si comió
   - El color cambiará:
     - Verde ✅ = Ya comió
     - Gris ⏳ = Aún no ha comido
   - Las estadísticas se actualizan automáticamente

3. **Ver estadísticas:**
   - En la parte superior verás:
     - **Total**: Cantidad total de personas
     - **Comieron**: Cuántas personas ya comieron
     - **Faltan**: Cuántas personas faltan por comer

4. **Ver historial:**
   - Desplázate hacia abajo para ver todas las comidas anteriores
   - Haz clic en cualquier comida del historial para verla en detalle
   - Puedes eliminar comidas antiguas con el botón 🗑️

### Exportar Datos

1. Haz clic en el botón "💾 Exportar a TXT"
2. Se descargará un archivo de texto con:
   - Lista completa de personas
   - Historial de todas las comidas
   - Estadísticas de cada comida
   - Detalle de quién comió en cada ocasión

## 💡 Consejos de Uso

- **Datos seguros**: Los datos se guardan automáticamente en tu navegador
- **Sin internet**: Funciona sin conexión a internet
- **Múltiples dispositivos**: Puedes usar el mismo sistema en varios dispositivos, pero los datos son independientes en cada uno
- **Backup**: Exporta regularmente a TXT para tener respaldo de tus datos
- **Orden**: Las comidas más recientes aparecen primero en el historial

## 🎨 Características del Diseño

- **Colores modernos**: Gradientes morados y azules
- **Responsivo**: Se adapta a cualquier tamaño de pantalla
- **Intuitivo**: Iconos claros y botones grandes
- **Feedback visual**: Los elementos cambian de color al interactuar
- **Animaciones suaves**: Transiciones agradables

## ⚠️ Notas Importantes

1. Los datos se guardan en el navegador (LocalStorage)
2. Si borras los datos del navegador, perderás la información
3. Exporta regularmente a TXT para tener respaldo
4. Cada navegador tiene sus propios datos independientes
5. No se requiere conexión a internet para usar el sistema

## 🐛 Solución de Problemas

**Problema**: No se guardan los datos
- **Solución**: Verifica que tu navegador permita LocalStorage

**Problema**: La página no carga
- **Solución**: Ejecuta `npm install` nuevamente

**Problema**: Error al exportar
- **Solución**: Verifica que tu navegador permita descargas

## 📞 Soporte

Si tienes problemas o sugerencias, revisa el código en:
- `src/App.jsx` - Componente principal
- `src/components/PersonasManager.jsx` - Gestión de personas
- `src/components/ComidasManager.jsx` - Gestión de comidas
- `src/utils/storage.js` - Almacenamiento y exportación

---

¡Disfruta usando el sistema! 🎉
