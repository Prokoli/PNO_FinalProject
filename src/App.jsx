import { useState, useEffect } from 'react'
import './App.css'
import { Card, Button, Badge, Container, Row, Col } from 'react-bootstrap'
import { supabase } from './client'
import { Link } from 'react-router'
import homeImage from './assets/home.jpg'

function App() {
  const [threadCount, setThreadCount] = useState(0)
  const [categories, setCategories] = useState([])

  const fetchThreadCount = async () => {
    const { count, error } = await supabase
      .from('Thread-Posts')
      .select('*', { count: 'exact', head: true })

    if (error) console.error('Error fetching thread count: ', error)
    else {
      setThreadCount(count)
    }
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('Thread-Posts')
      .select('categories')

    //    console.log('This is data: ', data)

    if (error) {
      console.error('Error fetching thread count: ', error)
      return
    }

    const allCategories = data
      .map(post => post.categories)
      .filter(Boolean)
      .flatMap(catString =>
        catString.split(',').map(cat => cat.trim().toLowerCase())
      );

    const uniqueCategories = new Set(allCategories)
    setCategories(Array.from(uniqueCategories));
  }

  useEffect(() => {
    fetchThreadCount();
    fetchCategories()
  }, [])

  return (
    <>
      <Container fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '100vh' }}
      >
        <Row className='w-100 justify-content-center'>
          <Col xs={12} sm={11} md={9} lg={6} xl={6}>
            <Card className='home-card p-5'>
              <Card.Img
                style={{ width: '200px', height: 'auto' }}
                className='home-image m-auto my-2'
                src={homeImage}
                variant='top'>
              </Card.Img>
              <Card.Title as='h1' className='d-flex justify-content-center'>
                Welcome to the KoilCare Forum
              </Card.Title>
              <Card.Subtitle className='d-flex justify-content-center'>
                <i>Helping You Intentionally Care for Your Natural Hair</i>
              </Card.Subtitle>

              <hr style={{ color: 'black' }}></hr>
              <Card.Body className=''>
                <Card.Text className='d-flex justify-content-center'>
                  This forum is designed to inspire and support anyone on their natural hair journey!
                </Card.Text>
                <Card.Text className='d-flex justify-content-center'>
                  Right now, the page is dedicated to Type 4 hair, but check back soon for more updates!
                </Card.Text>

                <hr style={{ color: 'black' }}></hr>

                <div className='d-flex justify-content-center m-4'>
                  <Card.Text as='h2'>{threadCount} Threads related to: </Card.Text>
                </div>

                <ul className=''>
                  {categories.map(cat =>
                    <Badge
                      className='m-1'
                      bg='warning'
                      style={{ color: 'black' }}
                      key={cat}>
                      {cat}
                    </Badge>
                  )}
                </ul>

              </Card.Body>
              <Card.Footer className='d-flex justify-content-center'>
                <Link to='/explore'>
                  <Button variant='dark'>Go To Threads</Button>
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default App
