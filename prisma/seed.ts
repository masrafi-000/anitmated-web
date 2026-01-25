import "dotenv/config";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

console.log("Starting seed...");
console.log("DB URL exists:", !!process.env.DATABASE_URL);

async function main() {
  console.log("Hashing password...");
  const password = await bcrypt.hash("admin@123", 10);

  console.log("Upserting user...");
  try {
    const user = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        email: "admin@example.com",
        password,
      },
    });
    console.log("User upsert completed:", user.email);
  } catch (err) {
    console.error("Upsert failed:", err);
    throw err;
  }

  console.log("User seeded succesfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
