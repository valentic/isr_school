import React from 'react'
import { Link } from 'react-router-dom'
import { 
    Box,
    Container, 
    Grid, 
    Button, 
    Divider, 
    Center,
    createStyles,
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

import { Edit } from 'tabler-icons-react'

const useStyles = createStyles((theme) => ({
    
    imagebox: {
        marginTop: '1em',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: '140px',
        gridGap: '10px',

        '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            border: '1px solid lightgray'
        },

        [theme.fn.smallerThan('sm')]: {
            display: 'none'
        }

    },

    titlebox: { 
        fontSize: '30px',
        fontWeight: 'bold',
        padding: '1em 0',
        color: theme.colors.blue,

        [theme.fn.smallerThan('sm')]: {
            fontSize: '18px',
        }
    },

    logo: { 
        height: '70px',
        padding: '5px',

        [theme.fn.smallerThan('sm')]: {
            display: 'none'
        }
    }

}))
        

const Home = () => {

    const { classes } = useStyles() 
    
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
        { src: logo_ucf, alt: "UCF"    }
        ]

    return (
        <Container>

          <Box className={classes.imagebox}>
            { imageList.map((image) => (
                <img key={image.alt} src={image.src} alt={image.alt} />
            ))}
          </Box>

            <Grid justify="center" align="center" my="1em">
              <Grid.Col sm={8}>
                <div className={classes.titlebox}>
                  2022 Incoherent Scatter Radar<br/>
                  Summer School<br/>
                  July 17 - 22, 2022
                </div>
              </Grid.Col>
              <Grid.Col sm={4}>
                <Button component={Link} to="/apply" size="md" leftIcon={<Edit />}>
                    Apply now!
                </Button>
              </Grid.Col>
            </Grid>

            <Divider />

            <p>
            The 2022 Incoherent Scatter Radar (ISR) Summer School will
            be held in-person only at Boston University between July
            17-22. The summer school’s goal is to train students
            in the theory and concepts of incoherent scatter radar,
            and allows for hands-on opportunities to design and run
            experiments at ISR facilities.  This year’s school will
            focus on mid-latitude / subauroral observations using the
            Millstone Hill ISR, operated by MIT Haystack Observatory as
            part of the NSF supported Millstone Hill Geospace Facility.
            ISRs are the most powerful ground based tools for ionospheric
            remote sensing with high temporal and altitudinal resolution.
            ISR data sets include measurements of electron density,
            electron and ion temperatures, and plasma drifts, with the
            possibility of further derived parameters.
            </p>

            <p>
            The overall aim of the ISR school is provide a "hands-on"
            learning experience in small groups, and includes substantial
            interactions with instructors.
            </p>

            <p>
            We encourage graduate/advanced undergraduate students to
            apply for the school. Those candidates who are selected
            for the 2022 ISR summer school and are enrolled at
            U.S. Universities/institutions will receive travel support
            and accommodation to attend this event. Self-funded students
            from other countries are welcome to apply as well.
            </p>

            <p>
            The 2022 ISR summer school is funded by the US National
            Science Foundation (NSF) through its Geospace Facilities
            Program within the Geosciences Directorate, and is organized
            by the University of Central Florida.
            </p>

            <p>
            <i><b>The deadline for application submission is April 20, 2022.</b></i>
            </p>

            <p>
            Notice of acceptance will be sent to participants by May 1, 2022.
            </p>

            <p>
            For more information about the school, please contact{" "}
            <a href="mailto:shikha.raizada@ucf.edu">shikha.raizada@ucf.edu</a>{" "}
            or{" "}
            <a href="mailto:shikha@naic.edu">shikha@naic.edu</a>.
            </p>

            <p>
            ISR summer school organizing committee: 
            </p>

            <Grid justify="center" align="center">
              <Grid.Col sm={3}>
                <ul>
                  <li>Shikha Raizada</li>
                  <li>Anthea Coster</li>
                </ul>
              </Grid.Col>
              <Grid.Col sm={3}>
                <ul>
                  <li>Asti Bhatt</li>
                  <li>Phil Erickson</li>
                </ul>
              </Grid.Col>
              <Grid.Col sm={3}>
                <ul>
                  <li>Pablo Reyes</li>
                  <li>Bill Rideout</li>
                </ul>
              </Grid.Col>
              <Grid.Col sm={3}>
                <ul>
                  <li>Josh Semeter</li>
                  <li>Roger Varney</li>
                </ul>
              </Grid.Col>
            </Grid>

            <p>
            Details of 2021 ISR summer School can be found{" "}
            <a href="https://wikis.mit.edu/confluence/display/ASGScience/ISR+School+2021">
            here
            </a>.
            </p>

            <Center my={20}> 
              { logoList.map((logo) => (
                <img key={logo.alt} src={logo.src} alt={logo.alt} className={classes.logo} />
               ))}
            </Center>

        </Container>
    )
}

export { Home }
