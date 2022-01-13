import { useEffect, useState } from 'react';

const ClockComponent = () => {
  const [clock, setClock] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setClock(new Date());
    }, 1000);
  }, []);

  return (
    <>
      <div className="bg-gray-800 rounded text-white  shadow-md p-2">
        <span>
          {clock.toLocaleString('En-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="bg-gray-800 rounded text-white ml-1 animate-pulse shadow-md p-2">
        <span>
          {clock.toLocaleString('En-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })}
        </span>
      </div>
    </>
  );
};

export default ClockComponent;
