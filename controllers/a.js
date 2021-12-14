   const { name, email, phone, message, _id } = {
	   name: 'Parth',
	   email: 'prajapatiparth06@gmail.com', 
	   phone: '5483332298',
	   message: 'This is the message',
	   _id: '234234235235532'
   };

   const send = require('gmail-send')({
        user: 'meetpatel4197@gmail.com',
        pass: 'meetmeet12@',
        to: 'connect.meetpatel@gmail.com',
        subject: `Contacted From ${name}`,
    });

    let body = `<h1>Contact Form Details</h1>`;
    body += `<table>`;
    body += `<tr><td>User Id</td><td>${_id}</td>`;
    body += `<tr><td>Name</td><td>${name}</td>`;
    body += `<tr><td>Email</td><td>${email}</td>`;
    body += `<tr><td>Phone No.</td><td>${phone}</td>`;
    body += `<tr><td>Message</td><td>${message}</td>`;

    send({
        html: body,
    }, (error, result, fullResult) => {
        if (error) console.error(error);
        console.log(result);
    })
