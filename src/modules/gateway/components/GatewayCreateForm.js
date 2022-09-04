import * as React from 'react'
import { Box, Grid, Stack, Typography } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import { Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import useGatewayCreateForm from '../hooks/useGatewayCreateForm'

const GatewayCreateForm = () => {
    const [devices, setDevices] = React.useState([{}]);

    const {
      control,
      error,
      errors,
      isLoading,
      isSuccess,
      onSubmit,
    } = useGatewayCreateForm()

    const handleAddNewDevice = () => {
        setDevices(prev => {
            prev.push({})
            return prev
        })
    }

    return <>
        <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Create gateway entry
        </Typography>
       

        <form onSubmit={onSubmit}>
            <Box>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} md={12}>
                    <Controller
                        name="serialNumber"
                        control={control}
                        render={({ field }) => (<TextField
                            error={!!errors?.serialNumber}
                            helperText={errors?.serialNumber?.message}
                            sx={{ width: '100%' }}
                            id="serialNumber"
                            label="Serial Number"
                            placeholder="Value"
                            {...field}
                    />)}
                    /> 
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (<TextField
                            error={!!errors?.name}
                            helperText={errors?.name?.message}
                            id="name"
                            label="Name"
                            placeholder="Value"
                            {...field}
                    />)}
                    />
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Controller
                        name="ipv4"
                        control={control}
                        render={({ field }) => (<TextField
                            error={!!errors?.ipv4}
                            helperText={errors?.ipv4?.message}
                            id="ipv4"
                            label="IPV4"
                            placeholder="Value"
                            {...field}
                    />)}
                    />
                    </Grid>

                    <Grid item xs={12} md={13}>
                    <Divider />
                    <List>
                    {devices.map((dev, index) => {
                        return (<ListItem disablePadding><Grid item xs={12} md={6} pt={2}>
                            <Controller
                                name={`devices.${index}.uid`}
                                control={control}
                                render={({ field }) => (<TextField
                                    error={!!errors?.devices?.[index]?.uid}
                                    helperText={errors?.devices?.[index]?.uid?.message}
                                    id={`devices.${index}.uid`}
                                    label="UID"
                                    placeholder="Value"
                                    {...field}
                            />)}
                            />
                             </Grid></ListItem>)
                    })

                    }
                    </List>

                    <Box py={2}>
                    <Stack alignItems="flex-start">
                    <Button variant="outlined" startIcon={<AddIcon />}
                        onClick={handleAddNewDevice}>
                    {'add device'}
                    </Button>
                    </Stack>
                </Box>
                    </Grid>
                </Grid>

                <Box py={2}>
                    <Stack alignItems="flex-end">
                        <LoadingButton variant="contained" type={'submit'} loading={isLoading}>
                            {'Create'}
                        </LoadingButton>
                    </Stack>
                </Box>
            </Box>
        </form>
    </>
}

export default React.memo(GatewayCreateForm)