import { createAddress, getAddresses } from "../appwrite/ip-address.js";
export function extractClientIP(req) {
    // Possible IP sources
    const ipSources = [
      // Check headers first
      req.get('X-Forwarded-For'),
      req.get('X-Real-IP'),
      req.get('CF-Connecting-IP'),
      
      // Network interface information
      req.ip,
      req.socket.remoteAddress,
      req.connection.remoteAddress
    ];
  
    // IP cleaning and validation function
    function normalizeIP(ip) {
      if (!ip) return null;
  
      // Remove IPv6 prefixes
      ip = ip.replace(/^::ffff:/, '');
  
      // List of internal/private IP patterns to filter out
      const internalIPPatterns = [
        /^127\.\d+\.\d+\.\d+/,   // Localhost IPv4
        /^::1$/,                 // Localhost IPv6
        /^172\.\d+\.\d+\.\d+/,   // Docker internal network
        /^192\.168\.\d+\.\d+/,   // Private network
        /^10\.\d+\.\d+\.\d+/     // Another private network range
      ];
  
      // Check if IP is external
      const isExternalIP = !internalIPPatterns.some(pattern => pattern.test(ip));
  
      return isExternalIP ? ip : null;
    }
  
    // Try to find a valid external IP
    for (const source of ipSources) {
      const cleanedIP = normalizeIP(source);
      if (cleanedIP) return cleanedIP;
    }
  
    // If no external IP found, return connection details
    return {
      message: 'Unable to detect external IP',
      connectionDetails: {
        host: req.get('host'),
        detectedIPs: {
          ip: req.ip,
          socketAddress: req.socket.remoteAddress,
          connectionAddress: req.connection.remoteAddress
        }
      }
    };
  }

// Example usage in your route
export const insertAddress = async (req, res) => {
  try {
    const userIp = extractClientIP(req);

    console.log("Detected User IP:", userIp);

    await createAddress({ address: userIp });

    return res.status(200).json({
      message: "Address Captured!",
      data: userIp,
    });
  } catch (error) {
    console.error("IP Capture Error:", error);
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    const userIp = extractClientIP(req);
    return res.status(200).json({
      message: "Address Fetched!",
      data: userIp,
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};
