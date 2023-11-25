import { Box,Typography,useTheme,useMediaQuery,IconButton } from '@mui/material';
import { LightMode,DarkMode } from '@mui/icons-material';
import React from 'react';
import Form  from "./Form";

import { setMode } from 'state';
import { useDispatch } from 'react-redux';
const LoginPage = () => {

  const dispatch=useDispatch();
  const theme=useTheme();
  const isNonMobileScreens=useMediaQuery("(min-width:1000px)");
  const dark = theme.palette.neutral.dark;

  

  return (
  <Box>
<Box 
display="Flex"
justifyContent="center"
//alignItems="center"
 width ="100%" 
 backgroundColor={theme.palette.background.alt} 
 p="1rem 6%" 
 //textAlign="center"
>
  <Typography
          mr="1rem"
          fontWeight="bold"
          fontSize="40px"
          color="primary"
          >
          Aspire Media
        </Typography>

        <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
        </Box>
        <Box
        width={isNonMobileScreens?"50%":"93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="2rem"
        backgroundColor={theme.palette.background.alt}
        >
          <Typography fontWeight="500" variant="h5" sx={{mb:"1.5rem"}}>
            Welcome to Aspire Media

          </Typography>
          <Form/>

 


        </Box>

  </Box>
  );
};
export default LoginPage;
