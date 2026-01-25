
import prisma from "@/lib/prisma";
import "dotenv/config";

console.log("Verification script starting...");
console.log("Database URL present:", !!process.env.DATABASE_URL);

async function verify() {
  const user = await prisma.user.findUnique({
    where: { email: "admin@example.com" },
  });

  if (user) {
    console.log("Verification Success: User found:", user.email);
  } else {
    console.error("Verification Failed: User not found");
    process.exit(1);
  }
}

verify()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
