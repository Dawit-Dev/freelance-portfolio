const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req: Request) {
	try {
		const body = await req.json();
		const message = `
		  Name: ${body.name}\r\n
		  Email: ${body.email}\r\n
		  Message: ${body.message}
		`;
		await sgMail.send({
			to: process.env.RECEIVER_EMAIL,
			from: process.env.SENDER_EMAIL,
			subject: body.subject ? body.subject : `New message from ${body.name}`,
			text: message,
			html: `<strong>${message.replace(/\r\n/g, "<br />")}</strong>`,
		});
	} catch (err: any) {
		let errorMessage: string = "Something went wrong";
		if (err instanceof Error) {
			errorMessage = err.message;
		}
		return Response.json({ message: errorMessage });
	}
	const response = Response.json({
		message: "Your email is successfully sent",
	});
	return response;
}
