import React, { useState } from 'react'
import ProfileNav from '../ProfileNav'
import { useEffect } from 'react'
import axios from 'axios'
import PlaceImg from '../PlaceImg'
import { differenceInCalendarDays, format } from 'date-fns'
import { Link } from 'react-router-dom'
import BookingDates from '../BookingDates'

const BookingsPage = () => {
    const [bookings, setBooking] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/bookings')
            .then(response => {
                setBooking(response.data)
            })
    }, [])
    return (
        <div>
            <ProfileNav />
            <div className='mt-4'>
                {bookings?.length > 0 && bookings.map(booking => (
                    <Link to={`/Profile/Bookings/${booking._id}`} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden'>
                        <div className='w-48'>
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl'> {booking.place.title} </h2>
                            <BookingDates booking={booking} />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BookingsPage