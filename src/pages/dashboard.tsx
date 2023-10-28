import Graph from "../components/Dashboard/Graph";
import TopCard from "../components/Dashboard/TopCard";
import PieChart from "../components/Dashboard/PieChat";
import { useGlobalContext } from "context/GlobalContext";

const icons = [
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
  />,
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
  />,
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
  />,
];
const DashBoard = () => {
  const {
    data: { registeredCount, waitingCount, studentAddedThisMonth },
  } = useGlobalContext();

  return (
    <>
      <TopCard
        key={1}
        icon={icons[0]}
        subTitle={registeredCount}
        title={"Total Students"}
      />
      <TopCard
        key={1}
        icon={icons[1]}
        subTitle={waitingCount}
        title={"Pending Students"}
      />
      <TopCard
        key={1}
        icon={icons[2]}
        subTitle={studentAddedThisMonth}
        title={"Students Added This Month"}
      />

      <div className="w-full p-2 lg:w-2/3">
        <div className="rounded-lg bg-card sm:h-80 h-60">
          <Graph />
        </div>
      </div>
      <div className="w-full p-2 lg:w-1/3">
        <div className="rounded-lg bg-card h-80">
          <PieChart />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
