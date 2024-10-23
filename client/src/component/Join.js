import React, { useReducer, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const initState = {email: '', pwd: '', pwd2: '', name: '', gender: ''}
const reducer = (state, action) => {
  switch(action.type){
    case 'email':
      return {...state, email: action.value}
    case 'pwd':
      return {...state, pwd: action.value}
    case 'pwd2':
      return {...state, pwd2: action.value}
    case 'name':
      return {...state, name: action.value}
    case 'gender':
      return {...state, gender: action.value}
    default:
      throw new Error()
  }
}

function Join() {
  const navigate = useNavigate();
  const [user, dispatch] = useReducer(reducer, initState);
  const joinIn = async() => {
    console.log(user);
    const res = await axios.put('http://localhost:3100/user', user);
    if(res.data.success){
      navigate('/login');
    }else{
      alert('kk')
    }
    console.log(res.data);
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: '#e0f7fa', padding: 3 }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          maxWidth: '400px', 
          padding: '20px',  
          backgroundColor: '#fff', 
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', 
          borderRadius: '8px'  
        }}
      >
        <Typography variant="h4" mb={3} align="center">
          회원가입
        </Typography>
        <TextField label="이메일" onChange={(e)=>{
          dispatch({type: 'email', value:e.target.value});
        }} variant="outlined" fullWidth margin="normal" />
        <TextField label="비밀번호" onChange={(e)=>{
          dispatch({type: 'pwd', value:e.target.value});
        }} variant="outlined" type="password" fullWidth margin="normal" />
        <TextField label="비밀번호 확인" onChange={(e)=>{
          dispatch({type: 'pwd2', value:e.target.value});
        }} variant="outlined" type="password" fullWidth margin="normal" />
        <TextField label="이름" onChange={(e)=>{
          dispatch({type: 'name', value:e.target.value});
        }} variant="outlined" type="normal" fullWidth margin="normal" />
        <TextField label="성별" onChange={(e)=>{
          dispatch({type: 'gender', value:e.target.value});
        }} variant="outlined" type="normal" fullWidth margin="normal" />
        <Button variant="contained" onClick={joinIn} color="primary" fullWidth sx={{ mt: 2 }}>
          회원가입
        </Button>
        <Typography mt={2} align="center">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Join;
