import { useContext, useEffect, useState } from 'react'
import './Verify.css';
import axios from "axios";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Verify = () => {

    const [searchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    const [verificationStatus, setVerificationStatus] = useState('Verifying payment...');
    
    const verifyPayment = async () => {
        console.log("Starting payment verification:", { success, orderId, url });
        setVerificationStatus('Verifying payment...');
        
        if (!orderId) {
            console.error("No orderId found in URL parameters");
            setVerificationStatus('Error: No order ID found. Please check your order history.');
            setTimeout(() => navigate("/myorders"), 3000);
            return;
        }

        if (success === null) {
            console.error("No success parameter found in URL");
            setVerificationStatus('Error: Payment status not found. Please check your order history.');
            setTimeout(() => navigate("/myorders"), 3000);
            return;
        }
        
        try {
            const response = await axios.post(`${url}/api/order/verify`,{success,orderId});
            console.log("Backend response:", response.data);
            
            if(response.data.success){
                setVerificationStatus('Payment verified successfully! Redirecting to orders page...');
                setTimeout(() => {
                    alert("Order placed successfully!");
                    navigate("/myorders");
                }, 2000);
            }
            else{
                setVerificationStatus('Payment failed. Redirecting to home page...');
                setTimeout(() => {
                    alert("Payment failed: " + response.data.message);
                    navigate("/");
                }, 2000);
            }
        } catch (error) {
            console.error("Error verifying payment:", error);
            setVerificationStatus('Error verifying payment. Please check your orders page.');
            setTimeout(() => {
                alert("Error verifying payment. Please check your orders page for order status.");
                navigate("/myorders");
            }, 3000);
        }
    }

    useEffect(()=>{
        verifyPayment();
    },[])

  return (
    <div className='verify'>
      <div className='spinner'></div>
      <p>{verificationStatus}</p>
    </div>
  )
}

export default Verify;
