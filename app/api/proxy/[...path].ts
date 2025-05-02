import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { path = [] } = req.query;
  const targetUrl = `https://satoshi.blogs.com/${
    Array.isArray(path) ? path.join("/") : path
  }`;

  // 必要なヘッダーをコピーしつつ、User-Agentを上書き
  const headers: Record<string, string> = {};
  Object.entries(req.headers).forEach(([key, value]) => {
    if (value && typeof value === "string") {
      headers[key] = value;
    }
  });
  headers["user-agent"] =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

  // fetchでプロキシ先へリクエスト
  const response = await fetch(targetUrl, {
    method: req.method,
    headers,
  });

  // レスポンスをそのまま返す
  res.status(response.status);
  const data = await response.arrayBuffer();
  res.send(Buffer.from(data));
}
