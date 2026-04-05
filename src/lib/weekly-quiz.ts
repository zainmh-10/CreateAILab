export type QuizQuestion = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  difficulty: 'easy' | 'hard';
};

export type QuizSet = {
  weekLabel: string;
  questions: QuizQuestion[];
};

const EASY_1: QuizQuestion[] = [
  { id: 'e1-1', text: 'What does "LLM" stand for?', options: ['Large Language Model', 'Layered Learning Machine', 'Linguistic Logic Module', 'Linear Language Matrix'], correctIndex: 0, difficulty: 'easy' },
  { id: 'e1-2', text: 'Which company developed ChatGPT?', options: ['Google', 'Anthropic', 'OpenAI', 'Meta'], correctIndex: 2, difficulty: 'easy' },
  { id: 'e1-3', text: 'What is prompt engineering?', options: ['Building hardware for AI', 'Crafting inputs to get better AI outputs', 'Training neural networks', 'Debugging code'], correctIndex: 1, difficulty: 'easy' },
  { id: 'e1-4', text: 'What does "GPT" stand for?', options: ['General Purpose Technology', 'Generative Pre-trained Transformer', 'Global Processing Tool', 'Guided Predictive Text'], correctIndex: 1, difficulty: 'easy' },
  { id: 'e1-5', text: 'Which AI model is known for its long context window and strong reasoning?', options: ['GPT-3', 'Claude', 'BERT', 'Stable Diffusion'], correctIndex: 1, difficulty: 'easy' }
];

const HARD_1: QuizQuestion[] = [
  { id: 'h1-1', text: 'In the transformer architecture, what mechanism allows the model to weigh the importance of different input tokens when producing each output token?', options: ['Convolution', 'Self-attention', 'Recurrence', 'Pooling'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-2', text: 'What is the primary purpose of RLHF (Reinforcement Learning from Human Feedback) in LLM training?', options: ['To increase model size', 'To align model outputs with human preferences', 'To speed up inference', 'To reduce token count'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-3', text: 'In RAG (Retrieval-Augmented Generation), what role does the retrieval step play?', options: ['It trains the model', 'It fetches relevant context from external sources before generation', 'It compresses the model', 'It validates outputs'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-4', text: 'What does "emergent behavior" mean in the context of large language models?', options: ['Bugs that appear at scale', 'Capabilities that arise unexpectedly as models grow', 'Pre-programmed features', 'User-reported errors'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-5', text: 'Which technique helps reduce "hallucination" in LLM outputs by grounding responses in retrieved documents?', options: ['Fine-tuning', 'RAG', 'Quantization', 'Distillation'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-6', text: 'What is the main difference between a decoder-only model (e.g. GPT) and an encoder-decoder model (e.g. T5)?', options: ['Decoder-only is smaller', 'Decoder-only generates autoregressively; encoder-decoder encodes input then decodes', 'Encoder-decoder is faster', 'They are the same'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-7', text: 'In chain-of-thought prompting, what is the primary benefit?', options: ['Shorter responses', 'Improved reasoning by showing intermediate steps', 'Faster inference', 'Fewer tokens'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-8', text: 'What does "context window" refer to in an LLM?', options: ['The browser tab', 'The maximum number of tokens the model can process in one request', 'A debugging tool', 'The training dataset size'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-9', text: 'Which of these is a key challenge in AI alignment?', options: ['Model size limits', 'Ensuring AI systems pursue intended goals and avoid harmful behavior', 'Token limits', 'API rate limits'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-10', text: 'What is "in-context learning" in LLMs?', options: ['Training on new data', 'Learning from examples provided in the prompt without weight updates', 'Using external APIs', 'Caching previous responses'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-11', text: 'In diffusion models (e.g. DALL-E, Stable Diffusion), what does the "reverse process" do?', options: ['Deletes the image', 'Gradually removes noise to generate a coherent image', 'Compresses the image', 'Encodes the image'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-12', text: 'What does "fine-tuning" an LLM typically involve?', options: ['Changing the architecture', 'Training on additional task-specific data to adapt the model', 'Reducing model size', 'Speeding up inference'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-13', text: 'Which metric is commonly used to evaluate LLM output quality in language generation?', options: ['FPS', 'Perplexity', 'Latency', 'Token count'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-14', text: 'What is "prompt injection" in the context of LLM security?', options: ['Injecting code into the model', 'Manipulating the model via crafted inputs to override intended behavior', 'Updating the model weights', 'Sending too many requests'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h1-15', text: 'In MoE (Mixture of Experts) architectures, how do models route tokens?', options: ['Randomly', 'Through a gating network that selects which expert(s) process each token', 'To all experts equally', 'Based on user ID'], correctIndex: 1, difficulty: 'hard' }
];

const EASY_2: QuizQuestion[] = [
  { id: 'e2-1', text: 'What is an AI "agent"?', options: ['A robot', 'An AI system that can plan and take actions to achieve goals', 'A chatbot', 'A dataset'], correctIndex: 1, difficulty: 'easy' },
  { id: 'e2-2', text: 'Which tool is commonly used for AI image generation?', options: ['Excel', 'Midjourney', 'Photoshop', 'Figma'], correctIndex: 1, difficulty: 'easy' },
  { id: 'e2-3', text: 'What does "token" mean in LLM context?', options: ['A security key', 'A unit of text (word or subword) the model processes', 'A payment', 'A login credential'], correctIndex: 1, difficulty: 'easy' },
  { id: 'e2-4', text: 'Which AI model is known for strong coding assistance?', options: ['Stable Diffusion', 'GitHub Copilot', 'DALL-E', 'Whisper'], correctIndex: 1, difficulty: 'easy' },
  { id: 'e2-5', text: 'What is "generative AI"?', options: ['AI that only classifies', 'AI that creates new content (text, images, etc.)', 'AI that deletes data', 'AI that searches the web'], correctIndex: 1, difficulty: 'easy' }
];

const HARD_2: QuizQuestion[] = [
  { id: 'h2-1', text: 'What is "speculative decoding" used for in LLM inference?', options: ['Training', 'Accelerating generation by drafting multiple tokens in parallel', 'Reducing model size', 'Improving accuracy'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-2', text: 'In LoRA (Low-Rank Adaptation), what is being adapted during fine-tuning?', options: ['The entire model', 'Small low-rank matrices added to existing weights', 'The tokenizer', 'The context window'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-3', text: 'What does "temperature" control in LLM sampling?', options: ['Server heat', 'Randomness: higher = more diverse, lower = more deterministic', 'Speed', 'Context length'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-4', text: 'What is "constitutional AI" (used by Anthropic)?', options: ['Government regulation', 'Training models to follow a set of principles via self-critique and revision', 'Open-source licensing', 'Hardware design'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-5', text: 'In vision-language models (e.g. GPT-4V), how are images typically fed into the model?', options: ['As raw pixels', 'As embeddings from a vision encoder, then treated like tokens', 'As URLs only', 'As thumbnails'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-6', text: 'What is "top-p" (nucleus) sampling?', options: ['A ranking metric', 'Sampling from the smallest set of tokens whose cumulative probability exceeds p', 'A training method', 'A model architecture'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-7', text: 'What does "zero-shot" mean in LLM evaluation?', options: ['No testing', 'Testing without providing task-specific examples in the prompt', 'Zero errors', 'Instant response'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-8', text: 'What is the primary purpose of "system prompts" in chat-based LLMs?', options: ['To store user data', 'To set the model\'s behavior, role, and constraints', 'To log requests', 'To cache responses'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-9', text: 'In "tree of thoughts" prompting, what does the model do?', options: ['Draw trees', 'Explore multiple reasoning paths and backtrack', 'Classify data', 'Generate code'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-10', text: 'What is "quantization" in the context of LLMs?', options: ['Counting tokens', 'Using lower precision (e.g. 8-bit) to reduce model size and memory', 'Measuring quality', 'Limiting output length'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-11', text: 'What does "few-shot" prompting involve?', options: ['Very short prompts', 'Including a few example input-output pairs in the prompt', 'Fewer parameters', 'Fewer users'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-12', text: 'Which technique helps LLMs handle long documents by summarizing or chunking?', options: ['Caching', 'MapReduce or similar summarization over chunks', 'Compression', 'Token limits'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-13', text: 'What is "tool use" or "function calling" in LLM applications?', options: ['Using a hammer', 'Letting the model request external actions (API calls, search) based on user intent', 'Debugging', 'Training'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-14', text: 'In multimodal models, what does "modality" refer to?', options: ['Mood', 'Type of input/output (text, image, audio, etc.)', 'Model size', 'Speed'], correctIndex: 1, difficulty: 'hard' },
  { id: 'h2-15', text: 'What is "retrieval-augmented generation" primarily used to address?', options: ['Speed', 'Hallucination and outdated knowledge by grounding in external data', 'Cost', 'Latency'], correctIndex: 1, difficulty: 'hard' }
];

const QUIZ_SETS: QuizSet[] = [
  { weekLabel: 'Week 1', questions: [...EASY_1, ...HARD_1] },
  { weekLabel: 'Week 2', questions: [...EASY_2, ...HARD_2] },
  { weekLabel: 'Week 3', questions: [...EASY_1, ...HARD_2] },
  { weekLabel: 'Week 4', questions: [...EASY_2, ...HARD_1] }
];

/** Quiz rotates every Sunday at 8pm GMT. Epoch: Sunday 5 Jan 2025 20:00 GMT */
export function getWeekNumberGMT(): number {
  const epoch = Date.UTC(2025, 0, 5, 20, 0, 0);
  const now = Date.now();
  const diff = now - epoch;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor(diff / oneWeek));
}

export function getCurrentQuizSet(): QuizSet {
  const weekNum = getWeekNumberGMT();
  const index = weekNum % QUIZ_SETS.length;
  return QUIZ_SETS[index]!;
}

export function getQuestionsForClient(): Array<{ id: string; text: string; options: string[]; difficulty: string }> {
  const set = getCurrentQuizSet();
  return set.questions.map((q) => ({
    id: q.id,
    text: q.text,
    options: q.options,
    difficulty: q.difficulty
  }));
}

export function scoreQuiz(answers: Record<string, number>): {
  score: number;
  total: number;
  percentage: number;
  correctByQuestion: Record<string, boolean>;
  questionResults: Array<{ id: string; text: string; correct: boolean; userAnswer: string; correctAnswer: string }>;
} {
  const set = getCurrentQuizSet();
  const correctByQuestion: Record<string, boolean> = {};
  const questionResults: Array<{ id: string; text: string; correct: boolean; userAnswer: string; correctAnswer: string }> = [];

  let score = 0;
  for (const q of set.questions) {
    const userIdx = answers[q.id];
    const correct = typeof userIdx === 'number' && userIdx === q.correctIndex;
    if (correct) score++;
    correctByQuestion[q.id] = correct;
    questionResults.push({
      id: q.id,
      text: q.text,
      correct,
      userAnswer: typeof userIdx === 'number' ? q.options[userIdx] ?? '—' : '—',
      correctAnswer: q.options[q.correctIndex] ?? ''
    });
  }

  return {
    score,
    total: set.questions.length,
    percentage: Math.round((score / set.questions.length) * 100),
    correctByQuestion,
    questionResults
  };
}

export function buildQuizResultsEmailHtml(params: {
  score: number;
  total: number;
  percentage: number;
  weekLabel: string;
  questionResults: Array<{ text: string; correct: boolean; userAnswer: string; correctAnswer: string }>;
}) {
  const { score, total, percentage, weekLabel, questionResults } = params;

  const rows = questionResults
    .map(
      (r) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#334155;font-size:14px;">${r.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:${r.correct ? '#059669' : '#dc2626'};font-size:14px;">${r.correct ? 'Correct' : 'Incorrect'}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;">${r.userAnswer.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-size:13px;">${r.correctAnswer.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;font-family:Arial,Helvetica,sans-serif;background:#f8fafc;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:24px;">
      <p style="margin:0 0 8px;color:#6366f1;font-weight:700;font-size:12px;letter-spacing:0.05em;">CreatorAILab Weekly AI Quiz</p>
      <h1 style="margin:0 0 16px;font-size:24px;color:#0f172a;">Your Quiz Results — ${weekLabel}</h1>
      <p style="margin:0 0 20px;color:#475569;line-height:1.6;">You scored <strong>${score}/${total}</strong> (${percentage}%).</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px 12px;background:#f1f5f9;border-bottom:2px solid #e2e8f0;color:#334155;">Question</th>
            <th style="text-align:left;padding:8px 12px;background:#f1f5f9;border-bottom:2px solid #e2e8f0;color:#334155;">Result</th>
            <th style="text-align:left;padding:8px 12px;background:#f1f5f9;border-bottom:2px solid #e2e8f0;color:#334155;">Your Answer</th>
            <th style="text-align:left;padding:8px 12px;background:#f1f5f9;border-bottom:2px solid #e2e8f0;color:#334155;">Correct Answer</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
      <p style="margin:20px 0 0;color:#64748b;font-size:12px;">New quiz every Sunday at 8pm GMT. Good luck next week!</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}
