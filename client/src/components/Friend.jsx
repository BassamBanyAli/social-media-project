import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined,Delete, Edit } from "@mui/icons-material";
import ListIcon from '@mui/icons-material/List';
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends, setPosts } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { useState,useEffect,useRef } from "react";

const Friend = ({ key,friendId, name, subtitle, userPicturePath,date,postId,searchComponent,sameUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listRef = useRef(null);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);


  
  const [isOpen,setIsOpen]=useState(false);
  

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };

  const deletePost=async()=>{
    const response=await fetch(
      `http://localhost:3001/posts/${postId}/deletePost`
    ,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      }
      );
      const data = await response.json();
      dispatch(setPosts({posts:data}))
      
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  

  const handleListClick = () => {
    setIsOpen(!isOpen);
  };


  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {date}
          </Typography>
          
        </Box>
      </FlexBetween>
      {!searchComponent&&
      !sameUser&&(
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
      )}
      {!searchComponent&&sameUser&&(
        //<FormControl variant="standard">

        <IconButton
        onClick={()=>setIsOpen(!isOpen)}>
          <ListIcon/>
        </IconButton>
        
          
        

        //display={isOpen ? 'block' : 'none'}
        )}
        
        <List style={{ display: isOpen ? 'block' : 'none' }}>   
            <ListItem disablePadding onClick={handleListClick}>
              <ListItemButton>
                <ListItemIcon>
                  <Edit/>
                </ListItemIcon>
                <ListItemText primary="Edit the post"/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding onClick={handleListClick}>
        <ListItemButton onClick={() => deletePost()}>
        <ListItemIcon>
        <Delete/>
            </ListItemIcon>
            <ListItemText primary="Delete the post" />
            </ListItemButton>
            </ListItem>
          
          </List>
         
        
       
        
          
        
        
        
        
        
       
        
      
      
        
        

      
    </FlexBetween>
  );
};

export default Friend;