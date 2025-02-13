import React from 'react'

import { 
    Document, 
    Font,
    Page, 
    Text,
    View,
    StyleSheet
} from '@react-pdf/renderer'

import regular from './fonts/FiraSans-Regular.otf'
import italic from './fonts/FiraSans-Italic.otf'
import bold from './fonts/FiraSans-Bold.otf'
import heavy from './fonts/FiraSans-Heavy.otf'

Font.register({ 
    family: 'Fira Sans', 
    fonts: [
        {
            src: regular,
            fontWeight: 'normal'
        },
        {
            src: italic,
            fontStyle: 'italic'
        },
        {
            src: bold,
            fontWeight: 'bold'
        },
        {
            src: heavy,
            fontWeight: 'heavy'
        }
    ]}
)

const styles = StyleSheet.create({

    page: {
        paddingTop: 25,
        paddingBottom: 65,
        paddingHorizontal: 45,
        fontFamily: 'Fira Sans',
        fontSize: 14,
        fontWeight: 400,
    },

    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center'
    },

    coverPage: {
        height: '90%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    coverTitle: {
        fontSize: 32,
        fontWeight: 'heavy',
    },

    coverDate: {
        fontSize: 8
    },

    contactDetails: {
        textAlign: 'center',
        borderBottom: '1px solid gray',
        paddingBottom: 5,
        marginBottom: 25
    },

    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    institution: {
        fontSize: 12,
    },

    address: {
        fontSize: 10,
    },

    submitted: {
        fontSize: 8,
    },

    details: {
        marginTop: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        color: 'gray',
        lineHeight: 1.25
    },

    detailTitle: {
        fontSize: 10, 
        textDecoration: 'underline',
        color: 'black',
        marginBottom: 5,
    },

    detail: {
        fontSize: 9,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    left: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    right: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
        

    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
    },

    textBox: {
        marginBottom: 10
    },

    textBoxTitle: {
        fontWeight: 'bold',
        fontSize: 11,
        lineHeight: 1.5
    },

    textBoxContent: {
        fontSize: 10,
        marginLeft: 15
    }
})

const CoverPage = () => {

    const now = new Date()

    return (
      <View style={styles.coverPage}>
        <Text style={styles.coverTitle}>
          ISR SCHOOL APPLICATIONS
        </Text>
        <Text style={styles.coverDate}>
          { now.toString() }
        </Text>
      </View>
    )
}

const StudentDetails = ({application}) => (
    <View style={styles.details}>
      <View style={[styles.detail, styles.left]}>
        <Text style={styles.detailTitle}>Supervisor</Text>
        <Text>{application.supervisor_name}</Text>
        <Text>{application.supervisor_email}</Text>
        <Text>{application.supervisor_phone}</Text>
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>Degree Program</Text>
        <Text>{application.degree}</Text>
        <Text>
          { !!application.field ? application.field : "--" }
        </Text>
        <Text>
          Expected {application.graduation}
        </Text>
      </View>
      <View style={[styles.detail, styles.right]}>
        <Text style={styles.detailTitle}>Contact Info</Text>
        <Text>{application.email}</Text>
        <Text>{application.phonenumber}</Text>
        <Text>Housing pref: {application.housing_pref}</Text>
      </View>
     </View>
)

const NonStudentDetails = ({application}) => (
    <View style={styles.details}>
      <View style={[styles.detail, styles.left]}>
        <Text style={styles.detailTitle}>Supervisor</Text>
        <Text></Text>
      </View>
      <View style={styles.detail}>
        <Text style={styles.detailTitle}>Degree Program</Text>
        <Text>&nbsp;</Text>
        <Text>
          Not a student 
        </Text>
        <Text>
          &nbsp; 
        </Text>
      </View>
      <View style={[styles.detail, styles.right]}>
        <Text style={styles.detailTitle}>Contact Info</Text>
        <Text>{application.email}</Text>
        <Text>{application.phonenumber}</Text>
      </View>
     </View>
)

const TextBox = ({title, children}) => (
  <View style={styles.textBox}>
    <Text style={styles.textBoxTitle}>{title}</Text>
    <Text style={styles.textBoxContent}>{children}</Text>
  </View>
)

const ApplicationPage = ({application}) => (
    <View break>
      <View style={styles.contactDetails}>
        <View>
          <Text style={styles.name}>
            {application.firstname} {application.lastname}
          </Text>
          <Text style={styles.institution}>
            {application.university}
          </Text>
          <Text style={styles.address}>
            {application.city}, {application.state}, {application.country}
          </Text>
        </View>
        { application.apptype === 'Student' ? 
            <StudentDetails application={application} />
            :
            <NonStudentDetails application={application} />
        }

        <Text style={styles.submitted}>
          Submitted on {application.created_on}
        </Text>
      </View>

      <View>
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
      </View>

    </View>
)

const ApplicationDoc = ({applications}) => {
 
    const pages = applications.map((application, index) => (
        <ApplicationPage application={application} key={index} />
        ))

    return (
      <Document style={styles.body}>
        <Page size="LETTER" style={styles.page}>
          <CoverPage /> 
          {pages}
          <Text
            style={styles.pageNumber}
            render={({ pageNumber }) => pageNumber > 1 ? `${pageNumber-1}` : ''}
            fixed
          />
        </Page>
      </Document>
    )
}

export { ApplicationDoc }
