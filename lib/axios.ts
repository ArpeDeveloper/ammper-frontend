import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BELVO_BASE_URL,
    headers: {
        Authorization: "Basic " + btoa( process.env.NEXT_PUBLIC_BELVO_SECRET_ID + ":" + process.env.NEXT_PUBLIC_BELVO_SECRET_PASSWORD)
    }
})

export default axios