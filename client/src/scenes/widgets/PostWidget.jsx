import React from "react";
import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider, IconButton, InputBase, Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import UserImage from "components/UserImage";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePathPost,
  userPicturePathPost,
  likes,
  comments,
  updatedAt,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [comment,setComment]=useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const {_id,picturePath} = useSelector((state) => state.user);
  const sameUser=_id===postUserId;
   const timeStamps=Date.parse(updatedAt);
    const time=new Date(timeStamps);
    //date 
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = new Intl.DateTimeFormat('en-US', options).format(time);
 //time in hour Am ,Pm
 
 const datenow = new Date(Date.now()-time);
 const resultmin=datenow.getMinutes();

 const resulthour=Math.floor(datenow/3600000);

 


  
 

 let date;
 if((Date.now()-time)>=24*1200000){
  date=dateString;
 }
 else if((Date.now()-time)>=60*60000){
  date=`${resulthour}h ago`;
 }
else if((Date.now()-time)>=60*1000){
 date=`${resultmin} min ago`;
}
else {
  date="now";
}


    //getTimezoneOffset();
    //toLocaleDateString('en-US');
    
    //const fdf=new Date(timestamps);
  

  
  const theme = useTheme();
  const main = theme.palette.neutral.main;
  const primary = theme.palette.primary.main;
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  const patchComment = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId,
      comment:comment }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    setComment("");
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        postId={postId}
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePathPost}
        date={date}
        sameUser={sameUser}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePathPost && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePathPost}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        
        <WidgetWrapper sx={{backgroundColor:background}}>
          <Box >
            <FlexBetween gap="1rem"
            >
          
          <UserImage image={picturePath} />
          <InputBase
            placeholder="Write your comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            sx={{
              width: "100%",
              backgroundColor: alt,
              borderRadius: "2rem",
              padding: "0.5rem 3rem",
            }}
          />
           <Button
            disabled={!comment}
            onClick={()=>patchComment()}
            sx={{
              color: theme.palette.background.alt,
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
            }}
          >
            POST
          </Button>
          </FlexBetween>
          <Box  >
          {comments.map((comment, i) => (
            <Box marginTop ="1rem"key={`${name}-${i}`}
           >

              <Friend userPicturePath={comment.picturePath}
                name={`${comment.firstName} ${comment.lastName}`}
                friendId={comment.userId}
                searchComponent="true"/>
              
              <Typography sx={{ color: main, fontSize:"16px",  pl: "4.5rem" }}>
                {comment.comment}
              </Typography>
             
          
            </Box>
          ))}
          </Box>
          </Box>
         
          </WidgetWrapper>
        
        
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;