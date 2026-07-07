# Responsive Typography Guide — Presentación SIMD

## Problema Resuelto
Antes: Tamaños fijos de fuente (`text-[13px]`, `text-sm`) → ilegibles en pantallas chicas.
Ahora: Clases responsive con `clamp()` → escalan automáticamente según viewport.

---

## Clases Disponibles (definidas en `src/index.css`)

### Text Sizes

| Clase | Rango | Uso |
|-------|-------|-----|
| `.text-title` | 2rem → 5vw → 3.5rem | Títulos principales de slides |
| `.text-subtitle` | 1.25rem → 3vw → 2rem | Subtítulos, secciones |
| `.text-lg-responsive` | 1.125rem → 2.5vw → 1.5rem | Texto grande, énfasis |
| `.text-base-responsive` | 0.875rem → 1.5vw → 1.125rem | Body text, contenido normal |
| `.text-sm-responsive` | 0.75rem → 1.2vw → 0.95rem | Detalles, descripciones |
| `.text-xs-responsive` | 0.65rem → 0.9vw → 0.85rem | Metadata, pequeños detalles |
| `.text-mono-responsive` | 0.7rem → 1vw → 0.9rem | Código, monospace |

### Spacing

| Clase | Rango | Uso |
|-------|-------|-----|
| `.card-responsive` | p: 0.75rem → 2vw → 1.5rem<br>radius: 0.5rem → 1vw → 1.25rem | Boxes, cards, bloques |
| `.gap-responsive` | 0.5rem → 1.5vw → 1.5rem | Espaciado entre elementos |

---

## Cómo Usar

### Ejemplo 1: Slide Simple
```jsx
// ❌ ANTES (tamaño fijo)
<div className="text-[13px] p-3 rounded-xl">
  Contenido aquí
</div>

// ✅ DESPUÉS (responsive)
<div className="text-sm-responsive card-responsive">
  Contenido aquí
</div>
```

### Ejemplo 2: Título + Contenido
```jsx
// ✅ CORRECTO
<div className="space-y-4">
  <h1 className="text-title">Mi Título Grande</h1>
  <p className="text-base-responsive">Texto del body</p>
  <p className="text-sm-responsive">Detalles pequeños</p>
</div>
```

### Ejemplo 3: Grid de Items
```jsx
// ✅ CORRECTO
<div className="grid grid-cols-2 gap-responsive">
  <div className="card-responsive bg-slate-900">
    <h3 className="text-lg-responsive font-bold">Título</h3>
    <p className="text-sm-responsive">Descripción</p>
  </div>
</div>
```

### Ejemplo 4: Código/Monospace
```jsx
// ✅ CORRECTO
<div className="text-mono-responsive font-mono">
  VADDPD ymm0, ymm1, ymm2
</div>
```

---

## Viewport Behavior

### Pantalla Pequeña (320px)
- `.text-title` → 2rem (32px)
- `.text-base-responsive` → 0.875rem (~14px)
- `.text-sm-responsive` → 0.75rem (~12px)

### Tablet (768px)
- `.text-title` → ~3rem (escalado automático)
- `.text-base-responsive` → 1rem (~16px)
- `.text-sm-responsive` → 0.85rem (~13.5px)

### Desktop (1920px)
- `.text-title` → 3.5rem (máximo)
- `.text-base-responsive` → 1.125rem (máximo)
- `.text-sm-responsive` → 0.95rem (máximo)

---

## Patrones Comunes

### Bloque de Información
```jsx
<div className="card-responsive bg-slate-900 border border-cyan-500/30">
  <p className="text-sm-responsive text-slate-300">
    Información destacada aquí
  </p>
</div>
```

### Lista de Items
```jsx
<div className="gap-responsive flex flex-col">
  <div className="card-responsive bg-slate-900 flex justify-between">
    <span className="text-base-responsive font-bold">Label</span>
    <span className="text-sm-responsive">Valor</span>
  </div>
  {/* repetir */}
</div>
```

### Tabla/Grid
```jsx
<div className="grid grid-cols-2 gap-responsive">
  {items.map(item => (
    <div key={item.id} className="card-responsive bg-slate-900">
      <p className="text-sm-responsive">{item.content}</p>
    </div>
  ))}
</div>
```

---

## Notas Importantes

1. **No mezcles tamaños fijos y responsive**: Usa `.text-sm-responsive`, no `text-[13px]` + `.text-sm-responsive`
2. **vw = viewport width**: El tamaño crece/achica con la ventana
3. **Animaciones preservadas**: Las clases solo afectan tamaño/espaciado, no funcionamiento
4. **Prueba en múltiples pantallas**: Resuelve desde 320px (móvil) hasta 2560px (desktop 4K)
5. **Fullscreen mode**: El `clamp()` sigue funcionando correctamente en fullscreen

---

## Testing

```bash
# Dev server (auto-reload)
npm run dev

# Prueba responsive:
# 1. F12 → Device Toolbar
# 2. Prueba: iPhone SE (375px), iPad (768px), Desktop (1920px)
# 3. Redimensiona libremente → verifica que el texto escale suavemente
```

---

## Si Necesitas Custom Size

Usa directamente `clamp()` en Tailwind:

```jsx
// Custom size (ej: entre 16px y 24px)
<h2 className="text-[clamp(1rem,2vw,1.5rem)] font-bold">
  Título custom
</h2>
```

Sintaxis: `text-[clamp(MIN, VIEWPORT%, MAX)]`
- MIN: tamaño mínimo en pantalla chica
- VIEWPORT%: factor de escala (1vw = 1% del ancho de la ventana)
- MAX: tamaño máximo en pantalla grande
