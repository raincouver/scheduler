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

  if (filteredDays.length === 0) {

    return result;

  }

  for (let i of filteredDays[0].interviewers) {

    let x = state.interviewers[i];

    result.push(x);

  }

  return result;

};



/* Updates appointment spots remaining 
 *
 * @param {object} state represents the state of the application.
 * @param {object} appointments represents an object containing all the appointments of the day.
 * @return {array}  returns a newDays array which shows the updated number of spots available for each day.
 */

export function updateSpots(state, appointments) {
  const index = state.days.findIndex((d) => d.name === state.day);
  console.log('index', index);
  const dayObj = state.days[index];
  console.log('dayObj', dayObj);
  let spots = 0;

  for (let id of dayObj.appointments) {
    if (!appointments[id].interview) {
      spots++;
    }
  }

  const newDays = [...state.days];
  const day = {...dayObj, spots};
  newDays[index] = day;
  return newDays;
};