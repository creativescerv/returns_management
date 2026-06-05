const https = require('https');
require('http').createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(200); res.end(); return; }
  if (req.method !== 'POST') { res.end('Method not allowed'); return; }
  let body = '';
  req.on('data', d => body += d);
  req.on('end', () => {
    const opts = {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': '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',
        'anthropic-version': '2023-06-01',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    const r = https.request(opts, resp => {
      let data = '';
      resp.on('data', d => data += d);
      resp.on('end', () => { res.setHeader('Content-Type','application/json'); res.end(data); });
    });
    r.on('error', e => res.end(JSON.stringify({error: e.message})));
    r.write(body); r.end();
  });
}).listen(process.env.PORT || 3000, () => {
  console.log('Running');
  setInterval(() => {
    require('https').get('https://returns-management.onrender.com/');
  }, 14 * 60 * 1000);
});
