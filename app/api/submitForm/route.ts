// pages/api/submitForm.js
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(req: Request) {
  const form = {
    accidentDate: "SAUL",
    accidentPlace: "TEJA",
    bornDate: "LUIS",
    accidentType: "DANI",
    vehicleDamage: "vehicleDamage",
  };

  const body = req.body;

  console.log("body", body);

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "A1:E1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            form.accidentDate,
            form.accidentPlace,
            form.bornDate,
            form.accidentType,
            form.vehicleDamage,
          ],
        ],
      },
    });

    console.log("response", response);
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
