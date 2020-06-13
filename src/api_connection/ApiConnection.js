import {API} from "../config";

export const signup = (data) => {
    return fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const signin = (data) => {
    console.log(`Calling - ${API}/signin`);
    return fetch(`${API}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('userToken', JSON.stringify(data));
        next();
    }
};

export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('userToken');
        localStorage.removeItem('cart');
        next();
        return fetch(`${API}/signout`, {
            method: 'GET',

        })
            .then(response => console.log('signout', response))
            .catch(err => console.log(err))
    }
};

export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('userToken')) {
        return JSON.parse(localStorage.getItem('userToken'));
    } else {
        return false;
    }
};

export const getAllDoctors = () => {
    return fetch(`${API}/doctors`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//function to get next available date and token details from db
export const getNextAvailableDateAndToken = (doctorId) => {
    return fetch(`${API}/doctor/${doctorId}/getNextAvailableDateAndToken`, {
        method: "GET",
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};

//add appointment
export const addAppointment = (userId, token, doctorId, appointments) => {
    return fetch(`${API}/doctor/addAppointment/${doctorId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointments)
    })
        .then(response => response.json())
        .catch(err => console.log(err))
};
