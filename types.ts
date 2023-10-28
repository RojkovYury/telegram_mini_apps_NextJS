import { RegisteredStudent, User, waitingListStudent } from "@prisma/client";
// export type UserWithIncluded = {
//   id: string;
//   tg_id: number;
//   first_name: string;
//   username: string;
//   registered_name: string;
//   lang: string;
//   phone_number: string;
//   stream: string;
//   school: string;
//   credited: number;
//   registered: RegisteredStudent | null;
//   waiting: waitingListStudent | null;
// };
export type UserWithIncluded = User & {
  registered: RegisteredStudent | null;
  waiting: waitingListStudent | null;
};

export type Data = {
  students: (User & {
    registered: RegisteredStudent | null;
    waiting: waitingListStudent | null;
  })[];
  waiting: (waitingListStudent & { student: User })[];
  studentAddedInLastSevenDays: any[];
  waitingCount: number;
  totalCountCount: number;
  studentAddedThisMonth: number;
  registeredCount: number;
};
