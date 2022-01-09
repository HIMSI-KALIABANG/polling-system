const VoterTableComponent = ({ voter: { name, candidate } }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama Pemilih
                    </th>
                    <th scope="col" className="font-poppins px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kandidat yang dipilih
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins">{name}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize font-poppins">{candidate}</td>
                  </tr>
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
