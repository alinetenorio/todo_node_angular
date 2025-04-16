import { PrismaClient } from '../../generated/prisma';
import { User } from '../types';
const prisma = new PrismaClient();
 
async function connect() {
    await prisma.$connect();
}
 
connect();
 
function getUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    })
}

function getUserById(id: number) {
    return prisma.user.findUnique({
        where: { id }
    })
}

function createUser(user: User) {
    return prisma.user.create({
        data: user
    });
}

module.exports = {
    getUserByEmail,
    getUserById,
    createUser
}