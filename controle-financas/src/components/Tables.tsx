import React from 'react';
import ExpensesTable from './ExpensesTable';
import ReceiptsTable from './ReceiptsTable';

interface TablesProps {
  activeTab: 'chart' | 'receipts' | 'expenses';
}

const Tables: React.FC<TablesProps> = ({ activeTab }) => {
  return (
    <div>
      {activeTab === 'receipts' && <ReceiptsTable />}
      {activeTab === 'expenses' && <ExpensesTable />}
    </div>
  );
};

export default Tables;
