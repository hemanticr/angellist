const TransactionComponent = ({
  date,
  transaction,
  amount,
  balance,
  negative,
  source,
  method,
  destination,
}) => {
  // Format description string
  let descriptionString = '';
  if (transaction === 'DEPOSIT') {
    descriptionString = source.description
      ? 'From ' + source.description + ' via ' + method
      : 'via ' + method;
  } else if (transaction === 'INVESTMENT') {
    descriptionString = destination.description;
  } else if (transaction === 'REFUND') {
    descriptionString = 'Refund from ' + source.description;
  } else if (transaction === 'WITHDRAWAL') {
    descriptionString = 'via ' + method + ' to ' + destination.description;
  } else if (transaction === 'TRANSFER') {
    descriptionString =
      'From ' + source.description + ' to ' + destination.description;
  }

  // Return page
  return (
    <div>
      <div className="w-full py-4 flex flex-row justify-start text-left">
        {/* Date column */}
        <div className="basis-1/6">
          {new Date(date).toLocaleDateString('en-US')}
        </div>

        {/* Transaction column */}
        <div className="basis-1/6">{transaction}</div>

        {/* Description column */}
        <div className="basis-1/3 ">{descriptionString}</div>

        {/* Amount column */}
        {!negative && (
          <div className="basis-1/6 text-right text-green-500">
            +${parseFloat(amount).toFixed(2)}
          </div>
        )}
        {negative && (
          <div className="basis-1/6 text-right text-red-500">
            -${parseFloat(amount.toString().replace('-', '')).toFixed(2)}
          </div>
        )}

        {/* Balance column */}
        <div className="basis-1/6 text-right">
          ${parseFloat(balance).toFixed(2)}
        </div>
      </div>
      {/* Final divider */}
      <div className="h-[0.15rem] bg-gray-200"></div>
    </div>
  );
};

export default TransactionComponent;
