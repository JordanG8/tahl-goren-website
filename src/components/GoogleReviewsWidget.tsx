"use client";

import React, { useEffect } from "react";

type Props = {
  featurableId?: string;
};

export default function GoogleReviewsWidget({ featurableId = "8b6e1de9-a380-443a-9a05-7deef54b46be" }: Props) {
  useEffect(() => {
    // Exact script injection as per working snippet
    const script = document.createElement("script");
    script.src = "https://featurable.com/assets/v2/masonry_default.min.js";
    script.defer = true;
    script.setAttribute("charset", "UTF-8");
    script.id = "featurable-script-v2";
    
    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount to prevent duplicates in SPA navigation
      const existingScript = document.getElementById("featurable-script-v2");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [featurableId]);

  return (
    <div className="google-reviews-wrapper bg-surface-container-low p-6 sm:p-8 md:p-12 border border-outline/10 mb-10 w-full" dir="rtl">
      <div id={`featurable-${featurableId}`} data-featurable-async></div>
    </div>
  );
}
