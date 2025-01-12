// Получаем доступ к элементам формы, поля ввода и контейнера для вывода данных
const form = document.getElementById('textForm'); // Форма с id 'textForm'
const textInput = document.getElementById('textInput'); // Поле ввода текста с id 'textInput'
const output = document.getElementById('output'); // Контейнер для вывода результата с id 'output'

// Обработчик отправки формы
form.addEventListener('submit', async (e) => {
    // Предотвращаем стандартное поведение формы (перезагрузка страницы)
    e.preventDefault();

    // Получаем текст из поля ввода и удаляем лишние пробелы в начале и в конце
    const text = textInput.value.trim();

    try {
        // Отправляем асинхронный запрос на сервер с методом POST
        const response = await fetch('/api/text', {
            method: 'POST', // Указываем, что запрос будет методом POST
            headers: { 'Content-Type': 'application/json' }, // Устанавливаем заголовок для отправки данных в формате JSON
            body: JSON.stringify({ text }), // Преобразуем объект в строку JSON и отправляем на сервер
        });

        // Дожидаемся ответа сервера в формате JSON
        const data = await response.json();

        // Проверяем, успешен ли запрос (код ответа 2xx)
        if (response.ok) {
            // Если успех - создаем новый элемент <p> и вставляем текст, полученный от сервера
            const newText = document.createElement('p');
            newText.textContent = data.text; // Устанавливаем текст полученный от сервера
            output.prepend(newText); // Добавляем новый элемент в начало контейнера вывода
        } else {
            // Если ошибка - выводим сообщение об ошибке в модальном окне
            alert(data.message);
        }
    } catch (error) {
        // Если произошла ошибка при отправке запроса или получении ответа
        console.error('Error:', error); // Логируем ошибку в консоль
        alert('Something went wrong. Please try again.'); // Показать сообщение об ошибке пользователю
    }

    // Очищаем поле ввода после отправки формы
    textInput.value = '';
});
