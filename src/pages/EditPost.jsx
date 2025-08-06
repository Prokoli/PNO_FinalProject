import { useState, useEffect } from 'react'
import { supabase } from './../client'
import { useParams, useNavigate } from 'react-router'
import { Button, Card, Form, Placeholder, Container, Row, Col } from 'react-bootstrap'


const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [formData, setFormData] = useState(
        {
            title: "",
            categories: "",
            description: "",
        }
    )

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Thread-Posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) {
                console.error('Error fetching post:', error)
            } else {
                setPost(data)
                setFormData({
                    title: data.title,
                    description: data.description,
                    categories: data.categories || ''
                })
            }
        }

        fetchPost()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const updatedPost = {
            title: formData.title.trim() || post.title,
            description: formData.description.trim() || post.description,
            categories: formData.categories.trim() || post.categories
        }

        const { error } = await supabase
            .from('Thread-Posts')
            .update(updatedPost)
            .eq('id', id)

        if (error) {
            console.error('Update failed:', error)
        } else {
            navigate('/explore')
        }
    }

    const deletePost = async (event) => {
        event.preventDefault()

        const confirmed = window.confirm('Are you sure you want to delete this thread?')

        if (!confirmed) return

        const { error } = await supabase
            .from('Thread-Posts')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Deletion failed:', error)
        } else {
            navigate('/explore')
        }
    }


    if (!post)
        return (
            <Card className='m-4 shadow-sm border-heavy' style={{ backgroundColor: '#63523fff', color: '#FFFFFF' }}>
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
        )

    return (
        <>
            <Container fluid
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '70vh' }}
            >
                <Row className='w-100 justify-content-center'>
                    <Col xs={12} sm={11} md={9} lg={6} xl={6}>
                        <Card className='m-3'>
                            <Card.Header as='h1'>📝Update Post📝</Card.Header>
                            <Form onSubmit={handleSubmit}>
                                <Card.Body>
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            placeholder="Edit title here..."
                                            value={formData.title}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            name="description"
                                            rows={3}
                                            placeholder="say more here..."
                                            style={{ resize: 'vertical' }}
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="categories">
                                        <Form.Label>Categories</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="categories"
                                            placeholder="Edit categories..."
                                            value={formData.categories}
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="image" className="mt-3">
                                        <Form.Label>Image</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </Card.Body>
                                <Card.Footer className='d-flex justify-content-between'>
                                    <Button variant='success' type="submit">✏️ Update Post</Button>
                                    <Button variant='danger' onClick={deletePost}>🗑️ Delete Post</Button>
                                </Card.Footer>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
export default EditPost