import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DeleteIcon from '@mui/icons-material/Delete';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
    const token = localStorage.getItem("token");;
    
    const [feedList, setFeedList] = useState([]);
    const getFeedList = async () => {
        const res = await axios.get('http://localhost:3100/feed', {
            headers: {token}
        });
        
        setFeedList(res.data.result);
    }
    const fnDelete = async (id) => {
            if(window.confirm(id)){
                const res = await axios.delete(`http://localhost:3100/feed/${id}`);
                if(res.data.success){
                    alert(res.data.message);
                    getFeedList();
                }
            }   
        }
    const fnFavorite = async (id) => {
            const res = await axios.put(`http://localhost:3100/feed/${id}`);
            if(res.data.success){
                getFeedList();
            }
        }
        
    useEffect(() => {
        getFeedList();
        // 토큰 꺼내서 decode!
        // const decoded = jwtDecode(token);
        // console.log(decoded)

    }, [])
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            sx={{ backgroundColor: '#f0f4f8' }}
            >
            {feedList.map((feed) => (
                <Paper key={feed.id} sx={{ width: '100%', maxWidth: '600px', mb: 2, p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    {feed.userId}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {feed.content}
                </Typography>
                <Typography variant="caption" color="textSecondary" gutterBottom>
                    {new Date(feed.cdatetime).toLocaleString()}
                </Typography>

                <Box display="flex" justifyContent="space-between" mt={1}>
                    <Box>
                    <IconButton onClick={() => {fnFavorite(feed.id)}} color="primary">
                        <ThumbUpIcon />{feed.favorite !==0 && <span >{feed.favorite}</span>}
                    </IconButton>
                    <IconButton onClick={() => {fnDelete(feed.id)}} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                    </Box>
                </Box>
                </Paper>
            ))}
            </Box>
    );
};

export default Home;