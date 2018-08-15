var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('onboard', function(bot) {

        debug('Starting an onboarding experience!');

        if (controller.config.studio_token) {
            bot.api.im.open({user: bot.config.createdBy}, function(err, direct_message) {
                if (err) {
                    debug('Error sending onboarding message:', err);
                } else {
                    controller.studio.run(bot, 'onboarding', bot.config.createdBy, direct_message.channel.id, direct_message).catch(function(err) {
                        debug('Error: encountered an error loading onboarding script from Botkit Studio:', err);
                    });
                }
            });
        } else {
            bot.startPrivateConversation({user: bot.config.createdBy},function(err,convo) {
              if (err) {
                console.log(err);
              } else {
                convo.say('Burrr! Hey, I\'m Ferguson :grinning_face_with_star_eyes:');
                convo.say('You can now /invite me to a channel so that I can be of use!');
              }
            });
        }
    });

}
