
###################################################################
#
#   History
#
#   2019-07-03  Todd Valentic
#               Initial implementation
#
#   2023-02-02  Todd Valentic
#               Use metadata for version, project, and branch
#               Add branch to datbase name
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
    BRANCH = metadata.branch

    # Mail configuration

    MAIL_SERVER = 'localhost'
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    MAIL_PORT = 25 
    MAIL_DEFAULT_SENDER = 'no-reply@amisr.com'

    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=7)
    JWT_ALGORITHM = 'HS256'
    JWT_HEADER_TYPE = 'bearer'
    JWT_TOKEN_LOCATION = ('headers', 'json')

    TEMPLATES_AUTO_RELOAD = True

    STATIC_FOLDER = 'server/templates/assets'

    FLATPAGES_EXTENSION = ['.rst']

    SQLALCHEMY_URI = f'postgresql://@'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    COMPRESS_MIMETYPES = ['text/html', 'text/css', 'text/xml',
                          'text/javascript', 'application/json',
                          'application/javascript','application/x-javascript']

class Production(Config):

    PREFIX = f'{Config.SQLALCHEMY_URI}/{Config.PROJECT}.{Config.BRANCH}'

    SQLALCHEMY_DATABASE_URI = f'{PREFIX}-prod'
    SQLALCHEMY_BINDS = {
        'users':    f'{PREFIX}-users-prod'
    }

class Development(Config):

    PREFIX = f'{Config.SQLALCHEMY_URI}/{Config.PROJECT}.{Config.BRANCH}'

    SQLALCHEMY_DATABASE_URI = f'{PREFIX}-devel'
    SQLALCHEMY_BINDS = {
        'users':    f'{PREFIX}-users-devel'
    }


