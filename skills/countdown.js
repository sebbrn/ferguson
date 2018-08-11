module.exports = function(controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

    // listen for a user saying "add <something>", and then add it to the user's list
    // store the new list in the storage system
    controller.hears(['new countdown (.*)'],'direct_message,direct_mention,mention', function(bot, message) {

        var newcountdown = message.match[2];
        controller.storage.teams.get(message.team, function(err, team) {

            if (!team) {
                team = {};
                team.id = message.team;
                team.countdowns = [];
            }

            if (!team.countdowns) {
                team.countdowns = [];
            }
            team.countdowns.push(newcountdown);

            controller.storage.teams.save(team, function(err,saved) {

                if (err) {
                    bot.reply(message, 'I experienced an error adding your countdown: ' + err);
                } else {
                    bot.reply('I added your countdown: ' + newcountdown)
                    bot.api.reactions.add({
                        name: 'thumbsup',
                        channel: message.channel,
                        timestamp: message.ts
                    });
                }

            });
        });

    });
};