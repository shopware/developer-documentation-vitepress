exports.handler = async function(event, context) {

    const myKey = process.env.SBP_API_KEY;

    return {
        statusCode: 200,
        body: JSON.stringify({
            "message": `Go  ${myKey}! Your function executed successfully!`
        })
    }
}