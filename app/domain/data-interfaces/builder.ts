import { LessonsRepository } from "./lessons-repository";
import { UsersRepository } from "./users-repository";

export interface RepositoryBuilder {
    createUsersRepository(): UsersRepository
    createLessonsRepository(): LessonsRepository
}
