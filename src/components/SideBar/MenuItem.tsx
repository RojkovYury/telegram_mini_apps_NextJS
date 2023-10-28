import clsx from "clsx";
import Link from "next/link";
import SidebarIcons from "./SideBarIcons";

interface Props {
  item: any;
  setSelected: any;
  selected: any;
  onSidebarHide: any;
}
const MenuItem: React.FC<Props> = ({
  onSidebarHide,
  item: { id, title, notifications, disabled, href },
  setSelected,
  selected,
}) => {
  return (
    <Link
      href={`/${href}`}
      className={clsx(
        "w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer",
        selected === id ? "sidebar-item-selected" : "sidebar-item",
        disabled ? "pointer-events-none" : ""
      )}
      onClick={() => {
        setSelected(id);
        onSidebarHide();
      }}
    >
      <SidebarIcons id={Number(id) as any} />
      <div className="block sm:hidden xl:block ml-2">
        <span className="text-lg">{title}</span>
      </div>
      <div className="block sm:hidden xl:block flex-grow" />
      {typeof notifications === "number" && (
        <div className="flex sm:hidden xl:flex bg-pink-600  w-5 h-5 items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
      {typeof notifications === "string" && (
        <div className="flex sm:hidden xl:flex px-2 bg-pink-600  w-fit h-5 items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
    </Link>
  );
};

export default MenuItem;
