import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import DataTable from 'datatables.net-dt';
import { useSelector } from 'react-redux';

const UserTable = () => {
  const userData= useSelector((state) => state.users);
  console.log("UserTable :: " + JSON.stringify(userData, null, 2));
  let table = new DataTable('#myTable');
  const tableRef = useRef(table);

  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable({
      data: userData,
      columns: [
        { title: 'Name', data: 'personalDetails.name' },
        { title: 'Age', data: 'personalDetails.age' },
        { title: 'Sex', data: 'personalDetails.sex' },
        { title: 'Mobile', data: 'personalDetails.mobile' },
        { title: 'GovtIdType', data: 'personalDetails.govtIdType' },
        { title: 'Address', data: 'addressDetails.address' },
        { title: 'State', data: 'addressDetails.state' },
        { title: 'City', data: 'addressDetails.city' },
        { title: 'Country', data: 'addressDetails.country' },
      ],

    });
    return () => {
      dataTable.destroy();
    }
  }, [userData]); 

  return (
    <div className='flex items-center justify-center w-screen'>
      <div className='border-4 p-4 m-4 shadow-sm bg-orange-50 rounded-md '>
        <h1 className='text-4xl text-center border-gray-300'>User Table</h1>
        <table ref={tableRef}>

        </table>
      </div>
    </div>
  );
};

export default UserTable;
