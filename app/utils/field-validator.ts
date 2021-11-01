
import '../../extensions/string.extensions'

export enum Field {
    Email, 
    Password
}

export class FieldValidator {

    static validateEmail(email?: string): {field: Field, error?: Error} {
        if (email && !email.isEmpty() && email.trimEnd().isEmail()) {
            return {field: Field.Email, error: undefined}
        }
        return {field: Field.Email, error: Error('Please enter a valid email.')}
    }

    static validatePassword(password?: string): {field: Field, error?: Error} {                
        if (password && !password.isEmpty()) {
            if (password.contains(' ')) {
                return {field: Field.Password, error: Error('Password cannot contain spaces.')}        
            }
            if (password.length < 6) {
                return {field: Field.Password, error: Error('Password must be at least 6 characters long.')}        
            }
            return {field: Field.Password, error: undefined}
        }
        return {field: Field.Password, error: Error('Please enter a valid password.')}       
    }
}