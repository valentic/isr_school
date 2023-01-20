import React from 'react'
import { useParams } from 'react-router-dom'
import { NavButtons } from './NavButtons'
import { ManagerButtons } from './ManagerButtons'
import { useAuth } from 'app'
import { useApplicationsActive } from './ApplicationQuery'
import { useApplicationsTrash } from './ApplicationQuery'
import { IconCircleCheck } from '@tabler/icons'

import {
    Container,
    Title,
    LoadingOverlay,
    Group,
    Text,
    Paper,
    Anchor,
    createStyles
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
    
    icon: {
        color: theme.colors.green[7]
    }
}))

const Mailto = ({email}) => ( 
  <Anchor color="dimmed" size="sm" href={`mailto:${email}`}>
    {email}
  </Anchor>
)

const PhoneNumber = ({phone}) => (
  <Text size="sm" color="dimmed">{phone}</Text>
)

const StudentDetails = ({application}) => {

    return (
      <Group align="flex-start" position="center" grow mt="1em" >
        <div>
          <Text size="md" weight={500} underline>
            Supervisor 
          </Text>
          <Text size="md" weight={500}>
            {application.supervisor_name}
          </Text>
          <Mailto email={application.supervisor_email} />
          <PhoneNumber phone={application.supervisor_phone} />
        </div>

        <div>
          <Text size="md" weight={500} underline>
            Degree Program
          </Text>
          <Text size="sm" color="dimmed">
            {application.degree}
          </Text>
          <Text size="sm" color="dimmed">
            { !!application.field ? application.field : "--" }
          </Text>
          <Text size="sm" color="dimmed">
            Expected {application.graduation}
          </Text>
        </div>
        <div>
          <Text size="md" weight={500} underline> Contact Info</Text>
          <Mailto email={application.email} />
          <PhoneNumber phone={application.phonenumber} />

          <Text size="sm" color="dimmed">
            Housing pref: {application.housing_pref } 
          </Text>

        </div>
      </Group>
    )

}

const NonStudentDetails = ({application}) => {

    return (
      <Group align="flex-start" position="center" grow mt="1em" >
        <div>
          <Text size="md" weight={500} underline color="dimmed">
            Supervisor 
          </Text>
          <Text size="md" weight={500}>
          </Text>
        </div>

        <div>
          <Text size="md" weight={500} underline color="dimmed">
            Degree Program
          </Text>
          <Text size="sm" color="dimmed">
            &nbsp; 
          </Text>
          <Text size="sm" color="dimmed">
            Not a student 
          </Text>
          <Text size="sm" color="dimmed">
            &nbsp; 
          </Text>

        </div>
        <div>
          <Text size="md" weight={500} underline> Contact Info</Text>
          <Mailto email={application.email} />
          <PhoneNumber phone={application.phonenumber} />
        </div>
      </Group>
    )

}

const ContactDetails = ({application}) => {

    const { classes } = useStyles()
    
    return (
      <Paper radius="md" p="lg" withBorder align="center">
        <Group align="flex-start" position="center" grow >
          <Group position="center" mt={2} spacing="xs">
            { application.approved ? 
               <>
                <IconCircleCheck className={classes.icon}/>
                <Text color="green" weight="bold" size="lg">Approved</Text>
               </>
                : null }
          </Group>
          <div>
            <Text size="xl" weight={700} > 
              {application.firstname} {application.lastname}       
            </Text>
            <Text size="sm">
              {application.university}
            </Text>
            <Text size="xs">
              {application.city}, {application.state}, {application.country}
            </Text>
          </div>
          <div></div>
        </Group>

        { application.apptype === 'Student' ? 
            <StudentDetails application={application} />
            :
            <NonStudentDetails application={application} />
        }

        <Text mt="1em" color="dimmed" size="sm">Summited on {application.created_on}</Text>

      </Paper>
    )
}

const TextBox = ({title, children}) => (
    <div>
      <Text size="lg" weight="bold" underline my="1em" >{title}</Text>
      <Text size="md">
        { children } 
      </Text>
    </div>
)
              
const ApplicationDetailView = ({queryFunc, label, managerButtons}) => {

    const params = useParams()
    const auth = useAuth()

    const query = queryFunc() 

    if (query.isError) {
        return (
            <Container>
                <Title>Error</Title>
                <div>{query.error}</div>
            </Container>
        )
    }

    if (query.isLoading) {  
        return (
            <Container>
                <div>Loading</div>
            </Container>
        )
    }

    const applications = query.data
    const index = applications.findIndex(({id}) => id === parseInt(params.id))

    if (index === -1) {
        return (
            <Container>
                <Title>Error</Title>
                <div>Unknown application Id</div>
            </Container>
        )
    }

    const application = applications[index]

    const prevId = applications[Math.max(0, index-1)].id
    const nextId = applications[Math.min(applications.length-1, index+1)].id

    return (
        <Container> 
          
          <LoadingOverlay visible={query.isLoading} />
            
          <NavButtons prev={prevId} next={nextId} cur={application.id} label={label} />

          { auth.hasRole('admin','manager') ?  managerButtons(application) : null } 

          <div>
            <div>
              <ContactDetails application={application} />
            </div>
            <div>
              <TextBox title = "Why would you like to attend the school?">
                { application.why_attend }
              </TextBox>

              <TextBox title = "What relevant educational and work experience do you have?">
                { application.experience }
              </TextBox>

              <TextBox title = "What is your intended dissertation research area?">
                { application.research_area}
              </TextBox>

              <TextBox title = "Additional comments">
                { application.other}
              </TextBox>

            </div>
          </div>

        </Container>
    )
}

const Active = () => 
    <ApplicationDetailView 
        queryFunc={useApplicationsActive} 
        label="Applications" 
        managerButtons={ManagerButtons.Active}
    />

const Trash = () => 
    <ApplicationDetailView 
        queryFunc={useApplicationsTrash} 
        label="Trash" 
        managerButtons={ManagerButtons.Trash}
    />

const ApplicationDetail = { Active, Trash }

export { ApplicationDetail }

