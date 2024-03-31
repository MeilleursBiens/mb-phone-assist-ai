require('dotenv').config();

const transferCall = async function (call) {

  console.log('Transfert de l\'appel', call.callSid);
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = require('twilio')(accountSid, authToken);

  return await client.calls(call.callSid)
    .update({twiml: `<Response><Dial>${process.env.TRANSFER_NUMBER}</Dial></Response>`})
    .then(() => {
      return 'L\'appel a été transféré avec succès, dites au revoir au client.';
    })
    .catch(() => {
      return 'L\'appel n\'a pas été transféré avec succès, conseillez au client de rappeler plus tard.';
    });
};

module.exports = transferCall;