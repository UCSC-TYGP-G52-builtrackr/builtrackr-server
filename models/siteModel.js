import { query } from "../config/db.js";

const addSite = async (
  siteName,
  siteDesc,
  siteType,
  siteClient,
) => {
  
  const addSiteQuery =
    "INSERT INTO consite ( site_name, site_desc, site_type, site_client ) VALUES ($1, $2, $3, $4)";

  try {
    const createSite = await query(addSiteQuery, [
      siteName,
      siteDesc,
      siteType,
      siteClient
    ]);

    if (createSite.rowCount > 0) {
      return createSite.rows[0];
    } else {
      throw new Error("Site not added");
    }
  } catch (err) {
    throw new Error(err);
  }
};

export { addSite };