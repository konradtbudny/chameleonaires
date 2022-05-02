import axios from "axios";
const baseURL = "http://localhost:3000/api"

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
        const response = await fetch(`/api/users/me`, {
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
        const response = await fetch(`/api/products/`, {method: 'GET'});

        const data = await response.json();
        return data
    } catch (error) {
        console.log(error)
    }
}
export async function getOrders(id) {
    try {
        const response = await fetch(`/api/orders/${id}`, {method: 'GET'})
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
export async function getOrderItem(id) {
    try {
        const response = await fetch(`/api/orderitem/${id}`, {method: 'GET'})
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
