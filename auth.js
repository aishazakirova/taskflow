let users = JSON.parse(localStorage.getItem("users")) || [];

function register(username, password) {
    if (!username || !password) return "Ошибка";

    let exists = users.find(u => u.username === username);
    if (exists) return "Пользователь уже существует";

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));

    return "Успешно";
}

function login(username, password) {
    let user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", username);
        return "Вход выполнен";
    }

    return "Неверные данные";
}