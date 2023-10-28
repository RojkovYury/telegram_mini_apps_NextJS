import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import React from "react";
import Table from "../components/Pending/Table";

const Pending = () => {
  return (
    <div className="w-full">
      <Table />
    </div>
  );
};

export default Pending;
