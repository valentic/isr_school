
###################################################################
#
#   History
#
#   2019-06-17 1.0  Todd Valentic
#                   Initial implementation
#
###################################################################

import os
import uuid
import socket
import datetime

class Config(object):

    HOST = socket.gethostname()
    VERSION = '1.0.7'

    # Mail configuration

    MAIL_SERVER = 'localhost'
    MAIL_DEFAULT_SENDER = 'no-reply@amisr.com'

    # Short timeout to test expired messages
    #JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=1)

    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)
    JWT_ALGORITHM = 'HS256'
    JWT_HEADER_TYPE = 'bearer'

    TEMPLATES_AUTO_RELOAD = True

    STATIC_FOLDER = 'server/templates/static'

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://@/isr_school'
    SQLALCHEMY_BINDS = {
        'users':    'postgresql://@/isr_school-users'
    }

    COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml',
                          'text/javascript', 'application/json',
                          'application/javascript','application/x-javascript']

class Production(Config):

    DEBUG = False

class Development(Config):

    DEBUG = True

    SQLALCHEMY_DATABASE_URI = 'postgresql://@/isr_school-devel'
    SQLALCHEMY_BINDS = {
        'users':    'postgresql://@/isr_school-users-devel'
    }


