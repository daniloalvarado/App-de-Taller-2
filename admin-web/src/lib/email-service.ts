import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export const sendStatusEmail = async (
  email_destino: string,
  nombre_registrador: string,
  nombre_planta: string,
  estado_nuevo: string,
  motivo_observacion?: string,
  docente_nombre?: string
) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("Faltan configurar las credenciales de EmailJS en .env");
    return;
  }

  let instructions = '';
  let text_color = '#166534';
  let bg_color = '#f0fdf4';
  let border_color = '#1FC451';

  if (estado_nuevo === 'Validado') {
    instructions = `¡Felicidades! Este registro ha sido verificado y aprobado por el docente ${docente_nombre || 'asignado'}.\n\nEstás un paso más cerca de alcanzar tu meta de registros y obtener tu certificado. ¡Sigue así!`;
    text_color = '#166534'; // Verde oscuro
    bg_color = '#f0fdf4'; // Verde claro
    border_color = '#1FC451'; // Verde brillante
  } else if (estado_nuevo === 'Observado') {
    instructions = `El docente ${docente_nombre || 'asignado'} ha revisado tu registro y ha dejado una observación que debes corregir.\n\nMotivo/Comentario:\n"${motivo_observacion}"\n\nPor favor, abre la aplicación móvil, dirígete a la pestaña "Historial" y edita el registro para subsanar esta observación.`;
    text_color = '#9A3412'; // Naranja oscuro
    bg_color = '#FFF7ED'; // Naranja claro
    border_color = '#F97316'; // Naranja brillante
  } else if (estado_nuevo === 'Rechazado') {
    instructions = `Lamentablemente, el docente ${docente_nombre || 'asignado'} ha rechazado este registro y ha sido descartado de tu conteo oficial.\n\nMotivo/Comentario:\n"${motivo_observacion}"\n\nRecuerda revisar los criterios de la rúbrica antes de enviar un nuevo registro.`;
    text_color = '#991B1B'; // Rojo oscuro
    bg_color = '#FEF2F2'; // Rojo claro
    border_color = '#EF4444'; // Rojo brillante
  } else {
    instructions = `El estado de tu registro ha cambiado a: ${estado_nuevo}.`;
  }

  const templateParams = {
    email: email_destino,
    name: nombre_registrador,
    planta: nombre_planta || 'la planta',
    message: instructions,
    text_color: text_color,
    bg_color: bg_color,
    border_color: border_color,
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("Email enviado con éxito al estado:", estado_nuevo);
    return true;
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return false;
  }
};
