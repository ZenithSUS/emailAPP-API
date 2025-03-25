import { createAddress, getAddresses } from "../appwrite/ip-address.js";

export const insertAddress = async (req, res) => {
  try {
    const userIp = req.headers['cf-connecting-ip']
      req.headers["x-forwarded-for"] ||
      req.headers["x-real"] ||
      req.socket.remoteAddress;
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
    const userIp =
      req.headers["x-forwarded-for"] ||
      req.headers["x-real"] ||
      req.socket.remoteAddress;
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
