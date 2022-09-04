import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import CustomTableHead from './CustomTableHead'

const Row = (props) => {
    const {row, handleClick, labelId, isItemSelected, headCells} = props
    const [rowOpen, setRowOpen] = React.useState(false);

    return <>
      <TableRow
        hover
        sx={{ '& > *': { borderBottom: 'unset' } }}
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
      >
        <TableCell padding="checkbox" onClick={(event) => handleClick(event, row._id)}>
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              'aria-labelledby': labelId,
            }} />
        </TableCell>
        <TableCell>
          {!!row.devices?.length && <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setRowOpen(!rowOpen)}
          >
            {rowOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>}
        </TableCell>
        <TableCell
          component="th"
          id={labelId}
          scope="row"
          padding="none"
        >
          {row.serialNumber}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.ipv4}</TableCell>
        <TableCell align="right">{row.devices?.length || 0}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={rowOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Devices
              </Typography>
              <Table size="small" aria-label="purchases">
              <CustomTableHead headCells={headCells} checkbox={false} expand={false}/>
                <TableBody>
                  {row?.devices?.map((devicesRow, index) => {
                    const innerLabelId = `custom-table-inner-${index}`;
                    
                    return (
                    <TableRow key={devicesRow._id}>
                      <TableCell component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {new Date(devicesRow.date).toDateString()}
                      </TableCell>
                      <TableCell align="right">{devicesRow.uid}</TableCell>
                      <TableCell align="right">{devicesRow.status}</TableCell>
                      <TableCell align="right">
                        {devicesRow.vendor}
                      </TableCell>
                    </TableRow>
                  )})}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  }

  export default React.memo(Row)