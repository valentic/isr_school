import React from 'react'
import { useForm } from '@mantine/form'
import { Link } from 'react-router-dom'
import { validate } from 'support/helpers'

import { 
    TextInput, 
    Button,
    Center,
    Select,
    Group,
    Checkbox,
    Input, 
} from '@mantine/core'

const roleList = [ 
    { value: 'member',  label: 'Member'     },
    { value: 'manager', label: 'Manager'    },
    { value: 'admin',   label: 'Admin'      }
]

const UserForm = ({initialValues, onFormSubmit, isLoading, isUpdate}) => {

    const update = !!isUpdate 

    const form = useForm({

        initialValues,

        validate: {
            username: validate.username, 
            password: update ? null : validate.password,
            email: validate.email
        }

    })

    return (
          <form onSubmit={form.onSubmit(onFormSubmit)}>
          
            <TextInput
              label="Username"
              required
              data-autofocus
              mb="1em"
              {...form.getInputProps('username')}
            />

            <TextInput
              label={update ? "New Password" : "Password" }
              required={!update}
              mb="1em"
              {...form.getInputProps('password')}
            />

            <TextInput
              label="Email"
              required
              mb="1em"
              {...form.getInputProps('email')}
            />

            <Group align="flex-start">
              <Select
                label="Role"
                value={form.values.role}
                data={roleList}
                mb="1em"
                {...form.getInputProps('role')}
              />

              <Input.Wrapper label="State">
                <Group mt="0.5em"> 
                
                <Checkbox
                  label="Active"
                  {...form.getInputProps('active', { type: 'checkbox'} )}
                /> 

                <Checkbox
                  label="Pending"
                  {...form.getInputProps('pending', { type: 'checkbox'} )}
                /> 
                </Group>
              </Input.Wrapper>
            </Group>

            <Center>
              <Group>
                <Button loading={isLoading} type="submit">Submit</Button>
                <Button variant="light" component={Link} to="..">Cancel</Button>
              </Group>
            </Center>

          </form>
    )
}

export { UserForm } 
