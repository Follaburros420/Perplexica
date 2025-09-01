import { searchSearxng } from '@/lib/searxng';

const websitesForTopic = {
  'derecho-colombiano': {
    query: ['derecho colombiano', 'legislación Colombia', 'jurisprudencia', 'código civil', 'constitución política'],
    links: ['corteconstitucional.gov.co', 'consejodeestado.gov.co', 'cortesuprema.gov.co', 'funcionpublica.gov.co', 'secretariasenado.gov.co'],
  },
  tech: {
    query: ['noticias tecnología', 'últimas tecnologías', 'inteligencia artificial', 'ciencia e innovación'],
    links: ['techcrunch.com', 'wired.com', 'theverge.com'],
  },
  finance: {
    query: ['noticias financieras', 'economía', 'mercado de valores', 'inversiones'],
    links: ['bloomberg.com', 'cnbc.com', 'marketwatch.com'],
  },
  art: {
    query: ['noticias arte', 'cultura', 'arte moderno', 'eventos culturales'],
    links: ['artnews.com', 'hyperallergic.com', 'theartnewspaper.com'],
  },
  sports: {
    query: ['noticias deportes', 'últimos deportes', 'fútbol tenis baloncesto'],
    links: ['espn.com', 'bbc.com/sport', 'skysports.com'],
  },
  entertainment: {
    query: ['noticias entretenimiento', 'películas', 'programas TV', 'celebridades'],
    links: ['hollywoodreporter.com', 'variety.com', 'deadline.com'],
  },
};

type Topic = keyof typeof websitesForTopic;

export const GET = async (req: Request) => {
  const params = new URL(req.url).searchParams;
  const mode: 'normal' | 'preview' =
    (params.get('mode') as 'normal' | 'preview') || 'normal';
  const topic: Topic = (params.get('topic') as Topic) || 'derecho-colombiano';

  try {
    const selectedTopic = websitesForTopic[topic];
    let data = [];

    // Usar contenido estático para evitar problemas con SearxNG
    if (topic === 'derecho-colombiano') {
      data = [
        {
          title: "Constitución Política de Colombia 1991",
          url: "https://www.corteconstitucional.gov.co/inicio/Constitucion%20politica%20de%20Colombia.pdf",
          content: "Texto completo de la Constitución Política de Colombia, norma fundamental del Estado colombiano que establece los derechos fundamentales y la estructura del Estado.",
        },
        {
          title: "Código Civil Colombiano",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4718",
          content: "Código Civil de Colombia - Regula las relaciones jurídicas entre particulares, contratos, obligaciones, bienes y sucesiones.",
        },
        {
          title: "Código Penal Colombiano - Ley 599 de 2000",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6388",
          content: "Código Penal de Colombia que tipifica los delitos y establece las sanciones penales correspondientes.",
        },
        {
          title: "Código General del Proceso",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6923",
          content: "Ley 1564 de 2012 - Regula los procedimientos civiles, comerciales, de familia y agrarios en Colombia.",
        },
        {
          title: "Jurisprudencia Corte Constitucional",
          url: "https://www.corteconstitucional.gov.co/relatoria/",
          content: "Acceso a sentencias y jurisprudencia de la Corte Constitucional de Colombia, incluyendo sentencias de constitucionalidad y tutela.",
        },
        {
          title: "Código de Comercio Colombiano",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=41102",
          content: "Decreto 410 de 1971 - Regula las actividades comerciales, sociedades comerciales y procedimientos mercantiles.",
        },
      ];
    } else {
      // Para otros temas, proporcionar contenido genérico
      data = [
        {
          title: "Contenido no disponible temporalmente",
          url: "#",
          content: "El servicio de búsqueda está temporalmente no disponible. Por favor, intenta más tarde o selecciona 'Derecho Colombiano' para acceder a recursos legales.",
        },
      ];
    }



    return Response.json(
      {
        blogs: data,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(`An error occurred in discover route: ${err}`);

    // Proporcionar contenido de respaldo específico por tema
    let fallbackData = [];

    if (topic === 'derecho-colombiano') {
      fallbackData = [
        {
          title: "Constitución Política de Colombia 1991",
          url: "https://www.corteconstitucional.gov.co/inicio/Constitucion%20politica%20de%20Colombia.pdf",
          content: "Texto completo de la Constitución Política de Colombia, norma fundamental del Estado colombiano.",
        },
        {
          title: "Código Civil Colombiano",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4718",
          content: "Código Civil de Colombia - Regula las relaciones jurídicas entre particulares.",
        },
        {
          title: "Código Penal Colombiano",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=6388",
          content: "Código Penal de Colombia - Ley 599 de 2000, tipifica los delitos y sus sanciones.",
        },
        {
          title: "Jurisprudencia Corte Constitucional",
          url: "https://www.corteconstitucional.gov.co/relatoria/",
          content: "Acceso a sentencias y jurisprudencia de la Corte Constitucional de Colombia.",
        },
      ];
    } else {
      fallbackData = [
        {
          title: "Contenido no disponible temporalmente",
          url: "#",
          content: "El servicio de búsqueda está temporalmente no disponible. Por favor, intenta más tarde.",
        },
      ];
    }

    return Response.json(
      {
        blogs: fallbackData,
        message: topic === 'derecho-colombiano' ?
          'Mostrando recursos legales colombianos principales' :
          'Servicio de búsqueda temporalmente no disponible',
      },
      {
        status: 200,
      },
    );
  }
};
