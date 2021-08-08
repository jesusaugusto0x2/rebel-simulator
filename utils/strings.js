require("colors");

exports.makeId = (_length = 10) => {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < _length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

/**
 * Prints a consosle message with an special color
 *
 * @param {String} msg
 * @param {String} type
 */
exports.printMessage = (msg, type = "") => {
  switch (type) {
    case "success":
      console.log(`${msg}`.green);
      break;

    case "warning":
      console.log(`${msg}`.yellow);
      break;

    case "advice":
      console.log(`${msg}`.cyan);
      break;

    case "danger":
      console.log(`${msg}`.red);
      break;

    default:
      console.log(`${msg}`);
      break;
  }
};
