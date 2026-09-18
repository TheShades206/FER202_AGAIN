import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function PizzaCarosel({ pizza }) {
  return (
    <Carousel>
      {pizza.map((item) => (
        <Carousel.Item key={item.id}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={item.name}
            style={{ height: '450px', objectFit: 'cover' }}
          />
          <Carousel.Caption >
            <h3>{item.name}</h3>
            <p>{item.desciption}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default PizzaCarosel;