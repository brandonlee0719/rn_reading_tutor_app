
interface String {
    replaceAll(search: string, replacement: string): string
    contains(search: string): boolean
    isEmpty(): boolean
    isEmail(): boolean
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this
    return target.replace(new RegExp(search, 'g'), replacement)
}

String.prototype.contains = function(search) {
    var regularExpression = new RegExp(search, 'g')
    return regularExpression.test(String(this));
}

String.prototype.isEmpty = function() { 
    return this.length == 0
}

String.prototype.isEmail = function() {
    var regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(this).toLowerCase());
}