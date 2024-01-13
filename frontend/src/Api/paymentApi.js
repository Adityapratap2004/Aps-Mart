const host = process.env.REACT_APP_HOST




export const handlecheckout = async (id) => {      //cart id bhejni padegi
    console.log(id);
    const getkey = await fetch(`${host}/payment/getkey`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
    })

    const setkey = await getkey.json();
    const razarpay_key = setkey.RAZARPAY_KEY_ID;
    console.log("key", razarpay_key);


    const respone = await fetch(`${host}/payment/createcheckoutsession`, {  //cartKiId deni hai
        method: "POST",
        mode: "cors",
        credentials: "include",

    });

    const res = await respone.json();

    if (res.success) {
        const order = res.order;
        console.log(order);
        const options = {
            key: razarpay_key,
            amount: order.amount,
            currency: "INR",
            name: "ApsMart",
            description: "Payment",
            order_id: order.id,
            handler: async (response) => {
                const verify = await fetch(`${host}/payment/paymentverification`, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({ razorpay_order_id: response.razorpay_order_id, razorpay_payment_id: response.razorpay_payment_id, razorpay_signature: response.razorpay_signature})
                })
                const res = await verify.json();
                if (res.success) {
                     //yaha to toastify call karna padega
                     window.location.href=res.url;

                     console.log("Payment done");
                }


            },
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
    }
    else{
        console.log("some error have occured");
    }
}









