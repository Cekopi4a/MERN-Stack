import { Outlet, useNavigate,useLocation,Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { useState,useEffect } from 'react';
import {useAuthContext} from '../../hooks/useAuthContext';

const Users = () => {
    const [users,setUsers] = useState([]);
    const { user } = useAuthContext();
  const [selectedUser, setSelectedUser] = useState(null);
 
  const EditUserHandler = (user) => {
    setSelectedUser(user);
    $('#editUserModal').modal('show'); // Използване на jQuery за показване на модалния прозорец
  };
  
  const handleSaveUser = async () => {
    // Тук добавете логика за изпращане на редактирания потребител към сървъра
    try {
      const response = await fetch(`http://localhost:5050/api/users/editUser/${userId}`,{
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
      body: JSON.stringify()
  });

  const result = await response.json();

  return result;
}catch (error) {
  console.error('Възникна грешка при извличане на поръчки:', error.message);
  // Тук можете да добавите логика за обработка на грешката, като показване на съобщение за потребителя
}
    console.log('Edited user:', editedUser);
    handleCloseModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
    
    useEffect(() => {
        const fetchOrders = async () => {
          try {
            const response = await fetch(`http://localhost:5050/api/users/getAllUsers`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
              },
            });
            if (!response.ok) {
              throw new Error('Неуспешна заявка за поръчки');
            }
            const json = await response.json();
      
            if (Array.isArray(json)) {
              setUsers(json); // ако json е върнат като масив
            } else {
              // ако поръчките са в друг формат, конвертирайте ги в масив
              const ordersArray = Object.values(json.ordersByClient).flat();
              setOrders(ordersArray);
            }
          } catch (error) {
            console.error('Възникна грешка при извличане на поръчки:', error.message);
            // Тук можете да добавите логика за обработка на грешката, като показване на съобщение за потребителя
          }
        };

      
        fetchOrders();
    }, [users]); // Празен масив от зависимости, ако не се изисква повторно извикванe

    const AddUserHandler = async (e) => {
      e.preventDefault();

      const userData = Object.fromEntries(new FormData(e.currentTarget))
    
          try {
        const response = await fetch(`http://localhost:5050/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(userData)
      });
      const result = await response.json();

      setUsers(users => [...users,result]);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Успешно регистирахте нов потребител!",
        showConfirmButton: false,
        timer: 2500
      });
      if (!response.ok) {
        throw new Error('Неуспешна заявка за добавяне!');
      }
      alert('Потребителя беше успешно добавен!');
      
    } catch (error) {
      console.error('Грешка при одобряване на поръчка:', error);
      alert('Грешка при одобряване на поръчка. Моля, опитайте отново.');
    }
  };


  const deleteUser = async (userId) => {
		const hasconfirm = confirm(`Are you sure you want to delete user with ID-${userId}`);
	  
		  if(hasconfirm){
			  try {
          const response = await fetch(`http://localhost:5050/api/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${user.token}`
      },
    });

    const data = await response.json();
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Успешно изтрихте потребител!",
      showConfirmButton: false,
      timer: 2500
    });
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete user');
    }

    console.log('User deleted successfully:', data.user);
    // Можете да използвате реактивна логика за презареждане на данните или обновяване на UI
  } catch (error) {
    console.error('Error deleting user:', error.message);
    // Обработка на грешка и показване на съобщение към потребителя
  }
};
        
		  
		};

    const blockUser = async (userId) => {
      const hasconfirm = confirm(`Are you sure you want to block user with ID-${userId}`);
      
        if(hasconfirm){
          try {
            const response = await fetch(`http://localhost:5050/api/users/blockUser/${userId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
        },
      });
  
      const data = await response.json();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Успешно блокирахте потребител!",
        showConfirmButton: false,
        timer: 2500
      });
      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete user');
      }
  
      console.log('User deleted successfully:', data.user);
      // Можете да използвате реактивна логика за презареждане на данните или обновяване на UI
    } catch (error) {
      console.error('Error deleting user:', error.message);
      // Обработка на грешка и показване на съобщение към потребителя
    }
  };
};

const unblockUser = async (userId) => {
  const hasconfirm = confirm(`Are you sure you want to unblock user with ID-${userId}`);
  
    if(hasconfirm){
      try {
        const response = await fetch(`http://localhost:5050/api/users/unBlockUser/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
    },
  });

  const result = await response.json();

  setUsers(users => [...users,result]);
  Swal.fire({
    position: "top",
    icon: "success",
    title: "Успешно отблокирахте потребител!",
    showConfirmButton: false,
    timer: 2500
  });
  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete user');
  }

  console.log('User deleted successfully:', data.user);
  // Можете да използвате реактивна логика за презареждане на данните или обновяване на UI
} catch (error) {
  console.error('Error deleting user:', error.message);
  // Обработка на грешка и показване на съобщение към потребителя
}
};
};





return (
    <div>
      <h1>Потребители</h1>
      <ul>
            <ul>
            {users.map(user => (
                 <div key={user._id}>
                 <div className="row d-flex align-items-center">
                   <div className="col-lg-2 col-md-12">
                     <div
                       className="bg-image rounded"
                       data-mdb-ripple-color="light"
                     >
                       <img
                         src='https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg'
                         // className="w-100"
                         alt="neshto"
                         width={100}
                         height={75}
                       />
                     </div>
                   </div>

                   <div className="col-lg-5 col-md-6">
                   <p>
                       <strong>UserId: {user._id}</strong>
                       </p>
                     <p>
                       <strong>Email: {user.email}</strong>
                       </p>
                       <p>
                       <strong>Table: {user.table}</strong>
                       </p>
                       <p>
                       <strong>Role: {user.role}</strong>
                     </p>
                     <p>
                       <strong>Status: {user.isBlocked ? "Blocked" : "Active"}</strong>
                     </p>
                     {/* <p>Color: blue</p>
                     <p>Size: M</p> */}
                   </div>

                   <div className="col-lg-4 col-md-6">
                     <div
                       className="d-flex mb-4"
                       style={{ maxWidth: "300px" }}
                     >
             

                       
                     </div>
                     
                     <p className="text-start text-md-center">
                       <strong>
                       <div class="btn-group btn-group-sm  gap-3" role="group" aria-label="Small button group">
                    <button href="#editUserModal" onClick={() => handleEditUser(user._id)}  className="btn btn-success" data-toggle="modal" >Edit</button>

                    <button href="" onClick={() => deleteUser(user._id)} class="btn btn-danger"  data-toggle="modal">Delete</button>
                </div>
                       </strong>
                    </p>

                    <p className="text-start text-md-center">
                       <strong>
                       <div class="btn-group btn-group-sm  gap-3" role="group" aria-label="Small button group">
                      	<button onClick={() => blockUser(user._id)} class="btn btn-secondary" data-toggle="modal">Block</button>
                        <button onClick={() => unblockUser(user._id)} class="btn btn-info" data-toggle="modal">Unblock</button>
                      </div>
                       </strong>
                    </p>
                   
                   </div>
                 </div>

                 <hr className="bg-danger border-top my-4" />
               </div>  
              ))}
            </ul>
            {/* <button className="btn btn-success" onClick={() => handleApprove(order._id)}>Add new user</button> */}
            <div className="col-sm-6">
						<a href="#addItemModal" className="btn btn-success" data-toggle="modal"><i className="bi bi-person-plus"></i> <span>Add New User</span></a>						
					</div>
      </ul>


  <div id="addItemModal" className="modal fade">
	<div className="modal-dialog">
		<div className="modal-content">
			<form onSubmit={AddUserHandler}>
				<div className="modal-header">						
					<h4 className="modal-title">Add User</h4>
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div className="modal-body">	
					<div className="form-group">
						<label>Email</label>
						<input type="text" name="email" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="text" name="password" className="form-control" required/>
					</div>
			<div className="input-group mb-3">
  <select className="form-select" id="inputGroupSelect02">
    <option selected>Choose...</option>
    <option value="guest">guest</option>
    <option value="waiter">waiter</option>
    <option value="admin">admin</option>
  </select>
  <label className="input-group-text" htmlFor="inputGroupSelect02">Options</label>
</div>
					<div className="form-group">
						<label>Table</label>
						<input type="text" name="table" className="form-control" required/>
					</div>
				</div>
				<div className="modal-footer">
					<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
					<input type="submit" className="btn btn-success" value="Add" />
				</div>
			</form>
		</div>
	</div>
</div>


<div id="deleteEmployeeModal" className="modal fade">
	<div className="modal-dialog">
		<div className="modal-content">
			<form >
				<div className="modal-header">						
					<h4 className="modal-title">Delete Employee</h4>
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div className="modal-body">					
					<p>Are you sure you want to delete these Records?</p>
					<p className="text-warning"><small>This action cannot be undone.</small></p>
				</div>
				<div className="modal-footer">
					<input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
					<input type="submit" className="btn btn-danger" value="Delete"/>
				</div>
			</form>
		</div>
	</div>
</div>


<div id="editUserModal" className="modal fade">
	<div className="modal-dialog">
		<div className="modal-content">
			<form onSubmit={EditUserHandler}>
				<div className="modal-header">						
					<h4 className="modal-title">Edit User</h4>
          <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div className="modal-body">	
					<div className="form-group">
						<label>Email</label>
						<input type="text" name="email" onChange={user.email} className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="text" name="password" onChange={user.password} className="form-control" required/>
					</div>
			<div className="input-group mb-3">
  <select className="form-select" onChange={user.role} id="inputGroupSelect02">
    <option selected>Choose...</option>
    <option value="guest">guest</option>
    <option value="waiter">waiter</option>
    <option value="admin">admin</option>
  </select>
  <label className="input-group-text" htmlFor="inputGroupSelect02">Options</label>
</div>
					<div className="form-group">
						<label>Table</label>
						<input type="text" name="table"  onChange={user.table}className="form-control" required/>
					</div>
				</div>
				<div className="modal-footer">
          <input type="button" className="btn btn-default" data-dismiss="modal" value="Cancel"/>
					<input type="submit" className="btn btn-success" value="Edit" />
				</div>
			</form>
		</div>
	</div>
</div>

    </div>
)
}

export default Users;