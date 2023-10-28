import { User } from "@prisma/client";
import React from "react";
import { UserWithIncluded } from "types";

interface Props {
  student: UserWithIncluded;
}

const TableRow: React.FC<Props> = ({ student }) => {
  const {
    first_name,
    id,
    lang,
    phone_number,
    registered_name,
    school,
    stream,
    tg_id,
    username,
    credited,
  } = student;
  return (
    <tr className="border-b ">
      <th
        scope="row"
        className="flex items-center px-6 py-4  whitespace-nowrap "
      >
        <div className="pl-3">
          <div className="text-base font-semibold">{registered_name}</div>
          <div className="font-normal ">{username}</div>
        </div>
      </th>
      <td className="px-6 py-4">{phone_number || "--"}</td>
      <td className="px-6 py-4">{school || "--"}</td>
      <td className="px-6 py-4">{stream || "--"}</td>
      <td className="px-6 py-4">
        {student.registered ? "Registered" : "Not Registered"}
      </td>
    </tr>
  );
};

export default TableRow;
