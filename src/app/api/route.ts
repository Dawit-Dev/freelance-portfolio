const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function POST(req: Request) {
	let res
	try {
		const { name, email, subject, message } = await req.json()
		const msg = `
		  Name: ${name}\r\n
		  Email: ${email}\r\n
		  Message: ${message}
		`
		res = await sgMail.send({
			to: process.env.RECEIVER_EMAIL,
			from: process.env.SENDER_EMAIL,
			subject: subject ? subject : `New message from ${name}`,
			text: msg,
			html: `<strong>${message.replace(/\r\n/g, '<br />')}</strong>`,
		})
	} catch (err: any) {
		let errorMessage: string = 'Something went wrong'
		if (err instanceof Error) {
			errorMessage = err.message
		}
		return Response.json({ message: errorMessage })
	}

	const response = Response.json({
		message: 'Your email is successfully sent!',
	})
	return response
}
