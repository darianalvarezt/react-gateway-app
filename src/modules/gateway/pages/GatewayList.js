import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import toast from "react-hot-toast"
import Container from '@mui/material/Container'

import useFindGateways from '../hooks/useFindGateways'
import useDeleteManyGateway from '../hooks/useDeleteManyGateway'
import CustomTableHead from '../components/CustomTableHead'
import CustomTableToolbar from '../components/CustomTableToolbar'
import GatewayCreateForm from '../components/GatewayCreateForm'
import CustomModal from '../components/CustomModal'
import Row from '../components/Row'

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

const detailsHeadCells = [
  {
    id: 'date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'uid',
    numeric: true,
    disablePadding: false,
    label: 'UID',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'vendor',
    numeric: true,
    disablePadding: false,
    label: 'Vendor',
  },
]

const GatewayList = () => {
    const [selected, setSelected] = React.useState(new Set([]))
    const [open, setOpen] = React.useState(false)

    const {
      error: deleteError,
      isLoading,
      isSuccess: deleteSuccess,
      onDelete
    } = useDeleteManyGateway()

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = gateways.map((n) => n._id);
        setSelected(new Set(newSelected));
        return;
      }
      setSelected(new Set([]));
    }
  
    const handleClick = (event, _id) => {
      if (!selected.delete(_id)) {
        selected.add(_id)
      }
  
      setSelected(new Set(selected));
    }

    const handleAddClick = () => {
        setOpen(prev => !prev)
    }

    const handleRemoveClick = () => {
      onDelete([...selected.values()])
    }
  
    const isSelected = (_id) => selected.has(_id);

    const { error, gateways } = useFindGateways();

    React.useEffect(() => {
      if (deleteSuccess) {
        setSelected(new Set([]));
      }
    }, [deleteSuccess])

    React.useEffect(() => {
        if (error || deleteError) toast.error(error.message || deleteError.message);
    }, [error, deleteError])
    
    return <Container maxWidth="lg">
    <Paper sx={{ width: '100%', mb: 2 }}>
      <CustomTableToolbar
        numSelected={selected.size}
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
            headCells={headCells}
            numSelected={selected.size}
            onSelectAllClick={handleSelectAllClick}
            rowCount={gateways?.length || 0}
          />
          <TableBody>
            {gateways?.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `custom-table-checkbox-${index}`;

                return (
                  <Row
                    key={row._id}
                    row={row}
                    handleClick={handleClick}
                    labelId={labelId}
                    isItemSelected={isItemSelected}
                    headCells={detailsHeadCells}
                    />
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
        <GatewayCreateForm
          onClose={handleAddClick}
        />
    </CustomModal>
  </Container>

    
}

export default GatewayList


