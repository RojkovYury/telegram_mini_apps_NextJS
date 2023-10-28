import { User, waitingListStudent } from "@prisma/client";
import { useGlobalContext } from "context/GlobalContext";
import React, { useState } from "react";
import MyModal from "./Modal";
import TableRow from "./TableRow";

const Table = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageurl, setImageUrl] = useState("");
  const {
    data: { waiting },
  } = useGlobalContext();
  return (
    <>
      <MyModal
        imageurl={imageurl}
        isOpen={isOpen}
        setImageUrl={setImageUrl}
        setIsOpen={setIsOpen}
      />
      <div className="relative w-full bg-[#171717] overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left  ">
          <thead className="text-xs  uppercase  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Payment Method
              </th>
              <th scope="col" className="px-6 py-3">
                Phone Number
              </th>
              <th scope="col" className="px-6 py-3">
                UserName
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {waiting.map((student) => (
              <TableRow
                student={student}
                setImageUrl={setImageUrl}
                setIsOpen={setIsOpen}
                key={student.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
