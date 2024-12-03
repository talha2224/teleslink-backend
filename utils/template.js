module.exports = {
    verficationEmailTemplate: (name,otp) => {
        return `
        <!DOCTYPE html>
        <html lang="en">
      
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            @media only screen and (max-width: 600px) {
              .container { width: 95%;}
            }
            @media only screen and (min-width: 601px) {
              .container { width: 50%; }
            }
          </style>
        </head>
      
        <body style='background-color:#fafaf5;padding-top:5px'>
          <div style='display:flex;margin-bottom:10px;margin-top:10px'>
            <img src='https://ibb.co/qp7VjSD' alt=''style='height:2.5rem;margin-left:auto;margin-right:auto' />
          </div>
          <div style='display:flex;border-radius:10px;padding:10px;height:max-content;'>
            <div class='container' style='background-color:white;margin-left:auto;margin-right:auto;border-radius:10px;padding:10px;height:max-content;'>
              <div style='text-align:center'>
                <img src='https://ibb.co/qp7VjSD'style='height:225px;' />
              </div>
              <div>
                <p>Hi <strong>${name},</strong></p>
                <p>Your otp for telesmart account verification is ${otp} </p>
              </div>
              <p style='color:#333333'>Our team is always here to help. If you have any questions or need further assistance, contact us via email at <span style='color:#41ccad;cursor:pointer;text-decoration: none;'>support@teleslink.com</span></p>
              <div>
                <p>Best Regards,</p>
              </div>
              <div>
                <p>Teleslink Team</p>
              </div>
                <div style='text-align: center;'>
                  <p style='color:#A3A9BB;font-size:0.7rem;'>© 2024 Teleslink Analytics Inc. All rights reserved.</p>
                </div>
              </div>
      
             </div>
          </body>
        `
    },
}