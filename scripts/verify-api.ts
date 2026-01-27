async function verify() {
  const baseUrl = "http://localhost:3000";
  console.log("Verifying API endpoints...");

  try {
    // 1. List all careers
    console.log(`Fetching ${baseUrl}/api/v0/careers...`);
    const listRes = await fetch(`${baseUrl}/api/v0/careers`);
    if (!listRes.ok) {
      console.error(`Failed to fetch careers list: ${listRes.status} ${listRes.statusText}`);
      const text = await listRes.text();
      console.error(text);
      return;
    }
    const careers = await listRes.json();
    console.log(`Found ${careers.length} careers.`);
    if (careers.length > 0) {
      const firstSlug = careers[0].slug;
      console.log(`First career slug: ${firstSlug}`);

      // 2. Get details for the first career
      console.log(`Fetching details for ${firstSlug}...`);
      const detailRes = await fetch(`${baseUrl}/api/v0/careers/${firstSlug}`);
      if (!detailRes.ok) {
        console.error(`Failed to fetch career details: ${detailRes.status} ${detailRes.statusText}`);
         const text = await detailRes.text();
         console.error(text);
        return;
      }
      const detail = await detailRes.json();
      console.log("Career details fetched successfully:");
      console.log(JSON.stringify(detail, null, 2));
    } else {
      console.log("No careers found to verify details endpoint. Please seed database.");
    }

  } catch (error) {
    console.error("Error verifying API:", error);
  }
}

verify();
