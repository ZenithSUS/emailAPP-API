import { createAddress } from "../appwrite/ip-address.js";
import { Address6 } from 'ip-address';  // Use ip-address package instead

export const insertAddress = async (req, res) => {
  try {
    let userIp = req.ip;
    
    // Convert IPv6-mapped IPv4 addresses
    if (userIp.startsWith('::ffff:')) {
      userIp = userIp.replace('::ffff:', '');
    }

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
    let userIp = req.ip;

    // Proper IPv6 to IPv4 conversion
    try {
      const addr = new Address6(userIp);
      if (addr.isV4MappedAddress()) {
        userIp = addr.to4().correctForm();
      }
    } catch {
      // Keep original IP if conversion fails
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