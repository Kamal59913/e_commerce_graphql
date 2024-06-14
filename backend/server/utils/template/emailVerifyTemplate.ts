export const emailVerifyTemplate = (url: string) => {
  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        word-wrap: break-word;
      }
      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");
    </style>
  </head>
  <body>
    <div style="height: 100%; max-width: 600px; margin: auto">
           <table style="width: 100%">

        <tbody>
          <tr>
            <td
              style="
                background-color: #131c55;
                text-align: center;
                font-family: 'Inter', sans-serif;
                font-weight: 300;
                font-size: 16px;
                color: white;
                height: 50px;
              "
            >
              domain.com | all rights reserved
            </td>
          </tr>
        </tbody>
      </table>
      <table style="width: 100%">
        <tbody style="text-align: center; width: 100%">
          <tr>
            <td
              style="
                font-weight: 500;
                font-size: 20px;
                padding-top: 40px;
                font-family: 'Inter', sans-serif;
                font-weight: 500;
                width: 100%;
              "
            >
              Email verify ?
            </td>
          </tr>
        </tbody>

        <tbody style="text-align: center; width: 100%">
          <tr>
            <td
              style="
                font-weight: 500;
                font-size: 14px;
                padding-top: 20px;
                font-family: 'Inter', sans-serif;
                font-weight: 400;
                color: #4d4d4d;
              "
            >
              Click on the Button Below to set passowrd
            </td>
          </tr>
        </tbody>
        <tbody style="text-align: center">
          <tr>
            <td style="padding-top: 40px; width: 100%">
              <a href="${url}">
                <button
                  style="
                    width: 197px;
                    height: 40px;
                    border: none;
                    color: white;
                    font-family: 'Inter', sans-serif;
                    font-weight: 400;
                    background-color: #4763e4;
                    border-radius: 10px;
                    cursor: pointer;
                  "
                  onmouseover="this.style.backgroundColor='#131C55'"
                  onmouseout="this.style.backgroundColor='#4763e4'"
                >
                  Confirm Email
                </button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <table style="width: 100%; text-align: center">
        <tbody style="width: 400px; text-align: center">
          <tr>
            <td
              style="
                font-family: 'Inter', sans-serif;
                font-weight: 400;
                color: #4d4d4d;
                padding-top: 20px;
                width: 400px !important;
              "
            >
              If you received this email by mistake, simply delete it. <br />
              You won't be subscribed if you don't click the confirmation link
              above.
            </td>
          </tr>
        </tbody>
      </table>
      <table style="width: 100%">
        <tbody style="text-align: center">
          <tr>
            <td
              style="
                color: #4d4d4d;
                font-family: 'Inter', sans-serif;
                font-weight: 400;
                padding-top: 40px;
                padding-bottom: 40px;
              "
            >
              Need Help?
              <span
                style="
                  color: #4763e4;
                  font-family: 'Inter', sans-serif;
                  font-weight: 700;
                "
                >Contact Us</span
              >
            </td>
          </tr>
        </tbody>

        <tbody>
          <tr>
            <td
              style="
                background-color: #131c55;
                text-align: center;
                font-family: 'Inter', sans-serif;
                font-weight: 300;
                font-size: 16px;
                color: white;
                height: 50px;
              "
            >
              sitecheckupnow.com | all rights reserved
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>

  `;
  return html;
};
