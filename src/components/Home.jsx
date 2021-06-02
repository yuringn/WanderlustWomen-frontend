import React from "react"
import Carousel from 'react-bootstrap/Carousel';
function Home(){
    return (
        <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block"
            src="https://images.unsplash.com/photo-1446160657592-4782fb76fb99?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8d29tZW4lMjB0cmF2ZWx8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="First slide"
          />
          {/* <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block"
            src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjJ8fHdvbWVuJTIwdHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="Second slide"
          />
      
          {/* <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption> */}
        </Carousel.Item>
        <Carousel.Item interval={1000}>
          <img
            className="d-block"
            src="https://images.unsplash.com/photo-1497634763913-2ea08bf9de5d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fHdvbWVuJTIwdHJhdmVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            alt="Third slide"
          />
      
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    )
}

export default Home;