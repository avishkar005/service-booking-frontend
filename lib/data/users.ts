import { User } from '@/lib/store/auth.store'

export const dummyUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@platform.com',
    role: 'admin',
  },
  {
    id: 'vendor-1',
    name: 'Rohit Vendor',
    email: 'vendor@services.com',
    role: 'vendor',
  },
  {
    id: 'vendor-2',
    name: 'Sneha Vendor',
    email: 'sneha@services.com',
    role: 'vendor',
  },
  {
    id: 'customer-1',
    name: 'Amit Customer',
    email: 'amit@gmail.com',
    role: 'customer',
  },
  {
    id: 'customer-2',
    name: 'Neha Customer',
    email: 'neha@gmail.com',
    role: 'customer',
  },
]
