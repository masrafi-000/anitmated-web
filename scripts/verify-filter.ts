/* eslint-disable @typescript-eslint/no-explicit-any */
async function verifyFiltering() {
  const baseUrl = "http://localhost:3000";
  console.log("Verifying Career Filtering...");

  try {
    // 1. Get all jobs
    const allRes = await fetch(`${baseUrl}/api/v0/careers`);
    const allJson = await allRes.json();
    const allJobs = allJson.data;
    console.log(`Total jobs: ${allJobs.length}`);

    // 2. Filter by Engineering
    const dept = "Engineering";
    const filterRes = await fetch(`${baseUrl}/api/v0/careers?department=${dept}`);
    const filterJson = await filterRes.json();
    const filteredJobs = filterJson.data;
    console.log(`Jobs in ${dept}: ${filteredJobs.length}`);
    
    // Check if filtered jobs actually belong to department
    const invalid = filteredJobs.filter((j: any) => j.department !== dept);
    if (invalid.length > 0) {
        console.error("Filter failed! Found jobs from other departments:", invalid.map((j: any) => j.department));
    } else {
        console.log("Filter verification passed.");
    }

  } catch (error) {
    console.error("Error verifying filtering:", error);
  }
}

verifyFiltering();
