"use client";

import React from "react";
import { ReactGoogleReviews } from "react-google-reviews";
import "react-google-reviews/dist/index.css";

type Props = {
  featurableId?: string;
};

export default function GoogleReviewsWidget({ featurableId = "8b6e1de9-a380-443a-9a05-7deef54b46be" }: Props) {
  if (!featurableId || featurableId === "YOUR_FEATURABLE_INSTANCE_ID") {
    return (
      <div className="p-8 text-center bg-surface-container-low border border-outline/10 h-64 flex flex-col justify-center items-center gap-4">
        <span className="material-symbols-outlined text-4xl text-primary">warning</span>
        <h3 className="font-headline font-bold text-xl">חסר מזהה Featurable</h3>
        <p className="text-secondary max-w-sm">
          כדי להציג את הקרוסלה של הביקורות, עליכם להירשם לאתר Featurable.com, ליצור וידג'ט לבית העסק שלכם, ולהוסיף את מספר הוידג'ט לקובץ .env.local (או ל-Vercel) תחת <code className="bg-surface font-mono px-2 py-1">NEXT_PUBLIC_FEATURABLE_ID</code>
        </p>
      </div>
    );
  }

  return (
    <div className="google-reviews-wrapper bg-surface-container-low p-6 sm:p-8 md:p-12 border border-outline/10 mb-10 w-full" dir="ltr">
      <div className="text-center mb-8">
        <h3 className="font-headline font-bold text-3xl text-primary leading-tight">לקוחות מספרים</h3>
      </div>
      <ReactGoogleReviews
        layout="carousel"
        featurableId={featurableId}
        theme="light"
        accessibility={true}
        showDots={true}
        carouselAutoplay={true}
      />
    </div>
  );
}
