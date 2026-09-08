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
    recursos: singleton({
      label: 'Recursos y Enlaces Drive',
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
  },
});
