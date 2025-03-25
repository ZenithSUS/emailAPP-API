import { extractClientIP } from "../controllers/ip-controller.js";
export function ipDiagnosticMiddleware(req, res, next) {
  const clientIP = extractClientIP(req);
  
  console.log('Comprehensive IP Diagnostic:', {
    extractedIP: clientIP,
    fullHeaders: req.headers
  });
  
  // Attach IP to request for further use
  req.clientIP = typeof clientIP === 'string' ? clientIP : JSON.stringify(clientIP);
  
  next();
}

