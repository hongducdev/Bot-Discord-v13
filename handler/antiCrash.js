module.exports = client => {
    process.on('unhandledRejection', (reason, p) => {
        console.log("UnhandledRejection Error");
        console.log(reason, p);
    })
    process.on('uncaughtException', (reason, origin) => {
        console.log("UnhandledException Error");
        console.log(reason, origin);
    })
    process.on('uncaughtExceptionMonitor', (reason, origin) => {
        console.log("uncaughtExceptionMonitor Error");
        console.log(reason, origin);
    })

    process.on('multipleResolves', (type, promise, reson) => {
        console.log("multipleResolves Error");
        console.log(type, promise, reson);
    })
}