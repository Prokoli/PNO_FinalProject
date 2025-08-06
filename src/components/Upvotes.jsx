import { supabase } from './../client'
import { useState } from 'react'
import { Button } from 'react-bootstrap'


const Upvote = (props) => {
    const [count, setCount] = useState(props.upvotes)

    const updateCount = async (event) => {
        event.preventDefault()
        setCount((count) => count + 1)

        await supabase
            .from('Thread-Posts')
            .update({ upvotes: count + 1 })
            .eq('id', props.id)
    }

    return (
        <>
            <Button
                className='like-button m-2'
                variant='success'
                size='sm'
                style={{ fontSize: '0.9rem', padding: '2px 6px' }}
                onClick={updateCount}
            >
                🔺{count}
            </Button>
        </>
    )
}
export default Upvote