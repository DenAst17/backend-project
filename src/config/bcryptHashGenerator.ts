import bcrypt from "bcrypt"

export function getHash(text:string) {
    const hash = bcrypt.hashSync(text, 10);
    return hash;
}

export function compareToHash(text:string, hash: string) {
    const isEqual = bcrypt.compareSync(text, hash);
    return isEqual;
}