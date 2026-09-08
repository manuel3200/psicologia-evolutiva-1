# Cátedra de Psicología Evolutiva 1 (Astro + Keystatic Jamstack)

Proyecto oficial construido con la arquitectura **Jamstack** explicada en el video de Fazt:
```
[ Profesor en /keystatic ] 
        │ (Clic en "Guardar cambios")
        ▼
[ Keystatic Cloud ] 
        │ (Crea un Git Commit automáticamente)
        ▼
[ GitHub ] 
        │ (Dispara Webhook de CI/CD)
        ▼
[ Cloudflare Pages ] 
        │ (Ejecuta `astro build` y publica)
        ▼
[ Sitio Web Global 100% Gratis ]
```

---

## 📁 Estructura del Proyecto

```
psicologia-evolutiva-astro/
├── astro.config.mjs            # Integración de Astro con Keystatic y Cloudflare
├── keystatic.config.ts         # Esquema de Keystatic (Drive Principal + Enlaces)
├── package.json                # Dependencias (Astro, Keystatic, React)
├── src/
│   ├── content/
│   │   └── recursos/
│   │       └── index.json      # Archivo de datos sincronizado con Git
│   ├── pages/
│   │   ├── index.astro         # Portada para estudiantes (Drive + Enlaces)
│   │   └── docentes.astro      # Portal Docente (Analizador Excel)
│   └── styles/
│       └── global.css          # Estilos modernos y responsivos
└── README.md                   # Esta guía
```

---

## 💻 1. Cómo Probar en Local (En tu Computadora)

1. En la terminal dentro de esta carpeta, ejecutá:
   ```bash
   npm run dev
   ```
2. Abrí en tu navegador:
   - **Web de Estudiantes:** `http://localhost:4321/`
   - **Panel Administrativo (Keystatic):** `http://localhost:4321/keystatic`

En modo local, cualquier cambio que hagas en `/keystatic` modificará directamente el archivo `src/content/recursos/index.json` en tu disco duro y actualizará la web al instante.

---

## ☁️ 2. Cómo Conectar Keystatic Cloud + GitHub + Cloudflare Pages

Seguí estos 3 pasos para dejar funcionando el ciclo automatizado del diagrama:

### Paso A: Subir el proyecto a GitHub
```bash
git init
git add .
git commit -m "Portal inicial de Psicología Evolutiva 1 con Keystatic"
gh repo create psicologia-evolutiva-1 --private --source=. --push
```

### Paso B: Conectar con Keystatic Cloud (keystatic.cloud)
1. Entrá a [https://keystatic.cloud](https://keystatic.cloud) y creá una cuenta gratuita con tu usuario de GitHub.
2. Hacé clic en **Add Team** (ejemplo: `catedra-evolutiva`).
3. Hacé clic en **Add Project**, seleccioná tu repositorio de GitHub recién creado (`psicologia-evolutiva-1`).
4. En `keystatic.config.ts`, actualizá el nombre de tu proyecto en la línea:
   ```ts
   cloud: {
     project: 'tu-equipo/psicologia-evolutiva-1',
   }
   ```
5. Hacé commit y push del cambio a GitHub.

### Paso C: Conectar con Cloudflare Pages
1. Entrá a [dash.cloudflare.com](https://dash.cloudflare.com) (cuenta gratuita).
2. Andá a **Workers & Pages** → **Create application** → pestaña **Pages** → **Connect to Git**.
3. Seleccioná el repositorio `psicologia-evolutiva-1`.
4. En la configuración de compilación:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Hacé clic en **Save and Deploy**.

---

## 🚀 3. ¿Cómo lo utiliza el profesor en el día a día?

1. El docente ingresa a `https://tu-sitio.pages.dev/keystatic`.
2. Inicia sesión con su cuenta (invitada gratuitamente desde Keystatic Cloud).
3. Modifica el enlace de Google Drive o agrega nuevos enlaces (título + URL).
4. Hace clic en **"Save"**:
   - **Keystatic Cloud** genera automáticamente un commit en GitHub.
   - **GitHub** avisa a **Cloudflare Pages**.
   - **Cloudflare** recompila el sitio y publica la nueva versión en segundos sin costo de servidor.
