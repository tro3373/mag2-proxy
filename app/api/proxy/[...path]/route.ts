import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // ex) /api/proxy?target=https://example.com
  const target = searchParams.get("target");

  if (!target) {
    return new Response("Target URL is required", { status: 400 });
  }

  const response = await fetch(target, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

// no middleware and [...path].ts
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { path = [] } = req.query;
//   const targetUrl = `https://satoshi.blogs.com/${Array.isArray(path) ? path.join('/') : path}`;

//   // 必要なヘッダーをコピーしつつ、User-Agentを上書き
//   const headers = {
//     ...req.headers,
//     'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
//   };

//   // fetchでプロキシ先へリクエスト
//   const response = await fetch(targetUrl, {
//     method: req.method,
//     headers,
//   });

//   // レスポンスをそのまま返す
//   res.status(response.status);
//   response.body && response.body.pipe(res);
// }
