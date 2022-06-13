import React, { useEffect, useState } from 'react';
import {
  Button, Dialog, DialogContent, DialogTitle,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Grid from '@mui/material/Grid';
import AlertWidget from '../../components/AlertWidget';
import { DeviceIdAlerts } from '../../../../services/LoginPageService';


function AlertModalComponent({alertOpen, setAlertOpen, locationDetails}) {

  const [dataList, setDataList] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    DeviceIdAlerts({ device_id: locationDetails.device_id }, fetchAlertListSuccess, fetchAlertListException);
  },[locationDetails,refreshData]);

  const fetchAlertListSuccess = (dataObject) => {  
    setDataList(dataObject.data);
  }

  const fetchAlertListException = () => {
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { minWidth: '95%', height:'95vh' } }}
      maxWidth="lg"
      open={alertOpen}
    >
      <DialogTitle>
        Active alerts
      </DialogTitle>
      <DialogContent>       
        <Grid
          item
          xs={12}
          sm={6}
          md={12}
          lg={12}
          xl={12}

          sx={{
            padding: 1,
            marginLeft: 1,
          }}          
        >
          <DialogContent>
              <div style={{
                height: 390,
                width: '100%',
                margin: '0px',
                '& .super-app.Pass': {
                  backgroundColor: '#d47483',
                  color: '#1a3e72',
                  fontWeight: '600',
                },
              }}
              >
                <AlertWidget dataList={dataList} setRefreshData={setRefreshData} />
              </div>
          </DialogContent>  
            <div className='float-right'>
            <Button
              sx={{ m: 1 }}
              size="large"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>           
        </Grid>    
                   
      </DialogContent>
    </Dialog>
  );
}

export default AlertModalComponent;
