export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day  
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  let result = [];

  if (filteredDays.length === 0) {

    return result;

  }

  for (let i of filteredDays[0].appointments) {

    let x = state.appointments[i];
    
    result.push(x);
  }

  return result;

};

export function getInterview(state, interview) {

  if (interview === null) {

    return null;

  }

  let result = {
                "student": interview.student,
                "interviewer": state.interviewers[interview.interviewer]
              };

return result;

};

export function getInterviewersForDay(state, day) {
  //... returns an array of appointments for that day  
  const filteredDays = state.days.filter(eachDay => eachDay.name === day);

  let result = [];
  let resultInterviewers = [];

  if (filteredDays.length === 0) {

    return result;

  }

  for (let i of filteredDays[0].appointments) {

    let x = state.appointments[i];

    if (x.interview) {
      let interviewer = x.interview.interviewer;
      resultInterviewers.push(interviewer);
    }

  }

  const uniqueInterviewers = resultInterviewers.filter((value, index, self) => self.indexOf(value) === index);

  for (let i of uniqueInterviewers) {

    let y = state.interviewers[i];

    result.push(y);
  }

  return result;

};