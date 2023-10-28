import { PrismaClient, User, waitingListStudent } from "@prisma/client";
import groupBy from "lodash/groupBy";
import moment, { Moment } from "moment";
import type { NextApiRequest, NextApiResponse } from "next";
import { Data, UserWithIncluded } from "types";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prisma = new PrismaClient();
  const students = await prisma.user.findMany({
    take: 50,
    skip: 0,
    include: {
      registered: true,
      waiting: true,
    },
  });

  const waitingCount = await prisma.waitingListStudent.count();
  const registeredCount = await prisma.registeredStudent.count();
  const startOfMonth = moment().startOf("month").toISOString();
  const endOfMonth = moment().endOf("month").toISOString();
  const studentAddedThisMonth = await prisma.registeredStudent.findMany({
    where: {
      registeredDate: {
        lte: endOfMonth,
        gte: startOfMonth,
      },
    },
  });
  let studentAddedInLastSevenDays = await prisma.registeredStudent.findMany({
    where: {
      registeredDate: {
        gte: moment().subtract(7, "days").toISOString(),
      },
    },
  });
  const onlyDate = studentAddedInLastSevenDays.map((student) => {
    return student.registeredDate;
  });
  const beforeSevenDays = moment().subtract(7, "days");
  const today = moment();
  const grouped = groupBy(onlyDate, (dt) =>
    moment(dt).format("dddd").substring(0, 3)
  );
  var enumerateDaysBetweenDates = function (
    startDate: Moment,
    endDate: Moment
  ) {
    var dates = [];
    while (startDate.format("M/D/YYYY") !== endDate.format("M/D/YYYY")) {
      dates.push(startDate.format("dddd").substring(0, 3));
      startDate = startDate.add(1, "days");
    }

    return dates;
  };
  const enumerated = enumerateDaysBetweenDates(beforeSevenDays, today);

  const finalGraphData = enumerated.map((i) => {
    if (grouped[i]) {
      return { day: i, value: grouped[i].length };
    } else {
      return { day: i, value: 0 };
    }
  });

  const waiting = await prisma.waitingListStudent.findMany({
    include: {
      student: true,
    },
  });
  const totalCountCount = await prisma.user.count();

  res.status(200).json({
    totalCountCount,
    studentAddedThisMonth: studentAddedThisMonth.length,
    students,
    registeredCount,
    waiting,
    waitingCount,
    studentAddedInLastSevenDays: finalGraphData,
  });
}
