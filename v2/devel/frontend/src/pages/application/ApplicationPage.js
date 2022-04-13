import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Container, Confirm, Header, Button, Form, } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'

import './index.css'

const ApplicationForm = () => {

    const form = useForm()
    const submit = useStoreActions(actions => actions.application.submit)

    const onChange = async (e,{name,value}) => {
        form.setValue(name,value)
    }

    const onSubmit = async (data) => {
        await form.triggerValidation()
        try {
        await submit(data)
        } catch (err) {
            console.log(err)
        }
    }

    const formatError = error => {
        if (error) {
            return error.message ? { content: error.message } : true
        } else {
            return false
        }
    }

    const emailPattern = {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: "invalid email address"
    }

    useEffect(() => {
        form.register({name: 'firstname'}, { required: true, maxLength: 50 })
        form.register({name: 'lastname'}, { required: true, maxLength: 50 })
        form.register({name: 'email'}, { required: true, pattern: emailPattern, maxLength: 50}) 
        form.register({name: 'phonenumber'}, { maxLength: 50 })
        form.register({name: 'university'}, { required: true, maxLength: 50 })
        form.register({name: 'city'}, { maxLength: 50 })
        form.register({name: 'state'}, { maxLength: 50 })
        form.register({name: 'country'}, { maxLength: 50 })
        form.register({name: 'field'}, { maxLength: 100 })
        form.register({name: 'degree_id'})
        form.register({name: 'graduation'}, { maxLength: 100 },{ required: true})
        form.register({name: 'housing_pref_id'},{ required: true})
        form.register({name: 'supervisor_name'}, { maxLength: 50 })
        form.register({name: 'supervisor_email'}, { maxLength: 50}) 
        form.register({name: 'supervisor_phone'}, { maxLength: 50 })
        form.register({name: 'why_attend'},{ required: true })
        form.register({name: 'experience'},{ required: true})
        form.register({name: 'research_area'},{ required: true})
        form.register({name: 'other'})

    },[form,emailPattern])

    const degreeOptions = [
        { key: 'b', text: "Bachelor's degree", value: '1'},
        { key: 'm', text: "Master's degree", value: '2'},
        { key: 'p', text: "Ph.D.", value: '3'}
    ]

    const housingOptions = [
        { key: 'm', text: 'Male', value: '1'},
        { key: 'f', text: 'Female', value: '2'},
        { key: 'o', text: 'Decline to state', value: '3'},
    ]

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>

        <Form.Group widths="equal">
        <Form.Input
            name='firstname'
            label='First Name'
            required
            onChange={onChange}
            error={formatError(form.errors.name)}
        />

        <Form.Input
            name='lastname'
            label='Last Name'
            required
            onChange={onChange}
            error={formatError(form.errors.name)}
        />
        </Form.Group>

        <Form.Group>
        <Form.Input
            name='email'
            label='Email Address'
            required
            onChange={onChange}
            error={formatError(form.errors.email)}
        />

        <Form.Input
            name='phonenumber'
            label='Phone Number'
            onChange={onChange}
            error={formatError(form.errors.phonenumber)}
        />

        <Form.Select
            name='housing_pref_id'
            label='For Housing Purposes, please indicate'
            options={housingOptions}
            required
            onChange={onChange}
            error={formatError(form.errors.housing_pref_id)}
        />    

        </Form.Group>

        <Form.Input
            name='university'
            label='University'
            required
            onChange={onChange}
            error={formatError(form.errors.university)}
        />

        <Form.Group widths="equal">
        <Form.Input
            name='city'
            label='City'
            onChange={onChange}
            error={formatError(form.errors.city)}
        />

        <Form.Input
            name='state'
            label='State/Province'
            onChange={onChange}
            error={formatError(form.errors.state)}
        />

        <Form.Input
            name='country'
            label='Country'
            onChange={onChange}
            error={formatError(form.errors.country)}
        />
        </Form.Group>

        <Form.Group widths="equal">
        <Form.Select
            name='degree_id'
            label='Current Degree Program'
            fluid
            defaultValue='1'
            options={degreeOptions}
            onChange={onChange}
            error={formatError(form.errors.degree_id)}
        />    

        <Form.Input
            name='field'
            label='Current Degree Field of Study'
            onChange={onChange}
            error={formatError(form.errors.field)}
        />

        <Form.Input
            name='graduation'
            label='Expected Graduation Date'
            required
            onChange={onChange}
            error={formatError(form.errors.graduation)}
        />
        </Form.Group>

        <Form.Group widths='equal'>
        <Form.Input
            name='supervisor_name'
            label='Supervisor Name'
            onChange={onChange}
            error={formatError(form.errors.supervisor_name)}
        />

        <Form.Input
            name='supervisor_email'
            label='Supervisor Email'
            onChange={onChange}
            error={formatError(form.errors.supervisor_email)}
        />

        <Form.Input
            name='supervisor_phone'
            label='Supervisor Phone Number'
            onChange={onChange}
            error={formatError(form.errors.supervisor_phone)}
        />
        </Form.Group>

        <Form.TextArea
            name='why_attend'
            label='Why would you like to attend the school?'
            required
            onChange={onChange}
            error={formatError(form.errors.why_attend)}
        />

        <Form.TextArea
            name='experience'
            label='What relevant educational and work experience do you have?'
            required
            onChange={onChange}
            error={formatError(form.errors.experience)}
        />

        <Form.TextArea
            name='research_area'
            label='What is your intended dissertation research area?'
            required
            onChange={onChange}
            error={formatError(form.errors.research_area)}
        />

        <Form.TextArea
            name='other'
            label='Other information you would like to share.'
            onChange={onChange}
            error={formatError(form.errors.other)}
        />

        <Button type="submit" color="blue">Submit</Button> 
      </Form>
    )
}

const RequestPage = () => (

    <Container text className="application">
        <Header as='h1' color='blue' dividing >Summer School Application</Header>
        <ApplicationForm />
    </Container>
)

const SuccessPage = () => {
    const setApplicationState = useStoreActions(actions => actions.application.setApplicationState)

    return (
      <Confirm
        open={true}
        content='Your application has been received.' 
        onConfirm={() => setApplicationState(undefined)}
        onCancel={() => setApplicationState(undefined)}
      />
    )
}

const FailurePage = () => {
    const setApplicationState = useStoreActions(actions => actions.application.setApplicationState)

    return (
      <Confirm
        open={true}
        content='Sorry, there has been an error'
        onConfirm={() => setApplicationState(undefined)}
        onCancel={() => setApplicationState(undefined)}
      />
    )
}

const ApplicationPage = () => {
    
    const app = useStoreState(store => store.application)

    if (typeof app.applicationState === 'undefined') {
        return <RequestPage/>
    } else if (app.applicationState) {
        return <SuccessPage/>
    } else { 
        return <FailurePage/>
    }
}

export { ApplicationPage }

