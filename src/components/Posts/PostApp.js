import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostApp.css';
import defaultAvatar from '../../img/images.png';

const PostApp = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:4000/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }
    if (newPost.trim()) {
      const user = JSON.parse(localStorage.getItem('user'));
      const post = {
        author: user.username,
        avatar: 'img/images.png',
        content: newPost,
        timestamp: 'Just now',
        comments: 0
      };

      try {
        const response = await fetch('http://localhost:4000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        });

        if (response.ok) {
          fetchPosts();
          setNewPost('');
        }
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getAvatarSrc = (avatar) => {
    if (avatar.startsWith('http') || avatar.startsWith('https')) {
      return avatar;
    } else {
      try {
        return require(`../../src/${avatar}`);
      } catch (error) {
        return defaultAvatar;
      }
    }
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem('user');
  };

  const requireLogin = () => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  };

  return (
    <div className="post-app">
      {isLoggedIn() ? (
        <>
          <h1>Hello {JSON.parse(localStorage.getItem('user')).username}</h1>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <h1>Welcome Guest</h1>
      )}
      <p className="subtitle">How are you doing today? Would you like to share something with the community 🤗</p>

      <div className="create-post">
        {/* <h2>Create post</h2> */}
        {/* <form onSubmit={handlePostSubmit}>
          <div className="input-container">
            <img src={defaultAvatar} alt="Chat" className="chat-icon" />
            <input
              type="text"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="How are you feeling today?"
            />
          </div>
          <button type="submit" className="post-button">Post</button>
        </form> */}
        <form onSubmit={handlePostSubmit} className="">
  <h2>Create post</h2>
  <div className="input-container_postform">
    <img src={defaultAvatar} alt="Chat" className="chat-icon" />
    <input
      type="text"
      value={newPost}
      onChange={(e) => setNewPost(e.target.value)}
      placeholder="How are you feeling today?"
    />
  </div>
  <button type="submit" className="post-button">Post</button>
</form>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <img src={getAvatarSrc(post.avatar)} alt={post.author} className="avatar" />
              <div className="post-info">
                <span className="author">{post.author}</span>
                <span className="timestamp">{post.timestamp}</span>
              </div>
              <button className="more-options" onClick={requireLogin}>•••</button>
            </div>
            <div className="post-content">
              <p>
                {post.emoji && <span className="post-emoji">{post.emoji}</span>}
                {<span>{post.content}</span>}
              </p>
            </div>
            <div className="post-footer">
              <span className="comments" onClick={requireLogin}>💬 {post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostApp;