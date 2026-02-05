import React from 'react' 
import { Link } from 'react-router-dom'
import { 
    Button, 
    Container, 
    Flex,
    Group,
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

    <Stack align="center" my="2rem">
      <Title order={2} c="blue.7" ta="center">
        2026 Incoherent Scatter Radar Summer School
      </Title>
      <Title order={3} c="blue.7">
        July 10 & July 20 - 25, 2026
      </Title>
      { accepting ? (
        <Group mt="1rem" justify="center" gap="xl">
          <Button component={Link} to="/apply" size="md" leftSection={<IconEdit />} >
            Apply now!
          </Button>
          <Text color="blue.8" ta="center" size="md" fw={700}> 
            The application deadline is <br/> March 19, 2026
           </Text>
        </Group>
        ) : null 
      }
    </Stack>
)

const Logos = ({images}) => (

    <Flex justify="center" gap={{ base: "xs", sm: "md"}} wrap="wrap" mt="2em"> 
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
        "Craig Heinselman"
    ]

    const pastdetails = [
        {
            label: "2025 ISR summer School (Fairbanks)",
            url: "https://wikis.mit.edu/confluence/display/ASGScience/2025+ISR+School"
        },
        {
            label: "2024 ISR summer School (Boston)",
            url: "https://wikis.mit.edu/confluence/display/ASGScience/2024+ISR+School"
        },
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
            The NSF-funded 2026 Incoherent Scatter Radar (ISR) Summer
            School will be held in Boston, MA. It includes a mandatory
            one-day virtual session (via Zoom) on July 10, 2026 followed
            by the in-person school at Boston University July 20-25,
            2026. The summer school’s goal is to train students in the
            theory and concepts of incoherent scatter radar and allows for
            hands-on opportunities to design and run experiments at ISR
            facilities. This year’s school will focus on mid-latitude
            /subauroral observations using the Millstone Hill ISR,
            operated by the MIT Haystack Observatory as part of the 
            the NSF-supported Millstone Hill Geospace Facility. ISRs are
            the most powerful ground-based tools for ionospheric remote
            sensing with high temporal and altitudinal resolution. ISR
            data sets include measurements of electron density, electron
            and ion temperatures, and plasma drifts, with the possibility
            of further derived parameters.
          </Text>

          <Text mt="1rem">
            The main objectives of the school are:
          </Text>
          <List mt="1rem" mx="2rem">
              <List.Item>Provide a "hands-on" learning experience in small groups</List.Item>
              <List.Item>Promote team-work and collaborative skills</List.Item>
              <List.Item>Encourage substantial interactions with instructors</List.Item>
              <List.Item>Give students the training necessary to begin incorporating ISR into their research</List.Item>
          </List>
           
          <Text mt="1rem">
            At this school, students will learn:
          </Text>
          <List mt="1rem" mx="2rem">
            <List.Item>How the ionosphere forms and why it is important</List.Item>
            <List.Item>The physical principles of incoherent scatter radar</List.Item>
            <List.Item>The mathematical principles of radar signal processing</List.Item>
            <List.Item>How to design and run an ISR experiment</List.Item>
            <List.Item>How to extract and visualize data from the Madrigal database</List.Item>
            <List.Item>How ISR complements and adds insight to other observations</List.Item>
          </List>

          <Text mt="1rem">
            We encourage graduate and advanced undergraduate students
            to apply for the school. Those candidates who are selected
            for the 2026 ISR summer school and are enrolled at
            U.S. universities/institutions will receive travel support
            and accommodation to attend this event. Self-funded students
            from institutions outside the United States may also apply;
            however, they will not receive travel support.
          </Text>

          <Text mt="1rem">
            The 2026 ISR summer school is funded by the US National
            Science Foundation (NSF) through the Geosciences Directorate
            and is organized by the University of Central Florida.
          </Text>

          <Text mt="1rem" fs="italic" fw={700}>
            The deadline for application submission
            { accepting ? " is " : " was " } March 19, 2026.
          </Text>

          <Text mt="1rem"> 
            Notice of acceptance will be sent to participants by 
            March 27, 2026.
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
