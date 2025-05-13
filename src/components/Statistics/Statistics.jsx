import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { filterTransactionsByDate } from '../../redux/slices/transactionSlice';
import { parseISO } from 'date-fns';
import './Statistics.css'; // Импортируем файл с стилями

const Statistics = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.filteredItems);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // Обрабатываем фильтрацию по дате
  useEffect(() => {
    dispatch(filterTransactionsByDate({ startDate, endDate }));
  }, [startDate, endDate, dispatch]);

  // Группируем транзакции по категориям для pieChart
  const groupedByCategory = transactions.reduce((acc, tx) => {
    const category = tx.category || 'Не указана';
    if (!acc[category]) acc[category] = 0;
    acc[category] += tx.amount;
    return acc;
  }, {});

  const pieData = Object.keys(groupedByCategory).map(category => ({
    name: category,
    value: groupedByCategory[category],
  }));

  // Для BarChart считаем общий доход и расход
  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((acc, tx) => acc + tx.amount, 0);
  const totalExpense = transactions.filter(tx => tx.type === 'expense').reduce((acc, tx) => acc + tx.amount, 0);

  const barData = [
    { name: 'Доходы', value: totalIncome },
    { name: 'Расходы', value: totalExpense },
  ];

  return (
    <div className="form-container">
      <div className="form__input_box">
        <label>Выберите дату начала:</label>
        <input type="date" onChange={(e) => setStartDate(new Date(e.target.value))} className='form-container__input'/>
      </div>
      <div>
        <label>Выберите дату конца:</label>
        <input type="date" onChange={(e) => setEndDate(new Date(e.target.value))} className='form-container__input'/>
      </div>

      <h3>Общий доход и расходы</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Расходы по категориям</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#82ca9d" label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <h3>Доходы по категориям</h3>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#ffc658" label />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Statistics;
