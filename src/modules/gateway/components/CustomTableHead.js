import * as React from 'react'
import { TableCell, TableHead, TableRow, Checkbox } from '@mui/material'

const CustomTableHead = (props) => {
  const {
    onSelectAllClick,
    numSelected,
    rowCount = 0,
    headCells,
    checkbox = true,
    expand = true,
  } = props

  return (
    <TableHead>
      <TableRow>
        {checkbox && (
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
        )}
        {expand && <TableCell />}
        {headCells?.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default CustomTableHead
