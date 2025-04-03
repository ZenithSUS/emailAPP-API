import { encrypt } from "../utils/encypt.js";

export const content = (email) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    text-align: center;
                    background-color: #f44336;
                    color: white;
                    padding: 10px 0;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    margin: 20px 0;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    color: white;
                    background-color: #f44336;
                    text-decoration: none;
                    border-radius: 5px;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 0.9em;
                    color: #777;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Action Required: Employee Information Update</h1>
                </div>
                <div class="content">
                    <p>Dear Seiwa Employee,</p>
                    <p>This is to let you know that our HR system requires updated personnel data, please update your information details as soon as possible.</p>
                    <p>Click the button below to update your information:</p>
                    <p style="text-align: center;">
                        <a style="text-decoration: none; color: white;" href="https://seiwakaun.onrender.com?e=${encrypt(email)}" class="button">Update Account</a>
                    </p>
                </div>
            </div>
        </body>
        </html>
    `;
};