from http.server import BaseHTTPRequestHandler, HTTPServer
import json
from auth import signup, signin
from product import create_product, update_product_stock, view_products, delete_product
import jwt

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == "/signup":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            response = signup(data['username'], data['password'])
            self._send_response(response)

        elif self.path == "/signin":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            response = signin(data['username'], data['password'])
            self._send_response(response)

        elif self.path == "/products":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            response = create_product(data['name'], data['description'], data['stock_count'])
            self._send_response(response)

    def do_GET(self):
        if self.path == "/products":
            response = view_products()
            self._send_response(response)
    
    def do_DELETE(self):
        if self.path.startswith("/products/"):
            product_name = self.path.split("/")[-1]
            response = delete_product(product_name)
            self._send_response(response)
            
    def do_PUT(self):
        if self.path == "/products":
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            if 'name' not in data or 'stock_count' not in data:
                self._send_response("Bad Request: Missing 'name' or 'stock_count' fields.", status_code=400)
                return

            name = data['name']
            stock_count = data['stock_count']

            response = update_product_stock(name, stock_count)

            self._send_response(response)

    def _send_response(self, message):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({"message": message}).encode())
         


if __name__ == "__main__":
    server = HTTPServer(('localhost', 5000), RequestHandler)
    print("Server running at http://localhost:5000")
    server.serve_forever()
