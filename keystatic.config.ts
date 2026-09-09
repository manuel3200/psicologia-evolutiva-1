import { config, fields, singleton } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  // En local modifica los archivos en disco; en producción se conecta con Keystatic Cloud -> GitHub
  storage: isProd
    ? {
        kind: 'cloud',
      }
    : {
        kind: 'local',
      },
  cloud: {
    project: 'psi-evo-1/psi-evo-1',
  },
  ui: {
    brand: {
      name: 'Psicología Evolutiva 1 — CMS',
    },
  },
  singletons: {
    sitio: singleton({
      label: 'Sitio',
      path: 'src/data/sitio/index',
      format: { data: 'json' },
      schema: {
        nombreMateria: fields.text({
          label: 'Nombre de la Materia',
          defaultValue: 'Psicología Evolutiva 1',
        }),
        subtitulo: fields.text({
          label: 'Subtítulo de la Cabecera',
          defaultValue: 'Portal Jamstack con Keystatic CMS',
        }),
        cicloLectivo: fields.text({
          label: 'Ciclo Lectivo',
          defaultValue: 'Ciclo Lectivo 2026',
        }),
        carrera: fields.text({
          label: 'Carrera o Institución',
          defaultValue: 'Carrera de Psicología / Psicopedagogía',
        }),
        footerDescripcion: fields.text({
          label: 'Descripción en Pie de Página',
          multiline: true,
          defaultValue: 'Arquitectura Jamstack (Astro + Keystatic Headless CMS) desplegada en Cloudflare.',
        }),
        footerCopy: fields.text({
          label: 'Texto de Copyright',
          defaultValue: '© 2026 Cátedra de Psicología Evolutiva 1. Jamstack 100% gratuito.',
        }),
        portalMadreTexto: fields.text({
          label: 'Texto Botón Portal Madre',
          defaultValue: '🏛️ Portal Carrera (PSP)',
        }),
        portalMadreUrl: fields.url({
          label: 'Enlace / URL Portal Madre',
          defaultValue: 'https://psp.joif.net',
        }),
        materiasHermanas: fields.array(
          fields.object({
            nombre: fields.text({ label: 'Nombre de la Materia' }),
            url: fields.url({ label: 'Enlace / URL del Sitio' }),
          }),
          {
            label: 'Cátedras Hermanas (Red de la Carrera)',
            itemLabel: props => props.fields.nombre.value || 'Nueva Cátedra Hermana',
          }
        ),
      },
    }),

    hero: singleton({
      label: 'Hero',
      path: 'src/data/hero/index',
      format: { data: 'json' },
      schema: {
        titulo: fields.text({
          label: 'Título de Portada',
          defaultValue: 'Cátedra de Psicología Evolutiva 1',
        }),
        descripcion: fields.text({
          label: 'Fundamentación / Bajada Descriptiva',
          multiline: true,
          defaultValue: 'Estudio comprensivo de las transformaciones psicológicas del ser humano a lo largo del ciclo vital: desde la vida prenatal, la primera infancia y la niñez, articulando las dimensiones cognitivas, afectivas y socio-culturales.',
        }),
        botonDriveTexto: fields.text({
          label: 'Texto Botón Drive',
          defaultValue: 'Ir al Drive de Recursos',
        }),
        botonAnalizadorTexto: fields.text({
          label: 'Texto Botón Analizador',
          defaultValue: 'Analizador de Autoevaluaciones',
        }),
        botonDocenteTexto: fields.text({
          label: 'Texto Botón Instructivo',
          defaultValue: 'Instructivo Docente',
        }),
      },
    }),

    recursos: singleton({
      label: 'Recursos',
      path: 'src/data/recursos/index',
      format: { data: 'json' },
      schema: {
        drivePrincipalTitulo: fields.text({
          label: 'Título de la Ventana de Drive',
          defaultValue: 'Drive Oficial de Psicología Evolutiva 1',
        }),
        drivePrincipalMensaje: fields.text({
          label: 'Mensaje Destacado',
          defaultValue: 'Este es el Drive donde se encuentran los recursos para la materia.',
        }),
        drivePrincipalDescripcion: fields.text({
          label: 'Descripción',
          defaultValue: 'Accedé a toda la carpeta compartida en la nube con textos obligatorios, programas de cátedra, diapositivas y guías de estudio.',
          multiline: true,
        }),
        drivePrincipalUrl: fields.url({
          label: 'Enlace / URL del Drive Principal',
          defaultValue: 'https://drive.google.com',
          validation: { isRequired: true },
        }),
        enlacesAdicionales: fields.array(
          fields.object({
            titulo: fields.text({ label: 'Título del Enlace' }),
            url: fields.url({ label: 'Enlace / URL' }),
            descripcion: fields.text({ label: 'Descripción breve (opcional)', multiline: false }),
          }),
          {
            label: 'Apartados de Enlaces Adicionales (Configurados por el profesor)',
            itemLabel: props => props.fields.titulo.value || 'Nuevo Enlace',
          }
        ),
      },
    }),

    docentes: singleton({
      label: 'Docentes',
      path: 'src/data/docentes/index',
      format: { data: 'json' },
      schema: {
        badge: fields.text({
          label: 'Etiqueta Superior',
          defaultValue: 'Herramienta Docente Integrada',
        }),
        titulo: fields.text({
          label: 'Título Principal',
          defaultValue: 'Analizador de Autoevaluaciones',
        }),
        descripcion: fields.text({
          label: 'Descripción del Analizador',
          multiline: true,
          defaultValue: 'Plataforma web integrada para procesar al instante las respuestas de tus estudiantes desde Google Forms (.xlsx). Genera métricas de aprobación, distribución de calificaciones y porcentaje de aciertos pregunta por pregunta.',
        }),
        botonAnalizadorTexto: fields.text({
          label: 'Texto del Botón',
          defaultValue: 'Abrir Analizador de Autoevaluaciones ↗',
        }),
        pasos: fields.array(
          fields.object({
            numero: fields.text({ label: 'Número de Paso' }),
            titulo: fields.text({ label: 'Título del Paso' }),
            subtitulo: fields.text({ label: 'Subtítulo / Etiqueta' }),
            contenido: fields.text({ label: 'Instrucciones / Explicación', multiline: true }),
          }),
          {
            label: 'Pasos del Instructivo Excel',
            itemLabel: props => `Paso ${props.fields.numero.value}: ${props.fields.titulo.value || 'Paso'}`,
          }
        ),
      },
    }),
  },
});
