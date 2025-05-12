// components/TransactionList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/slices/transactionSlice';

const TransactionList = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.transactions);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTransactions());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <p>Загрузка...</p>;
  if (status === 'failed') return <p>Ошибка: {error}</p>;

  return (
    <ul>
      {items.map(tx => (
        <li key={tx.id}>
          {tx.type}: {tx.amount} ₸ ({tx.category})
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
