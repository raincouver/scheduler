import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: {},
  interviewers: {}
});

const setDay = day => setState(prev => ({ ...prev, day }));

Promise.all([
  axios.get('/api/days'),
  axios.get('/api/appointments'),
  axios.get('/api/interviewers')
]).then((all) => {
  setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
});

function spotsCount(state) {
  let spotsNumber = 0;
  for (let i of state.days.appointments) {
    if (state.appointments.interview[i] === null){
      spotsNumber+=1;
    }
  }
  return spotsNumber;

}



function bookInterview(id, interview) {
  console.log(id, interview);

  const appointment = {
    ...state.appointments[id],
    interview: { ...interview }
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.put(`/api/appointments/:${id}`, { interview })
  .then(() => {
    const days = spotsCount(state);
    setState((prev) => ({
      ...prev,
      appointments,
      days
    }));
  });

};


function cancelInterview(id) {

  const appointment = {
    ...state.appointments[id],
    interview: null
  };

  const appointments = {
    ...state.appointments,
    [id]: appointment
  };

  return axios.delete(`/api/appointments/${id}`)
  .then(() => {
    const days = spotsCount(state);
    setState((prev) => ({
      ...prev,
      appointments,
      days
    }));
  });

};


return {state, setDay, bookInterview, cancelInterview};
};