import { createAddress } from "../appwrite/ip-address.js";
import IP from "ip";
export const insertAddress = async (req, res) => {
  try {
    const userIp = IP.address();

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
    let userIp = IP.address();

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
