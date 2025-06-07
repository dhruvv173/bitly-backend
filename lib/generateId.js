import { customAlphabet } from "nanoid";

const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const generateId = customAlphabet(alphabet, 7);

export default generateId;
