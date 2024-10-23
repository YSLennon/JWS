import React, { useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    emailRef.current.focus();
  },[])
  const loginHandler = async () => {
    try{
      const res = await axios.post(
        'http://localhost:3100/user',{
          email: emailRef.current.value,
          password: pwdRef.current.value
        });
      // const res = await axios({
      //   url: 'http://localhost:3100/user',
      //   method: 'post',
      //   data: {
      //     email: emailRef.current.value,
      //     password: pwdRef.current.value
      //   }
      // });

      if(res.data.success){
        localStorage.setItem("token", res.data.token);

        navigate('/')
      } else{
        alert('아디비번 체크')
      }



      // const res = axios.post('http://localhost:3100/user', {
      //       email: emailRef.current.value,
      //       password: pwdRef.current.value
      //     })
      //   .then(result => {
      //     console.log(result);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })
    } catch(err){
        console.log(err);
    }
    };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{ backgroundColor: '#f0f4f8', padding: 3 }}
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
          로그인
        </Typography>
        <TextField label="이메일" inputRef={emailRef} variant="outlined" fullWidth margin="normal" />
        <TextField label="비밀번호" inputRef={pwdRef} variant="outlined" type="password" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={() => {
          // alert(`email: ${emailRef.current.value}, pwd: ${pwdRef.current.value}`)
          loginHandler()
        }}>
          로그인
        </Button>
        <Typography mt={2} align="center">
          계정이 없으신가요? <a href="/join">회원가입</a>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
