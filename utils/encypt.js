const secretKey = "mySecretKey123";
import CryptoJS from "crypto-js";
export function encrypt(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}
