import React from 'react';
import { Box, Container } from '@mui/material';
import UserListResults from '../components/user/UserListResults';

function UserManagementComponent(props) {
    return (
        <Container maxWidth={false}>
            <Box sx={{ mt: 1 }}>
                <UserListResults/>
            </Box>
        </Container>
    );
}

export default UserManagementComponent;