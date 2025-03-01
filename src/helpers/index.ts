import crypto from 'crypto'

const secret = "litrest"

export const random = () => crypto.randomBytes(128).toString('base64');
export const auth = (salt : string, password : string) => {
    return crypto.createHmac('sha256', [salt, password].join('/')).update(secret).digest('hex');
};
