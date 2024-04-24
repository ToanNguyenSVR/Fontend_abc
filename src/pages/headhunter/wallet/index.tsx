// src/components/Wallet.tsx
import React, { useState } from 'react';
import { Button, Input, List } from 'antd';

const Wallet: React.FC = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0);
  const [transactionHistory, setTransactionHistory] = useState<number[]>([]);

  const handleWithdraw = () => {
    if (withdrawAmount > 0 && withdrawAmount <= balance) {
      setBalance(balance - withdrawAmount);
      setTransactionHistory([...transactionHistory, -withdrawAmount]);
      setWithdrawAmount(0);
    }
  };

  return (
    <div>
      <h1>Wallet</h1>
      <p>Balance: ${balance}</p>

      <Input
        type="number"
        placeholder="Enter withdrawal amount"
        value={withdrawAmount}
        onChange={e => setWithdrawAmount(Number(e.target.value))}
      />

      <Button type="primary" onClick={handleWithdraw}>
        Withdraw
      </Button>

      <h2>Transaction History</h2>
      <List
        dataSource={transactionHistory}
        renderItem={item => <List.Item>{item > 0 ? `Deposit: $${item}` : `Withdrawal: $${-item}`}</List.Item>}
      />
    </div>
  );
};

export default Wallet;
