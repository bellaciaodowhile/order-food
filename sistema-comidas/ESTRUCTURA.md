# 📁 Estructura del Proyecto

```
sistema-comidas/
│
├── public/                      # Archivos públicos estáticos
│
├── src/                         # Código fuente
│   ├── components/              # Componentes React
│   │   ├── PersonasManager.jsx  # Gestión de personas
│   │   ├── PersonasManager.css  # Estilos de personas
│   │   ├── ComidasManager.jsx   # Gestión de comidas
│   │   └── ComidasManager.css   # Estilos de comidas
│   │
│   ├── utils/                   # Utilidades
│   │   └── storage.js           # Funciones de almacenamiento y exportación
│   │
│   ├── App.jsx                  # Componente principal
│   ├── App.css                  # Estilos principales
│   ├── main.jsx                 # Punto de entrada
│   └── index.css                # Estilos globales
│
├── index.html                   # HTML principal
├── package.json                 # Dependencias del proyecto
├── vite.config.js              # Configuración de Vite
├── README.md                    # Documentación principal
├── INSTRUCCIONES.md            # Guía de uso detallada
├── ESTRUCTURA.md               # Este archivo
└── ejemplo_exportacion.txt     # Ejemplo de exportación

```

## 📄 Descripción de Archivos Clave

### Componentes

**App.jsx**
- Componente raíz de la aplicación
- Maneja el estado global (personas y comidas)
- Controla las pestañas de navegación
- Gestiona la carga y guardado de datos

**PersonasManager.jsx**
- Formulario para agregar/editar personas
- Lista de personas registradas
- Funciones de edición y eliminación
- Validación de datos

**ComidasManager.jsx**
- Selector de tipo de comida (Desayuno/Almuerzo/Cena)
- Creación de nuevas comidas con fecha actual
- Lista de asistencia con checkboxes
- Estadísticas en tiempo real
- Historial de comidas
- Botón de exportación

### Utilidades

**storage.js**
- `loadData()`: Carga datos desde LocalStorage
- `saveData()`: Guarda datos en LocalStorage
- `exportToTxt()`: Convierte datos a formato texto
- `downloadTxt()`: Descarga archivo TXT

### Estilos

**App.css**
- Estilos del layout principal
- Diseño del header
- Sistema de pestañas
- Gradientes de fondo
- Responsividad general

**PersonasManager.css**
- Estilos del formulario de personas
- Tarjetas de personas
- Botones de acción
- Grid responsivo

**ComidasManager.css**
- Selector de tipo de comida
- Tarjeta de comida activa
- Lista de asistencia
- Estadísticas visuales
- Historial de comidas

## 🔄 Flujo de Datos

```
Usuario interactúa
    ↓
Componente actualiza estado
    ↓
App.jsx detecta cambio (useEffect)
    ↓
storage.js guarda en LocalStorage
    ↓
Datos persisten en el navegador
```

## 🎨 Paleta de Colores

- **Primario**: #667eea (Azul-morado)
- **Secundario**: #764ba2 (Morado)
- **Éxito**: #28a745 (Verde)
- **Advertencia**: #ffc107 (Amarillo)
- **Fondo**: Gradiente de #667eea a #764ba2
- **Texto**: #333 (Gris oscuro)
- **Bordes**: #e0e7ff (Azul claro)

## 📦 Dependencias Principales

- **React 18**: Biblioteca de UI
- **React DOM 18**: Renderizado de React
- **Vite 5**: Build tool y dev server

## 🔧 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Compila para producción
npm run preview  # Vista previa de la build
npm run lint     # Ejecuta el linter
```

## 💾 Estructura de Datos

### Persona
```javascript
{
  id: number,           // Timestamp único
  nombre: string,       // Nombre de la persona
  apellido: string      // Apellido de la persona
}
```

### Comida
```javascript
{
  id: number,                    // Timestamp único
  tipo: string,                  // "Desayuno" | "Almuerzo" | "Cena"
  fecha: string,                 // Fecha formateada
  fechaCreacion: string,         // ISO timestamp
  asistencias: [                 // Array de asistencias
    {
      personaId: number,         // ID de la persona
      comio: boolean             // true si comió, false si no
    }
  ]
}
```

### LocalStorage
```javascript
{
  personas: Persona[],    // Array de personas
  comidas: Comida[]       // Array de comidas
}
```

## 🚀 Características Técnicas

- **Hooks de React**: useState, useEffect
- **LocalStorage API**: Persistencia de datos
- **Blob API**: Generación de archivos
- **CSS Grid**: Layout responsivo
- **CSS Flexbox**: Alineación de elementos
- **CSS Gradients**: Fondos atractivos
- **CSS Transitions**: Animaciones suaves

## 📱 Breakpoints Responsivos

- **Móvil**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

Esta estructura permite un código limpio, mantenible y escalable.
