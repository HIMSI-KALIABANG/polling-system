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
      <div className="bg-primary border-2 border-secondary rounded text-secondary shadow-md px-2 lg:px-4 py-2">
        <span className="text-sm lg:text-lg">
          {clock.toLocaleString('En-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          })}
        </span>
      </div>
      <div className="bg-primary border-2 border-secondary rounded text-secondary ml-1 shadow-md px-2 lg:px-4 py-2">
        <span className="text-sm lg:text-lg">
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
