interface Props {
  title: string;
  subTitle: number;
  icon: any;
}
const TopCard: React.FC<Props> = ({ subTitle, title, icon }) => {
  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-card flex justify-between p-3 h-32">
        <div className="flex w-full items-center h-full py-2 px-4 rounded-lg justify-between">
          <div className="my-auto">
            <p className="font-bold">{title}</p>
            <p className="text-lg">{subTitle}</p>
          </div>
          <div className="my-auto">
            <svg
              className="w-8 h-8 "
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              {icon}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopCard;
