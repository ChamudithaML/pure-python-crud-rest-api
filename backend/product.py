products = {}

def create_product(name, description, stock_count):
    if name in products:
        return "Product already exists."
    
    products[name] = {
        "description": description,
        "stock_count": stock_count
    }
    
    return "Product created successfully."

def update_product_stock(name, amount):
    if name not in products:
        return "Product does not exist."
    
    try:
        amount = int(amount)
    except ValueError:
        return "Invalid stock count value. It must be an integer."

    products[name]['stock_count'] = amount
    return "Product stock updated successfully."

def view_products():
    return products

def delete_product(name):
    if name not in products:
        return "Product does not exist."
    
    del products[name]
    return "Product deleted successfully."

def get_product(name):
    if name not in products:
        return "Product does not exist."
    
    return products[name]