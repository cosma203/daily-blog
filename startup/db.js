const { connect } = require('mongoose');

module.exports = () => {
  connect(
    'mongodb://localhost/blog',
    { useNewUrlParser: true },
    err => {
      if (err) return console.log(err.message);

      console.log('Connected to mongoDB...');
    }
  );
};
