import { Grid } from '@mui/material'
import React from 'react'
import UserResetPassword from '../components/UserResetPassword'

const ForcePasswordReset = () => {
  return (
    <Grid
      container
      spacing={0}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item xs={12} sm={6}>
        <UserResetPassword padding={70}/>
      </Grid>   
      
    </Grid> 
  )
}

export default ForcePasswordReset