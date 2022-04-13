from flask import current_app
from flask_sqlalchemy import SQLAlchemy

from flask_sqlalchemy.model import BindMetaMixin, Model
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.ext.hybrid import hybrid_property
from os import urandom
import string

from . import db, bcrypt

# See http://flask-sqlalchemy.pocoo.org/2.3/customizing/
# Disabling Table Name Generation

class NoNameMeta(BindMetaMixin,DeclarativeMeta):
    pass

import jwt
import datetime

class History(db.Model):
    """ History model for storing admin activities"""
    __tablename__ = 'history'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(255),nullable=False)
    timestamp = db.Column(db.DateTime,nullable=False)
    action = db.Column(db.String(255),nullable=False)

    def __init__(self,username,action):
        self.username = username
        self.action = action
        self.timestamp = datetime.datetime.now()

    def __repr__(self):
        return '[%s] <%s> %s' % (self.timestamp,self.username,self.action)

class User(db.Model):
    """ User Model for storing user related details"""
    __tablename__ = 'users'
    __bind_key__ = 'users'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    username = db.Column(db.String(255),unique=True,nullable=False)
    password_hash = db.Column(db.String(255),unique=True,nullable=False)
    email = db.Column(db.String(255),unique=True,nullable=False)
    created_on = db.Column(db.DateTime,nullable=False,default=datetime.datetime.utcnow)
    updated_on = db.Column(db.DateTime,nullable=False,default=datetime.datetime.utcnow)
    admin = db.Column(db.Boolean,nullable=False,default=False)
    active = db.Column(db.Boolean,nullable=False,default=False)

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self,plaintext):
        self.password_hash = bcrypt.generate_password_hash(plaintext).decode()

    def check_password(self,password):
        return bcrypt.check_password_hash(self.password,password)

    def modified(self):
        self.last_update = datetime.datetime.utcnow()

    def reset_password(self):

        chars = string.ascii_letters + string.digits
        length = 10

        new_password = "".join(chars[ord(c) % len(chars)] for c in urandom(length))

        self.password = new_password

        return new_password

    def encode_auth_token(self,user_id):
        """
        Generates the Auth Token
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                current_app.config['SECRET_KEY'],
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Validates the auth token
        :param auth_token
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token,current_app.config['SECRET_KEY'])
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def __repr__(self):
        return '%s <%s>' % (self.username,self.email)

class Degree(db.Model):
    """ Model for degree types"""
    __tablename__ = 'degrees'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))

class HousingPref(db.Model):
    """ Model for housing preference types"""
    __tablename__ = 'housing_prefs'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(255))
    description = db.Column(db.String(255))

class Application(db.Model):
    """ Model for storing school application data"""
    __tablename__ = 'applications'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    firstname = db.Column(db.String(255),nullable=False)
    lastname = db.Column(db.String(255),nullable=False)
    email = db.Column(db.String(255),nullable=False)
    phonenumber = db.Column(db.String(255),default='')
    university = db.Column(db.String(255),default='')
    city = db.Column(db.String(255),default='')
    state = db.Column(db.String(255),default='')
    country = db.Column(db.String(255),default='')
    degree_id = db.Column(db.Integer, db.ForeignKey('degrees.id'))
    field = db.Column(db.String(255),default='')
    graduation = db.Column(db.String(255),default='')
    housing_pref_id = db.Column(db.Integer,db.ForeignKey('housing_prefs.id'))
    supervisor_name = db.Column(db.String(255),default='')
    supervisor_email = db.Column(db.String(255),default='')
    supervisor_phone = db.Column(db.String(255),default='')
    why_attend = db.Column(db.Text,default='')
    experience = db.Column(db.Text,default='')
    research_area = db.Column(db.Text,default='')
    other = db.Column(db.Text,default='')

    created_on = db.Column(db.DateTime,nullable=False,default=datetime.datetime.utcnow)
    updated_on = db.Column(db.DateTime,nullable=False,default=datetime.datetime.utcnow)
    approved   = db.Column(db.Boolean,nullable=False,default=False)

    def modified(self):
        self.updated_on = datetime.datetime.utcnow()

    def __repr__(self):
        return '%s <%s>' % (self.username,self.email)

class BlacklistToken(db.Model):
    __tablename__ = 'blacklist_tokens'
    __bind_key__ = 'users'

    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    token = db.Column(db.String(500),unique=True,nullable=False)
    blacklisted_on = db.Column(db.DateTime,nullable=False)

    def __init__(self):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return '<id: token: {}'.format(self.token)

    @staticmethod
    def check_blacklist(auth_token):
        res = BlacklistToken.query.filter_by(token=str(auth_token)).first()
        if res:
            return True
        else:
            return False




