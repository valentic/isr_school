
def SendSignupApprovalEmail(data):

    sender_email = 'no-reply@ingeo.datatransport.org'
    receiver_email = data['email'] 

    body = []
    body.append('InGeO Sign Up Request')
    body.append('')
    body.append('Thank you for requesting an InGeO account.')
    body.append('')
    body.append('We will be processing your request shortly and will email you when your account is active.')
    body.append('')
    body.append('Regards,')
    body.append('The InGeo team.')
    body.append('')
    body.append('If you have any questions, please email us at ingeo-team@ingeo.datatranport.org')
    body.append('')

    body = '\n'.join(body)

    message = MIMEMultipart('alternative')
    message['Subject'] = 'InGeO signup request received'
    message['From'] = sender_email
    message['To'] = receiver_email

    message.attach(MIMEText(body,"plain"))

    smtp = smtplib.SMTP('localhost')
    smtp.sendmail(sender_email,receiver_email,message.as_string())
    smtp.quit()


