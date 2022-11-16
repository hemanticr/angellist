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
      {/* For larger screens */}
      <div className="hidden md:block">
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

      {/* For smaller screens */}
      <div className="md:hidden p-4 bg-gray-100 rounded-md my-4 mx-2 flex flex-col">
        {/* First row */}
        <div className="flex flex-row items-center">
          {/* Date */}
          <div className="basis-[22.22%] text-xs">
            {new Date(date).toLocaleDateString('en-US')}
          </div>
          {/* Transaction details */}
          <div className="flex flex-col basis-[55.55%]">
            <div>{transaction}</div>
            <div className="text-xs">{descriptionString}</div>
          </div>
          {/* Amount */}
          <div className="basis-[22.22%]">
            {!negative && (
              <div className="basis-1/6 text-right text-green-500 text-md font-bold">
                +${parseFloat(amount).toFixed(2)}
              </div>
            )}
            {negative && (
              <div className="basis-1/6 text-right text-red-500 text-md font-bold">
                -${parseFloat(amount.toString().replace('-', '')).toFixed(2)}
              </div>
            )}
          </div>
        </div>
        {/* Divider */}
        <div className="h-[0.02rem] bg-gray-300 mt-2"></div>
        {/* Balance */}
        <div className="mt-2 text-right">
          <span className="text-xs mr-2">Balance: </span>
          <span className="font-bold text-sm">
            ${parseFloat(balance).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionComponent;
