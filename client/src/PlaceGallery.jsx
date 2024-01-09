import React, {useState} from 'react'

const PlaceGallery = ({place}) => {
    const [showAllPhotos, setShowAllPhotos] = useState(false)

    if (showAllPhotos) {
        return (
            <div className='absolute insert-0 bg-black-full text-white min-h-screen'>
                <div className='bg-black p-8 grid gap-4'>
                    <div>
                        <h2 className='text-3xl mr-48'>Photos of {place.title} </h2>
                        <button
                            className='flex fixed right-12 
                                top-8 gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black'
                            onClick={() => setShowAllPhotos(false)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close Photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (
                        <div>
                            <img src={'http://localhost:4000/uploads/' + photo} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    return (
        <div className='relative'>
            <div className='grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden'>
                <div>
                    {place.photos?.[0] && (
                        <div>
                            <img
                                className='aspect-square object-cover cursor-pointer'
                                src={'http://localhost:4000/uploads/' + place.photos[0]}
                                onClick={() => setShowAllPhotos(true)}
                            />
                        </div>


                    )}
                </div>
                <div className='grid gap-2'>
                    {place.photos?.[1] && (
                        <img
                            className='aspect-square object-cover cursor-pointer'
                            src={'http://localhost:4000/uploads/' + place.photos[1]}
                            onClick={() => setShowAllPhotos(true)}
                        />
                    )}
                    <div className='overflow-hidden'>
                        {place.photos?.[2] && (
                            <img
                                className='aspect-square object-cover cursor-pointer relative -top-1'
                                src={'http://localhost:4000/uploads/' + place.photos[2]}
                                onClick={() => setShowAllPhotos(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <button
                onClick={() => setShowAllPhotos(true)}
                className='flex absolute bottom-2 right-2 py-2 px-4 
                        bg-white rounded-xl shadow shadow-md shadow-gray-500 gap-1'
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                    <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                Show more photos
            </button>
        </div>
    )
}

export default PlaceGallery