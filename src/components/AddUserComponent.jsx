import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FetchEmployees, FetchUserService } from './../services/LoginPageService';
import UserModal from './subcomponents/UserModalComponent';

const people = [
  {
    id:'1',
    empId: 'Emp001',
    email: 'abhi.dev@rdl.com',
    mobileno: '9874563210',
    empname: 'Abhi Shek',
    emprole: 'Admin',
    companyCode : 'rdl001'
  },
  {
    id:'2',
    empId: 'Emp002',
    email: 'prajna.dev@rdl.com',
    mobileno: '9874563210',
    empname: 'Prajna Rai',
    emprole: 'Manager',
    companyCode : 'goal001'
  },
  {
    id:'3',
    empId: 'Emp003',
    email: 'prajwal.dev@rdl.com',
    mobileno: '9874563210',
    empname: 'Prajwal D',
    emprole: 'User',
    companyCode : 'bmw001'
  },
  {
    id:'4',
    empId: 'Emp004',
    email: 'ranjith.dev@rdl.com',
    mobileno: '9874563210',
    empname: 'Ranjith K',
    emprole: 'Admin',
    companyCode : 'syska001'
  },
]

const AddUser = () => {
  const [open, setOpen] = useState(false);

  const handleSuccess = (data) => {
    setPeople(data);
  }
  
  const handleException = (errorObject) => {
  }

  useEffect(()=>{
    FetchEmployees(handleSuccess, handleException);
  },[]);  
  
  const [isAddButton, setIsAddButton] = useState(true);
  const [data, setData] = useState([]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Employee Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email Id
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Full Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                   {people.map((person)=>(
                     <tr key={person.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.empId}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-800">
                            {person.mobileno}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {person.emprole}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {person.empname}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a 
                          className="text-indigo-600 hover:text-indigo-900"
                          onClick={(e)=>{
                            setIsAddButton(false);
                            setData(person);
                            setOpen(true);
                          }}
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                   ))}
                  {/* })} */}
                  
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Button
        onClick={()=>{
          alert('clicked');
          setIsAddButton(true);
          setData([]);
          setOpen(true);
        }}
      >
        Add User
      </Button>
      <Button
        onClick={async()=>{
          const response = await FetchUserService()
        .then(response =>
            response.json()
        ).then(data => {
            return data;
        }).catch(error => {
            return error;
        });
        }}
      >
        View User List
      </Button>

      <UserModal
        isAddButton={isAddButton}
        open={open}
        setOpen={setOpen}
        data={data}
      />
    </div>
  );
};

export default AddUser;
