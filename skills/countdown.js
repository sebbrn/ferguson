const humanizeDuration = require('humanize-duration')

module.exports = function (controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

    // user asked to add a new event to the teams events
    controller.hears('.*[N|n]ew [E|e]vent.*([A-z]*).*(0[1-9]|1[012][- /.]0[1-9]|[12][0-9]|3[01][- /.][1-2][0-9][0-9][0-9])*', 'direct_message,direct_mention,mention', function (bot, message) {

        // dateFormat: MM-DD-YYYY

        let newEvent = {
            name: message.text.match('[E|e]vent.([A-z]*)')[1],
            date: new Date(message.text.match('(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]([1-2][0-9][0-9][0-9])')[0])
        };
        controller.storage.teams.get(message.team, function (err, team) {

            if (!team) {
                team = {};
                team.id = message.team;
                team.events = [];
            }

            if (!team.events) {
                team.events = [];
            }

            let oldEvent = team.events.find(event => event.name === newEvent.name);
            if (oldEvent) {
                bot.reply(message, `There is already an event ${oldEvent.name}! :face_with_monocle:\n${daysLeft(oldEvent.date)}`);
            } else {

                team.events.push(newEvent);

                controller.storage.teams.save(team, function (err, saved) {

                    if (err) {
                        bot.reply(message, 'I experienced an error saving your event: ' + err);
                    } else {
                        bot.reply(
                            message,
                            `I added your event *${newEvent.name}* on ${newEvent.date.toLocaleDateString()} :slightly_smiling_face:\n${daysLeft(newEvent.date)}`);
                        bot.api.reactions.add({
                            name: 'tada',
                            channel: message.channel,
                            timestamp: message.ts
                        });
                    }

                });
            }
        });

    });

    // User asked for the remaining time to a saved event
    controller.hears('[H|h]ow long .* [E|e]vent ([A-z]*)', 'direct_message,direct_mention,mention', function (bot, message) {

        // let askedEventName = message.text.match('[E|e]vent ([A-z]*)')[1];
        let askedEventName = message.match[1];
        if (!askedEventName) {
            bot.reply(message, `I'm sorry, but I didn't catch the event name in your request :confused:`);
        } else {
            controller.storage.teams.get(message.team, function (err, team) {
                if (!team) {
                    bot.reply(message, `I'm sorry, but I haven't found your team :cry:`)
                }
                let askedEvent = team.events.find(event => event.name === askedEventName);
                if (!askedEvent) {
                    bot.reply(message, `I'm sorry, but I haven't found the event ${askedEventName} :white_frowning_face:`)
                } else {
                    bot.reply(message, daysLeft(new Date(askedEvent.date)));
                }
            })
        }
    })

};

/**
 * Builds a message with the numbers of days that are remaining
 * @param date
 * @return {string}
 */
function daysLeft(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    const humanized = humanize(date);
    if (days < 15) {
        return `_Hooray!_ Only *${humanized}* left! :star-struck:`;
    } else {
        return `*${humanized}* left! Wow, that's still a loooong time :face_with_rolling_eyes:`;
    }
}

/**
 * Calculates the remaining days to the given date from now on and rounds it down
 * @param date
 * @return {number}
 */
function humanize(date) {
    return humanizeDuration(date - new Date(), { units: ['y', 'm', 'w', 'd'] });
}
