import React, {useState, useEffect} from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from '@material-ui/core/TextField';
import {
    getAllDoctors,
    getNextAvailableDateAndToken,
    addAppointment,
    isAuthenticate
} from "../api_connection/ApiConnection";
import dayjs from "dayjs";
import {MDBDataTable} from 'mdbreact';
import CircularProgress from "@material-ui/core/CircularProgress";

const AddAppointmentContent = () => {
    //Variables
    const [doctors, setDoctors] = useState([]);
    const [doctorId, setDoctorId] = useState('All');
    const [specialization, setSpecialization] = useState('');
    const [nextAvailableDate, setNextAvailableDate] = useState('');
    const [appointmentAt, setAppointmentAt] = useState('');
    const [tokenNumber, setTokenNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [reRenderKey, setReRenderKey] = useState(1);

    const handleDoctorChange = (value) => {
        //loading starts
        setLoading(true);
        //assign values by related to selected doctor
        const doctorId = value._id;
        setDoctorId(doctorId);
        setSpecialization(value.specialization);
        setAppointmentAt(value.availableTime);
        setError(false);

        const maxPatientsPerDay = value.maxPatientsPerDay;

        //get appointment details
        getNextAvailableDateAndToken(doctorId).then(data => {

            if (data.error) {
                console.log(data.error)
            } else {
                setLoading(false);
                let nextToken = data.tokenMax + 1;

                if (nextToken > maxPatientsPerDay && (compare_dates(new Date(), new Date(data.dayMax)) === 1 || compare_dates(new Date(), new Date(data.dayMax)) === 0)) {
                    //patients per day is exceeded, then next week date should be printed with token number 1
                    //and date should equal to today or greater than today
                    setTokenNumber(1);
                    let nextDate = new Date(data.dayMax);
                    //adding 7 days more
                    nextDate.setDate(nextDate.getDate() + 7);

                    setNextAvailableDate(nextDate.toISOString());

                } else if (data.tokenMax !== null && data.dayMax !== null) {
                    //Can add more patients
                    setNextAvailableDate(data.dayMax);
                    setTokenNumber(nextToken);
                } else {
                    //means no more patients have added an appointment
                    //token is 1
                    //day should be the closest day to the available week day of the selected doctor

                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    //checks what is the week of the current day
                    const d = new Date();
                    const beginning = d.getDay() === 6 ? 0 : (d.getDay());

                    let counter = d.getDay() === 6 ? 1 : 0;

                    for (let i = beginning; i < 6; i++) {
                        if (i === 5) {
                            i = 0;
                        }

                        if (days[i] === value.availableWeekDay) {
                            break;
                        }
                        counter++;
                    }
                    //getting closest available week day of the selected doctor
                    let nextDate = new Date();
                    nextDate.setDate(nextDate.getDate() + (counter + 1));
                    setTokenNumber(1);
                    setNextAvailableDate(nextDate.toISOString());

                }

                fetchDoctors();
            }
        });
    }

    const compare_dates = function (date1, date2) {
        if (date1 > date2) return -1;
        else if (date1 < date2) return 1;
        else return 0;
    }

    const fetchDoctors = () => {
        getAllDoctors().then(data => {
            if (data.error) {
                console.log(data.error)
            } else
                setDoctors(data)
        });
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const doctorsTable = () => {
        if (doctors.length > 0) {
            const data = {
                columns: [
                    {
                        label: 'Doctor Name',
                        field: 'name',
                        sort: 'asc',
                        width: 270
                    },
                    {
                        label: 'Doctor Specialization',
                        field: 'specialization',
                        sort: 'asc',
                        width: 200
                    },
                    {
                        label: 'Week Day',
                        field: 'availableWeekDay',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'At',
                        field: 'availableTime',
                        sort: 'asc',
                        width: 100
                    },
                    {
                        label: 'Room No',
                        field: 'roomNo',
                        sort: 'asc',
                        width: 100
                    }
                ], rows: doctors
            };

            return (
                <div className="container-fluid col-md-12 col-lg-12 col-sm-12">
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        responsive
                        data={data}
                    />
                </div>
            );

        } else {
            return null;
        }
    };

    const showError = () => (
        <div className="alert alert-danger text-center" style={{display: error ? '' : 'none'}}>
            Please select a doctor first!
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success text-center" style={{display: success ? '' : 'none'}}>
            Appointment successfully Added!
        </div>
    );

    const onSubmit = (e) => {
        e.preventDefault();
        setButtonLoading(true);
        //validating the submission
        if (doctorId === '' || nextAvailableDate === '' || tokenNumber === '') {
            setError(true);
            setButtonLoading(false);
        } else {
            //successfully fulfilled the requirement
            setError(false);
            //object creation
            const {token, user} = isAuthenticate();
            const appointments = {
                appointments: {
                    "day": new Date(nextAvailableDate),
                    "tokenNumber": tokenNumber
                }
            };
            //calling Rest web service
            addAppointment(user._id, token, doctorId, appointments).then(data => {

                if (data.error) {
                    console.log(data.error);
                } else {
                    setSuccess(true);
                    //Success message timeout
                    setTimeout(function () {
                        setSuccess(false);
                    }, 3000);
                    setNextAvailableDate('');
                    setTokenNumber('');
                    setAppointmentAt('');
                    setSpecialization('');
                    setDoctorId('');
                    setButtonLoading(false);
                    //in order to clear autocomplete
                    setReRenderKey(reRenderKey + 1);

                }
            });
        }

    };

    return (
        <div className="container-fluid">
            <div className="d-sm-flex justify-content-between align-items-center mb-4">
                <h3 className="text-dark mb-0">Add Appointment</h3>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 font-weight-bold">Add Appointment</p>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group"><label
                                            htmlFor="username"><strong>Search Doctor</strong></label>
                                            <Autocomplete
                                                key={reRenderKey}
                                                onChange={(event, value) => handleDoctorChange(value)}
                                                freeSolo
                                                id="free-solo-2-demo"
                                                disableClearable
                                                options={doctors.map((option) => option)}
                                                getOptionLabel={options => (options.name)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Search by Name"
                                                        margin="normal"
                                                        variant="outlined"
                                                        InputProps={{...params.InputProps, type: 'search'}}
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="first_name"><strong>Specialization : </strong></label>
                                            {' '} <label>{specialization}</label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="first_name"><strong>Next available date : </strong></label>
                                            {' '} <label>{loading ?
                                            <CircularProgress size={15}/> : nextAvailableDate}</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="first_name"><strong>Your token : </strong></label>
                                            {' '} <label style={{color: "red"}}><strong>{loading ?
                                            <CircularProgress size={15}/> : tokenNumber}</strong></label>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="form-group">
                                            <label htmlFor="first_name"><strong>Appointment at : </strong></label>
                                            {' '} <label>{appointmentAt}</label>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                                {showError()}
                                {showSuccess()}
                                <div className="form-group">
                                    <button className="btn btn-primary btn-sm" disabled={buttonLoading}
                                            onClick={onSubmit}>{buttonLoading ?
                                        <CircularProgress size={20}/> : 'Add Appointment'}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="col-12">
                    <div className="card shadow mb-3">
                        <div className="card-header py-3">
                            <p className="text-primary m-0 font-weight-bold">Doctors List</p>
                        </div>
                        <div className="card-body">
                            {doctorsTable()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAppointmentContent;
