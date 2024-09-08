import { useState, useEffect } from 'react';
import data from './data.json';

function App() {
  const [employee, setEmployee] = useState(data);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    contactNumber: '',
    address: '',
  });

  // Load employee data from imported JSON
  useEffect(() => {
    setEmployee(data);
    // Select first employee by default
  }, []);

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  // Handle form submission to add a new employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmp = {
      ...newEmployee,
      id: employee.length + 1,
      age: new Date().getFullYear() - parseInt(newEmployee.dob.slice(0, 4), 10),
      imageUrl: newEmployee.imageUrl || 'https://cdn-icons-png.flaticon.com/512/0/93.png',
    };
    setEmployee([...employee, newEmp]);
    setNewEmployee({
      firstName: '',
      lastName: '',
      dob: '',
      email: '',
      contactNumber: '',
      address: '',
    });
    setShowAddModal(false); // Close the modal after adding
  };

  // Handle employee deletion
  const handleDeleteEmployee = (id) => {
    const updatedEmployees = employee.filter((emp) => emp.id !== id);
    setEmployee(updatedEmployees);

    // Clear selectedEmployee if the deleted employee was selected
    if (selectedEmployee?.id === id) {
      setSelectedEmployee(null); // Unset the selected employee
    }
  };

  return (
    <>
      <div className='flex justify-between p-5'>
        <h1 className='font-bold text-3xl'>Employee Database Management</h1>
        <button className='bg-zinc-400 border' onClick={() => setShowAddModal(true)}>
          Add Employee
        </button>
      </div>

      <div className='flex justify-between p-20 border'>
        <div className='border w-[40%]'>
          <h1>Employee List</h1>
          <hr />
          <div>
            {employee.map((item, i) => (
              <div
                className='flex flex-row p-2 h-15 border hover:bg-slate-200'
                key={i}
                onClick={() => selectEmployee(item)}
              >
                <h1 className='text-xl'>{item.firstName}</h1>
                <h1 className='pl-2 text-xl'>{item.lastName}</h1>
                <div className='ml-[30%] fixed'>
                  <button onClick={() => handleDeleteEmployee(item.id)} className=''>
                    ❌
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right-side: Employee Information */}
        <div className='border w-[60%]'>
          <h1 className='pl-20'>Employee Information</h1>
          <hr />
          {selectedEmployee ? (
            <div className='p-20'>
              <img
                src={selectedEmployee.imageUrl}
                alt='employee'
                style={{ width: '100px', borderRadius: '50%' }}
              />
              <h3>
                {selectedEmployee.firstName} {selectedEmployee.lastName} ({selectedEmployee.age})
              </h3>
              <p>Address: {selectedEmployee.address}</p>
              <p>Email: {selectedEmployee.email}</p>
              <p>Contact: {selectedEmployee.contactNumber}</p>
              <p>DOB: {selectedEmployee.dob}</p>
            </div>
          ) : (
            <div className='p-20'>
              <p>No Employee Selected</p>
            </div>
          )}
        </div>

        {/* Add New Employee Modal */}
        {showAddModal && (
          <div className='bg-[rgba(0,0,0,0.5)] flex justify-center items-center fixed inset-0'>
            <div className='bg-white p-20 w-[30%]'>
              <form onSubmit={handleAddEmployee}>
                <input
                  className='w-[90%] p-3 border mt-2'
                  type='text'
                  placeholder='First Name'
                  value={newEmployee.firstName}
                  onChange={(e) => setNewEmployee({ ...newEmployee, firstName: e.target.value })}
                  required
                />
                <input
                  className='w-[90%] p-3 border mt-2'
                  type='text'
                  placeholder='Last Name'
                  value={newEmployee.lastName}
                  onChange={(e) => setNewEmployee({ ...newEmployee, lastName: e.target.value })}
                  required
                />
                <input
                  className='w-[90%] p-3 border mt-2'
                  type='date'
                  placeholder='Date of Birth'
                  value={newEmployee.dob}
                  onChange={(e) => setNewEmployee({ ...newEmployee, dob: e.target.value })}
                  required
                  max={`${new Date().getFullYear() - 18}-${new Date().toISOString().slice(5, 10)}`}
                />
                <input
                  className='w-[90%] p-3 border mt-2'
                  type='email'
                  placeholder='Email'
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  required
                />
                <input
                  className='w-[90%] p-3 border mt-2'
                  type='text'
                  placeholder='Contact Number'
                  value={newEmployee.contactNumber}
                  onChange={(e) => setNewEmployee({ ...newEmployee, contactNumber: e.target.value })}
                  required
                />
                <input
                  className='w-[90%] p-3 border mt-2'
                  type='text'
                  placeholder='Address'
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee({ ...newEmployee, address: e.target.value })}
                  required
                />
                <div className='flex justify-between mt-5'>
                  <button type='submit' className='w-[60%] p-2 bg-blue-500 text-white rounded-lg'>
                    Add Employee
                  </button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className='w-[30%] p-2 bg-red-500 text-white rounded-lg'
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
