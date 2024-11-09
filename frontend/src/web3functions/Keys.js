import { ec as EC } from 'elliptic';
import CryptoJS from 'crypto-js';

// Initialize elliptic curve - using curve secp256k1
const ec = new EC('secp256k1');

export function generateKeyPair() {
  // Generate keys
  const keyPair = ec.genKeyPair();

  // Convert to compact format
  return {
    privateKey: keyPair.getPrivate('hex'),  // 32 bytes private key
    publicKey: keyPair.getPublic('hex')     // 65 bytes public key (uncompressed)
  };
}



export function encrypt(publicKeyHex, message) {
  // Convert hex to key point
  const publicKey = ec.keyFromPublic(publicKeyHex, 'hex');

  // Generate ephemeral key pair
  const ephemeral = ec.genKeyPair();

  // Generate shared secret
  const sharedSecret = ephemeral.derive(publicKey.getPublic());

  // Use shared secret as encryption key
  const key = CryptoJS.SHA256(sharedSecret.toString(16));

  // Encrypt the message
  const encrypted = CryptoJS.AES.encrypt(message, key.toString()).toString();

  return {
    encrypted,
    ephemeralPublicKey: ephemeral.getPublic('hex')
  };
}


export function decrypt(privateKeyHex, encrypted, ephemeralPublicKeyHex) {
  // Convert hex to keys
  const privateKey = ec.keyFromPrivate(privateKeyHex, 'hex');
  const ephemeralPublicKey = ec.keyFromPublic(ephemeralPublicKeyHex, 'hex');

  // Generate shared secret
  const sharedSecret = privateKey.derive(ephemeralPublicKey.getPublic());

  // Use shared secret as decryption key
  const key = CryptoJS.SHA256(sharedSecret.toString(16));

  // Decrypt the message
  const decrypted = CryptoJS.AES.decrypt(encrypted, key.toString());

  return decrypted.toString(CryptoJS.enc.Utf8);
}


export function encryptDataWithPass(data, password) {
  const encrypted = CryptoJS.AES.encrypt(data, password).toString();
  return encrypted;
}

export function decryptDataWithPass(encryptedData, password) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, password);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
}

