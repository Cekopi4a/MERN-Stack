import style from './UserListItem.module.css'
import UserItem from './UserItem';
import * as itemService from "../service/itemService";
import { create } from '../service/itemService';
import { useEffect,useState,useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';

const UsersItems = () => {
	const navigate= useNavigate();
	const [items, setItems] = useState([]);
	const {id} = useParams();
   
console.log(items);


useEffect(() => {
   itemService.getAll()
   .then(result => setItems(result));
},[]);


const createItemHandler = async (e) => {
    e.preventDefault();

	const itemData = Object.fromEntries(new FormData(e.currentTarget))

	const result = await create(itemData);
	
	setItems(items => [...items,result]);

}

    return(
  <>
  <div className="container-xl">
	<div className="table-responsive">
		<div className="table-wrapper">
			<div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Manage <b>Item</b></h2>
					</div>
					<div className="col-sm-6">
						<a href="#addItemModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Item</span></a>						
					</div>
				</div>
			</div>
			<table className="table table-striped table-hover">
				<thead>
					<tr>
						
						<th>Pictute</th>
						<th>Brand</th>
						<th>Model</th>
						<th>Price</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				{items.map(item =>(
				<UserItem
				id={item._id}
				key={item._id}
				ownerId={item._ownerId}
				brand={item.brand}
				model={item.model}
				price={item.price}
				description={item.description}
				imageUrl={item.imageUrl}
				/>))}
		   </table>
			<div className="clearfix">
				<div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
				<ul className="pagination">
					<li className="page-item disabled"><a href="#">Previous</a></li>
					<li className="page-item"><a href="#" className="page-link">1</a></li>
					<li className="page-item"><a href="#" className="page-link">2</a></li>
					<li className="page-item active"><a href="#" className="page-link">3</a></li>
					<li className="page-item"><a href="#" className="page-link">4</a></li>
					<li className="page-item"><a href="#" className="page-link">5</a></li>
					<li className="page-item"><a href="#" className="page-link">Next</a></li>
				</ul>
			</div>
		</div>
	</div>        
</div>

<div id="addItemModal" className="modal fade">
	<div className="modal-dialog">
		<div className="modal-content">
			<form onSubmit={createItemHandler}>
				<div className="modal-header">						
					<h4 className="modal-title">Add Item</h4>
					<button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div className="modal-body">	
					<div className="form-group">
						<label>Brand</label>
						<input type="text" name="brand" className="form-control" required/>
					</div>
					<div className="form-group">
						<label>Model</label>
						<input type="text" name="model" className="form-control" required/>
					</div>
					<div className="form-group">
					<label>Price</label>
					<div className="input-group mb-3">
  <span className="input-group-text">$</span>
  <span className="input-group-text">0.00</span>
  <input type="text" name='price' className="form-control" aria-label="Dollar amount (with dot and two decimal places)" />
</div>
					</div>
					<div className="form-group">
						<label>Description</label>
						<textarea className="form-control" name="description" required></textarea>
					</div>
					<label>Picture</label>
				<input type="text" name="imageUrl" className="form-control" required/>						
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
</>
    );
};

export default UsersItems;