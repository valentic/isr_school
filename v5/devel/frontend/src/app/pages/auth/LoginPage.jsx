import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useForm } from '@mantine/form'
import { useAuth } from '~/app' 
import {
    LoadingOverlay,
    TextInput,
    PasswordInput,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core'

export function LoginPage() {

    const auth = useAuth()
    const mutation = useMutation({ mutationFn: auth.login}) 

    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        }
    })

    const onSubmit = (payload) => {
        mutation.mutate(payload)
    }

    return (
        <Container size={420} mt="1em">

          <Paper withBorder shadow="md" p="2rem" pt="1rem" mt={30} radius="md">

            <Title order={2} align="center" c="blue" fw={700}>
              Sign In
            </Title>

            <form onSubmit={form.onSubmit(onSubmit)}>
              
              <LoadingOverlay visible={mutation.loading} />

              <TextInput    
                label="Username" 
                placeholder="Your username" 
                data-autofocus
                required 
                {...form.getInputProps('username')}
                />

              <PasswordInput 
                label="Password" 
                placeholder="Your password" 
                required 
                mt="md" 
                {...form.getInputProps('password')}
                />

              { mutation.isError && (
                <Text color="red" size="sm" mt="sm">
                  { mutation.error.message }
                </Text>
              )}

              <Button type="submit" fullWidth mt="xl"> Sign in </Button>
            </form>
          </Paper>
        </Container>
    )
}

