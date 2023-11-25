import { Box, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setSearch } from "state";
import Navbar from "scenes/navbar/navbar";
import UserWidget from 'scenes/widgets/UserWidget';
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from 'scenes/widgets/PostsWidget';
import AdvertWidget from 'scenes/widgets/AdvertWidget';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import Friend from 'components/Friend';
import state from 'state';

const Searchpage = () => {
  const isNonMobileScreens= useMediaQuery("(min-width:1000px)");
  const dispatch=useDispatch();
  const {_id,picturePath}=useSelector((state)=>state.user);
  const token=useSelector((state)=>state.token);
  const search=useSelector((state)=>state.search);
  console.log(search);  
  





  
  
  return (
  <Box>
    <Navbar/>
    <Box 
    width="100%"
    padding="2rem 6%"
    display={isNonMobileScreens?"flex":"block"}
    gap="'0.5rem"
    justifyContent="space-between"
    >
      <Box flexBasis={isNonMobileScreens?"26%":undefined}>
        <UserWidget userId={_id} picturePath={picturePath}/>
      </Box>

      <Box 
      flexBasis={isNonMobileScreens?"42%":undefined}
      mt={isNonMobileScreens?undefined:"2rem"}
      ml="3rem"
      >
       {search.map((index)=>
       <Friend friendId={index._id} name={`${index.firstName} ${index.lastName}`}
        userPicturePath={index.picturePath}/>
       )}
      
      </Box>
    {isNonMobileScreens&&
        <Box flexBasis="26%" ml="3rem">
          <AdvertWidget/>
          <Box m="2rem 0"/>
          

        </Box>}
      


    </Box>
  </Box>
  );
};
export default Searchpage;
