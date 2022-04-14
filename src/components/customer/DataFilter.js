import MUIDataTable from "mui-datatables";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


function App1() {
  const [responsive, setResponsive] = useState("vertical");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [searchBtn, setSearchBtn] = useState(true);
  const [downloadBtn, setDownloadBtn] = useState(true);
  const [printBtn, setPrintBtn] = useState(true);
  const [viewColumnBtn, setViewColumnBtn] = useState(true);
  const [filterBtn, setFilterBtn] = useState(true);

 const columns = [
 {
  name: "username",
  label: "User Name",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "userid",
  label: "User Id",
  options: {
   filter: false,
   sort: true,
  }
 },
   {
  name: "empid",
  label: "Employee Id",
  options: {
    
   filter: false,
   sort: true,
  }
 },
 {
  name: "empname",
  label: "Employee Name",
  options: {
   filter: true,
   sort: true,
  }
 },

 {
  name: "userrole",
  label: "User Role",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "emailid",
  label: "Email Id",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "phoneno",
  label: "Phone Number",
  options: {
   filter: true,
   sort: true,
  }
 },
 {
  name: "Edit",
  label: "EDIT",
  options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
              <Button aria-label="edit" onClick={() => {
                alert(data[dataIndex].userid)
              }}>
               <IconButton >
                  <EditIcon sx={{color:'green'}}/>
                </IconButton>
                      
              </Button>              
          );
       }
  }
 },
 {
  name: "Delete",
  label: "DELETE",
  options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          return (
              <Button aria-label="edit" onClick={() => {
                alert(data[dataIndex].userid)
              }}>
               <IconButton >
                  <DeleteIcon sx={{color:'red'}}/>
                </IconButton>
                      
              </Button>              
          );
       }
  }
 },
];

const data = [
  {username:"prajna",userid:1,empid:1,empname:"prajna",userrole:"admin",emailid:"prajna@gmail.com",phoneno:9898787890},
  {username:"ranjith",userid:2,empid:2,empname:"ranjith",userrole:"admin",emailid:"ranjith@gmail.com",phoneno:9898787890},
  {username:"abhi",userid:3,empid:3,empname:"abhi",userrole:"admin",emailid:"abhi@gmail.com",phoneno:9898787890},

];

  const options = {
    search: searchBtn,
    download: downloadBtn,
    print: printBtn,
    viewColumns: viewColumnBtn,
    filter: filterBtn,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    onTableChange: (action, state) => {
      console.log(action);
      console.dir(state);
    },
    
  };

  return (
    <ThemeProvider theme={createTheme(
{
      overrides: {
        MUIDataTable: {
        head: {
          backgroundColor: 'purple',
        }
      },
        
    }
}
      
    )}>
      <MUIDataTable
        title={"View Employee List"}
        data={data}
        columns={columns}
        options={options}
        options={{
          
        selectableRows: false // <===== will turn off checkboxes in rows
      }}
      
      />
    </ThemeProvider>
  );
}

ReactDOM.render(<App1 />, document.getElementById("root"));
export default App1;