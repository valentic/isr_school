import click
from flask import current_app
from flask.cli import FlaskGroup, with_appcontext, pass_script_info

from . import create_app, db, socketio

def lookup(username):
    return current_app.model.User.query.filter_by(username=username).first()

@click.command()
@click.option('-p','--port',default=5000,show_default=True)
@click.option('-r','--root',default='/',show_default=True)
@click.option('-d','--debug',is_flag=True,show_default=True)
def launch(port,root,debug):
    if debug:
        mode = 'development'
    else:
        mode = 'production'
    app = create_app(root=root,mode=mode)
    socketio.run(app,port=port,debug=debug)

@click.group(cls=FlaskGroup, create_app=create_app)
def cli():
    """
    This is a management script the for Flask appliction.
    """
    # Adds the Flask commands like 'run' and CLI plugin commands
    # like the 'db' group. cli() is the default group, but other
    # groups can be added, like 'user' below.

@cli.group()
def user():
    """
    Perform user administration tasks
    """

@user.command('list')
@pass_script_info
def user_list(info):
    #from . import model

    #app = info.load_app()
    #print 'Extensions:',app.extensions

    fmt = '%05s %-15s %-25s %-20s %-5s %-6s'
    timefmt = '%Y-%m-%d %H:%M:%S'

    print
    print fmt % ('ID','Username','Email','Created','Admin','Active')
    print '-'*85

    for user in current_app.model.User.query.all():
        created = user.created_on.strftime(timefmt)
        admin = 'Yes' if user.admin else ''
        active = 'Yes' if user.active else 'No'
        print fmt % (user.id,user.username,user.email,created,admin,active)

    print

@user.command('add')
@click.argument('username')
@click.argument('password')
@click.argument('email')
@click.option('-a','--admin/--no-admin',help='Make an admin user',show_default=True)
def user_add(username,password,email,admin):
    #from . import model

    if lookup(username):
        print 'User "%s" already exists' % username
        return

    args = {
        'username': username,
        'password': password,
        'email': email,
        'admin': admin
        }

    user = current_app.model.User(**args)
    db.session.add(user)

    try:
        db.session.commit()
    except sqlalchemy.exc.IntegrityError,exc:
        reason = exc.message
        print 'Error:',reason
        db.session.rollback()
        return

@user.command('del')
@click.argument('username')
def user_del(username):
    user = lookup(username)

    if not user:
        print 'Unknown user: %s' % username
        return

    print 'Deleting user:  %s' % username
    db.session.delete(user)
    db.session.commit()

@user.command('mod')
@click.argument('username')
@click.option('-A','--admin/--no-admin',help='Make an admin user',default=None)
@click.option('-p','--pending/--no-pending',help='Set pending flag',default=None)
@click.option('-a','--active/--no-active',help='Set active flag',default=None)
@click.option('-e','--email')
@click.option('-P','--password')
def user_mod(username,admin,pending,active,email,password):
    user = lookup(username)

    if not user:
        print 'Unknown user: %s' % username
        return

    print 'Modifying user:  %s' % username

    if email is not None:
        print '  - change email to',email
        user.email = email

    if admin is not None:
        print '  - change admin to',admin
        user.admin = admin

    if active is not None:
        print '  - change active to',active
        user.active = active

    if pending is not None:
        print '  - change pending to',pending
        user.pending = pending

    if password is not None:
        print '  - change password'
        user.password = user.encode_password(password)

    db.session.commit()

@user.command('show')
@click.argument('username')
def user_show(username):
    user = lookup(username)

    print
    if not user:
        print 'User does not exist'
    else:
        print 'ID      :',user.id
        print 'Username:',user.username
        print 'Email   :',user.email
        print 'Admin   :',user.admin
        print 'Active  :',user.active
        print 'Created :',user.created_on
        print 'Updated :',user.updated_on
    print

def update_or_add(table,args,match=['id']):
    m = { k:args[k] for k in match }
    instance = table.query.filter_by(**m).first()

    if instance:
        for k,v in args.iteritems():
            setattr(instance,k,v)
    else:
        instance = table(**args)
        db.session.add(instance)

@cli.command('seed')
def seed():
    """Add default entries to the database"""

    update_or_add(current_app.model.Degree,dict(id=1,name='bachelors',description="Bachelor's degree"))
    update_or_add(current_app.model.Degree,dict(id=2,name='masters',description="Master's degree"))
    update_or_add(current_app.model.Degree,dict(id=3,name='phd',description="Ph.D."))

    update_or_add(current_app.model.HousingPref,dict(id=1,name='male',description="Male"))
    update_or_add(current_app.model.HousingPref,dict(id=2,name='female',description="Female"))
    update_or_add(current_app.model.HousingPref,dict(id=3,name='decline',description="Decline"))

    db.session.commit()



