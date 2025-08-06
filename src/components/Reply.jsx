import { supabase } from './../client'
import { useState, useEffect } from 'react'
import { ListGroupItem, Button, Form } from 'react-bootstrap'

const Reply = (props) => {

    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);

    useEffect(() => {
        // Fetch comments for the current thread from Supabase
        const fetchComments = async () => {
            if (!props.thread?.id) return;
            const { data, error } = await supabase
                .from('Thread-Posts')
                .select('comments')
                .eq('id', props.thread.id)
                .single();
            if (data && data.comments) {
                setComments(data.comments);
            } else {
                setComments([]);
            }
        };
        fetchComments();
    }, [props.thread]);

    const handleAddComment = async () => {
        if (!newComment.trim() || !props.thread?.id) return;
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        setNewComment('');
        // Update comments in Supabase
        await supabase
            .from('Thread-Posts')
            .update({ comments: updatedComments })
            .eq('id', props.thread.id);
    };
    return (
        <>
            <ListGroupItem>
                <input
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Add your username to the comment..."
                    style={{ width: '80%' }}
                    aria-label='add-comment'
                />
                <Button
                    variant="success"
                    size="sm"
                    onClick={async () => {
                        await handleAddComment();
                        window.location.reload(); // Refresh the page after adding a comment
                    }}
                    style={{ marginLeft: '8px' }}
                >
                    Submit
                </Button>
            </ListGroupItem>
        </>
    )
}
export default Reply