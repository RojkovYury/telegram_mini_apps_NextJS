import { styled } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import { Breakpoint } from '@mui/system';
import { TableCellBaseProps } from '@mui/material/TableCell/TableCell';

export interface Hidden {
  start: Breakpoint;
  end: Breakpoint
}

const ColumnRoot = styled(TableCell)<{ hide?: Hidden }>`
  ${(p) => (p.hide ? p.theme.breakpoints.between(p.hide.start, p.hide.end) : '')}
  ${(p) => (p.hide ? '{ display: none; }' : '')}
`;

export interface DataTableColumn {
  field: string;
  name: string;
  align?: 'left' | 'right';
  hiddenBetween?: Hidden;
}

interface ColumnProps {
  column: DataTableColumn;
  scope?: TableCellBaseProps['scope'];
  children?: any
}

export default function Column(props: ColumnProps) {
  return (
    <ColumnRoot
      align={props.column.align}
      hide={props.column.hiddenBetween}
      scope={props?.scope}
    >
      {(props.children !== undefined && props.children !== null) ? props.children : <b>{props.column.name}</b>}
    </ColumnRoot>
  );
}
