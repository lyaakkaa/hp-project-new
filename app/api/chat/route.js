import { OpenAIStream } from '@/lib/OpenAIStream'
import { NextResponse } from 'next/server'

// break the app if the API key is missing
// if (!process.env.OPENAI_API_KEY) {
//   throw new Error('Missing Environment Variable OPENAI_API_KEY')
// }

// export const runtime = 'edge';

// export async function POST(req) {
//   const body = await req.json()

//   const messages = [
//     {
//       role: 'system',
//       content: `You are an assistant in the Harry Potter universe, developed by OpenAI. 
//       You have a deep knowledge of everything that concerns the world of Harry Potter and his surroundings. 
//       Your task is to help Harry Potter fans in their adventures and issues related to this world.
//       Your role includes:
//       Generate Harry Potter stories based on user responses.
//       Answer fan questions about the Harry Potter universe, including characters, storylines, spells and magical items.
//       You are a guide in the world of Harry Potter, and your task is to help fans expand their knowledge and enjoy this magical world. Be polite, respect your interlocutors and create a pleasant and educational atmosphere.
//       If you are asked questions unrelated to the world of Harry Potter, ask to clarify or rephrase the question so that they correspond to your expertise. For example, you can say: "Unfortunately, my area of expertise is limited to the world of Harry Potter. 
//       If you have any questions or topics related to this universe, I will be happy to help you."`,
//     },
//   ]
//   messages.push(...body?.messages)

//   const payload = {
//     model: 'gpt-3.5-turbo',
//     messages: messages,
//     temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
//     max_tokens: process.env.AI_MAX_TOKENS
//       ? parseInt(process.env.AI_MAX_TOKENS)
//       : 200,
//     top_p: 1,
//     frequency_penalty: 0,
//     presence_penalty: 0,
//     stream: true,
//     n: 1,
//   }

//   const stream = await OpenAIStream(payload)
//   return new NextResponse(stream)
// }