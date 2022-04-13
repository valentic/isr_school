import React from 'react'
import { Link } from 'react-router-dom'
import { Divider, Responsive, Grid, Button, Container } from 'semantic-ui-react'

import image_a from './top3-a.png'
import image_b from './top3-b.png'
import image_c from './top3-c.png'
import image_d from './top3-d.png'

import logo_nsf from './logo-nsf.png'
import logo_sri from './logo-sri.png'
import logo_mit from './logo-mit.png'
import logo_bu  from './logo-bu.png'
import logo_ucf from './logo-ucf.png'

import './index.css'

const HomePage = () => {
    
    const logo_style = {
        height: '70px',
        padding: '5px'
    }

    return (
        <Container textAlign='justified' text>

            <Responsive minWidth={Responsive.onlyTablet.minWidth}>
                <div className='imagebox'>
                    <img src={image_a} alt="Classroom"/>
                    <img src={image_b} alt="Dish"/>
                    <img src={image_c} alt="Peru"/>
                    <img src={image_d} alt="Students"/>
                </div>
            </Responsive>
        
            <Grid verticalAlign="middle" stackable> 
              <Grid.Row>
                <Grid.Column only="tablet computer" width={9}>
                  <div className="titlebox">
                    2022 Incoherent<br/>
                    Scatter Radar<br/>
                    Virtual Summer School<br/>
                    July 18 - 23, 2022
                  </div>
                </Grid.Column>
                <Grid.Column only='mobile' textAlign='center' width={9}>
                  <div className="titlebox-mobile">
                    2022 Incoherent<br/>
                    Scatter Radar<br/> 
                    Virtual Summer School<br/>
                    July 18 - 23, 2022
                  </div>
                </Grid.Column>
                <Grid.Column width={7} textAlign="center"> 
                  { 0 ?
                  <Button.Group vertical> 
                  <Button
                    as={Link}
                    to='/apply'
                    color='blue'
                    size='big'
                    icon="arrow circle right"
                    content="Apply - Student"
                    labelPosition='right'
                  /><a href="https://docs.google.com/forms/d/e/1FAIpQLScJIt6WLyECC2w4wnJPUCJ76d_rmJxgFAG8EjOEg069DEUDig/viewform?usp=sf_link">
                  <Button                    
                    color='black'
                    size='big'
                    icon="arrow circle right"
                    content="Apply - Nonstudent"
                    labelPosition='right'
                  /></a>
                  </Button.Group> : null } 
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Responsive {...Responsive.onlyMobile}> 
                <Divider hidden />
            </Responsive>

            <p>
            The 2022 Incoherent Scatter (IS) Radar Summer School will
            be held virtually on July 18-23. The school provides
            students with experience in designing and running experiments
            at IS Radar facilities. IS Radars are large facilities used
            to study the ionosphere and provide measurements of altitude
            profiles of electron density, electron and ion temperatures,
            and ion plasma drift.  There are several active IS Radars
            located in equatorial, mid-latitude, and high-latitude regions.
            </p>

            <p>
            During this summer school, students will have the opportunity
            to run experiments with the Poker Flat (PFISR) radar located
            in mid-Alaska. The school will be structured to provide both
            lectures and experience in experiment design and analysis. The
            lectures will include an introduction to general radar concepts,
            phased array antennas, the theory of incoherent scatter, IS
            radar analysis techniques, and community databases. The
            experiment exercise will involve working closely with IS radar
            facility staff in the topic areas of proposal design, experiment
            execution, and data analysis. All students will have the
            opportunity to work one-on-one with experienced scientists from
            multiple institutions.
            </p>

            <p>
            The IS Radar summer school is suitable for graduate and advanced
            undergraduate students and attendance is limited. The virtual
            nature of the 2022 school will provide limited opportunities for
            non-student participation depending on interest and resources,
            for those who are interested in learning more about the IS radar
            technique and applications.  These will be assessed on a
            case-by-case basis, and interested people should directly contact
            Shikha Raizada at the address below.
            </p>

            <p>
            The 2022 IS Radar summer school is funded by the US National
            Science Foundation (NSF) through its Geospace Facilities Program
            within the Geosciences Directorate, and is organized by the
            University of Central Florida. For more information about
            the school, please contact <a href="mailto:Shikha.Raizada@ucf.edu">school@amisr.com</a>.
            </p>

            <p>The deadline for application submission is 5 March 2022.</p>

            <p>Notice of acceptance will be sent to participants by 26 March 2022.</p>

            <Container textAlign="center">
                <img style={logo_style} src={logo_nsf} alt="NSF"/>
                <img style={logo_style} src={logo_sri} alt="SRI"/>
                <img style={logo_style} src={logo_mit} alt="MIT"/>
                <img style={logo_style} src={logo_bu} alt="BU"/>
                <img style={logo_style} src={logo_ucf} alt="UCF"/>
            </Container>


        </Container>
    )
}

export { HomePage }
