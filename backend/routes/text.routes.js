// Импортируем библиотеку express для создания маршрутов
import express from 'express';

// Создаем экземпляр маршрутизатора express
const router = express.Router();

// POST-запрос для обработки текста на основном маршруте ('/')
router.post('/', (req, res) => {
    // Извлекаем текст из тела запроса (req.body)
    const { text } = req.body;

    // Простая валидация текста:
    
    // Проверяем, что текст существует и не является пустым (после удаления пробелов)
    if (!text || text.trim().length === 0) {
        // Если текст пустой, возвращаем ошибку 400 с сообщением
        return res.status(400).json({ message: 'Text cannot be empty' });
    }

    // Проверяем, что длина текста не превышает 200 символов
    if (text.length > 200) {
        // Если текст слишком длинный, возвращаем ошибку 400 с сообщением
        return res.status(400).json({ message: 'Text cannot exceed 200 characters' });
    }

    // Если текст прошел валидацию, возвращаем успешный ответ с кодом 200 и полученным текстом
    res.status(200).json({ message: 'Text received', text });
});

// Экспортируем маршрутизатор с именем textRouter
export { router as textRouter };
