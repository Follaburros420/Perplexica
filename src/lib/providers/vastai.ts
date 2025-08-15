import { ChatOpenAI } from '@langchain/openai';
import { getCustomOpenaiApiKey, getCustomOpenaiApiUrl, getCustomOpenaiModelName } from '../config';
import { ChatModel } from '.';
import { BaseChatModel } from '@langchain/core/language_models/chat_models';

export const PROVIDER_INFO = {
  key: 'vastai',
  displayName: 'GPT OSS 20B',
};

// Modelos disponibles en tu instancia de Vast.ai
const vastAiChatModels: Record<string, string>[] = [
  {
    displayName: 'GPT OSS 20B (Vast.ai)',
    key: 'gpt-oss-20b',
  },
];

export const loadVastAiChatModels = async () => {
  // Configuración directa sin depender de config.toml
  const apiUrl = 'http://72.19.34.111:46191/v1';
  const apiKey = 'TU_SUPER_KEY';
  const modelName = 'openai/gpt-oss-20b';

  console.log(`Vast.ai: Cargando modelo ${modelName} desde ${apiUrl}`);

  try {    
    const chatModels: Record<string, ChatModel> = {};

    // Usar configuración fija para evitar problemas
    const modelKey = 'gpt-oss-20b'; // Clave fija para consistencia
    const displayName = 'GPT OSS 20B';

    chatModels[modelKey] = {
      displayName: displayName,
      model: new ChatOpenAI({
        apiKey: apiKey,
        modelName: modelName,
        temperature: 0.7,
        configuration: {
          baseURL: apiUrl,
        },
        // Configuraciones optimizadas
        maxRetries: 2,
        timeout: 60000, // 60 segundos para dar tiempo al modelo
      }) as unknown as BaseChatModel,
    };

    console.log(`Vast.ai: Modelo ${modelKey} cargado exitosamente`);
    return chatModels;
  } catch (err) {
    console.error(`Error loading Vast.ai models: ${err}`);
    console.log('Vast.ai: Continuando sin el modelo personalizado...');
    return {};
  }
};

