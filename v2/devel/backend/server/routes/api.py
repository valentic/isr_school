from flask import (
    Blueprint, jsonify, request, current_app,
    render_template, url_for, redirect
    )
from flask_restful import Api, Resource, reqparse, abort
from flask_mail import Message

from server import model, mail
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import smtplib
import history

bp = Blueprint('api',__name__,url_prefix='/api',template_folder='templates')
api = Api(bp)

#-- Email Handlers -------------------------------------------------

def send_creation_notify(user):

    admins = model.User.query.filter_by(admin=True,active=True)
    emails = [admin.email for admin in admins]
    subject = 'New account created'

    if not emails:
        return

    msg = Message(subject,recipients=emails)

    msg.text = render_template('api/creation_notify.txt',user=user)
    msg.html = render_template('api/creation_notify.html',user=user)

    mail.send(msg)

def send_acknowledgment_email(user):

    subject = 'ISR Summer School application received'

    msg = Message(subject,recipients=[user.email])

    msg.text = render_template('api/acknowledgment.txt')
    msg.html = render_template('api/acknowledgment.html')

    mail.send(msg)

#-- Create Application -------------------------------------------------

class submit_application(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument('firstname',required=True)
    parser.add_argument('lastname',required=True)
    parser.add_argument('email',required=True)
    parser.add_argument('phonenumber')
    parser.add_argument('university',required=True)
    parser.add_argument('city')
    parser.add_argument('state')
    parser.add_argument('country')
    parser.add_argument('field')
    parser.add_argument('degree_id',type=int)
    parser.add_argument('graduation',required=True)
    parser.add_argument('housing_pref_id',type=int,required=True)
    parser.add_argument('supervisor_name')
    parser.add_argument('supervisor_email')
    parser.add_argument('supervisor_phone')
    parser.add_argument('why_attend',required=True)
    parser.add_argument('experience',required=True)
    parser.add_argument('research_area',required=True)
    parser.add_argument('other')

    def post(self):
        try:
            data = self.parser.parse_args()
        except:
            current_app.logger.exception('failed to parse')
            raise

        application = model.Application(**data)
        model.db.session.add(application)
        model.db.session.commit()

        send_creation_notify(application)
        send_acknowledgment_email(application)

        name = data['firstname'] + ' ' + data['lastname']
        history.add_entry('system','Application received for %s' % name)

        return { 'message': 'Request submitted' },200

api.add_resource(submit_application,'/applications/submit')

