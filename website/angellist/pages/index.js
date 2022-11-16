import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

import { simple, duplicate, complicated } from '../data/ledgers';
import TransactionComponent from '../components/transaction';
import { useEffect, useState } from 'react';

// Function to swap elements in an array
const swapElements = (array, index1, index2) => {
  array[index1] = array.splice(index2, 1, array[index1])[0];
  return array;
};

// Function to sort ledgers
const sortLedgers = (array) => {
  /**
   *  Step 1: Filter out duplicate ledgers
   *  Step 2: Sort ledgers according to date
   *  Step 3: If any ledgers have the same date, sort according to type of transaction
   */

  // Filter out duplicates
  const ids = array.map((o) => o.activity_id);
  let filteredArray = array.filter(
    ({ activity_id }, index) => !ids.includes(activity_id, index + 1)
  );

  // Sort according to date
  filteredArray.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // If same date, sort according to transaction type
  filteredArray.forEach((item, index) => {
    if (index < filteredArray.length - 1)
      if (
        new Date(filteredArray[index].date) ===
        new Date(filteredArray[index + 1].date)
      ) {
        if (filteredArray[index].type !== 'DEPOSIT')
          filteredArray = swapElements(filteredArray, index, index + 1);
      }
  });
  return filteredArray;
};

const HeaderRow = () => {
  return (
    <div>
      <div className="w-full py-4 flex flex-row justify-start text-left text-gray-400">
        {/* Date column */}
        <div className="basis-1/6">Date</div>
        {/* Transaction column */}
        <div className="basis-1/6">Transaction</div>
        {/* Description column */}
        <div className="basis-1/3 ">Notes</div>
        {/* Amount column */}
        <div className="basis-1/6 text-right">Amount</div>
        {/* Balance column */}
        <div className="basis-1/6 text-right">Balance</div>
      </div>
      {/* Final divider */}
      <div className="h-[0.15rem] bg-gray-200"></div>
    </div>
  );
};

export default function Home() {
  // Store ledger data
  const [ledgers, updateLedgers] = useState(null);

  // Store final balance
  const [balance, updateBalance] = useState(0);

  // Sort ledgers on pageload
  useEffect(() => {
    if (!ledgers) updateLedgers(sortLedgers(complicated));
    if (ledgers) {
      updateBalance(parseFloat(ledgers[0].balance).toFixed(2));
    }
  }, [ledgers]);

  return (
    <div>
      {/* Heading --- investing account */}
      <div className="text-center md:text-left p-6 md:py-8 md:px-20 w-full">
        <h1 className=" text-xl">Investing Account</h1>
      </div>

      {/* Banner --- with balance */}
      <div className=" bg-gray-300 w-full py-8 px-20 text-center md:text-left">
        {/* Final balance */}
        <h1 className="text-5xl font-bold">${balance}</h1>
        <h2 className=" text-xl pt-4">BALANCE</h2>
      </div>

      {/* Past transactions header */}
      <div className="md:px-20 px-4 pt-12 text-2xl font-bold">
        Recent Transactions
      </div>

      {/* Divider line */}
      <div className="h-[0.15rem] bg-gray-200 mx-20 mt-8"></div>

      {/* Transactions div */}
      <div className="mx-20 mb-20">
        {/* Headers for transaction section */}
        <HeaderRow />

        {/* All transactions */}
        {ledgers &&
          ledgers.map((item) => {
            return (
              <TransactionComponent
                key={item.activity_id}
                date={item.date}
                transaction={item.type}
                amount={item.amount}
                balance={item.balance}
                negative={parseInt(item.amount) < 0 ? true : false}
                source={item.source}
                method={item.method}
                destination={item.destination}
              />
            );
          })}
      </div>
    </div>
  );
}
