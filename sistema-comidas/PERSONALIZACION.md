# 🎨 Guía de Personalización

## Cambiar Colores

### Colores Principales
Edita `src/App.css`:

```css
/* Cambiar el gradiente de fondo */
body {
  background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}

/* Cambiar color de botones principales */
.btn-primary {
  background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

### Sugerencias de Paletas

**Azul Océano:**
```css
background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
```

**Naranja Atardecer:**
```css
background: linear-gradient(135deg, #f46b45 0%, #eea849 100%);
```

**Verde Naturaleza:**
```css
background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
```

**Rosa Romántico:**
```css
background: linear-gradient(135deg, #ee0979 0%, #ff6a00 100%);
```

## Cambiar Iconos

Los iconos son emojis que puedes cambiar fácilmente:

### En PersonasManager.jsx
```jsx
<span className="persona-icon">👤</span>  // Cambia por: 🧑 👨 👩 🙋
```

### En ComidasManager.jsx
```jsx
{tipo === 'Desayuno' && '🌅'}  // Cambia por: ☕ 🥐 🍳
{tipo === 'Almuerzo' && '☀️'}  // Cambia por: 🍽️ 🥗 🍕
{tipo === 'Cena' && '🌙'}      // Cambia por: 🌃 🍴 🥘
```

## Agregar Más Tipos de Comida

En `src/components/ComidasManager.jsx`, línea 8:

```jsx
// Actual
const tipos = ['Desayuno', 'Almuerzo', 'Cena'];

// Personalizado
const tipos = ['Desayuno', 'Almuerzo', 'Merienda', 'Cena'];
```

Luego agrega el icono correspondiente:

```jsx
{tipo === 'Merienda' && '🍪'}
```

## Cambiar Textos

### Título Principal
En `src/App.jsx`:

```jsx
<h1>🍽️ Tu Título Personalizado</h1>
<p>Tu descripción personalizada</p>
```

### Nombres de Pestañas
En `src/App.jsx`:

```jsx
<button>👥 Tus Personas</button>
<button>📋 Tus Comidas</button>
```

## Modificar el Formato de Fecha

En `src/components/ComidasManager.jsx`, línea 17:

```jsx
// Formato actual: "5 de diciembre de 2025"
const fecha = new Date().toLocaleDateString('es-ES', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});

// Formato corto: "05/12/2025"
const fecha = new Date().toLocaleDateString('es-ES');

// Formato con hora: "05/12/2025 14:30"
const fecha = new Date().toLocaleString('es-ES');
```

## Agregar Campos Adicionales a Personas

### 1. Actualizar el estado en App.jsx
```jsx
const newPersona = {
  id: Date.now(),
  nombre: nombre.trim(),
  apellido: apellido.trim(),
  telefono: telefono.trim(),  // Nuevo campo
  email: email.trim()          // Nuevo campo
};
```

### 2. Agregar inputs en PersonasManager.jsx
```jsx
<input
  type="tel"
  placeholder="Teléfono"
  value={telefono}
  onChange={(e) => setTelefono(e.target.value)}
  className="input"
/>
```

### 3. Mostrar en la tarjeta
```jsx
<div className="persona-info">
  <strong>{persona.nombre} {persona.apellido}</strong>
  <small>{persona.telefono}</small>
</div>
```

## Cambiar el Tamaño de Fuente

En `src/App.css`:

```css
/* Hacer todo más grande */
html {
  font-size: 18px;  /* Default es 16px */
}

/* Hacer todo más pequeño */
html {
  font-size: 14px;
}
```

## Agregar Modo Oscuro

### 1. Agregar estado en App.jsx
```jsx
const [darkMode, setDarkMode] = useState(false);
```

### 2. Agregar botón
```jsx
<button onClick={() => setDarkMode(!darkMode)}>
  {darkMode ? '☀️' : '🌙'} Cambiar Tema
</button>
```

### 3. Agregar estilos en App.css
```css
.app.dark-mode {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

.app.dark-mode .content {
  background: #0f3460;
  color: white;
}
```

## Modificar el Archivo de Exportación

En `src/utils/storage.js`, función `exportToTxt`:

```javascript
// Agregar más información
content += `Generado el: ${new Date().toLocaleString()}\n`;
content += `Total de registros: ${data.comidas.length}\n`;

// Cambiar el formato
content += `${index + 1}) ${persona.nombre} ${persona.apellido}\n`;

// Agregar estadísticas generales
const totalComidas = data.comidas.length;
const totalAsistencias = data.comidas.reduce((sum, c) => 
  sum + c.asistencias.filter(a => a.comio).length, 0
);
content += `\nTotal de comidas servidas: ${totalAsistencias}\n`;
```

## Agregar Sonidos

### 1. Agregar archivos de audio en public/
```
public/
  ├── success.mp3
  └── click.mp3
```

### 2. Reproducir al marcar asistencia
```jsx
const playSound = (soundFile) => {
  const audio = new Audio(`/${soundFile}`);
  audio.play();
};

const toggleAsistencia = (comidaId, personaId) => {
  playSound('success.mp3');
  // ... resto del código
};
```

## Agregar Filtros y Búsqueda

En PersonasManager.jsx:

```jsx
const [busqueda, setBusqueda] = useState('');

const personasFiltradas = personas.filter(p =>
  p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
  p.apellido.toLowerCase().includes(busqueda.toLowerCase())
);

// En el JSX
<input
  type="text"
  placeholder="🔍 Buscar persona..."
  value={busqueda}
  onChange={(e) => setBusqueda(e.target.value)}
/>
```

## Agregar Gráficos

Instala una librería de gráficos:

```bash
npm install recharts
```

Luego en ComidasManager.jsx:

```jsx
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Comieron', value: stats.comieron },
  { name: 'Faltan', value: stats.faltan }
];

<PieChart width={200} height={200}>
  <Pie data={data} dataKey="value" />
</PieChart>
```

---

¡Personaliza el sistema a tu gusto! 🎨
