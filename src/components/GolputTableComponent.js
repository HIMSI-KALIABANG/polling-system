import React from 'react';

const GolputTableComponent = ({ voter }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow h-96 border-b border-secondary sm:rounded-lg">
              <table className="min-w-full overflow-y-scroll divide-y">
                <thead className="bg-table">
                  <tr>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Nama Pemilih
                    </th>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Kandidat yang dipilih
                    </th>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider">
                      Token
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-secondary bg-secondary">
                  {voter &&
                    voter
                      .filter((vote) => vote.status === false)
                      .map(({ name, candidate, token }, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins text-utils">{name}</td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins text-utils">{candidate}</td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins text-utils">{token}</td>
                            </tr>
                          </>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GolputTableComponent;
