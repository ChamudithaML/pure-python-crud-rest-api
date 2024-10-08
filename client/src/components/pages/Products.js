import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
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
                    setProducts(productsArray);
                }
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className='products-container'>
            <h1>Products</h1>
            {error && <p className="error">{error}</p>}
            <table className="products-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product.name}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.stock_count}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No products available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Products;
