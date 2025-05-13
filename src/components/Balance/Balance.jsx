import React from 'react';
import './Balance.css';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';

const Balance = () => {
  const transactions = useSelector(state => state.transactions.items);
  const userId = Cookies.get('userId');

  const userTransactions = transactions.filter(tx => String(tx.userId) === String(userId));

  const balance = userTransactions.reduce((acc, tx) => {
    if (tx.type === 'income') return acc + Number(tx.amount);
    if (tx.type === 'expense') return acc - Number(tx.amount);
    return acc;
  }, 0);


  const today = new Date().toLocaleDateString();

  return (
    <div className="balance-card">
      <div className="balance-header">
        <h2>Balance</h2>
        <p className="balance-date">{today}</p>
      </div>

      <div className="balance-amount">
        <h1>{balance.toFixed(2)} ₸</h1>
      </div>

      {/* <div className="card-details">
        <div className="card-number">**** **** 9894 4958</div>
        <div className="card-holder">Shin Ryujin</div>
        <div className="card-expiry">
          <span>EXP DATE</span>
          <span>09/24</span>
        </div>
        <div className="card-cw">
          <span>C/W</span>
          <span>3124</span>
        </div>
      </div> */}

    </div>
  );
};

export default Balance;
