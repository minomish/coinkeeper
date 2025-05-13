import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions, deleteTransactionFromServer } from '../../redux/slices/transactionSlice';
import { useState } from 'react';
import styles from './TransactionList.module.css';
import EditTransactionModal from '../EditTransactionModal/EditTransactionModal'; // Модал для редактирования

const TransactionList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.transactions);
  const categories = useSelector(state => state.categories.items); // Берем категории из store

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  const handleDeleteTransaction = (id) => {
    dispatch(deleteTransactionFromServer(id));
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedTransaction(null);
  };

  // Функция для получения категории по id
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => String(cat.id) === String(categoryId)); // Приводим id к строкам для сравнения
    return category ? category.name : 'no';
  };

  if (status === 'loading') return <p>Загрузка...</p>;
  if (status === 'failed') return <p>Ошибка: {error}</p>;

  return (
    <div>
      <ul className={styles.list}>
        {items.map(tx => (
          <li
            key={tx.id}
            className={`${styles.item} ${tx.type === 'income' ? styles.income : styles.expense}`}
          >
            <div className={styles.topRow}>
              <span className={styles.type}>{tx.type}</span>
              <span className={styles.amount}>{tx.amount} ₸</span>
            </div>

            <div className={styles.bottomRow}>
              <span className={styles.category}>Категория: {tx.categoryId}</span> 
              {tx.comment && <span className={styles.comment}>Комментарий: {tx.comment}</span>}
            </div>

            <div className={styles.buttons}>
              <button className={styles.editBtn} onClick={() => handleEditTransaction(tx)}>
                Редактировать
              </button>
              <button className={styles.deleteBtn} onClick={() => handleDeleteTransaction(tx.id)}>
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showEditModal && selectedTransaction && (
        <EditTransactionModal 
          transaction={selectedTransaction} 
          onClose={closeModal}
        />
      )}
    </div>
  );
};



export default TransactionList;
