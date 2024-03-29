function composeEmail(name,title, numberOfTickets, totalAmount, id, qrcode) {
	return `
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ViewPoint Email</title>
    
  </head>
  <body style="margin:0;padding:0;color:#000000;font-family:sans-serif;background-color:#2196f3;max-width:800px;padding:3%;margin:auto;line-height:1.6;">
    <div class="container" style="margin:0;padding:0;color:#000000;background-color:#ffffff;min-height:50vh;">
      <header class="header" style="margin:0;padding:0;color:#000000;background-color:#56636c;padding:3% !important;">
        <img src="https://romantic-joliot-428934.netlify.app/img/user.png" alt="" id="avatar" style="margin:0;padding:0;color:#000000;border:2px solid #2196f3;width:50px;height:50px;border-radius:50%;position:relative;float:left;">
        <h3 style="margin:0;padding:0;color:#000000;float:right;margin-top:10px;font-size:20px;color:#ffffff;">Hello ${name}</h3>
        <div class="clear" style="margin:0;padding:0;color:#000000;clear:both;"></div>
      </header>
      <main class="main" style="margin:0;padding:0;color:#000000;padding:3%;">
        <p style="margin:0;padding:0;color:#000000;margin:15px 0;">
          Thank you for your recent order for the movie <span class="highlight" style="margin:0;padding:0;color:#000000;color:#2196f3;font-weight:700;">${title}</span>, a total of <span class="highlight" style="margin:0;padding:0;color:#000000;color:#2196f3;font-weight:700;">${numberOfTickets}</span> Ticket(s) amounting to <span class="highlight" style="margin:0;padding:0;color:#000000;color:#2196f3;font-weight:700;">N${totalAmount}</span>, you can redeem your ticket(s) at the cinema using this Booking ID <span class="highlight" style="margin:0;padding:0;color:#000000;color:#2196f3;font-weight:700;">${id}</span>
        </p>
        <img src="${qrcode}" alt="" style="margin:0;padding:0;color:#000000;width:150px;display:block;margin:30px auto;border:1px solid #2196f3;">
        <div class="info" style="margin:0;padding:0;color:#000000;padding:3%;">
          <h3 style="margin:0;padding:0;color:#000000;margin-bottom:20px;">Special messages: e.g Pick up information</h3>
          <ul style="margin:0;padding:0;color:#000000;width:90%;">
            <li style="margin:0;padding:0;color:#000000;margin-bottom:20px;">Please come to the cinema to collect your tickets at least 35 minutes prior to the start of the movie.</li>
            <li style="margin:0;padding:0;color:#000000;margin-bottom:20px;">Show your reservation emails at the cinema ticketing stands</li>
            <li style="margin:0;padding:0;color:#000000;margin-bottom:20px;">Those will be verified and you will receive your tickets and/or food & drink items (as applicable)
                    </li>
            <li style="margin:0;padding:0;color:#000000;margin-bottom:20px;">Alternatively, bring your: * Credit/Debit card together * This email and/or your Booking ID/number in order to collect your tickets at the cinema</li>
            <li style="margin:0;padding:0;color:#000000;margin-bottom:20px;">You can find your receipt attached to this mail.</li>
          </ul>
        </div>
      </main>
      <hr style="margin:0;padding:0;color:#000000;width:95%;margin:auto;">
      <footer class="footer" style="margin:0;padding:0;color:#000000;text-align:center;padding:3%;color:grey;">
        <p style="margin:0;padding:0;color:#000000;">Thank You, Your Viewpoint Support Team</p>
      </footer>
    </div>
  </body>
</html>
    `;
}


module.exports = composeEmail;