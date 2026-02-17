import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const hashPassword = await bcrypt.hash("masrafi@123", 10);

  const admin = await prisma.user.upsert({
    where: { email: "smmasrafi000@gmail.com" },
    update: {
        username: "masrafi000",
        password: hashPassword,
        name: "S M Masrafi",
    },
    create: {
      email: "smmasrafi000@gmail.com",
      username: "S M Masrafi",
      password: hashPassword,
      designation: "Chief Editor",
    },
  });
  console.log({ admin });
}
main();
