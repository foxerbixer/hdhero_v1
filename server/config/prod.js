module.exports = {
  name: 'HD_HERO',
  port: process.env.PORT,
  db: {
    url: 'mongodb://kimakima:kimakima123@ds125392.mlab.com:25392/hdhero',
  },
  atlas: {
    url: 'mongodb+srv://kimakima:kimakima123@cluster0-fmesi.mongodb.net/HDHERO?retryWrites=true'
  },
  test: {
    url: 'mongodb://kimakima:kimakima123@ds155492.mlab.com:55492/testdata'
  },
  secretOrKey: 'ANY_SECRET'
}