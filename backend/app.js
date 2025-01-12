// Импортируем библиотеки express и body-parser для создания сервера и обработки запросов
import express from 'express';
import bodyParser from 'body-parser';
// Импортируем маршруты, связанные с обработкой текста
import { textRouter } from './routes/text.routes.js';

// Создаем экземпляр приложения express
const app = express();

// Middleware для обработки JSON в теле запроса (body)
app.use(bodyParser.json()); // body-parser парсит тело запроса в формате JSON

// Раздаём статические файлы из папки frontend/public
app.use(express.static('../frontend/public')); // Статические файлы (например, HTML, CSS, JS) отдаются из папки public

// Подключаем маршруты для обработки запросов по адресу /api/text
app.use('/api/text', textRouter); // Все запросы на /api/text будут обрабатываться через textRouter

// Обработка 404 ошибки для неизвестных маршрутов
app.use((req, res) => {
    // Если маршрут не найден, отправляем ответ с кодом 404 и сообщением "Not found"
    res.status(404).json({ message: 'Not found' });
});

// Экспортируем приложение для использования в другом файле
export default app;
