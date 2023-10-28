import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle: string;
  svg: any;
}
const Card: React.FC<Props> = ({ subtitle, title, svg: SVG, className }) => {
  return (
    <div
      className={
        `pl-1  col-span-12 md:col-span-6 lg:col-span-3 h-20 bg-green-400 rounded-lg shadow-md ` +
        className
      }
    >
      <div className="flex w-full h-full py-2 px-4 bg-white rounded-lg justify-between">
        <div className="my-auto">
          <p className="font-bold">{title}</p>
          <p className="text-lg">{subtitle}</p>
        </div>
        <div className="my-auto">
          <SVG className="text-3xl" />
        </div>
      </div>
    </div>
  );
};

export default Card;
