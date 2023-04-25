import React from 'react'
import "components/Appointment/styles.scss";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Error from "./Error";
import Confirm from "./Confirm";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";

 
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const DELETING = "DELETING";

  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;


  function save(name, interviewer) {

    const interview = {
      student : name,
      interviewer
    };
    transition(SAVING);

    bookInterview(id, interview)
      .then(()=> transition(SHOW))
      // .catch(())
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function remove() {
    transition(DELETING,true);

    cancelInterview(id)
      .then(()=> transition(EMPTY))
      // .catch(())
  }


  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )
      }

      {mode === EDIT && (
        <Form
          interviewers={interviewers}
          interviewer={interview.interviewer.id}
          onSave={()=>save}
          onCancel={back}
          student={interview.student}
        />
      )
      }

      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={()=>save}
          onCancel={back}
        />
      )
      }

      {mode === SAVING && (
        <Status
          message={"Saving"}
          // onComplete={() => transition(SHOW)}
        />
      )
      }

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onConfirm={() => remove}
          onCancel={back}
        />
      )
      }

      {mode === DELETING && (
        <Status
          message={"Deleting"}
          // onComplete={() => transition(EMPTY)}
        />
      )
      }

    </article>
  );
}