import Head from "next/head";
import React from "react";

export const DEFAULT_TITLE = "Centero";
export const DEFAULT_DESCRIPTION = "Purple Admin UI";

interface ISeoHeadProps {
  title?: string;
  description?: string;
}

const SeoHead = ({ title, description }: ISeoHeadProps) => {
  return (
    <Head>
    
      <title>{title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE}</title>
      <meta name="description" content={description ?? DEFAULT_DESCRIPTION} />
      <meta http-equiv="Content-Type" content="text/html" charSet="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    </Head>
  );
};

export default React.memo(SeoHead);
