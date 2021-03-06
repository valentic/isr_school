"""Add primary keys to userroles

Revision ID: dd9e7e7fc373
Revises: 359a05d4df03
Create Date: 2022-04-08 17:13:18.686606

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dd9e7e7fc373'
down_revision = '359a05d4df03'
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def downgrade_():
    # ### commands auto generated by Alembic - please adjust! ###
    pass
    # ### end Alembic commands ###


def upgrade_users():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user_roles', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.alter_column('user_roles', 'role_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('user_roles', 'id')
    op.create_primary_key('user_roles_pkey', 'user_roles', ['user_id', 'role_id'])
    # ### end Alembic commands ###


def downgrade_users():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user_roles', sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False))
    op.alter_column('user_roles', 'role_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('user_roles', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.drop_constraint('user_roles_pkey', 'user_roles', type_='primary')
    op.create_primary_key('user_roles_pkey', 'user_roles', ['id'])
    # ### end Alembic commands ###

