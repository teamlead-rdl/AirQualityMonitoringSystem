import React from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'Date', headerName: 'Date', width: 130 },
    { field: 'Site', headerName: 'Site', width: 130 },
    { field: 'Branch', headerName: 'Branch', width: 130 },
    { field: 'Facilities', headerName: 'Facilities', width: 130 },
    { field: 'Building', headerName: 'Building', width: 130 },
    { field: 'Floor', headerName: 'Floor', width: 130 },
    { field: 'Lab', headerName: 'Lab', width: 130 },
    { field: 'AQI Status ', headerName: 'AQI Status', width: 130 },
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

const ReportSectionForm = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <Stack direction="row" spacing={2} marginTop={1.5}>
                <Box sx={{ minWidth: 320 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Sites</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                        >
                            {/* <MenuItem value={10}>Site</MenuItem>
                            <MenuItem value={20}>Branch</MenuItem>
                            <MenuItem value={30}>Facilities</MenuItem> */}
                        </Select>
                    </FormControl>
                </Box>
                <TextField
                    sx={{ minWidth: 320 }}
                    label="From date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField
                    sx={{ minWidth: 320 }}
                    label="to date"
                    type="date"
                    variant="outlined"
                    required
                    autoComplete="off"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Stack>

            <div style={{ height: 300, width: '100%', marginTop: 20 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
            </div>
            <Stack direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                marginTop={3}
            >
                <Button variant="contained" endIcon={<SendIcon />}>
                    Email
                </Button>
                <Button variant="outlined" startIcon={<DownloadIcon />}>
                    Download
                </Button>
            </Stack>

        </div>
    )
}

export default ReportSectionForm