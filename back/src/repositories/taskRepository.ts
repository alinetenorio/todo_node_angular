import { PrismaClient } from '../../generated/prisma';
import { Task } from '../types';
const prisma = new PrismaClient();
 
async function connect() {
    await prisma.$connect();
}
 
connect();

function getTasks(done?: boolean) {
    return prisma.task.findMany({
        where: typeof done === "boolean" ? { done } : undefined,
      });
}
 
function getTaskById(id: number) {
    return prisma.task.findUnique({
        where: { id }
    })
}

function createTask(task: any) {
    return prisma.task.create({
        data: {
            description: task.description,
            priority: task.priority,
            user: {
                connect: {
                    id: task.user.id
                }
            }    
        }
    });
}

function updateTask(id: number, task: Task) {
    return prisma.task.update({
        where: { id },
        data: { 
            done: task.done,
            description: task.description,
            priority: task.priority
        }
    });
}

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask
}