const BRAND_COLOR = "#890eee";
const LOGO_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo_TV_2015.png";




export const kycApprovedTemplate = ({ name }) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  KYC Approved 🎉
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                  We’re happy to inform you that your
                  <strong>KYC verification has been approved</strong>.
                </p>

                <p>
                  You now have full access to all features of our platform.
                </p>

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="https://your-domain.com/dashboard"
                    style="
                      background:${BRAND_COLOR};
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    Go to Dashboard
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you did not request this verification, please contact support.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f9f5ff; padding:15px; font-size:12px; color:#6b7280;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

export const kycRejectedTemplate = ({ name, reason }) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" style="display:block;" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  KYC Rejected ❌
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                  Unfortunately, your <strong>KYC verification was rejected</strong>.
                </p>

                ${
                  reason
                    ? `<p><strong>Reason:</strong> ${reason}</p>`
                    : `<p>Please review your documents and submit again.</p>`
                }

                <!-- Button -->
                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="http://localhost:3000/kyc"
                    style="
                      background:${BRAND_COLOR};
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    Re-submit KYC
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you believe this is a mistake, please contact support.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f9f5ff; padding:15px; font-size:12px; color:#6b7280;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};




/* ===============================
   ITEM REJECTED TEMPLATE
================================ */
export const itemStatusRejectedTemplate = ({
  name,
  itemName,
  reason,
}) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  Item Rejected ❌
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                  Unfortunately, your item <strong>${itemName}</strong> was rejected.
                </p>

                ${
                  reason
                    ? `<p><strong>Reason:</strong> ${reason}</p>`
                    : `<p>Please review your item and submit again.</p>`
                }

                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="http://localhost:3000/my-items"
                    style="
                      background:${BRAND_COLOR};
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    Review Item
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If you believe this is a mistake, please contact support.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background:#f9f5ff; padding:15px; font-size:12px; color:#6b7280;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};

/* ===============================
   ITEM APPROVED TEMPLATE
================================ */
export const itemStatusApprovedTemplate = ({
  name,
  itemName,
}) => {
  return `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; background:#f5f7fb; font-family:Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:30px 15px;">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background:${BRAND_COLOR}; padding:25px;">
                <img src="${LOGO_URL}" alt="Logo" width="120" />
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:30px;">
                <h2 style="color:${BRAND_COLOR}; margin-top:0;">
                  Item Approved ✅
                </h2>

                <p>Hello <strong>${name}</strong>,</p>

                <p>
                  Great news! Your item <strong>${itemName}</strong> has been
                  <strong>approved</strong>.
                </p>

                <p>
                  Your item is now live and available to users.
                </p>

                <div style="text-align:center; margin:30px 0;">
                  <a
                    href="http://localhost:3000/my-items"
                    style="
                      background:${BRAND_COLOR};
                      color:#ffffff;
                      padding:14px 28px;
                      text-decoration:none;
                      border-radius:6px;
                      font-weight:bold;
                      display:inline-block;
                    "
                  >
                    View Item
                  </a>
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  Thank you for contributing to our platform.
                </p>
              </td>
            </tr>

            <tr>
              <td align="center" style="background:#f9f5ff; padding:15px; font-size:12px; color:#6b7280;">
                © ${new Date().getFullYear()} Your Company. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
};