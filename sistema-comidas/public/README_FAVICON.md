# 🎨 Favicons del Sistema

## Archivos Disponibles

### favicon.svg (Principal)
- Emoji simple de plato con cubiertos 🍽️
- Formato SVG (escalable)
- Ligero y compatible con navegadores modernos

### favicon-alt.svg (Alternativo)
- Emoji con fondo circular degradado (morado/azul)
- Más elaborado visualmente
- Coincide con los colores del sistema

## Cómo Cambiar el Favicon

### Opción 1: Usar el favicon alternativo
En `index.html`, cambia:
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```
Por:
```html
<link rel="icon" type="image/svg+xml" href="/favicon-alt.svg" />
```

### Opción 2: Usar otro emoji
Edita `favicon.svg` y cambia el emoji:
```svg
<text y="0.9em" font-size="90">🍕</text>  <!-- Pizza -->
<text y="0.9em" font-size="90">🍔</text>  <!-- Hamburguesa -->
<text y="0.9em" font-size="90">🥗</text>  <!-- Ensalada -->
<text y="0.9em" font-size="90">🍱</text>  <!-- Bento -->
```

### Opción 3: Usar una imagen personalizada
1. Coloca tu imagen (PNG, ICO, SVG) en la carpeta `public/`
2. Actualiza `index.html`:
```html
<link rel="icon" type="image/png" href="/tu-favicon.png" />
```

## Tamaños Recomendados

Si usas PNG o ICO:
- **16x16** - Pestaña del navegador
- **32x32** - Barra de tareas
- **180x180** - Apple Touch Icon
- **192x192** - Android Chrome
- **512x512** - PWA

## Generadores Online

Si quieres crear un favicon personalizado:
- https://favicon.io/
- https://realfavicongenerator.net/
- https://www.favicon-generator.org/

## Nota

Los archivos SVG son ideales porque:
- ✅ Escalan perfectamente a cualquier tamaño
- ✅ Son muy ligeros (< 1KB)
- ✅ Soportados por todos los navegadores modernos
- ✅ Fáciles de editar
