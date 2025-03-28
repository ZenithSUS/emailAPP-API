import { createAddress } from "../appwrite/ip-address.js";
import { Address6 } from 'ip-address';

// Helper function to extract the real client IP
const getClientIp = (req) => {
  // Priority: X-Forwarded-For (first IP in the chain) > X-Real-IP > req.ip
  const forwardedFor = req.get('X-Forwarded-For');
  const realIp = req.get('X-Real-IP');
  let ip = forwardedFor?.split(',')[0]?.trim() || realIp || req.ip;

  // Remove IPv6 wrapper (e.g., "::ffff:192.168.1.1" → "192.168.1.1")
  if (ip.startsWith('::ffff:')) {
    ip = ip.replace('::ffff:', '');
  }

  return ip;
};

export const insertAddress = async (req, res) => {
  try {
    const userIp = getClientIp(req); // Use the helper function

    await createAddress({ address: userIp });
    return res.status(200).json({
      message: "Address Captured!",
      data: userIp,
    });
  } catch (error) {
    res.status(500).json({
      status: res.statusCode,
      message: error.message,
    });
  }
};

export const getAddress = async (req, res) => {
  try {
    let userIp = getClientIp(req); // Use the helper function

    // Convert IPv6-mapped IPv4 addresses (if needed)
    try {
      const addr = new Address6(userIp);
      if (addr.isV4MappedAddress()) {
        userIp = addr.to4().correctForm();
      }
    } catch {
      // Fallback to original IP if conversion fails
    }

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