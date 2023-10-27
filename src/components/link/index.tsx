'use client';

import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MUILink, { LinkProps as MUILinkProps } from '@mui/material/Link';

type LinkProps = NextLinkProps & MUILinkProps;

export default function Link(props: LinkProps) {
  return (
    <MUILink
      component={NextLink}
      {...props}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        ...(props.sx || {}),
      }}
    />
  );
}
