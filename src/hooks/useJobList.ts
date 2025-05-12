import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';

//useQuery - помогает запрщивать данные и работать с их состоянием
const fetchTransactions = async () => {
  const response = await axiosInstance.get('/transactions');
  console.log(response.data);
  return response.data;
};

const useTransactions = () => {
    return useQuery ({
        queryKey: ['users'],
        queryFn: fetchTransactions,
    });
};

// Пример получения транзакций



export default useTransactions;
