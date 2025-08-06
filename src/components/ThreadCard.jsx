import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router'
import { Card, Badge, Button } from 'react-bootstrap'
import './ThreadCard.css'
import Upvotes from './Upvotes'
import { GetUserID } from './../utils/user'

const ThreadCard = (props) => {

    const isUser = (GetUserID() === props.user_id)
    const createTime = new Date(props.create_time).toLocaleString()
    const categories = Array.isArray(props.categories)
        ? props.categories
        : typeof props.categories === 'string'
            ? props.categories.split(',').map((s) => s.trim())
            : [];

    return (
        <>
            <Card className='mb-4 shadow-sm border-heavy'>
                <Card.Header>
                    <Card.Title className='fw-bold fs-4'>{props.title}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className='d-flex justify-content-end mb-2'>{createTime}</Card.Subtitle>
                    <section className='d-flex align-items-center'>
                        <Card.Text>
                            <Upvotes upvotes={props.upvotes} id={props.id} />
                        </Card.Text>
                        <div className='category-section mb-3'>
                            {categories.map((category, index) => (
                                <Badge
                                    key={index}
                                    bg='warning'
                                    text='dark'
                                    className='me-2'
                                    style={{ fontWeight: '500', color: 'yellow' }}
                                >
                                    {category}
                                </Badge>
                            ))}

                        </div>
                    </section>

                    <Card.Footer>
                        <Link to={`/thread/${props.id}`}>
                            <Button variant='outline-light'>Open Thread</Button>
                        </Link>
                        {isUser &&
                            <Link to={`/thread/${props.id}/edit-post`}>
                                <Button
                                    variant='outline-light'
                                    className='mt-2'
                                >
                                    Update Thread
                                </Button>
                            </Link>
                        }
                    </Card.Footer>

                </Card.Body>

            </Card>

        </>
    )
}
export default ThreadCard