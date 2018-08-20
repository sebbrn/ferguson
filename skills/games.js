module.exports = function (controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

    // user asked to start a new game
    controller.hears('[S|s]tart.*[G|g]ame.*', 'direct_message,direct_mention,mention', function (bot, message) {

        bot.reply(message, `Oh yezzz, a new game! But I'm too dumb, please feed me with delicious code :yum:`)

    });

};