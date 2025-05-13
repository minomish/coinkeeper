import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTransactionToServer } from '../../redux/slices/transactionSlice';
import { fetchCategories, addCategory } from '../../redux/slices/categorySlice'; // Импортируем addCategory
import s from './AddTransactionModal.module.css';

const AddTransactionModal = ({ onClose, userId }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items); // Получаем категории из Redux
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [newCategory, setNewCategory] = useState(''); // Для новой категории
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(fetchCategories()); // Загружаем категории при монтировании компонента
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let finalCategory = category;

if (newCategory) {
  console.log('userId при добавлении категории:', userId); // <== временно
  const newCategoryData = {
    id: Date.now().toString(),
    name: newCategory,
    type,
    color: '#000000',
    icon: 'FaTag',
    userId: userId, // <== тут должно быть значение, а не null
  };
  dispatch(addCategory(newCategoryData));
  finalCategory = newCategory;
}


    const newTransaction = {
      id: String(Date.now()),
      type,
      amount: Number(amount),
      categoryId: finalCategory,
      comment,
      date: new Date().toISOString(),
    };

    dispatch(addTransactionToServer(newTransaction)); // Отправляем транзакцию на сервер

    // Очистка формы
    setAmount('');
    setCategory('');
    setNewCategory('');
    setComment('');

    onClose(); // Закрыть модалку после отправки
  };

  return (
    <div className={s.backdrop}>
      <div className={s.modal}>
        <h2>Добавить транзакцию</h2>
        <form onSubmit={handleSubmit} className={s.form}>
          <label>
            Тип:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
          </label>
          <label>
            Сумма:
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
          </label>

          <label>
            Категория:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={newCategory !== ''}
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <span>или</span>
            <input
              type="text"
              placeholder="Введите новую категорию"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              disabled={category !== ''}
            />
          </label>

          <label>
            Комментарий:
            <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          </label>

          <div className={s.actions}>
            <button type="submit" className={s.submit_btn}>Добавить</button>
            <button type="button" onClick={onClose} className={s.cancel_btn}>Отмена</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
