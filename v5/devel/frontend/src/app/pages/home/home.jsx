import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Button, 
    Container, 
    Flex,
    Grid, 
    Image,
    List,
    SimpleGrid,
    Stack,
    Text,
    Title
    } from '@mantine/core'

import image_a from './top3-a.png'
import image_b from './top3-b.png'
import image_c from './top3-c.png'
import image_d from './top3-d.png'

import logo_nsf from './logo-nsf.png'
import logo_sri from './logo-sri.png'
import logo_mit from './logo-mit.png'
import logo_bu  from './logo-bu.png'
import logo_ucf from './logo-ucf.png'
import logo_uaf from './logo-uaf.png'

import { IconEdit } from '@tabler/icons-react'

const BannerImages = ({images}) => (

    <SimpleGrid cols={images.length} spacing={10}>
      { images.map((image) => (
          <Image 
            key={image.alt} 
            src={image.src} 
            alt={image.alt} 
            fit="cover"
            w="100%"
            h="120px"
            radius="sm"
            style={{ border: '1px solid var(--mantine-color-gray-4)' }}
          />
        ))
      }
    </SimpleGrid>
)

const BannerTitle = ({accepting}) => (

    <Grid justify="space-between" align="center" m="2rem">
      <Grid.Col span="auto">
        <Title order={2} c="blue.7">
          2024 Incoherent Scatter Radar<br/>
          Summer School<br/>
          July 22 - 27, 2024
        </Title>
      </Grid.Col>
      <Grid.Col span={3}> 
        { accepting ? (
          <Stack>
            <Button component={Link} to="/apply" size="md" leftSection={<IconEdit />} >
              Apply now!
            </Button>
            <Text color="blue.8" ta="center" size="md" fw={700}> 
              The deadline is <br/> March 21, 2024
            </Text>
          </Stack>) : null 
        }
      </Grid.Col>
    </Grid>
)

const Logos = ({images}) => (

    <Flex justify="center" gap="md" mt="2rem">
      { images.map((image) => (
          <Image 
            key={image.alt} 
            src={image.src} 
            alt={image.alt} 
            fit="contain"
            w="auto"
            h="50px"
          />
        ))
      }
    </Flex>
)

const Organizers = ({names}) => (

  <>
    <Text mt="1rem"> 
      ISR summer school organizing committee: 
    </Text>
    <SimpleGrid cols={3} verticalSpacing="0" ml="2rem" mt="1rem">
      { names.map(name => <Text key={name}>{name}</Text>) }
    </SimpleGrid>
  </>

)


const Home = () => {

    const imageList = [
        { src: image_a, alt: 'Classroom' },
        { src: image_b, alt: 'Dish' },
        { src: image_c, alt: 'Peru' },
        { src: image_d, alt: 'Students' }
        ]

    const logoList = [
        { src: logo_nsf, alt: "NSF"    },
        { src: logo_sri, alt: "SRI"    },
        { src: logo_mit, alt: "MIT"    },
        { src: logo_bu,  alt: "BU"     },
        { src: logo_ucf, alt: "UCF"    },
        { src: logo_uaf, alt: "UAF"    }
        ]

    const organizers = [
        "Andrey Krywonos",
        "Phil Erickson",
        "Roger Varney",
        "Asti Bhatt",
        "Pablo Reyes",
        "Josh Semeter",
        "Craig Heinselman",
        "Anthea Coster",
        "Bill Rideout"
    ]

    const pastdetails = [
        {
            label: "2023 ISR summer School (Fairbanks)",
            url: "https://wikis.mit.edu/confluence/display/ASGScience/2023+ISR+School"
        },
        {
            label: "2022 ISR summer School (Boston)",
            url: "https://tinyurl.com/2022ISR",
        },
        {
            label: "2021 ISR summer School (Virtual)",
            url: "https://wikis.mit.edu/confluence/display/ASGScience/ISR+School+2021",
        }
    ]

    const accepting = import.meta.env.VITE_ACCEPTING === 'true'

    return (
        <Container size="sm" py="md">

          <BannerImages images={imageList} />

          <BannerTitle accepting={accepting} />

          <Text>
            The NSF funded 2024 Incoherent Scatter Radar (ISR) Summer
            School is planned to be held in-person at Boston University
            between July 22-27, 2024. The summer school’s goal is to
            train students in the theory and concepts of incoherent
            scatter radar and allows for hands-on opportunities to
            design and run experiments at ISR facilities. This year’s
            school will focus on mid-latitude/subauroral observations
            using the Millstone Hill ISR, operated by MIT Haystack
            Observatory as a part of the NSF-supported Millstone Hill
            Geospace Facility. ISRs are the most powerful ground-based
            tools for ionospheric remote sensing with high temporal and
            altitudinal resolution. ISR data sets include measurements
            of electron density, electron and ion temperatures, and
            plasma drifts, with the possibility of further derived
            parameters.  
          </Text>

          <Text mt="1rem">
            The main objectives of the school are:
          </Text>
          <List type="ordered" withPadding mt="1rem">
              <List.Item>provide a "hands-on" learning experience in small groups, </List.Item>
              <List.Item>promote team-work and collaborative skills, </List.Item>
              <List.Item>encourage substantial interactions with instructors, and </List.Item>
              <List.Item>foster an inclusive environment. </List.Item>
          </List>
           
          <Text mt="1rem">
            At this school, students will learn:
          </Text>
          <List withPadding mt="1rem">
            <List.Item>How the ionosphere forms and why it is important. </List.Item>
            <List.Item>The physical principles of incoherent scatter radar. </List.Item>
            <List.Item>The mathematical principles of radar signal processing. </List.Item>
            <List.Item>How to design and run an ISR experiment. </List.Item>
            <List.Item>How to extract and visualize data from the Madrigal database.</List.Item>
            <List.Item>How ISR complements and adds insight to other observations.</List.Item>
          </List>

          <Text mt="1rem">
            We encourage graduate/advanced undergraduate students to
            apply for the school. Those candidates who are selected
            for the 2024 ISR summer school and are enrolled at
            U.S. Universities/institutions will receive travel support and
            accommodation to attend this event. Self-funded students from
            institutions in other countries are welcome to apply as well.
          </Text>

          <Text mt="1rem">
            The 2024 ISR summer school is funded by the US National
            Science Foundation (NSF) through its Geospace Facilities
            Program within the Geosciences Directorate and is organized
            by the University of Central Florida.
          </Text>

          <Text mt="1rem" fs="italic" fw={700}>
            The deadline for application submission
            { accepting ? " is " : " was " } March 21, 2024.
          </Text>

          <Text mt="1rem"> 
            Notice of acceptance will be sent to participants by March 29, 2024.
          </Text> 

          <Text mt="1rem"> 
            For more information about the school, please contact{" "}
            <a href="mailto:krywonos@ucf.edu">Andrey Krywonos</a>.
          </Text> 

          <Organizers names={organizers} /> 

          <Text mt="1rem">
            Details from the previous summer schools can be found at:
          </Text>

          <List mt="1rem" withPadding>
            { pastdetails.map(info => (
              <List.Item key={info.label}>
                <a href={info.url}>{info.label}</a>
              </List.Item>
            ))
            }
          </List>

          <Logos images={logoList} />

        </Container>
    )
}

export { Home }
