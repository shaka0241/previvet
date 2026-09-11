export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDoc = {
  slug: "politica-de-privacidad",
  title: "Política de Privacidad",
  description:
    "Cómo Vetline NUTRITION, C.A. trata los datos personales recibidos por WhatsApp, correo electrónico y analítica web.",
  updated: "6 de septiembre de 2026",
  sections: [
    {
      heading: "1. Responsable del tratamiento",
      paragraphs: [
        "Vetline NUTRITION, C.A., RIF J-506792796, domiciliada en Carabobo, Venezuela, es responsable de los datos personales que usted nos entrega voluntariamente a través de nuestros canales de contacto.",
        "Canal para ejercer sus derechos: vetlinenutrition@gmail.com.",
      ],
    },
    {
      heading: "2. Datos que tratamos",
      paragraphs: [
        "Datos de contacto y solicitud que usted nos envía por WhatsApp o correo electrónico: nombre, teléfono, correo y datos de su producción (especie, número de animales, ubicación de la finca) necesarios para preparar una cotización.",
        "Datos analíticos de navegación (solo si acepta la analítica en el banner): páginas visitadas, clics en botones de contacto, dirección IP y un identificador seudónimo, recolectados con PostHog para entender el uso del sitio. Sin su aceptación no se activa ningún rastreo. No recolectamos datos mediante formularios web: este sitio no tiene formularios.",
        "No solicitamos ni tratamos datos sensibles ni datos de menores de edad. Por favor no los envíe por estos canales.",
      ],
    },
    {
      heading: "3. Finalidades",
      paragraphs: [
        "Gestionar su solicitud de cotización y responderle por el mismo medio (WhatsApp, correo o llamada).",
        "Hacer seguimiento comercial de su solicitud (por ejemplo, enviarle la proforma o coordinar el despacho). Si no desea comunicaciones comerciales posteriores, indíquelo en su mensaje o responda RETIRAR y lo excluiremos.",
        "Medir de forma agregada el uso del sitio para mejorarlo.",
      ],
    },
    {
      heading: "4. Encargados y terceros",
      paragraphs: [
        "Para operar usamos estos proveedores, que tratan datos por nuestra cuenta o como responsables independientes cuando usted sale a sus plataformas: Google (correo Gmail), Meta Platforms (WhatsApp e Instagram), TikTok / ByteDance (TikTok) y PostHog (analítica).",
        "Al pulsar los enlaces a WhatsApp, Instagram o TikTok usted abandona este sitio y aplican las políticas de privacidad de esas plataformas.",
      ],
    },
    {
      heading: "5. Transferencias internacionales",
      paragraphs: [
        "PostHog, Google y Meta operan infraestructura en Estados Unidos, por lo que sus datos pueden transferirse y almacenarse fuera de Venezuela. Al contactarnos usted autoriza expresamente dicha transferencia para las finalidades descritas.",
      ],
    },
    {
      heading: "6. Plazos de conservación",
      paragraphs: [
        "Conservamos sus datos de contacto y cotizaciones solo por el tiempo necesario para gestionar su solicitud y cumplir obligaciones legales aplicables. Los datos analíticos se conservan según la configuración de retención de PostHog.",
      ],
    },
    {
      heading: "7. Sus derechos",
      paragraphs: [
        "Usted puede solicitar acceso, actualización, rectificación, supresión y revocatoria de la autorización escribiendo a vetlinenutrition@gmail.com, identificándose y describiendo su solicitud.",
        "En Venezuela le ampara además la acción de hábeas data (artículo 60 de la Constitución).",
      ],
    },
    {
      heading: "8. Cambios a esta política",
      paragraphs: [
        "Publicaremos aquí cualquier actualización indicando la fecha de última modificación.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  slug: "politica-de-cookies",
  title: "Política de Cookies",
  description:
    "Qué identificadores usa este sitio (analítica PostHog) y cómo gestionarlos.",
  updated: "6 de septiembre de 2026",
  sections: [
    {
      heading: "1. Qué usamos",
      paragraphs: [
        "Este sitio no usa cookies propias de seguimiento ni publicidad. La única tecnología de almacenamiento es la de nuestra herramienta de analítica, PostHog: una cookie (nombre ph_*_posthog) y el almacenamiento local del navegador, que guardan un identificador seudónimo para distinguir visitas y medir páginas vistas y clics en botones de contacto.",
        "No incrustamos reproductores, píxeles ni widgets de terceros: los enlaces a Instagram, TikTok y WhatsApp son simples hipervínculos que no activan rastreo hasta que usted los pulsa.",
      ],
    },
    {
      heading: "2. Finalidad y duración",
      paragraphs: [
        "Finalidad exclusivamente estadística: saber qué contenidos se visitan y qué canales de contacto se usan, para mejorar el sitio.",
        "Duración: identificadores persistentes de hasta un año, renovables con cada visita; también se usan valores de sesión que se eliminan al cerrar el navegador.",
      ],
    },
    {
      heading: "3. Cómo gestionarlas",
      paragraphs: [
        "Este sitio solo activa PostHog si usted pulsa «Aceptar analítica» en el banner de cookies. Sin esa aceptación no se crea ningún identificador ni se envía nada a PostHog (opt-out por defecto).",
        "Puede cambiar de opinión en cualquier momento: borre el almacenamiento local del navegador (clave vetline-analytics-consent) y recargue para volver a ver el banner, o escríbanos a vetlinenutrition@gmail.com para que eliminemos el identificador analítico asociado a usted.",
        "También puede borrar las cookies y el almacenamiento local desde la configuración de su navegador, navegar en modo privado, o usar extensiones de bloqueo de rastreadores.",
      ],
    },
  ],
};

export const termsConditions: LegalDoc = {
  slug: "terminos-y-condiciones",
  title: "Términos y Condiciones",
  description:
    "Condiciones de uso del sitio informativo de Vetline NUTRITION, C.A.",
  updated: "6 de septiembre de 2026",
  sections: [
    {
      heading: "1. Objeto del sitio",
      paragraphs: [
        "Este sitio es informativo: presenta a Vetline NUTRITION, C.A. y su producto Nutravit ADE3 Plus. No existe venta en línea ni contratación electrónica en estas páginas.",
      ],
    },
    {
      heading: "2. Cotizaciones por WhatsApp",
      paragraphs: [
        "Las cotizaciones se gestionan por WhatsApp o correo con un asesor. Los precios, disponibilidad y tiempos de entrega se confirman caso por caso y solo obligan a las partes cuando existe aceptación expresa por escrito (mensaje, correo o documento).",
      ],
    },
    {
      heading: "3. Uso adecuado",
      paragraphs: [
        "Usted se compromete a usar el sitio con fines lícitos, sin intentar vulnerar su seguridad, extraer datos de forma automatizada abusiva ni suplantar a la empresa o a terceros.",
      ],
    },
    {
      heading: "4. Propiedad intelectual",
      paragraphs: [
        "Textos, imágenes, marcas y logotipos pertenecen a Vetline NUTRITION, C.A. o a sus licenciantes. No está permitida su reproducción con fines comerciales sin autorización.",
      ],
    },
    {
      heading: "5. Enlaces externos",
      paragraphs: [
        "Los enlaces a WhatsApp, Instagram, TikTok y al correo son servicios de terceros con sus propias condiciones. No respondemos por su contenido, disponibilidad ni tratamiento de datos.",
      ],
    },
    {
      heading: "6. Limitación de responsabilidad",
      paragraphs: [
        "El sitio se ofrece «tal cual». La información técnica del producto es orientativa y no sustituye la asesoría de un médico veterinario ni las indicaciones de etiqueta y registro sanitario.",
      ],
    },
    {
      heading: "7. Contacto",
      paragraphs: [
        "Para cualquier asunto sobre estos términos: vetlinenutrition@gmail.com, Carabobo, Venezuela.",
      ],
    },
  ],
};

export const legalNotice: LegalDoc = {
  slug: "aviso-legal",
  title: "Aviso Legal",
  description:
    "Identificación del titular del sitio y condiciones generales de uso.",
  updated: "6 de septiembre de 2026",
  sections: [
    {
      heading: "1. Titular del sitio",
      paragraphs: [
        "Vetline NUTRITION, C.A., RIF J-506792796, Carabobo, Venezuela. Correo de contacto y de derechos de datos: vetlinenutrition@gmail.com.",
      ],
    },
    {
      heading: "2. Objeto",
      paragraphs: [
        "Informar sobre la empresa y el núcleo nutricional Nutravit ADE3 Plus para bovinos y porcinos, y ofrecer canales de contacto comercial (WhatsApp, correo, Instagram y TikTok).",
      ],
    },
    {
      heading: "3. Propiedad intelectual",
      paragraphs: [
        "Todos los contenidos de este sitio están protegidos. Queda prohibido su uso comercial sin autorización previa y escrita del titular.",
      ],
    },
    {
      heading: "4. Enlaces de terceros y analítica",
      paragraphs: [
        "Este sitio enlaza a plataformas de terceros (Meta, TikTok, Google) y usa PostHog con infraestructura en Estados Unidos para analítica básica de visitas. El detalle está en la Política de Privacidad y la Política de Cookies.",
      ],
    },
  ],
};

export const legalDocs: LegalDoc[] = [
  legalNotice,
  privacyPolicy,
  cookiePolicy,
  termsConditions,
];
