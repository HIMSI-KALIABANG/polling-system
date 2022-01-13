const VoterTableComponent = ({ voter }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-800">
                  <tr>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Nama Pemilih
                    </th>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Kandidat yang dipilih
                    </th>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                      Token
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 bg-gray-800">
                  {voter &&
                    voter
                      .filter((vote) => vote.status === true)
                      .map(({ name, candidate, token }, index) => {
                        return (
                          <>
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins text-yellow-500">{name}</td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins text-yellow-500">{candidate}</td>
                              <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins text-yellow-500">{token}</td>
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

export default VoterTableComponent;
