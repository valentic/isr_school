
###################################################################
#
#   History
#
#   2019-07-03  Todd Valentic
#               Initial implementation
#
###################################################################

import os
import uuid
import socket
import datetime

from . import metadata 

class Config(object):

    HOST = socket.gethostname()
    VERSION = metadata.version
    PROJECT = metadata.project

    # Mail configuration

    MAIL_SERVER = 'localhost'
    MAIL_DEFAULT_SENDER = 'no-reply@amisr.com'

    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)
    JWT_ALGORITHM = 'HS256'
    JWT_HEADER_TYPE = 'bearer'
    JWT_TOKEN_LOCATION = ['headers','json']

    TEMPLATES_AUTO_RELOAD = True

    STATIC_FOLDER = 'server/templates/static'

    FLATPAGES_EXTENSION = ['.rst']

    SQLALCHEMY_URI = f'postgresql://@'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = f'{SQLALCHEMY_URI}/{PROJECT}'
    SQLALCHEMY_BINDS = {
        'users':    f'{SQLALCHEMY_URI}/{PROJECT}-users'
    }

    COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml',
                          'text/javascript', 'application/json',
                          'application/javascript','application/x-javascript']

class Production(Config):

    DEBUG = False

class Development(Config):

    DEBUG = True

    SQLALCHEMY_DATABASE_URI = f'{Config.SQLALCHEMY_URI}/{Config.PROJECT}-devel'
    SQLALCHEMY_BINDS = {
        'users':    f'{Config.SQLALCHEMY_URI}/{Config.PROJECT}-users-devel'
    }


