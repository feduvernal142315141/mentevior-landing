import { PUBLIC_APP_LOGIN_URL } from "astro:env/client";

// Punto único de configuración de conversión.
// TODO: reemplazar por la URL real de Calendly de MenteVior cuando exista la cuenta.
export const CALENDLY_URL = "https://calendly.com/mentevior/demo";

export const CONTACT_EMAIL = "info@mentevior.com";

// Login neutral del front-office (todas las compañías). Sale de la variable de
// entorno PUBLIC_APP_LOGIN_URL; el default de producción vive en astro.config.mjs.
export const APP_LOGIN_URL = PUBLIC_APP_LOGIN_URL;
