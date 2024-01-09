import React, { useContext, useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './UserContext'

const BookingWidget = ({ place }) => {
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name, setName] = useState('')
    const [mobile, setMobile] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(user) {
            setName(user.name)
        }
    }, [user])

    let numberOfNights = 0
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
    }

    const bookThisPlace = async () => {
    try {
        const response = await axios.post('http://localhost:4000/bookings', {
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            mobile,
            place: place._id,
            price: numberOfNights * place.price,
        })
        
        const bookingId = response.data._id
        setRedirect(`/Profile/Bookings/${bookingId}`)
    } catch (error) {
        // Handle errors here
        console.error('Error while booking:', error)
    }
}

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center'>
                Price: ${place.price} / per night
            </div>
            <div className='border rounded-2xl mt-4'>
                <div className="flex">
                    <div className='py-4 px-4'>
                        <label htmlFor="">Check in:</label>
                        <input
                            type="date"
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className='py-4 px-4 border-l'>
                        <label htmlFor="">Check out:</label>
                        <input
                            type="date"
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                        />
                    </div>
                </div>
                <div className='flex py-4 px-4 border-t'>
                    <label htmlFor="">Number of Guests:</label>
                    <input
                        type="number"
                        value={numberOfGuests}
                        onChange={e => setNumberOfGuests(e.target.value)}
                    />
                </div>
                {numberOfNights > 0 && (
                    <div className='py-4 px-4 border-t'>
                        <label htmlFor="">Your Full Name: </label>
                        <input
                            type="name"
                            value={name}
                            placeholder='Full Name'
                            onChange={e => setName(e.target.value)}
                        />

                        <label htmlFor="">Your Phone Number: </label>
                        <input
                            type="tel"
                            value={mobile}
                            placeholder='e.g: +94 07xxxxxxxx'
                            onChange={e => setMobile(e.target.value)}
                        />
                    </div>
                )}
            </div>
            <button className='primary mt-4' onClick={bookThisPlace}>
                Book this place
                {numberOfNights > 0 && (
                    <span> ${numberOfNights * place.price} </span>
                )}
            </button>
        </div>
    )
}

export default BookingWidget