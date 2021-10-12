import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

import PostCard from '../components/PostCard';
import { useMainContext } from '../context/MainContext';
import { urlToParams } from '../utils/Utils';

const MyPostsPage = () => {
  const location = useLocation();
  const [postData, setPostData] = useState([]);
  const {
    comments, posts,
    _getCommentsByPostId, _getPostsByUserId
  } = useMainContext();

  const { userId, postId } = urlToParams(location.search);

  useEffect(() => {
    _getPostsByUserId(userId);
    if (!comments[postId]) {
      _getCommentsByPostId(postId)
    }
  }, [])

  useEffect(() => {
    if (posts.length) {
      setPostData(posts.filter((v) => v.id == postId))
    }
  }, [posts])

  return (
    <div className='d-flex justify-center flex-wrap py-2'>
      {comments && posts && postData && (
        <div className='px-4 py-2'>
          <PostCard
            postData={postData[0]}
            comments={comments[postId]}
          />
        </div>
      )}
    </div>
  )
}

export default MyPostsPage
