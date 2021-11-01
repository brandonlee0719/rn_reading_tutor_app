
import Realm from 'realm';

type Type<K> = new (...args: any[]) => K

export interface LocalStorage<T> {
    saveOrUpdateObject(object: T): void
    saveOrUpdateObjects(object: T[]): void
    getAllObjectsOfType<T>(type: Type<T>, sorted?: {byKey: string, ascending: boolean},
                            offset?: number, limit?: number): T[]
    getFilteredObjectsOfType<T>(type: Type<T>, predicate: [query: string, ...args: any[]],
                            sorted?: {byKey: string, ascending: boolean}, offset?: number, limit?: number): T[]
    deleteObjectsOfType<T>(type: Type<T>, predicate?: [query: string, ...args: any[]]): void
    deleteObject(object: T): void
    deleteObjects(object: T[]): void
    deleteAll(): void
}

export class RealmAdapter<K extends Realm.ObjectClass> implements LocalStorage<K> {
    
    realm?: Realm

    constructor(schemas: Realm.ObjectSchema[]) {
        try {
            let config = {
                schema: schemas,
                schemaVersion: 0,
                migration: (oldRealm: Realm, newRealm: Realm) => {},
                shouldCompactOnLaunch: (totalBytes: number, usedBytes: number) => {
                    // Compact if the file is over 20MB in size and less than 50% 'used'
                    let twentyMB = 20 * 1024 * 1024
                    return (totalBytes > twentyMB) && (usedBytes / totalBytes) < 0.5
                }
            }

            this.realm = new Realm(config)
            console.log(`Realm file location is: ${this.realm?.path}`)

        } catch (error) {
            console.log(`REALM ERROR: ${error.message}`)
        }
    }

    saveOrUpdateObject<T extends K>(object: T) {
        var schema = object.schema
        try {
            let self = this.realm
            this.realm?.write(() => {
                if (schema.primaryKey) {
                    self?.create(schema.name, object, Realm.UpdateMode.All)
                } else {
                    self?.create(schema.name, object)
                }
            })
        } catch (error) {
            console.log(`REALM ERROR: ${error.message}`)
        }
    }

    saveOrUpdateObjects<T extends K>(objects: T[]) {
        objects.forEach(object => {
            var schema = object.schema
            try {
                let self = this.realm
                this.realm?.write(() => {
                    if (schema.primaryKey) {
                        self?.create(schema.name, object, Realm.UpdateMode.All)
                    } else {
                        self?.create(schema.name, object)
                    }
                })
            } catch (error) {
                console.log(`REALM ERROR: ${error.message}`)
            }
        })
    }

    getAllObjectsOfType<T>(type: Type<T>, sorted?: {byKey: string, ascending: boolean}, 
                        offset?: number, limit?: number): T[] {
                            
        var results = this.realm?.objects<T>(type.name)
        if (results) {
            if (sorted) {
                results = results.sorted(sorted.byKey, sorted.ascending)
            }
            let array = Array.from(results).slice(offset, limit ? ((offset ?? 0) + limit) : undefined).map(object => {                
                return new type(object)
            })
            return array
        } else {
            return [] as T[]
        }
    }
    
    getFilteredObjectsOfType<T>(type: Type<T>, predicate: [query: string, ...args: any[]],
                            sorted?: {byKey: string, ascending: boolean}, offset?: number, limit?: number): T[] {
        let results = this.realm?.objects<T>(type.name)      
        if (results) {
            if (predicate) {
                results = results.filtered(...predicate);
            }
            if (sorted) {
                results = results.sorted(sorted.byKey, sorted.ascending)
            }
            let array = Array.from(results).slice(offset, limit ? ((offset ?? 0) + limit) : undefined).map(object => {
                return new type(object)
            })
            return array
        } else {
            return [] as T[]
        }
    }

    deleteObjectsOfType<T>(type: new (...args: any[]) => T, predicate: [query: string, ...args: any[]]) {
        try {
            let self = this.realm
            this.realm?.write(() => {
                var results = this.realm?.objects(type.name)
                if (predicate) {
                    results = results?.filtered(...predicate);
                }
                self?.delete(results)
            })
        } catch (error) {
            console.log(`REALM ERROR: ${error.message}`)
        }
    }

    deleteObject<T extends K>(object: T) {
        var schema = object.schema
        if (!schema.primaryKey) return 
        let primaryKey = `${schema.primaryKey}`
        let primaryKeyValue = (object as any)[primaryKey]
        if (!primaryKeyValue) return
        let foundObject = this.realm?.objectForPrimaryKey(schema.name, primaryKeyValue as number)
        try {
            let self = this.realm
            this.realm?.write(() => {                
                self?.delete(foundObject)
            })
        } catch (error) {
            console.log(`REALM ERROR: ${error.message}`)
        }
    }

    deleteObjects<T extends K>(objects: T[]) {
        objects.forEach(object => {
            var schema = object.schema
            if (!schema.primaryKey) return 
            let primaryKey = `${schema.primaryKey}`
            let primaryKeyValue = (object as any)[primaryKey]
            if (!primaryKeyValue) return
            let foundObject = this.realm?.objectForPrimaryKey(schema.name, primaryKeyValue as number)
            try {
                let self = this.realm
                this.realm?.write(() => {                
                    self?.delete(foundObject)
                })
            } catch (error) {
                console.log(`REALM ERROR: ${error.message}`)
            }
        })
    }

    deleteAll() {
        try {
            let self = this.realm
            this.realm?.write(() => {                
                self?.deleteAll()
            })
        } catch (error) {
            console.log(`REALM ERROR: ${error.message}`)
        }
    }

}

