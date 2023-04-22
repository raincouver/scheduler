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

}