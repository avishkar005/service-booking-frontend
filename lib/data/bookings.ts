import { Booking } from '@/lib/store/booking.store'

export const dummyBookings: Booking[] = [
  {
    id: 'b1',
    serviceId: 's1',
    serviceName: 'Home Cleaning',
    customerId: 'customer-1',
    date: new Date().toISOString(),
    status: 'completed',
    price: 1200,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
  },
  {
    id: 'b2',
    serviceId: 's2',
    serviceName: 'AC Repair',
    customerId: 'customer-1',
    date: new Date().toISOString(),
    status: 'confirmed',
    price: 800,
    paymentMethod: 'card',
    paymentStatus: 'paid',
  },
  {
    id: 'b3',
    serviceId: 's3',
    serviceName: 'Salon at Home',
    customerId: 'customer-2',
    date: new Date().toISOString(),
    status: 'pending',
    price: 1500,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
  },
]
