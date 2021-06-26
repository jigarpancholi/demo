import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin user',
        email: 'admin@example.com',
        password: bcrypt.hashSync('admin@123', 10),
        roles: ['ROLE_ADMIN']
    },
    {
        name: 'Jigar Pancholi',
        email: 'jigar@example.com',
        password: bcrypt.hashSync('admin@123', 10),
        roles: ['ROLE_RECRUITER']
    }
]

export default users
