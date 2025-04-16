const bcrypt = require('bcrypt');

const saltRounds = 10;

export async function getHash(password: string) : Promise<string> {
    try {
        const salt =  await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    } catch (error) {
        throw error;
    }
}

export async function comparePasswords(password: string, passwordSaved: string) : Promise<string> {
    try {
        return await bcrypt.compare(password, passwordSaved);
    } catch (error) {
        throw error;
    }
}