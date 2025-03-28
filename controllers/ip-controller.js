import { createAddress } from "../appwrite/ip-address.js";
import os from "os"; // Added to fetch network interfaces

// Utility function to get internal IP address
const getInternalIp = () => {
  const networkInterfaces = os.networkInterfaces();
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
};

export const insertAddress = async (req, res) => {
  try {
    const userIp = getInternalIp(); // Updated to use getInternalIp()

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
    const userIp = getInternalIp(); // Updated to use getInternalIp()

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
