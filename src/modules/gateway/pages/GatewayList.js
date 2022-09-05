import * as React from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Container,
  Stack,
} from '@mui/material'
import toast from 'react-hot-toast'
import { InfinitySpin } from 'react-loader-spinner'

import { useFindGateways, useDeleteManyGateway } from '../hooks'
import {
  Row,
  CustomModal,
  GatewayCreateForm,
  CustomTableToolbar,
  CustomTableHead,
} from '../components'

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

  const isSelected = (_id) => selected.has(_id)

  const { isLoading, error, gateways } = useFindGateways()

  const {
    error: deleteError,
    isLoading: deleteLoading,
    isSuccess: deleteSuccess,
    onDelete,
  } = useDeleteManyGateway()

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = gateways.map((n) => n._id)
      setSelected(new Set(newSelected))
      return
    }
    setSelected(new Set([]))
  }

  const handleClick = (event, _id) => {
    if (!selected.delete(_id)) {
      selected.add(_id)
    }

    setSelected(new Set(selected))
  }

  const handleAddClick = () => {
    setOpen((prev) => !prev)
  }

  const handleRemoveClick = () => {
    onDelete([...selected.values()])
  }

  React.useEffect(() => {
    if (deleteSuccess) {
      setSelected(new Set([]))
    }
  }, [deleteSuccess])

  React.useEffect(() => {
    if (error || deleteError) toast.error(error.message || deleteError.message)
  }, [error, deleteError])

  if (isLoading || deleteLoading)
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}>
        <InfinitySpin width="200" color="black" />
      </Stack>
    )

  return (
    <Container maxWidth="lg">
      <Paper sx={{ width: '100%' }}>
        <CustomTableToolbar
          numSelected={selected.size}
          onAddClick={handleAddClick}
          onRemoveClick={handleRemoveClick}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}>
            <CustomTableHead
              headCells={headCells}
              numSelected={selected.size}
              onSelectAllClick={handleSelectAllClick}
              rowCount={gateways?.length}
            />
            <TableBody>
              {gateways?.map((row, index) => {
                const isItemSelected = isSelected(row._id)
                const labelId = `custom-table-checkbox-${index}`
                return (
                  <Row
                    key={row._id}
                    row={row}
                    handleClick={handleClick}
                    labelId={labelId}
                    isItemSelected={isItemSelected}
                    headCells={detailsHeadCells}
                  />
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <CustomModal open={open} onClose={handleAddClick}>
        <GatewayCreateForm onClose={handleAddClick} />
      </CustomModal>
    </Container>
  )
}

export default GatewayList
