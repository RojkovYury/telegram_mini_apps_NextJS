// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient, waitingListStudent } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<waitingListStudent[]>
) {
  const { take, skip } = req.query;
  const prisma = new PrismaClient();
  const waiting = await prisma.waitingListStudent.findMany({
    take: parseInt(take as string),
    skip: parseInt(skip as string),
    include: {
      student: true,
    },
  });

  res.status(200).json(waiting);
}
