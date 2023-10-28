import { User } from "@prisma/client";
import axios from "axios";
import { useGlobalContext } from "context/GlobalContext";
import Pagination from "rc-pagination";
import { ReactNode, useEffect, useRef, useState } from "react";
import { UserWithIncluded } from "types";
import TableRow from "./TableRow";

const Table = () => {
  const { data, setData } = useGlobalContext();
  const [perPage, setPerPage] = useState(50);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageRendered = useRef(false);

  useEffect(() => {
    if (pageRendered.current == false) {
      pageRendered.current = true;
      return;
    }
    (async () => {
      setLoading(true);
      try {
        await getData(current, perPage);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [current]);

  const PerPageChange = (current: number, size: number) => {
    setSize(size);
    const newPerPage = Math.ceil(data.totalCountCount / size);
    if (current > newPerPage) {
      setCurrent(newPerPage);
    }
  };

  const getData = async (current: any, pageSize: any) => {
    const res = await axios.get(
      `/api/students/?skip=${current * pageSize}/?take=${pageSize}`
    );
    setData({ ...data, students: res.data });
  };

  const PaginationChange = (page: number, pageSize: number) => {
    setCurrent(page);
    setSize(pageSize);
  };

  const PrevNextArrow = (
    page: number,
    type: "prev" | "next" | "page" | "jump-prev" | "jump-next",
    element: ReactNode
  ) => {
    if (type === "prev") {
      return (
        <button className="bg-transparent cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="bg-transparent cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      );
    }
    return element;
  };
  return (
    <div>
      <div className="relative ov mt-6 overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between pb-4 ">
          <Pagination
            className="pagination-data"
            onChange={PaginationChange}
            total={data.totalCountCount}
            current={current}
            pageSize={size}
            showSizeChanger={false}
            itemRender={PrevNextArrow}
            onShowSizeChange={PerPageChange}
          />
        </div>
        {loading ? (
          <div className="h-20 flex justify-center items-center">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="w-full text-sm text-left bg-[#171717]">
            <thead className="text-xs  uppercase ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  School
                </th>
                <th scope="col" className="px-6 py-3">
                  Stream
                </th>
                <th scope="col" className="px-6 py-3">
                  Registered
                </th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student: UserWithIncluded) => (
                <TableRow key={student.id} student={student} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
