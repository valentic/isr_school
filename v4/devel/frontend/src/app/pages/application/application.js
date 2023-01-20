import React, { useCallback } from 'react'
import { useForm } from '@mantine/form'
import { useMutation } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { CountryRegionData } from 'react-country-region-selector'
import { IconAlertCircle } from '@tabler/icons'
import { apiService } from 'services'

import { 
    Container, 
    Title,
    Text, 
    TextInput, 
    Textarea,
    Radio,
    Button,
    Group,
    Center,
    Divider,
    NativeSelect,
    LoadingOverlay,
    createStyles
} from '@mantine/core'

const CountryList = CountryRegionData.map((entry) => entry[0])

const useStyles = createStyles((theme) => ({

    container: {
        backgroundColor: theme.colors.gray[0],
        border: '1px solid '+theme.colors.gray[5],
        position: 'relative'
    },

    title: {
        color: theme.colors.blue
    }

}))

const SectionDivider = ({label}) => (
    <>
      <Text mt="1em" size="md" weight={700} color="blue"> {label} </Text>
      <Divider mb="1em" color="blue" />
    </>
)

const SuccessMessage = () => (

    <Container size="md" m="1em" p="1em" shadow="xs">

      <Title order={2} sx={(theme) => ({ color: theme.colors.blue })}>
        Application Submitted
      </Title>
      <Divider />

      <Text>

        <p>
        Thank you for applying to the ISR Summer School.
        </p>

        <p>
        Your application has been received. We will notify you
        once the final selection has been made.
        </p>

        <p>
        If you have any questions, please contact{" "}
        <a href="mailto:shikha.raizada@ucf.edu">shikha.raizada@ucf.edu</a>.
        </p>

       </Text>

       <Center>
         <Button component={Link} to="/">Done</Button>
       </Center>
     </Container>
)

const ErrorMessage = ({message}) => (

    <Container size="md" m="1em" p="1em">

      <Text size="xl" weight={700} color="red"><IconAlertCircle/> Submission Error</Text>
      <Divider />

      <Text>

        <p>
        Sorry, there was an error submitting your application. Please try again later.
        </p>

        <Divider label="Error Message" labelPosition="center"/>
        <p> {message} </p>
        <Divider />

        <p>
        If the problem persists, please email us at <a href="mailto:school@amisr.com">school@amisr.com</a>.
        </p>

       </Text>

       <Center>
         <Button component={Link} to="/apply">Continue</Button>
       </Center>
     </Container>
)

const Application = () => {

    const form = useForm({

        initialValues: {
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: '',
            university: '',
            city: '',
            state: 'California',
            country: 'United States',
            degree: 'bachelors',
            field: '',
            graduation: '',
            supervisor_name: '',
            supervisor_email: '',
            supervisor_phone: '',
            why_attend: '',
            experience: '',
            research_area: '',
            other: '',
            apptype: 'student',
            housing_pref: 'male' 
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email')
        }
    })

    const { classes } = useStyles()
    const mutation = useMutation(apiService.submitApplication)

    const regionData = CountryRegionData.find(entry => entry[0] === form.values.country)[2]
    const regionsList = regionData.split('|').map((entry) => entry.split('~')[0])

    const isStudent = form.values.apptype === 'student'

    const changeCountry = useCallback(
        (country) => {  
            form.setFieldValue('country',country)
            form.setFieldValue('state',regionsList[0])
        },
        [form,regionsList]
    )

    if (mutation.isSuccess) {
        return <SuccessMessage /> 
    }

    if (mutation.isError) {
        return <ErrorMessage message={mutation.error.message} /> 
    }

    if (0) {
        return ( 
            <Container size="sm" my="1em" p="1em" className={classes.container}>
                <Text>The application deadline has passed.</Text> 
            </Container>
        )
    }

    return (
        <Container size="sm" my="1em" p="1em" className={classes.container}>
            
          <LoadingOverlay visible={mutation.isLoading} /> 
            
          <form onSubmit={form.onSubmit(mutation.mutateAsync)}>

            <Title order={2} align="center" className={classes.title}> 
                ISR Summer School Application  
            </Title>

            <Group align="center" mt="1em" >
                <Text size="sm" pt={5} >Are you a student?</Text>
                <Radio.Group size="sm" 
                    {...form.getInputProps('apptype')}> 
                    <Radio value="student" label="Yes" />
                    <Radio value="nonstudent" label="No" />
                </Radio.Group>
            </Group>

            <SectionDivider label="Contact Information" />

            <Group grow mb="0.5em">
                <TextInput
                    required
                    label="First name"
                    {...form.getInputProps('firstname')}
                />

                <TextInput
                    required
                    label="Last name"
                    {...form.getInputProps('lastname')}
                />
            </Group>

            <Group grow mb="0.5em">
                <TextInput
                    required
                    label="Email"
                    {...form.getInputProps('email')}
                />

                <TextInput
                    label="Phone number"
                    {...form.getInputProps('phonenumber')}
                />
 
            </Group>

            { isStudent ?  
                <Group align="center" mt="1em" >
                    <Text size="sm" pt={5} >For housing purposes, please indicate:</Text>
                    <Radio.Group size="sm" {...form.getInputProps('housing_pref')}> 
                      <Radio value="male" label="Male" />
                      <Radio value="female" label="Female" />
                      <Radio value="decline" label="Decline" />
                    </Radio.Group>
                </Group>
                : null 
            }
 
            { isStudent ?  <SectionDivider label="School" /> : null }

            <Group grow mb="0.5em">

                <TextInput
                    required
                    label="University / Institution"
                    {...form.getInputProps('university')}
                />

                { isStudent ? 

                    <TextInput
                        label="Field of study"
                        {...form.getInputProps('field')}
                    />
                    : 
                    null 
                }

            </Group>

            <Group grow mb="0.5em">

                <TextInput
                    label="City"
                    {...form.getInputProps('city')}
                />
 
                <NativeSelect
                    label="State/Province"
                    value={form.values.state}
                    data={regionsList}
                    {...form.getInputProps('state')}
                />

                <NativeSelect
                    label="Country"
                    data={CountryList}
                    value={form.values.country}
                    onChange={changeCountry}
                    {...form.getInputProps('country')}
                />
    
            </Group>

            { isStudent ? 

                <>
        
                <SectionDivider label="Degree" />

                <Group align="stretch">

                    <Radio.Group label="Degree program" size="sm" style={{flexGrow: 1}} 
                        {...form.getInputProps('degree')}
                        >

                        <Radio value="bachelors" label="Bachelor's"  />
                        <Radio value="masters" label="Master's"    />
                        <Radio value="phd" label="Ph.D."      />
                    </Radio.Group>

                    <TextInput
                        required
                        label="Expected graduation date"
                        {...form.getInputProps('graduation')}
                    />

                </Group>
        
                <TextInput
                    label="Supervisor name"
                    {...form.getInputProps('supervisor_name')}
                    mb="0.5em"
                />
                
                <Group grow>
         
                    <TextInput
                        label="Supervisor email"
                        {...form.getInputProps('supervisor_email')}
                    />

                    <TextInput
                        label="Supervisor phone number"
                        {...form.getInputProps('supervisor_phone')}
                    />
                </Group>

                </>
                : 
                null

            }

            <SectionDivider label="Experience" />

            <Textarea
                required
                label="Why would you like to attend the school?"
                autosize
                minRows={2}
                mb="0.5em"
                {...form.getInputProps('why_attend')}
            />

            <Textarea
                required
                label="What relevant educational and work experience do you have?"
                autosize
                minRows={2}
                mb="0.5em"
                {...form.getInputProps('experience')}
            />

            <Textarea
                required
                label="What is your intended dissertation research area?"
                autosize
                minRows={2}
                mb="0.5em"
                {...form.getInputProps('research_area')}
            />


            <Textarea
                label="Additional comments"
                autosize
                minRows={2}
                {...form.getInputProps('other')}
            />

            <Center mt="1em">
                <Button type="submit">Submit</Button>
            </Center>
            
          </form>

        </Container>
    )
}

export { Application } 
