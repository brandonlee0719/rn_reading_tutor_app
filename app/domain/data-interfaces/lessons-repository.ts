
export interface LessonsRepository {
    fetchNextLessons(): any
    getPersistedNextLessons(): void
    fetchCompletedLessons(): any
    getPersistedCompletedLessons(): void
}
