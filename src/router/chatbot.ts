import { Router, Request, Response } from 'express';
import { streamText } from 'ai';
import rateLimit from 'express-rate-limit';
import { allChunks } from '../lib/leerDocumentaciones';

const aiRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: {
    error: 'Demasiadas solicitudes, por favor intenta de nuevo más tarde.',
  },
  legacyHeaders: false,
  standardHeaders: 'draft-8',
});

interface DocChunk {
  app: 'desktop' | 'admin' | 'online' | 'offline';
  title: string;
  content: string;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function scoreChunk(question: string, chunk: DocChunk): number {
  const q = normalize(question);
  const c = normalize(`${chunk.title} ${chunk.content}`);

  const words = q.split(/\s+/).filter((w) => w.length > 2);

  let score = 0;

  for (const word of words) {
    if (c.includes(word)) score += 2;
    if (normalize(chunk.title).includes(word)) score += 3;
  }

  if (q.includes('escritorio') && chunk.app === 'desktop') score += 5;
  if (q.includes('administrador') && chunk.app === 'admin') score += 5;
  if (q.includes('online') && chunk.app === 'online') score += 5;
  if (q.includes('offline') && chunk.app === 'offline') score += 5;

  return score;
}

function getRelevantChunks(
  question: string,
  chunks: DocChunk[],
  limit = 5,
): DocChunk[] {
  return chunks
    .map((chunk) => ({
      chunk,
      score: scoreChunk(question, chunk),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.chunk);
}

function buildContext(chunks: DocChunk[]): string {
  if (chunks.length === 0) {
    return 'No se encontró información relevante en la documentación.';
  }

  return chunks
    .map(
      (chunk) => `[Módulo: ${chunk.app}]
[Título: ${chunk.title}]
${chunk.content}`,
    )
    .join('\n\n---\n\n');
}

const router = Router();

router.use(aiRateLimit);

router.post('/chatbot/pregunta', (req: Request, res: Response): void => {
  try {
    const { pregunta } = req.body as { pregunta: string };

    if (!pregunta) {
      res.status(400).json({ error: 'Pregunta no especificada' });
      return;
    }

    const relevantChunks = getRelevantChunks(pregunta, allChunks, 5);
    const context = buildContext(relevantChunks);

    const systemPrompt = `
Eres el asistente oficial del sistema de facturación R Facturation.

Debes responder únicamente usando la documentación recuperada y entregada en el contexto.
No uses conocimiento general ni información externa.

Reglas:
- Si la pregunta está fuera del sistema de facturación, responde exactamente:
  "Solo puedo responder preguntas relacionadas con el sistema de facturación."
- Si la documentación recuperada no contiene la respuesta, responde exactamente:
  "Esa información no está disponible en la documentación del sistema."
- No inventes información.
- No completes huecos con suposiciones.
- Si hay información de varios módulos, aclara a cuál pertenece:
  escritorio, administrador móvil, facturador móvil online o facturador móvil offline.
- Prioriza exactitud sobre fluidez.
- Responde en español.
- Cualquier pregunta no encontrada en la documentación, muestra datos del soporte de R Facturation.

Información del soporte:
- Nombre del sistema: R Facturation
- Nombre del creador: Ramón Ulises Hernández Talavera
- Número del creador: 5781-0634
`;

    const result = streamText({
      model: 'meta/llama-3.1-8b',
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Contexto:\n${context}\n\nPregunta del usuario:\n${pregunta}`,
        },
      ],
    });

    result.pipeTextStreamToResponse(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al generar respuesta' });
  }
});

export default router;
