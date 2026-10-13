import { onRequestOptions as __api_ai_ts_onRequestOptions } from "/home/somnathb/.gemini/antigravity/scratch/calculatemyreturns-global/functions/api/ai.ts"
import { onRequestPost as __api_ai_ts_onRequestPost } from "/home/somnathb/.gemini/antigravity/scratch/calculatemyreturns-global/functions/api/ai.ts"

export const routes = [
    {
      routePath: "/api/ai",
      mountPath: "/api",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_ai_ts_onRequestOptions],
    },
  {
      routePath: "/api/ai",
      mountPath: "/api",
      method: "POST",
      middlewares: [],
      modules: [__api_ai_ts_onRequestPost],
    },
  ]