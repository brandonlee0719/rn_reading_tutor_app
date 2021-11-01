import { RepositoryBuilder } from "../../domain/data-interfaces/builder";
import { LessonsRepository } from "../../domain/data-interfaces/lessons-repository";
import { UsersRepository } from "../../domain/data-interfaces/users-repository";
import { LessonsRepositoryImpl } from "./lessons-repository";
import { UsersRepositoryImpl } from "./users-repository";

export class RepositoryBuilderImpl implements RepositoryBuilder {

    createUsersRepository(): UsersRepository {
        return new UsersRepositoryImpl()
    }

    createLessonsRepository(): LessonsRepository {
        return new LessonsRepositoryImpl()
    }

}
