import { ChangeEvent, MouseEvent } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Hidden, styled } from '@mui/material';

const Root = styled('div')<{ disabled?: boolean }>`
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  pointer-events: ${(p) => (p.disabled ? 'none' : 'all')};
`;

export interface PaginationProps {
  pageNumber: number;
  setPageNumber: (pageNumber: number) => void;
  size: number;
  setSize: (size: number) => void;
  disabled?: boolean;
  nextIconDisabled?: boolean;
}

function LabelRows({ page }: { page: number }) {
  return <Hidden mdDown>{`Page: ${page + 1}`}</Hidden>;
}

export default function Pagination(props: PaginationProps) {
  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    props.setPageNumber(newPage < 0 ? 0 : newPage);
  };

  const handleChangeRowsPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newSize = parseInt(event.target.value, 10);
    props.setSize(newSize < 0 ? 0 : newSize);
    props.setPageNumber(0);
  };

  return (
    <Root disabled={props.disabled}>
      <TablePagination
        component="div"
        rowsPerPageOptions={[5, 10, 25, 50]}
        colSpan={3}
        count={-1}
        rowsPerPage={props.size}
        page={props.pageNumber}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={<span>Rows:</span>}
        labelDisplayedRows={LabelRows}
        showFirstButton
        SelectProps={{
          sx: { marginRight: '8px' },
        }}
        nextIconButtonProps={{
          disabled: props.nextIconDisabled,
        }}
        backIconButtonProps={{
          disabled: props.pageNumber === 0,
        }}
      />
    </Root>
  );
}
