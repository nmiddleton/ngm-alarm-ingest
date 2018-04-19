const rp = require('request-promise');
module.exports = function (context, myTimer) {
    var timeStamp = new Date().toISOString();

    if(myTimer.isPastDue)
    {
        context.log('JavaScript is running late!');
    }
    const getToken = function(resource, apiver, context) {
        var options = {
            uri: `${process.env["MSI_ENDPOINT"]}/?resource=${resource}&api-version=${apiver}`,
            headers: {
                'Secret': process.env["MSI_SECRET"]
            }
        };
        rp(options)
            .then(function(result){
                context.log('RPRETURNED', JSON.stringify(result));
            });
    };
    getToken('https://vault.azure.net', '2017-09-01', context);
    context.log('JavaScript timer trigger function ran!:', timeStamp);


    context.done();
};