import { query } from "../config/db.js";
import asyncHandler from "express-async-handler";

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

const siteDisplay = asyncHandler(async () => {
  try {
    const sitesQuery = "SELECT * FROM consite";
    const result = await query(sitesQuery);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

const singleSiteDisplay = asyncHandler(async (id) => {
  try {
    const singleSiteQuery = "SELECT * FROM consite WHERE site_id = $1";
    const result = await query(singleSiteQuery, [id]);
    return result.rows;
  } catch (err) {
    throw new Error("Internal error");
  }
});

export { addSite, siteDisplay, singleSiteDisplay };