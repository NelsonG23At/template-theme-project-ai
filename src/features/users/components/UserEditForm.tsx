import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Form, Input, Button, Space, Card } from 'antd'
import { userEditSchema, type UserEditFormValues } from '../schemas/userEdit.schema'
import { updateUser } from '../../../core/api/users'
import { userKeys } from '../../../core/api/keys'
import type { User } from '../../../core/types/user'

interface UserEditFormProps {
  user: User
}

export function UserEditForm({ user }: UserEditFormProps) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserEditFormValues>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      address: {
        street: user.address.street,
        suite: user.address.suite,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
      company: {
        name: user.company.name,
        catchPhrase: user.company.catchPhrase,
        bs: user.company.bs,
      },
    },
  })

  useEffect(() => { reset({ name: user.name, email: user.email, phone: user.phone, website: user.website, address: { street: user.address.street, suite: user.address.suite, city: user.address.city, zipcode: user.address.zipcode }, company: { name: user.company.name, catchPhrase: user.company.catchPhrase, bs: user.company.bs } }) }, [user.id, reset, user])

  const mutation = useMutation({
    mutationFn: (values: UserEditFormValues) =>
      updateUser(user.id, { ...values, address: { ...user.address, ...values.address } }),
    onSuccess: (updated) => {
      queryClient.setQueryData(userKeys.detail(user.id), updated)
      void queryClient.invalidateQueries({ queryKey: userKeys.lists() })
      void navigate(`/users/${user.id}`)
    },
  })

  const onSubmit = (values: UserEditFormValues) => mutation.mutate(values)

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Card title="Basic Info" className="mb-4">
        <Form.Item label="ID">
          <Input value={user.id} disabled data-testid="field-id" />
        </Form.Item>
        <Form.Item label="Username">
          <Input value={user.username} disabled data-testid="field-username" />
        </Form.Item>
        <Form.Item label="Name" validateStatus={errors.name ? 'error' : ''} help={errors.name?.message}>
          <Controller name="name" control={control} render={({ field }) => <Input {...field} data-testid="field-name" />} />
        </Form.Item>
        <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
          <Controller name="email" control={control} render={({ field }) => <Input {...field} data-testid="field-email" />} />
        </Form.Item>
        <Form.Item label="Phone" validateStatus={errors.phone ? 'error' : ''} help={errors.phone?.message}>
          <Controller name="phone" control={control} render={({ field }) => <Input {...field} data-testid="field-phone" />} />
        </Form.Item>
        <Form.Item label="Website" validateStatus={errors.website ? 'error' : ''} help={errors.website?.message}>
          <Controller name="website" control={control} render={({ field }) => <Input {...field} data-testid="field-website" />} />
        </Form.Item>
      </Card>

      <Card title="Address" className="mb-4">
        <Form.Item label="Street" validateStatus={errors.address?.street ? 'error' : ''} help={errors.address?.street?.message}>
          <Controller name="address.street" control={control} render={({ field }) => <Input {...field} data-testid="field-street" />} />
        </Form.Item>
        <Form.Item label="Suite">
          <Controller name="address.suite" control={control} render={({ field }) => <Input {...field} data-testid="field-suite" />} />
        </Form.Item>
        <Form.Item label="City" validateStatus={errors.address?.city ? 'error' : ''} help={errors.address?.city?.message}>
          <Controller name="address.city" control={control} render={({ field }) => <Input {...field} data-testid="field-city" />} />
        </Form.Item>
        <Form.Item label="Zipcode" validateStatus={errors.address?.zipcode ? 'error' : ''} help={errors.address?.zipcode?.message}>
          <Controller name="address.zipcode" control={control} render={({ field }) => <Input {...field} data-testid="field-zipcode" />} />
        </Form.Item>
      </Card>

      <Card title="Company" className="mb-4">
        <Form.Item label="Company Name" validateStatus={errors.company?.name ? 'error' : ''} help={errors.company?.name?.message}>
          <Controller name="company.name" control={control} render={({ field }) => <Input {...field} data-testid="field-company-name" />} />
        </Form.Item>
        <Form.Item label="Catch Phrase">
          <Controller name="company.catchPhrase" control={control} render={({ field }) => <Input {...field} data-testid="field-catch-phrase" />} />
        </Form.Item>
        <Form.Item label="BS">
          <Controller name="company.bs" control={control} render={({ field }) => <Input {...field} data-testid="field-bs" />} />
        </Form.Item>
      </Card>

      <Space>
        <Button type="primary" htmlType="submit" loading={isSubmitting || mutation.isPending} data-testid="btn-save">
          Save Changes
        </Button>
        <Button onClick={() => void navigate(`/users/${user.id}`)} data-testid="btn-cancel">Cancel</Button>
      </Space>
    </Form>
  )
}
