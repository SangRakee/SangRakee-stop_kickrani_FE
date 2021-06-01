import React from 'react';

const Posts = (posts) => {
    return (
        <>
            <ul>
                { posts.map(post=>(
                    <li key={post.kickId}>
                        {post.kickId}
                    </li>
                ))}
            </ul>
        </>
    );
};
export default Posts;