import { Priority } from "../../generated/prisma"
import { User } from "./User"

export interface Task {
    description: string,
    priority: Priority,
    done: boolean,
    user?: User
}