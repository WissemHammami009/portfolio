var html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation Email</title>
    <style>
        body {
            font-family: Lato, 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: #666666;
            line-height: 1.5;
        }

        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
        }

        .header,
        .footer {
            text-align: center;
            padding: 20px 30px;
        }

        .button {
            background-color: #FFA73B;
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            display: inline-block;
            border-radius: 2px;
            font-size: 20px;
        }

        .divider {
            height: 1px;
            background-color: #F4F4F4;
            margin: 20px 0;
        }

        a {
            color: #FFA73B;
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <h1>Confirm Your Account</h1>
            <p>If that doesn't work, copy and paste the following link into your browser:</p>
            <a href="'+link+'">'+link+'</a>
        </div>

        <div class="header">
            <a href="http://localhost/4200" class="button">Confirm Account</a>
        </div>

        <div class="divider"></div>

        <div class="header">
            <p>If you have any questions, feel free to <a href="http://localhost/4200">Contact us</a>.</p>
            <p>We're glad you're here!</p>
            <p>The Team</p>
        </div>

        <div class="divider"></div>

        <div class="footer">
            <p>If these emails get annoying, <a href="http://localhost/4200">unsubscribe</a>.</p>
        </div>

        <div class="divider"></div>
    </div>
</body>
</html>
`;
