import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import toast from "react-hot-toast"
import Container from '@mui/material/Container'
import Checkbox from '@mui/material/Checkbox'

import useFindGateways from '../hooks/useFindGateways'
import CustomTableHead from '../components/CustomTableHead'
import CustomTableToolbar from '../components/CustomTableToolbar'
import CustomModal from '../components/CustomModal'
import GatewayCreateForm from '../components/GatewayCreateForm'

const GatewayList = () => {
    const [selected, setSelected] = React.useState([])
    const [open, setOpen] = React.useState(false)


    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = gateways.map((n) => n.serialNumber);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    }
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
  
      setSelected(newSelected);
    }

    const handleAddClick = () => {
        setOpen(prev => !prev)
    }

    const handleRemoveClick = () => {

    }
  
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const { error, gateways } = useFindGateways();

    React.useEffect(() => {
        if (error) toast.error(error.message);
    }, [error])
    
    return <Container maxWidth="lg">
    <Paper sx={{ width: '100%', mb: 2 }}>
      <CustomTableToolbar
        numSelected={selected.length}
        onAddClick={handleAddClick}
        onRemoveClick={handleRemoveClick}
      />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={'small'}
        >
          <CustomTableHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={gateways?.length || 0}
          />
          <TableBody>
            {gateways?.map((row, index) => {
                const isItemSelected = isSelected(row.serialNumber);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.serialNumber)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.serialNumber}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
    <CustomModal
        open={open}
        onClose={handleAddClick}
    >
        <GatewayCreateForm/>
    </CustomModal>
  </Container>

    
}

export default GatewayList
