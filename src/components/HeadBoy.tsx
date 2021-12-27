import styled from 'styled-components';
import Head from 'next/head';

type Props = {
  title?: string;
};

function HeadBoy({ title }: Props) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>Multi Step Form{title ? ` | ${title}` : null}</title>
    </Head>
  );
}

export default HeadBoy;
