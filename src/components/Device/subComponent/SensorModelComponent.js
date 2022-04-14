import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";   
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import SensorsIcon from '@mui/icons-material/Sensors';


import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { AddDeviceValidate } from "../../../validatation/locationValidation";
import {
  DeviceAddService,
  DeviceEditService,
  SensorDeployDeleteService,
  SensorDeployFetchService,
} from "../../../services/LoginPageService";
import DialogTitle from "@mui/material/DialogTitle";
import computer from "../images/computer.png";
import thermosensor from "../images/thermosensor.png";
import datalogger from "../images/datalogger.png";
import { Paper } from "@mui/material";
import NotificationBar from "../../notification/ServiceNotificationBar";
import { useUserAccess } from "../../../context/UserAccessProvider";


function generate(element) {
    return [0,1,2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
 }));

const SensorModel = ({
  open,
  setOpen,
  deviceData,
  locationDetails,
  device_id,
  analogSensorList,
  digitalSensorList, 
  modbusSensorList,
  setRefreshData
}) => {
  
    const moduleAccess = useUserAccess()('devicelocation');

    const [openNotification, setNotification] = useState({
        status: false,
        type: 'error',
        message: ''
        });

  useEffect(() => {
    //   setOpen(open);
      console.log(typeof(analogSensorList));
      console.log(analogSensorList);
    },[analogSensorList || digitalSensorList || modbusSensorList]);

  const [dense, setDense] = React.useState(false);
  //const [secondary, setSecondary] = React.useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    // -- API call -- //
    
    setOpen(false);
  };

  const deleteSensor = (id) =>{
    SensorDeployDeleteService({id},handleSuccess, handleException);
  }

  const handleSuccess = (dataObject) => {
    setNotification({
      status: true,
      type: 'success',
      message: dataObject.message
    });

    setRefreshData((oldvalue)=>{
        return !oldvalue;
    });

    setTimeout(() => {
      handleClose();
      setOpen(false);
    }, 5000);
  };

  const handleException = (errorObject, errorMessage) => {
    setNotification({
      status: true,
      type: 'error',
      message: errorMessage
    });
  };

  const handleClose = () => {
    setNotification({
        status: false,
        type: '',
        message: ''
    });
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth="lg"
      sx={{ "& .MuiDialog-paper": { width: "100%"}}}
      open={open}
    >

    {console.log(analogSensorList?analogSensorList.length : 0)}
        <DialogTitle>Sensors for device</DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1, width:'100%' , height:300}}>
                <Grid container spacing={2}>       
                    <Grid item xs={12} md={4}>       
                    <div style={{marginLeft:20, textAlign:'center'}}>
                       Analog
                    </div>
                        <Demo>
                            <List dense={dense}>
                                {/* {analogSensorList.length > 0? analogSensorList[0].sensorTag : ''}  */}
                                {analogSensorList.length > 0? 
                                    analogSensorList.map((data, index)=>{
                                        console.log(data.sensorTag);
                                        return(
                                        <ListItem
                                            secondaryAction={moduleAccess.delete &&
                                                <IconButton edge="end" aria-label="delete" 
                                                onClick={()=>{deleteSensor(data.id)}}
                                                >
                                                    <DeleteIcon/>
                                                </IconButton>
                                            }
                                        >   
                                            <ListItemAvatar>
                                                <Avatar>
                                                <SensorsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data.sensorTag}
                                                secondary={data.sensorNameUnit}
                                            />
                                        </ListItem>)
                                    })
                                :
                                <ListItem
                                    style={{display:'block',textAlignLast:'center'}}
                                >
                                    <ListItemAvatar>
                                    </ListItemAvatar>
                                    <span style={{display:'block',textAlignLast:'center'}}>No Analog Sensors</span> 
                                </ListItem> 
                            } 
                            </List>
                        </Demo>
                    </Grid>
                    <Grid item xs={12} md={4} >   
                        <div style={{marginLeft:20, textAlign:'center'}}>
                            Modbus
                        </div>
                            <Demo style={{maxHeight: 300, overflow: 'auto'}} >
                                <List  dense={dense}>                          
                                {modbusSensorList.length > 0? 
                                    modbusSensorList.map((data, index)=>{
                                        console.log(data.sensorTag);
                                        return(
                                        <ListItem
                                            secondaryAction={ moduleAccess.delete &&
                                                <IconButton edge="end" aria-label="delete" 
                                                onClick={()=>{deleteSensor(data.id)}}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                <SensorsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data.sensorTag}
                                                secondary={data.sensorNameUnit}
                                            />
                                        </ListItem>)
                                    })
                                :
                                <ListItem
                                    style={{display:'block',textAlignLast:'center'}}
                                >
                                    <ListItemAvatar>
                                    </ListItemAvatar>
                                    <span style={{display:'block',textAlignLast:'center'}}>No Modbus Sensors</span> 
                                </ListItem> 
                                } 
                                </List>
                            </Demo>
                    </Grid>
                    <Grid item xs={12} md={4}> 
                    <div style={{marginLeft:20, textAlign:'center'}}>
                    Digital
                    </div>
                        <Demo>
                            <List dense={dense}>
                            {digitalSensorList.length > 0? 
                                    digitalSensorList.map((data, index)=>{
                                        console.log(data.sensorTag);
                                        return(
                                        <ListItem
                                            secondaryAction={ moduleAccess.delete &&
                                                <IconButton edge="end" aria-label="delete" 
                                                onClick={()=>{deleteSensor(data.id)}}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                <SensorsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={data.sensorTag}
                                                secondary={data.sensorNameUnit}
                                            />
                                        </ListItem>)
                                    })
                                : 
                                    <ListItem
                                        style={{display:'block',textAlignLast:'center'}}
                                    >
                                        <ListItemAvatar>
                                        </ListItemAvatar>
                                        <span style={{display:'block',textAlignLast:'center'}}>No Digital Sensors</span> 
                                    </ListItem>
                                }
                            </List>
                        </Demo>
                    </Grid>
                    
                </Grid>
            </Box>
            <Box>
            <div className="float-right">
              <div className="rounded-md -space-y-px">
                <Button
                    sx={{ m: 2 }}
                    onClick={(e) => {
                      setOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                
              </div>
            </div>
            </Box>
            
        </DialogContent>

        <NotificationBar
        handleClose={handleClose}
        notificationContent={openNotification.message}
        openNotification={openNotification.status}
        type={openNotification.type} 
      />
    </Dialog>
  );
};

export default SensorModel;
