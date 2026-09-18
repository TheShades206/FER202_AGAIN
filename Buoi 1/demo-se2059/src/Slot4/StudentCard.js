import React from "react";
import Card from "react-bootstrap/Card";

function StudentCard({ student }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={student.image} />
      <Card.Body>
        <Card.Title>{student.name}</Card.Title>
        <Card.Text>
          Ma SV : {student.id}
          <br />
          Tuoi : {student.age}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default StudentCard;
