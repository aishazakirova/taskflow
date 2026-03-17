function runTests() {
    console.log("=== TEST START ===");

    localStorage.clear();
    users = [];

    console.log("Регистрация:", register("admin", "123") === "Успешно");
    console.log("Дубликат:", register("admin", "123") === "Пользователь уже существует");
    console.log("Логин успех:", login("admin", "123") === "Вход выполнен");
    console.log("Логин ошибка:", login("admin", "000") === "Неверные данные");

    console.log("=== TEST END ===");
}

runTests();