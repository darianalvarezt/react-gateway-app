import * as React from 'react'
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  IconButton,
  Button,
  Toolbar,
  Tooltip,
  ListItem,
  List,
  Divider,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import { Controller } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import toast from 'react-hot-toast'

import useGatewayCreateForm from '../hooks/useGatewayCreateForm'

const GatewayCreateForm = (props) => {
  const { onClose } = props
  const [devices, setDevices] = React.useState([])

  const { control, error, errors, isLoading, isSuccess, onSubmit } =
    useGatewayCreateForm()

  const handleAddNewDevice = () => {
    setDevices((prev) => [...prev, { id: prev.length + 1 }])
  }

  const handleRemoveDeviceClick = (index) => {
    setDevices((prev) => {
      prev.splice(index, 1)
      return [...prev]
    })
  }

  React.useEffect(() => {
    if (isSuccess) onClose();
  }, [isSuccess, onClose])

  React.useEffect(() => {
    if (error) toast.error(error.message)
  }, [error])

  return (
    <form onSubmit={onSubmit}>
      <Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={6} md={12}>
            <Controller
              name="serialNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors?.serialNumber}
                  helperText={errors?.serialNumber?.message}
                  sx={{ width: '100%' }}
                  label="Serial Number"
                  placeholder="Value"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                  sx={{ width: '100%' }}
                  label="Name"
                  placeholder="Value"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={4} md={6}>
            <Controller
              name="ipv4"
              control={control}
              render={({ field }) => (
                <TextField
                  error={!!errors?.ipv4}
                  helperText={errors?.ipv4?.message}
                  sx={{ width: '100%' }}
                  label="IPV4"
                  placeholder="Value"
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <List>
              {devices.map((dev, index) => (
                  <Box key={dev.id}>
                    <Divider />
                    <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
                      <Typography
                        sx={{ flex: '1 1 100%', my: 2 }}
                        variant="h6"
                        id="tableTitle"
                        component="div">
                        {`Device ${index + 1}`}
                      </Typography>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleRemoveDeviceClick(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Toolbar>
                    <ListItem disablePadding sx={{ mb: 2 }}>
                      <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={12} md={6} pt={2}>
                          <Controller
                            name={`devices.${index}.uid`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                error={!!errors?.devices?.[index]?.uid}
                                helperText={
                                  errors?.devices?.[index]?.uid?.message
                                }
                                sx={{ width: '100%' }}
                                label="UID"
                                placeholder="Value"
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} pt={2}>
                          <Controller
                            name={`devices.${index}.vendor`}
                            control={control}
                            render={({ field }) => (
                              <TextField
                                error={!!errors?.devices?.[index]?.vendor}
                                helperText={
                                  errors?.devices?.[index]?.vendor?.message
                                }
                                sx={{ width: '100%' }}
                                label="Vendor"
                                placeholder="Value"
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} pt={2}>
                          <Controller
                            name={`devices.${index}.date`}
                            control={control}
                            render={({ field }) => (
                              <DatePicker
                                error={!!errors?.devices?.[index]?.date}
                                helperText={
                                  errors?.devices?.[index]?.date?.message
                                }
                                sx={{ width: '100%' }}
                                label="Date"
                                placeholder="Value"
                                renderInput={(params) => (
                                  <TextField {...params} />
                                )}
                                {...field}
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={6} pt={2}>
                          <Controller
                            name={`devices.${index}.status`}
                            control={control}
                            render={({ field }) => (
                              <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                  Status
                                </InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  label="Status"
                                  {...field}>
                                  <MenuItem value="online">Online</MenuItem>
                                  <MenuItem value="offline">Offline</MenuItem>
                                </Select>
                              </FormControl>
                            )}
                          />
                        </Grid>
                      </Grid>
                    </ListItem>
                  </Box>
                ))}
            </List>

            <Box py={2}>
              <Stack alignItems="flex-start">
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={handleAddNewDevice}>
                  add device
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Box py={2}>
          <Stack alignItems="flex-end">
            <LoadingButton
              variant="contained"
              type="submit"
              loading={isLoading}>
              Create
            </LoadingButton>
          </Stack>
        </Box>
      </Box>
    </form>
  )
}

export default React.memo(GatewayCreateForm)
