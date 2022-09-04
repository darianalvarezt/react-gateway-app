import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';

const headCells = [
    {
      id: 'serialNumber',
      numeric: false,
      disablePadding: true,
      label: 'Serial Number',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'Name',
    },
    {
      id: 'ipv4',
      numeric: false,
      disablePadding: false,
      label: 'IPV4',
    },
    {
      id: 'devices',
      numeric: true,
      disablePadding: false,
      label: 'Devices (units)',
    },
  ]
  
  const CustomTableHead = (props) => {
    const { onSelectAllClick, numSelected, rowCount } =
      props;
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
        </TableCell>
        {headCells.map((headCell) => (
        <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
        >
            {headCell.label}
        </TableCell>
        ))}
        </TableRow>
      </TableHead>
    );
  }

  export default CustomTableHead