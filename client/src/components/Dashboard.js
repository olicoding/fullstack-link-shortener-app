import { useContext } from "react";
import { Context } from "../context/ContextProvider";
import axios from "axios";

function Dashboard() {
  const { docs, setDocs } = useContext(Context);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`/api/delete/${id}`)
        .then(() =>
          setDocs((prevDocs) => prevDocs.filter((doc) => doc._id !== id))
        );
    } catch (err) {
      console.log("Error on handleDelete: ", err.message);
    }
  };

  return (
    <div className="bg-indigo-50 md:px-20 py-6">
      <div className="bg-white rounded-md px-6 py-3 max-w-2xl mx-auto">
        <h2 className="text-center font-bold">Dashboard</h2>
        <table className="border-collapse block md:table mx-auto">
          <thead className="block md:table-header-group w-full max-w-2xl">
            <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto md:relative">
              <th className="text-center bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell max-w-[200px]">
                Original Link
              </th>
              <th className="text-center bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell max-w-sm">
                Short Link
              </th>
              <th className="text-center bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell max-w-sm">
                Clicks
              </th>
              <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell max-w-sm"></th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {docs &&
              docs.map((doc) => (
                <tr
                  key={doc._id}
                  className="tr my-3 bg-gray-300 border border-grey-500 md:border-none block md:table-row"
                >
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell md:max-w-[200px]  overflow-x-auto">
                    <span className="inline-block w-full md:hidden font-bold">
                      Original Link
                    </span>
                    <a
                      className="fullLink underline"
                      href={doc.originalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {doc.originalUrl}
                    </a>
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell  max-w-full overflow-x-auto">
                    <span className="md:hidden font-bold ">Short Link</span>
                    <div className="flex items-center ">
                      <span className="ml-1">
                        <a
                          className="shortLink underline"
                          href={`/api/redirect/${doc.shortUrl}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {doc.shortUrl}
                        </a>
                      </span>
                    </div>
                  </td>
                  <td className="p-2 md:text-center md:border md:border-grey-500 text-left block md:table-cell  max-w-full overflow-x-auto">
                    <span className="md:hidden font-bold mr-2">Clicks</span>
                    <span>{doc.clicks}</span>
                  </td>
                  <td className="p-2 md:border md:border-grey-500 text-left block md:table-cell   max-w-full overflow-x-auto flex">
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded m-[0.1em] text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
