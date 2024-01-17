// pages/api/submitForm.js
import { NextResponse } from "next/server";
import { google } from "googleapis";

export async function POST(request: Request) {
  const data = await request.json();

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
      range: "A1:L1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            data.accidentDate,
            data.accidentPlace,
            data.bornDate,
            data.accidentType,
            data.offDaysKnowledge,
            data.offDaysStartingDate,
            data.stillInRehabilitation,
            data.rehabilitationFinishDate,
            data.injuries,
            data.nameAndLastName,
            data.email,
            data.phone,
            data.terms,
          ],
        ],
      },
    });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
