import { useState, useEffect } from 'react'
import { supabase } from './../client'
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap'
import { GetUserID } from './../utils/user'

const CreatePost = () => {
    const [newThread, setNewThread] = useState(
        {
            title: "",
            categories: "",
            upvotes: 0,
            description: "",
            comments: [],
            image: null
        }
    )
    const [success, setSuccess] = useState(false);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === "image") {
            setNewThread((prev) => ({
                ...prev,
                image: files && files[0] ? files[0] : null,
            }));
        } else {
            setNewThread((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

    const createNewThread = async (event) => {
        event.preventDefault();

        const userID = GetUserID()

        let imagePath = null;

        if (newThread.image) {
            const fileExt = newThread.image.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`
            const filePath = `thread-images/${fileName}`


            // Upload to Supabase Storage
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('thread-images') // bucket name
                .upload(filePath, newThread.image);

            if (uploadError) {
                alert("Image upload failed: " + uploadError.message);
                return;
            }

            imagePath = uploadData.path; // Save this path in the DB

        }
        const { error } = await supabase
            .from('Thread-Posts')
            .upsert({
                title: newThread.title,
                categories: newThread.categories,
                upvotes: 0,
                description: newThread.description,
                comments: newThread.comments,
                image: imagePath,
                user_id: userID
            });
        if (error) {
            alert("Error: " + error.message);
            return;
        }
        setSuccess(true);
        alert("Thread created successfully!");
        setTimeout(() => window.location = '/explore', 500);
    }

    return (
        <>
            <Container fluid
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: '70vh' }}
            >
                <Row className='w-100 justify-content-center'>
                    <Col xs={12} sm={11} md={9} lg={6} xl={6}>
                        <Card className='m-3'>
                            <Card.Header as='h1'>💫Create New Post💫</Card.Header>
                            <Form onSubmit={createNewThread}>
                                <Card.Body>
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="title"
                                            placeholder="type your title here..."
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
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="categories">
                                        <Form.Label>Categories</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="categories"
                                            placeholder="separate by comma..."
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
                                <Card.Footer>
                                    <Button variant='success' type="submit">✏️Create Post</Button>
                                </Card.Footer>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    )
}
export default CreatePost