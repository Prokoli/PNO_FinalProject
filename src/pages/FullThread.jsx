import { Placeholder, Card, ListGroup, Accordion, ListGroupItem, Button, Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router'
import { supabase } from './../client.js'
import Reply from './../components/Reply.jsx'
import Upvotes from './../components/Upvotes.jsx'
import { GetUserID } from '../utils/user.js'
import './FullThread.css'

const FullThread = () => {

    const { id } = useParams()
    const [thread, setThread] = useState(null)
    const [imageUrl, setImageUrl] = useState('')

    useEffect(() => {
        const fetchThread = async () => {
            const { data, error } = await supabase
                .from('Thread-Posts')
                .select()
                .eq('id', id)
                .single()
            if (error) console.error(error);
            else {
                setThread(data)
                if (data.image) {
                    // Get public URL from Supabase storage
                    const { data: urlData } = supabase
                        .storage
                        .from('thread-images') // replace with your bucket name
                        .getPublicUrl(data.image)
                    setImageUrl(urlData.publicUrl)
                }
            }
        }
        fetchThread()
    }, [id])



    const isUser = thread && (GetUserID() === thread.user_id)

    if (!thread) return <Placeholder as={Card.Title} animation='glow'></Placeholder>
    const createTime = new Date(thread.created_at).toLocaleString()


    return (
        <>
            <Container fluid
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '70vh' }}
            >
                <Row className='w-100 justify-content-center'>
                    <Col xs={12} sm={11} md={9} lg={6} xl={6}>
                        <Card className='m-3'>
                            <Card.Header className='card-header-custom m-2 title-section d-flex align-items-center justify-content-between'>
                                <Card.Title as='h2' className='m-2'>
                                    {thread.title}
                                    <Upvotes upvotes={thread.upvotes} id={thread.id} />

                                </Card.Title>
                                {isUser &&
                                    <Link style={{ color: 'white' }} to={`/thread/${thread.id}/edit-post`}>
                                        <Button
                                            variant='light'
                                            size='sm'
                                            className='d-flex align-items-end'
                                        >
                                            Update
                                        </Button>
                                    </Link>
                                }
                            </Card.Header>

                            <Card.Subtitle className='m-1 me-3 d-flex justify-content-end'>{createTime}</Card.Subtitle>
                            <Card.Body>
                                <Card.Text>{thread.description}</Card.Text>
                                <Card.Img
                                    src={imageUrl ? imageUrl : null}
                                    style={{ width: '350px', height: 'auto', margin: 'auto' }}
                                    className='d-flex justify-content-center'
                                >
                                </Card.Img>
                                <br></br>

                                <Card.Footer className='card-footer-custom'>
                                    <Accordion>
                                        <Accordion.Item>
                                            <Accordion.Header className='accordion-header'>
                                                Comments
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <ListGroup>
                                                    {thread.comments &&
                                                        thread.comments.length > 0 ?
                                                        thread.comments.map((comment, index) => (
                                                            <ListGroupItem key={index}>{comment}</ListGroupItem>
                                                        ))
                                                        : <ListGroupItem>No comments</ListGroupItem>
                                                    }
                                                    <Reply thread={thread} />
                                                </ListGroup>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default FullThread