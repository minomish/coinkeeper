import Balance from "../Balance/Balance";
import TransactionList from '../TransactionList'

const Dashboard = () => {

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
        <Balance/>
        <TransactionList/>
    </div>
  );
};

export default Dashboard;