function SidebarIcons({ id }: { id: number }) {
  const icons = {
    0: (
      <>
        <path d="M12 19C10.067 19 8.31704 18.2165 7.05029 16.9498L12 12V5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
        />
      </>
    ),
    1: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </>
    ),
    2: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </>
    ),
  };
  return (
    <svg
      className="w-8 h-8 xl:w-6 xl:h-6"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      {icons[id as 0 | 1 | 2] as any}
    </svg>
  );
}

export default SidebarIcons;
