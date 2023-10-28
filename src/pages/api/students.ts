import { PrismaClient } from "@prisma/client";
import moment, { Moment } from "moment";
import groupBy from "lodash/groupBy";
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { take, skip } = req.query;
  const prisma = new PrismaClient();
  const students = await prisma.user.findMany({
    take: parseInt(take as string) || 50,
    skip: parseInt(skip as string) || 0,
    include: {
      registered: true,
    },
  });

  return res.json(students);
}
