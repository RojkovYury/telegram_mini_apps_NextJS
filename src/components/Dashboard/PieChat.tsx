import { useGlobalContext } from "context/GlobalContext";
import { PieChart, Pie, Cell } from "recharts";

interface Props {}

const COLORS = ["#7D1C8D", "#6B8DE3"];
const PieChar: React.FC<Props> = ({}) => {
  const {
    data: { registeredCount, waitingCount },
  } = useGlobalContext();
  const data = [
    { name: "Aproved", value: registeredCount },
    { name: "Pending", value: waitingCount },
  ];
  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Pie Chart</div>
      </div>
      <div className="flex justify-center items-center">
        <PieChart width={730} height={250}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              value,
              index,
            }) => {
              const RADIAN = Math.PI / 180;
              const radius = 25 + innerRadius + (outerRadius - innerRadius);
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#8884d8"
                  textAnchor={x > cx ? "start" : "end"}
                  dominantBaseline="central"
                >
                  {data[index].name}
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default PieChar;
