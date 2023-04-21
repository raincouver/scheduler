import React from "react";
import InterviewerListItem from "components/InterviewerListItem";


export default function InterviewList(props) {

  const InterviewersProps = props.interviewer.map((interviewer) => {
    return (
      <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.name=props.name}
      />
    );
  });

  return (
    <ul>
      {InterviewersProps}
    </ul>
  );
}