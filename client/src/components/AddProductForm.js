import React, { useState } from "react";
import axios from "axios";
import './AddProductForm.css'

export default function AddProductForm({ getProducts, closeForm }) {

    const [inputs, setInputs] = useState([]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();

        const { name, stock_count } = inputs;

        if (!name || typeof name !== 'string' || name.trim().length === 0) {
            alert('Name is required and should be a string.');
            return;
        }
        inputs.name = name.charAt(0).toUpperCase() + name.slice(1);

        if (!stock_count || isNaN(stock_count) || stock_count <= 0) {
            alert('Stock should be positive and stock is required');
            return;
        }

        axios.post('http://127.0.0.1:5000/products', inputs).then(function (response) {
            console.log(response.data);
            closeForm();
            // getProducts();

        }).catch(function (error) {
            console.error("There was an error adding the Product!", error);
        });
    }

    return (
        <div className="form-container">
            <div className="form-wrapper">
                <h1 className="form-title">Create Product</h1>
                <form onSubmit={handleSubmit} className="product-form">
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-input" name="name" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <input type="text" className="form-input" name="description" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Stock</label>
                        <input type="text" className="form-input" name="stock_count" onChange={handleChange} />
                    </div>
                    <button type="submit" name="add" className="form-button">Save</button>
                </form>
            </div>
        </div>

    );
}