import React, { useState } from 'react';
import axios from 'axios';
// import Razorpay from 'razorpay';

const PaymentPage = () => {
    const [responseId, setResponseId] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const createRazorpayOrder = async ({ amount, email, userID, notes }) => {
        const data = { amount, email, userID, notes };
        try {
            const response = await axios.post("http://localhost:6900/user/generateOrder", data);
            console.log(response);
            handleRazorpayScreen(response.data);
        } catch (error) {
            console.error("Error creating order:", error);
            setResponseStatus("Failed to create order");
        }
    };

    const handleRazorpayScreen = async (data) => {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const options = {
            key: process.env.RAZORPAY_API_ID,
            amount: data.amount,
            currency: data.currency,
            name: 'Predulive Labs',
            description: 'Test Transaction',
            image: 'https://example.com/your_logo',
            order_id: data.id,
            handler: (response) => {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                alert(`Order ID: ${response.razorpay_order_id}`);
                alert(`Signature: ${response.razorpay_signature}`);
                setResponseId(response.razorpay_payment_id);
                setResponseStatus("Payment successful");
            },
            prefill: {
                name: 'Gaurav Kumar',
                email: 'NQp0U@example.com',
                contact: '9999999999',
            },
            notes: {
                address: 'Razorpay Corporate Office',
            },
            theme: {
                color: '#3399cc',
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return (
        <div>
            <button onClick={() => createRazorpayOrder({ amount: 500, email: "example@example.com", userID: "user123", notes: { productName: ["Test Product"] } })}>
                Pay Now
            </button>
            {responseStatus && <p>Status: {responseStatus}</p>}
            {responseId && <p>Payment ID: {responseId}</p>}
        </div>
    );
};

export default PaymentPage;
