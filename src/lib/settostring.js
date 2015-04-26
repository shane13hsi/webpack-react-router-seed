/**
 Override toString methods. Useful for logging Flux actions for example.
 Example:
 function login() {}
 function logout() {}
 // ES6 syntax.
 setToString('user', {login, logout})
 console.log(login) // Will log 'user/login'
 @param prefix string
 @param object Object
 */
export default function setToString(prefix, object) {
    Object.keys(object).forEach(function (name) {
        const toStringName = prefix + '/' + name;
        object[name].toString = () => toStringName;
    });
}
