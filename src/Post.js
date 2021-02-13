import React, { useState, useEffect } from "react";
import "./Post.css";
import { Avatar, Button } from "@material-ui/core";
import { db } from "./firebase";
import firebase from "firebase";
const Post = ({ postId, signedInuser, userName, caption, imageUrl }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);
  const postComment = (event) => {
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: signedInuser.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          alt={userName}
          src="/static/images/avatar/1.jpg"
        />
        <h3>{userName}</h3>
      </div>
      <img className="post__image" src={imageUrl} alt="post image" />
      <h4 className="post__text">
        <strong>{userName}</strong> {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment, i) => (
          <p key={i}>
            <strong>{comment.username}</strong> {comment.text}
          </p>
        ))}
      </div>
      {signedInuser && (
        <form className="post__commentbox">
          <input
            className="post__input"
            placeholder="Add a comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button
            className="post__button"
            disabled={!comment}
            type="submit"
            onClick={postComment}
          >
            post
          </Button>
        </form>
      )}
    </div>
  );
};

export default Post;
