"use server";

export const getGoogleSenseId = async () => {
  return process.env.GOOGLE_SENSE_ID;
};
