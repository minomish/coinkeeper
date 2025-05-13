import { useState } from "react";
import Balance from "../Balance/Balance";
import TransactionList from "../TransactionList/TransactionList";
import AddTransactionModal from "../AddTransactionModal/AddTransactionModal";
import s from './Dashboard.module.css';
import { useDispatch } from "react-redux";
import { addTransaction } from "../../redux/slices/transactionSlice"; 
import { useSelector } from "react-redux"; // добавь

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id); // получаем userId из Redux
  console.log(userId)
  console.log('user state:', useSelector((state) => state.user));


  const handleAddTransaction = (data) => {
    dispatch(addTransaction(data));
    setShowModal(false); 
  };

  return (
    <div className={s.dashboard}>
      <h1 className={s.title}>Мой кошелек</h1>

      <div className={s.dashboard_content}>
        <Balance />
        <div className={s.right_block}>
          <button className={s.add_btn} onClick={() => setShowModal(true)}>
            + Добавить транзакцию
          </button>
          <TransactionList />
        </div>
      </div>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddTransaction}
          userId={userId} // передаем userId
        />
      )}
    </div>
  );
};

export default Dashboard
