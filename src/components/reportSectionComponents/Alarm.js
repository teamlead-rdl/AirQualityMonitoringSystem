import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/material/Button';

const columns = [
    { field: 'date', headerName: 'Date', width: 70 },
    { field: 'time', headerName: 'Time', width: 130 },
    { field: 'aqmsId', headerName: 'AQMI/O Id', width: 130 },
    { field: 'location', headerName: 'Location', width: 90, },
    { field: 'parameter', headerName: 'Parameter', width: 90, },
    { field: 'alarmType', headerName: 'Alarm Type', width: 90, },
    { field: 'reason', headerName: 'Reason', width: 90, },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Alarm = () => {

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <TextField sx={{ minWidth: 320 }}
                    label="From date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField sx={{ minWidth: 320 }}
                    label="to date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">AQMI/AQMO</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Stack>
            <div style={{ height: 270, width: '100%', marginTop: 25 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <Stack
                marginTop={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}>
                <Button variant="contained" startIcon={<DownloadIcon />}>
                    Download
                </Button>
            </Stack>
        </div>
    )
}

export default Alarm