import React, {useEffect, useState} from 'react'
import Perks from '../Perks'
import axios from 'axios'
import PhotosUploader from '../PhotosUploader'
import ProfileNav from '../ProfileNav'
import { Navigate, useParams } from 'react-router-dom'

const PlacesFormPage = () => {
    const {id} = useParams()
    console.log({id})
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [maxGuests, setMaxGuests] = useState(1)
    const [price, setPrice] = useState(100)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        if(!id){
            return
        }
        axios.get('http://localhost:4000/places/'+id)
            .then(response => {
                const {data} = response
                setTitle(data.title)
                setAddress(data.address)
                setAddedPhotos(data.photos)
                setDescription(data.description)
                setPerks(data.perks)
                setExtraInfo(data.extraInfo)
                setCheckIn(data.checkIn)
                setCheckOut(data.checkOut)
                setMaxGuests(data.maxGuests)
                setPrice(data.price)
            })
    }, [id])

    const inputHeader = (text) => {
        return (
            <h2 className='text-xl mt-4'>{text}</h2>
        )
    }

    const inputDescription = (text) => {
        return (
            <p className='text-gray-500 text-sm'>{text}</p>
        )
    }

    const preInput = (header, description) => {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    const savePlace = async(e) => {
        e.preventDefault()
        const placeData = {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests, price,
        }

        if(id){
            // updatePlace
            await axios.put('http://localhost:4000/places', {
                id, ...placeData
            })
            setRedirect(true)

        } else{
            // newPlace            
            await axios.post('http://localhost:4000/places', placeData)
            setRedirect(true)
            // navigate('/Profile/Accommodations')
        }
        
    }

    if(redirect){
        return <Navigate to={'/Profile/Accommodations'}/>
    }


    return (
        <div>
            <ProfileNav />
            <form onSubmit={savePlace}>
                {preInput('Title', 'Title for your place. Should be shorter and catchy as in advertisement.')}
                <input
                    type="text"
                    placeholder='title, for example my apartment.'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />

                {preInput('Address', 'Address for this place.')}
                <input
                    type="text"
                    placeholder='address'
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />

                {preInput('Photos', 'more = better.')}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                {preInput('Description', 'Description of the place.')}
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                {preInput('Perks', 'Select all perks of your place.')}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mt-2'>
                    <Perks
                        selected={perks}
                        onChange={setPerks}
                    />
                </div>

                {preInput('Extra info', 'Place rules, etc.')}
                <textarea
                    value={extraInfo}
                    onChange={e => setExtraInfo(e.target.value)}
                />

                {preInput('Check in & out', 'Add check in and out times, remember to have some time window for cleaning the room between guests.')}
                <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-2'>
                    <div className='mt-2 -mb-1'>
                        <h3>Check in time</h3>
                        <input
                            type="text"
                            placeholder='13'
                            value={checkIn}
                            onChange={e => setCheckIn(e.target.value)}
                        />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Check out time</h3>
                        <input
                            type="text"
                            placeholder='11'
                            value={checkOut}
                            onChange={e => setCheckOut(e.target.value)}
                        />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Maximum number of guests</h3>
                        <input
                            type="number"
                            value={maxGuests}
                            onChange={e => setMaxGuests(e.target.value)}
                        />
                    </div>
                    <div className='mt-2 -mb-1'>
                        <h3>Price per night</h3>
                        <input
                            type="number"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <button className='primary my-4'>Save</button>
            </form>
        </div>
    )
}

export default PlacesFormPage