import React, { useEffect, useState } from "react";
import axios from "axios"
import './ModifyProduct.css'
import AddProductForm from "../AddProductForm";
import EditProductForm from "../EditProductForm";

const ModifyProduct = () => {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = () => {
        axios
            .get("http://localhost:5000/products")
            .then((response) => {
                const data = response.data;
                if (data.message) {
                    const productsArray = Object.entries(data.message).map(
                        ([name, details]) => ({
                            name,
                            description: details.description,
                            stock_count: details.stock_count,
                        })
                    );
                    setProducts([...productsArray]); 
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`); 
            alert("Successfully Deleted");
            getProducts(); 
        } catch (error) {
            console.error("There was an error deleting the product!", error);
        }
    };

    const [isFormVisible, setFormVisible] = useState(false);

    const addProductForm = () => {
        setFormVisible(true);
    };

    const closeForm = () => {
        setFormVisible(false);
    };


    const [editProductName, setEditProductName] = useState(null);

    const editProductForm = (name) => {
        setEditProductName(name);
    };

    const closeEditForm = () => {
        setEditProductName(null);
    };

    return (
        <div className="product-list-container">
            <div className="product-list-wrapper">
                <div className="product-list-header">
                    <p className="add-product-button" onClick={addProductForm}>Add New Product</p>

                    {isFormVisible && (
                        <div className="modal-overlay">
                            <div className="modal-content">
                                <button className="close-button" onClick={closeForm}>X</button>
                                <AddProductForm getProducts={getProducts} closeForm={closeForm} />
                            </div>
                        </div>
                    )}


                    <h1 className="product-list-title">Products</h1>
                </div>
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) =>
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.stock_count}</td>
                                <td>
                                    <p className="edit-button" onClick={() => editProductForm(product.name)}>Edit</p>

                                    {editProductName === product.name && (
                                        <div className="modal-overlay">
                                            <div className="modal-content">
                                                <button className="close-button" onClick={closeEditForm}>X</button>
                                                <EditProductForm prodName={product.name} getProducts={getProducts} closeEditForm={closeEditForm} />
                                            </div>
                                        </div>
                                    )}

                                    <p onClick={() => deleteProduct(product.id)} className="delete-button">Delete</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ModifyProduct;