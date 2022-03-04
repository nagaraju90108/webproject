import React, { useState, useEffect } from "react";
import deleteIcon from "./trashCompressed.png";
const getDatafromLS = () => {
  const data = localStorage.getItem("NamesList");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export const Todoform = () => {
  const [namesList, setNamesList] = useState(getDatafromLS());

  const [myid, setMyid] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let lis = {
      myid: 1 + Math.random(),
      name,
    };
    setNamesList([...namesList, lis]);
    setMyid("");
    setName("");
  };

  const deleteName = (myid) => {
    const filteredNames = namesList.filter((element, index) => {
      return element.myid !== myid;
    });
    setNamesList(filteredNames);
  };

  useEffect(() => {
    localStorage.setItem("NamesList", JSON.stringify(namesList));
  }, [namesList]);

  return (
    <div className="App flex min-h-screen bg-rose-50 bg-fixed">
      <div className="flex-1 text-center">
        <div className="tracking-widest uppercase todolist py-2 font-serif text-4xl bg-rose-500 text-center text-white sm:text-5xl sm:py-4">
          ToDo List
        </div>
        <div className="additem text-center mt-6 -mb-4 text-xl font-semibold text-rose-600 sm:text-2xl lg:text-3xl lg:-mb-2">
          Add an Item:
        </div>
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="text-center"
        >
          <br />
          <input
            type="text"
            placeholder="Type item here..."
            className="sm:text-2xl lg:text-3xl sm:p-2 sm:pl-4 border-[1px] border-rose-400 rounded-md pl-2 p-1 focus:outline-yellow-400 "
            onChange={(e) => setName(e.target.value)}
            required
            value={name}
          ></input>
          <button
            type="submit"
            className="sm:text-2xl sm:py-[8px] lg:text-3xl lg:py-[9px]  ml-4 px-6 py-[2px] border-[1px] border-rose-600 rounded-md text-rose-600 text-lg font-semibold bg-white hover:bg-rose-500 hover:text-white"
          >
            ADD
          </button>
        </form>

        <div className="view-container flex flex-col items-center">
          {namesList.length > 0 && (
            <>
              <div className="flex flex-row justify-center">
                <table className="mt-8 sm:mt-16 border border-rose-600">
                  <thead className="border-b border-rose-300 font-semibold text-rose-600 text-xl lg:-mb-2">
                    <tr>
                      <th className="mx-4 my-2 px-4 py-3 uppercase">Delete</th>
                      <th className="mx-4 my-2 px-4 py-3 text-left uppercase">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {namesList.map((nameHere) => (
                      <tr
                        key={nameHere.myid}
                        className="border-b border-rose-300 lg:text-lg"
                      >
                        <td>
                          <button
                            onClick={() => deleteName(nameHere.myid)}
                            className="px-2 text-sm text-rose-600 font-bold bg-transparent"
                          >
                            <img
                              src={deleteIcon}
                              alt="Delete"
                              className="h-5 hover:h-6"
                            />
                          </button>
                        </td>
                        <td className="mx-4 my-2 px-6 py-2 text-left capitalize">
                          {nameHere.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setNamesList([])}
                className="mt-4 px-4 py-[2px] border-[1px] border-rose-600 rounded-md text-rose-600 text-lg font-semibold bg-white hover:bg-rose-500 hover:text-white"
              >
                REMOVE ALL
              </button>
            </>
          )}
          {namesList.length < 1 && (
            <div className="bg-rose-200 w-[300px] sm:w-[420px] sm:py-2 lg:w-[495px] lg:text-xl mt-8 sm:mt-14 text-lg py-1 text-center ">
              No task is added yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Todoform;
