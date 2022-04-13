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
                    2020 ISR Summer School<br/>
                    Lowell, Massachusetts<br/>
                    July 27 - August 1, 2020
                  </div>
                </Grid.Column>
                <Grid.Column only='mobile' textAlign='center' width={9}>
                  <div className="titlebox-mobile">
                    2020 ISR Summer School<br/>
                    Lowell, Massachusetts<br/>
                    July 27 - August 1, 2020
                  </div>
                </Grid.Column>
                <Grid.Column width={7} textAlign="center"> 
                  { 0 ? 
                  <Button 
                    as={Link} 
                    to='/apply' 
                    color='blue' 
                    size='big'
                    icon="arrow circle right"
                    content="Apply Now"
                    labelPosition='right'
                  /> : null } 
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <Responsive {...Responsive.onlyMobile}> 
                <Divider hidden />
            </Responsive>

            <p>
            The 2020 ISR Summer School will be held July 27 - August 1
            in Lowell, Massachusetts. The school provides students with
            hands-on experience in designing and running experiments at
            incoherent scatter radar (ISR) facilities. During this summer
            school, students will have the opportunity to run experiments
            with the Millstone Hill incoherent scatter radar and use data
            from multiple ISR observatories, such as Poker Flat (PFISR),
            Arecibo, and Jicamarca. The school will be structured to
            provide presentations in the morning and hands-on experience
            in experiment design and analysis in the afternoons. The
            morning lectures will include an introduction to the theory of
            incoherent scatter, radar operations, ISR analysis techniques,
            and community databases. The afternoon exercises will involve
            working closely with ISR facility staff in the topic areas of
            proposal design, experiment execution, and data analysis. All
            students will have the opportunity to work one-on-one with
            experienced scientists from multiple institutions.  
            </p>

            <p>
            The ISR summer school is suitable for graduate and advanced
            undergraduate students and attendance is limited. For most
            students attending institutions within the United States,
            travel, housing and meals will be provided. For post-docs
            and students outside of the United States, funding will be
            considered on a case-by-case basis. All students who wish to
            apply for the ISR summer school must follow the application
            instructions at the summer school web site: 
            </p>

            <p>
            The 2020 ISR summer school is funded by the US National
            Science Foundation (NSF). The US portion of the school is
            sponsored by the NSF through its Geospace Facilities Program
            within the Geosciences Directorate and is organized by the
            University of Central Florida. For more information about
            the school, please contact <a href="mailto:elizabeth.kendall@ucf.edu">school@amisr.com</a>.
            </p>

            <p>The deadline for application submission is 6 March 2020.</p>

            <p>Notice of acceptance will be sent to participants by 27 March 2020.</p>

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
