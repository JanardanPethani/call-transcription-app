"use client";
import Script from "next/script";
import { useState, useEffect } from "react";

import { getGoogleSenseId } from "./utils";

const GoogleAdsense = () => {
  const [pId, setPId] = useState("");

  useEffect(() => {
    getGoogleSenseId().then((id) => {
      setPId(id);
      console.log(id);
    });
  }, []);

  if (!pId) return null;

  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return <meta name="google-adsense-account" content={`ca-pub-${pId}`} />;
};

export default GoogleAdsense;
