import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../../../api/APIService'

Yup.addMethod(Yup.string, 'ipv4', function (args) {
  const { message = 'Invalid ipv4 address' } = args || {}
  return this.test('is-ipv4', message, function (value) {
    const { path, createError } = this

    return (
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
        value
      ) || createError({ path, message })
    )
  })
})

const deviceSchema = Yup.object().shape({
  uid: Yup.number().required('UID is required').typeError('Must be a number'),

  vendor: Yup.string().required('Vendor is required'),

  date: Yup.date().required('Date is required'),

  status: Yup.string()
    .required('Status is required')
    .matches(/(online|offline)/),
})

const gatewaySchema = Yup.object().shape({
  serialNumber: Yup.string().required('Serial number is required'),

  name: Yup.string().required('Name is required'),

  ipv4: Yup.string().required('Ipv4 is required').ipv4(),

  devices: Yup.lazy(() => Yup.array().of(deviceSchema).max(10)),
})

const useGatewayCreateForm = () => {
  const queryClient = useQueryClient()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(gatewaySchema),
    defaultValues: {
      serialNumber: '',
      name: '',
      ipv4: '',
    },
  })

  const { mutate, error, isLoading, isSuccess, data } = useMutation(create, {
    onSuccess: () => {
      queryClient.invalidateQueries(['gateways'])
    },
  })

  return {
    control,
    error,
    errors,
    isLoading,
    isSuccess,
    data,
    onSubmit: handleSubmit((values) => {
      console.log({ values })
      mutate(values)
    }),
  }
}

export default useGatewayCreateForm
