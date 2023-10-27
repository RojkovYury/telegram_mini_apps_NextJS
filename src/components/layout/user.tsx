'use client';

import { useState } from 'react';
import { Box, Button, MenuItem, Menu, SxProps } from '@mui/material';
import { AccountCircle, ExitToAppRounded } from '@mui/icons-material';
import NextLink from 'next/link';

interface UserProps {
  userName?: string | null;
  signOutText?: string | null;
  sx?: SxProps;
}

export default function User(props: UserProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          ...props?.sx,
        }}
      >
        <AccountCircle sx={{ mr: 1 }} />
        {props.userName}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem dense onClick={handleClose}>
          <Button
            variant="contained"
            color="error"
            startIcon={<ExitToAppRounded />}
            component={NextLink}
            href="/api/auth/signout"
          >
            {props.signOutText}
          </Button>
        </MenuItem>

      </Menu>
    </>
  );
}
