import React from "react";

interface ImageProps {
  /**
   * What is the image url?
   */
  url: string;
  /**
   * What is the header of this image?
   */
  header?: string;
  /**
   * What is the subtext of this image?
   */
  subtext?: string;
  /**
   * What is the eyebrow text of this image?
   */
  eyebrowText?: string;
  /**
   * What is the CTA of this image?
   */
  cta?: React.ReactNode;
  /**
   * What alt text should the image display?
   */
  altText?: string;
}

export const Image = ({
  url,
  header,
  subtext,
  eyebrowText,
  cta,
  altText,
}: ImageProps) => {
  return (
    <div className={`relative w-full text-white`}>
      <img src={url} alt={altText} className="rounded-lg" />
      <div className={"absolute top-0 left-0 p-8 w-6/12"}>
        <p className={"text-xs font-bold"}>{eyebrowText?.toUpperCase()}</p>
        <h3 className={"text-3xl font-bold"}>{header}</h3>
        <p className={"text-s mb-2"}>{subtext}</p>
        <span>{cta}</span>
      </div>
    </div>
  );
};
