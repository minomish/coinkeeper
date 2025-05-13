import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransactionOnServer } from '../../redux/slices/transactionSlice';
import styles from './EditTransactionModal.module.css';

const EditTransactionModal = ({ transaction, onClose }) => {
  const [amount, setAmount] = useState(transaction.amount);
  const [category, setCategory] = useState(transaction.category);
  const [comment, setComment] = useState(transaction.comment);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedTransaction = { ...transaction, amount, category, comment };
    dispatch(updateTransactionOnServer(updatedTransaction));
    onClose(); // Закрыть модал после обновления
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Редактировать транзакцию</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Сумма</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </div>
          <div>
            <label>Категория</label>
            <input 
              type="text" 
              value={category} 
              onChange={(e) => setCategory(e.target.value)} 
            />
          </div>
          <div>
            <label>Комментарий</label>
            <input 
              type="text" 
              value={comment} 
              onChange={(e) => setComment(e.target.value)} 
            />
          </div>
          <button type="submit">Сохранить изменения</button>
          <button type="button" onClick={onClose}>Отменить</button>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
