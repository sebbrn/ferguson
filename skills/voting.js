module.exports = function (controller) {

    let count = 0;
    let result = {};

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

    // user asked to start a new game
    controller.hears(`Let's go!`, 'direct_mention,mention', function (bot, message) {

        result = {};
        count = 0;

        bot.reply(message, {
            "text": "Okay, let's vote for the next one! There are 10 votes. But you can vote multiple times, so be quick!",
            "response_type": "in_channel",
            "attachments": [
                {
                    "text": "Choose the person who shall be the winner!",
                    "fallback": "Whoopsie.",
                    "color": "#009688",
                    "attachment_type": "default",
                    "callback_id": "select_next_one",
                    "actions": [
                        {
                            "name": "winners_list",
                            "text": "Who should win?",
                            "type": "select",
                            "data_source": "users"
                        }
                    ]
                }
            ]
        })
    });

    controller.on('interactive_message_callback', function (bot, message) {
        if (isNaN(result[message.actions[0].selected_options[0].value])) {
            result[message.actions[0].selected_options[0].value] = 1;
        } else {
            result[message.actions[0].selected_options[0].value]++;
        }
        if (count < 10) {
            count++;
        } else {
            bot.replyInteractive(message, {
                "text": "Thank you! The vote is over :carlton:"
            });
            bot.reply(message, `And the winner is: <@${Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)}>`);
        }
    });

};