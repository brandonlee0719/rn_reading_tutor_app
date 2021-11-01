

interface Array<T> {
    isEmpty(): boolean
}

Array.prototype.isEmpty = function() { 
    return this.length == 0
}