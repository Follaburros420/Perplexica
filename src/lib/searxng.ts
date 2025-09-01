import axios from 'axios';
import { getSearxngApiEndpoint } from './config';

interface SearxngSearchOptions {
  categories?: string[];
  engines?: string[];
  language?: string;
  pageno?: number;
}

interface SearxngSearchResult {
  title: string;
  url: string;
  img_src?: string;
  thumbnail_src?: string;
  thumbnail?: string;
  content?: string;
  author?: string;
  iframe_src?: string;
}

export const searchSearxng = async (
  query: string,
  opts?: SearxngSearchOptions,
) => {
  try {
    const searxngURL = getSearxngApiEndpoint();

    const url = new URL(`${searxngURL}/search?format=json`);
    url.searchParams.append('q', query);

    if (opts) {
      Object.keys(opts).forEach((key) => {
        const value = opts[key as keyof SearxngSearchOptions];
        if (Array.isArray(value)) {
          url.searchParams.append(key, value.join(','));
          return;
        }
        url.searchParams.append(key, value as string);
      });
    }

    const res = await axios.get(url.toString(), { timeout: 10000 });

    const results: SearxngSearchResult[] = res.data.results;
    const suggestions: string[] = res.data.suggestions;

    return { results, suggestions };
  } catch (error) {
    console.log('SearxNG search failed, using fallback content:', error.message);

    // Proporcionar contenido de respaldo basado en la consulta
    const fallbackResults: SearxngSearchResult[] = [];

    // Detectar si es una consulta legal en español
    const legalKeywords = ['derecho', 'ley', 'código', 'constitución', 'jurisprudencia', 'legal', 'colombia', 'colombiano'];
    const isLegalQuery = legalKeywords.some(keyword =>
      query.toLowerCase().includes(keyword.toLowerCase())
    );

    if (isLegalQuery) {
      fallbackResults.push(
        {
          title: "Constitución Política de Colombia 1991",
          url: "https://www.corteconstitucional.gov.co/inicio/Constitucion%20politica%20de%20Colombia.pdf",
          content: "La Constitución Política de Colombia de 1991 es la norma fundamental del Estado colombiano. Establece los derechos fundamentales, la estructura del Estado y los principios que rigen la organización política y jurídica del país.",
          engines: ['fallback'],
        },
        {
          title: "Código Civil Colombiano",
          url: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=4718",
          content: "El Código Civil de Colombia regula las relaciones jurídicas entre particulares, incluyendo contratos, obligaciones, bienes, sucesiones y familia. Es una de las principales fuentes del derecho privado en Colombia.",
          engines: ['fallback'],
        },
        {
          title: "Jurisprudencia de la Corte Constitucional",
          url: "https://www.corteconstitucional.gov.co/relatoria/",
          content: "La Corte Constitucional de Colombia es el máximo tribunal de la jurisdicción constitucional. Sus sentencias establecen precedentes jurisprudenciales que son vinculantes para todas las autoridades.",
          engines: ['fallback'],
        }
      );
    } else {
      // Para consultas no legales, proporcionar un resultado genérico
      fallbackResults.push({
        title: "Información no disponible temporalmente",
        url: "#",
        content: `Lo siento, el servicio de búsqueda web está temporalmente no disponible. No pude encontrar información específica sobre "${query}". Por favor, intenta más tarde o reformula tu consulta.`,
        engines: ['fallback'],
      });
    }

    return {
      results: fallbackResults,
      suggestions: []
    };
  }
};
