import React from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
};

const Head: React.FC<HeadProps> = ({ title = 'kodkod' }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content="Find the latest libraries and frameworks" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default Head;
