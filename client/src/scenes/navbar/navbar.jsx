import { useState } from "react";
import React from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Autocomplete,
  TextField,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import state, { setMode, setLogout,setSearch } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";


const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const token=useSelector((state)=>state.token);
  const friends=useSelector((state)=>state.user.friends);
  //const [{_id}]=useSelector((state)=>state.search);
  //console.log(_id);
  

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  
  
  const [input, setInput] = useState('');
  const [open,setOpen]=useState(false);
  
 


 

  const fullName = `${user.firstName} ${user.lastName}`;
  const firstName="Ahmad";
  
  
  

  const searchUser = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${input}/getUserBySearch`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setSearch({search:data}))
    
  };

  const handleInput = (event,value) => {

    setOpen(value);
    
    console.log(event.target.value);
    setInput(event.target.value);
    friends.map((friend)=>{
      if(`${friend.firstName} ${friend.lastName}`===event.target.value){
        navigate(`/profile/${friend._id}`);
         navigate(0);
      }
    })
  }
  const handleApiSearch=()=>{
    searchUser();
   navigate("/search");
    navigate(0);
     
  }
  
    
  


const bassam="";

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Aspire Media
        </Typography>
        {isNonMobileScreens && (
         <FlexBetween
          sx={{
          
            autoComplete:"nope"
            

          }}>
          
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={
              friends}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
            autoHighlight
            open={open}
            renderOption={(props, option) => (
              <li {...props}>
                <Friend userPicturePath={option.picturePath}
                name={`${option.firstName} ${option.lastName}`}
                friendId={option._id}
                searchComponent="true" />
              </li>
            )}
      
            
      
            renderInput={(params) =>  
            <TextField {...params}
              label="Search..."
              
              onChange={(event)=>handleInput(event,params.inputProps.value)}
              onSelect={(event)=>handleInput(event,params.inputProps.value)}
              autoComplete="off"
           
     
              sx={{
                width: "350px",
                margin: "5px",
                fontWeight:"100px",
                borderRadius:"200px",
              }} />}
          />
          
          
        </FlexBetween>
        
        )}
        <IconButton
        onClick={handleApiSearch}
       fontWeight="bold"
        size="large"
        color="dark"
        sx={{
          
          "&:hover": {
            //color: primaryLight,
            cursor: "pointer",
          },
        }}>
            <Search
            fontSize="inherit"/>
          </IconButton>
        
      </FlexBetween>
      
      

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "160px",
                borderRadius: "0.75rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.1rem",
                  width: "2rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="20px"
          bottom="150px"
          height="520px"
          zIndex="10"
          width="200px"
          //maxWidth="500px"
          //minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;