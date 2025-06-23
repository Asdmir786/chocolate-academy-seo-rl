import nodemailer from "nodemailer"

export async function POST(req) {
  const body = await req.json()
  const { fullName, email, phone, address, city, course, paymentMethod, message } = body

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "alams.com.ai@gmail.com",
      subject: `New Course Registration: ${course}`,
      text: `
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Address: ${address}
City: ${city}
Course: ${course}
Payment Method: ${paymentMethod}
Message: ${message}
      `,
    })
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 })
  }
}
