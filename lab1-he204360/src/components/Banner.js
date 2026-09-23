import Carousel from 'react-bootstrap/Carousel';
import banner1 from '../Images/banner1.jpg';
import banner2 from '../Images/banner2.jpg';
import banner3 from '../Images/banner3.jpg';
const bannerItems = [
  {
    title: 'FASHION IMAGE',
    text: 'Fashion Collection 2026',
    image:
      banner1,
  },
  {
    title: 'FASHION IMAGE',
    text: 'Fashion Collection 2026',
    image:
      banner2,
  },
  {
    title: 'FASHION IMAGE',
    text: 'Fashion Collection 2026',
    image:
      banner3,
  },
];

function Banner() {
  return (
    <Carousel>
      {bannerItems.map((item) => (
        <Carousel.Item key={item.title}>
          <img
            className="d-block w-100"
            src={item.image}
            alt={item.title}
            style={{ height: '420px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Banner;