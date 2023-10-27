import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import BlockIcon from '@mui/icons-material/Block';
import { Typography } from '@mui/material';

interface EmptyProps {
  colSpan: number;
  emptyText?: string;
}

export default function Empty({ colSpan, emptyText }: EmptyProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        sx={{ textAlign: 'center' }}
      >
        <BlockIcon fontSize="large" color="disabled" />
        {emptyText && (
          <Typography variant="subtitle1" color="text.secondary">
            {emptyText}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
}
