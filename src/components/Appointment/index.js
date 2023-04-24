import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "components/Appointment/Show";
import Form from "components/Appointment/Form";
// import Error from "components/Appointment/Error";
// import Confirm from "components/Appointment/Confirm";
import useVisualMode from "hooks/useVisualMode";

 
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

  const {id, time, interview, interviewers} = props;



  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={()=>transition(CREATE)} />}

      {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
          />
        )
      }

      {mode === CREATE && (
          <Form
            interviewers={interviewers}
            // onSave={transition(CREATE)}
            onCancel={back}
          />
        )
      }

    </article>
  );
}