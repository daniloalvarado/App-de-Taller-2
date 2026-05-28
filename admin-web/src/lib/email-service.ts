import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

export const sendStatusEmail = async (
  email_destino: string,
  nombre_registrador: string,
  nombre_planta: string,
  estado_nuevo: string,
  motivo_observacion?: string
) => {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("Faltan configurar las credenciales de EmailJS en .env");
    return;
  }

  const templateParams = {
    to_email: email_destino,
    to_name: nombre_registrador,
    plant_name: nombre_planta || 'la planta',
    new_status: estado_nuevo,
    message: motivo_observacion ? `Motivo: ${motivo_observacion}` : '',
  };

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("Email enviado con éxito al estado:", estado_nuevo);
  } catch (error) {
    console.error("Error al enviar el email:", error);
  }
};
