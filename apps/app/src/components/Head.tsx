import React from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
};

const Head: React.FC<HeadProps> = ({ title = 'utool' }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content="A place to find and build utilities" />
      <link rel="icon" href="/favicon.ico" />
    </Helmet>
  );
};

export default Head;
