// https://youtu.be/CvCiNeLnZ00?t=2483

const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
   // These 2 lines template/fomrat thing helps when we want to export it to some excel file.
   const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')
   const logItem = `${dateTime}\t${uuid()}\t${message}\n`

   try {

      // Wither the directory is created or we create one.
      if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
         await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
      }
      await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem)
   } catch (error) {
      console.log(error);
   }
}

const logger = (req, res, next) => {
   //  It is like a text file that you can open. This would log every request that comes in. you might want to put some condition up here of which things you want to keep and which you don't because this will get full very fast if you lkeft it like this for your entire application. But I'll leave that for you. 
   logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
   console.log(`${req.method} ${req.path}`)
   next()
}

module.exports = { logEvents, logger }