function setup() {
    const user = window.localStorage.getItem("user");
    if (user) {
        setUser(user)
    } else {
        logout();
    }
}
function setUser(user){
    window.localStorage.setItem("user", user)
}
function logout() {
    window.localStorage.removeItem("user");
}
function getUser() {
    const user = window.localStorage.getItem("user");
    if (user) {
       return user;
    } else {
        return null
    }
}
function isAuthenticated() {
    const user = window.localStorage.getItem("user");
    if (user) {
       return true;
    } else {
        return false
    }
}

export default {
    setup,
    logout,
    getUser,
    setUser,
    isAuthenticated
}