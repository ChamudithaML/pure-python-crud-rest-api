import React, { useState, useEffect } from "react";
import axios from "axios";
import './EditProductForm.css'

export default function EditProductForm({ prodName, getProducts, closeEditForm }) {
    const [inputs, setInputs] = useState([]);

    useEffect(() => {
        getProduct();
    }, []);

    function getProduct() {
        axios.get(`http://127.0.0.1:5000/products/${prodName}`).then(function (response) {
            let respData = response.data.message;
            setInputs({...respData,name:prodName});
        });
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        console.log("In handle submit")
        event.preventDefault();

        const { name, stock_count } = inputs;

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            alert('Name is required and should be a string.');
            return;
        }
        inputs.name = name.charAt(0).toUpperCase() + name.slice(1);

        if (!stock_count || isNaN(stock_count) || stock_count <= 0) {
            alert('Stock is required and it should be positive');
            return;
        }

        console.log("Im here",inputs);
        axios.put(`http://127.0.0.1:5000/products`, inputs).then(function (response) {
            console.log(response.data);
            getProducts();
            closeEditForm();
        });
    }

    return (
        <div className="edit-form-container">
            <div className="edit-form-wrapper">
                <h1 className="edit-form-title">Edit Product</h1>
                <form onSubmit={handleSubmit} className="edit-user-form">
                    <div className="edit-form-group">
                        <label className="edit-form-label">Name</label>
                        <input type="text" value={inputs.name} className="edit-form-input" name="name" onChange={handleChange} />
                    </div>
                    <div className="edit-form-group">
                        <label className="edit-form-label">Description</label>
                        <input type="text" value={inputs.description} className="edit-form-input" name="description" onChange={handleChange} />
                    </div>
                    <div className="edit-form-group">
                        <label className="edit-form-label">Stock</label>
                        <input type="text" value={inputs.stock_count} className="edit-form-input" name="stock_count" onChange={handleChange} />
                    </div>
                    <button type="submit" name="update" className="edit-form-button">Save</button>
                </form>
            </div>
        </div>
    );
}
