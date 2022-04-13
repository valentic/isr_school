#!/usr/bin/env python

from setuptools import find_packages, setup

setup(
    name='isr_school',
    version='1.0.7',
    description='ISR Summer School',
    author='Todd Valentic',
    author_email='todd.valentic@sri.com',
    url='https://www.amisr.com/school',
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'pytz',
        'dateutils',
        'eventlet',
        'requests',
        'bcrypt',
        'flask',
        'psycopg2-binary',
        'sqlalchemy',
        'Flask-SQLAlchemy',
        'flask-compress',
        'flask-script',
        'flask-migrate',
        'flask-bcrypt',
        'flask-jwt-extended',
        'flask-socketio',
        'flask-restful',
        'flask-mail',
        'coverage',
        'PyJWT',
        'cryptography',
        'itsdangerous',
        ],
    package_data = {
        'server':['migrations/*',
                  'migrations/versions/*',
                  'templates/*',
                  'routes/templates/auth/*',
                  'routes/templates/api/*',
                  'static/js/*',
                  'static/media/*',
                  'static/css/*'
                 ]
        },
    entry_points={
        'console_scripts': [
            'server=server.commands:cli',
            'launch=server.commands:launch'
        ],
    },

)
