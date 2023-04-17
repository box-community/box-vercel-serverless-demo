export default function boxskill(request, response) {
    response.status(200).json({
      id: process.env.CLIENT_ID,
      secret: process.env.CLIENT_SECRET
    });
  }