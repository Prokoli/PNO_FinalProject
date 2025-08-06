import ThreadCard from './../components/ThreadCard'
import { Container, Row, Col, Placeholder, Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap'
import { supabase } from './../client.js'
import { useState, useEffect } from 'react'

const Explore = (props) => {
    const [threads, setThreads] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const fetchThread = async (sortBy = 'created-at', ascending = true) => {
        const { data, error } = await supabase
            .from('Thread-Posts')
            .select()
            .order(sortBy, { ascending })
        if (error) console.error(error)
        else {
            setThreads(data)
            //console.log(`Sorted by ${sortBy}`, data)
        }
    }

    useEffect(() => {
        fetchThread('created_at', false)
    }, [props])

    const searchFilter = async () => {
        const { data, error } = await supabase
            .from('Thread-Posts')
            .select()
            .ilike('categories', `%${searchQuery}%`)

        if (error) console.error('Search error: ', error)
        else setThreads(data)
    }


    return (
        <>
            <ButtonToolbar className='mt-3 d-flex justify-content-between align-items-center'>
                <form className='d-flex align-items-center ms-2'>
                    <label className='mx-2' htmlFor='filter' style={{ color: 'white' }}>Search by category: </label>
                    <input className='ms-2'
                        type='text'
                        id='filter'
                        name='filter'
                        placeholder='input category here...'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button
                        onClick={searchFilter}
                        variant='outline-light'
                        className='ms-2'>
                        Search
                    </Button>
                </form>

                <ButtonGroup className='d-flex align-items-center text-white me-2'>
                    <span className='me-2'>Filter By: </span>
                    <Button onClick={() => fetchThread('created_at', false)} variant='dark'>Creation Time</Button>
                    <Button onClick={() => fetchThread('upvotes', false)} variant='dark'>Upvote Count</Button>

                </ButtonGroup>

            </ButtonToolbar>

            <Container className='thread-grid mt-3'>
                <Row>
                    {threads && threads.length > 0 ? (
                        [...threads].map((thread, index) => (
                            <Col key={index} xs={10} sm={6} md={5} lg={3} xl={3} className='mb-4'>
                                <ThreadCard
                                    key={`${thread.id}-${thread.upvotes}`}
                                    id={thread.id}
                                    title={thread.title}
                                    create_time={thread.created_at}
                                    upvotes={thread.upvotes}
                                    categories={thread.categories ? thread.categories : []}
                                    image={thread.image ? thread.image : null}
                                    user_id={thread.user_id}
                                />
                            </Col>
                        ))
                    )
                        : (
                            <Col xs={10} sm={6} md={5} lg={3} xl={3} className='mb-4'>
                                <Card className='mb-4 shadow-sm border-heavy' style={{ backgroundColor: '#63523fff', color: '#FFFFFF' }}>
                                    <Card.Body>
                                        <Placeholder as={Card.Title} animation='glow'>
                                            <Placeholder xs={6} />
                                        </Placeholder>
                                        <Placeholder as={Card.Text} animation='glow'>
                                            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                            <Placeholder xs={6} /> <Placeholder xs={8} />
                                        </Placeholder>
                                        <Placeholder.Button variant='outline-light' xs={6} />
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    }
                </Row>
            </Container>
        </>
    )
}
export default Explore