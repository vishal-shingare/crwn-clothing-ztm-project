import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J18WgSJXvZaZoHktDnFXImPMfzo7PGFbuhd7iPdwtWWDLdjEcPyhf4w2XnAjpipthRLXOarag10OqW5lXR7JEBZ00p2oogDqz';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful')
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/en/acd59b9c53'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
        
    );
}

export default StripeCheckoutButton;