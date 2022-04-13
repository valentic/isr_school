import React, { useEffect } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { Link, Redirect } from 'react-router-dom'
import { Confirm, Container, Header, Button, Divider, Form, Segment } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
import { AuthPage } from './AuthPage'

const LoginForm = () => {

    const form = useForm()
    const login = useStoreActions(actions => actions.auth.login)

    const onChange = async (e,{name,value}) => {
        form.setValue(name,value)
    }

    const onSubmit = async (data) => {
        await form.triggerValidation()
        await login(data)
    }

    const onError = error => {
        if (error) {
            return error.message ? { content: error.message } : true
        } else {
            return false
        }
    }

    useEffect(() => {
        form.register({name: 'username'},{
            required: true, 
            maxLength: 20
            })

        form.register({name: 'password'},{
            required: true,
            maxLength: 20
            })
    },[form])

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>

        <Form.Input
            name='username'
            label='Username'
            placeholder='username'
            icon='user'
            iconPosition='left'
            onChange={onChange}
            error={onError(form.errors.username)}
        />

        <Form.Input
            name='password'
            label='Password'
            placeholder='password'
            icon='lock'
            iconPosition='left'
            type='password'
            onChange={onChange}
            error={onError(form.errors.password)}
        />

        <Button type="submit" color="blue">Log in</Button> 
      </Form>
    )
}

const LoginFooter = () => (
  <Container>
    <div>
      Forgot your&nbsp;
      <Link to="/forgot/username">username</Link>
      &nbsp;or&nbsp;
      <Link to="/forgot/password">password</Link>
      ?
    </div>
    <br/>
    <div>
      Need an account?&nbsp;&nbsp;
      <Link to="/signup">Sign up here.</Link>
    </div>
  </Container>
)

const RequestPage = () => ( 
    <AuthPage>
      <Segment placeholder > 
        <Header as='h2' color='blue'>
          Log in to your account
        </Header>
        <LoginForm />
        <Divider hidden />
      </Segment>
    </AuthPage>
)

const ResultPage = ({content,history}) => {
    const setLoginState = useStoreActions(actions => actions.auth.setLoginState)

    const clear = () => {
        setLoginState(undefined)
        history.push('/')
    }

    return (
        <Confirm
            open={true}
            content={content}
            onConfirm={clear}
            onCancel={clear}
        />
    )
}

const LoginPage = props => {

    const auth = useStoreState(store => store.auth)
    const setLoginState = useStoreActions(actions => actions.auth.setLoginState)
    const { from } = props.location.state || { from: { pathname: "/" }}

    if (auth.user) {
        return <Redirect to={from} />
    } 

    if (typeof auth.loginState === 'undefined') {
        return <RequestPage />
    } else if (auth.loginState) { 
        setLoginState(undefined)
        return <RequestPage />
    } else { 
        return <ResultPage 
                history={props.history} 
                content='Log in failed'/>
    }
}

export { LoginPage }

