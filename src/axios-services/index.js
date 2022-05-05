import axios from "axios";
const baseURL = "http://localhost:4000/api"

export async function getAPIHealth() {
    try {
        const {data} = await axios.get(`${baseURL}/health`);
        return data;
    } catch (err) {
        console.log(err, "checking object");
        return {healthy: false};
    }
}

export async function loginUser(username, password) {
    try {
        const response = await fetch(`${baseURL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {username, password}
            )
        });
        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}

export async function registerUser(username, password, email) {
    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {username, password, email}
            )
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error, "checking object");
    }
}

export async function getMe(username) {
    try {
        const response = await fetch(`${baseURL}/users/me`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    localStorage.token
                }`
            },
            body: JSON.stringify({username})
        });
        const data = await response.json();
        return data;
    } catch (error) {}
}
export async function getProducts() {
    try {
        const response = await fetch(`${baseURL}/products/`, {method: 'GET'});

        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function getOrders(id) {
    try {
        const response = await fetch(`${baseURL}/orders/${id}`, {method: 'GET'})
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function getOrderItem(id) {
    try {
        const response = await fetch(`${baseURL}/orderitem/${id}`, {method: 'GET'})
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function addOrderItem(orderId, productId, price, quantity) {
    console.log("getting into axio")
    try {
        const response = await fetch(`${baseURL}/orderitem/addOrder`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {orderId, productId, price, quantity}
            )
        })
        console.log(response, "response")
        const data = await response.json();
        console.log(data, "data")
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function updateOrderItem(id, price, quantity) {
    try {
        const response = await fetch(`${baseURL}/orderitem/update/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {price, quantity}
            )
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function deleteOrderItem(id) {
    try {
        const response = await fetch(`${baseURL}/orderitem/delete/${id}`, {method: 'DELETE'})
        const data = await response.json()
        return data;
    } catch (error) {
        console.log(error)
    }
}
