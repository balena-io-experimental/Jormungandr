const displayotron = require('jvsdisplayotron').DOTHAT();
const _ = require('lodash');
const readYaml = require('read-yaml').sync;
const Moment = require('moment');

const backlight = displayotron.backlight;
const lcd = displayotron.lcd;

setInterval(function () {
    let data = [];
    try {
        data = readYaml('ouroboros/log.yml');
    } catch (error) {
        data = readYaml('log.yml');
    }
    const log = [
        {
            time: Moment().format('HH:mm:ss'),
            event: 'now'
        },
        {
            time: Moment(data[data.length - 1].time).fromNow(true),
            event: data[data.length - 1].event,
        },
        {
            time: Moment(data[0].time).fromNow(true),
            event: data[0].event,
        },
    ];
    const diff = Moment().diff(data[0].time, 'seconds');
    const redness = _.clamp(diff - 510, 0, 255);
    backlight.setToRGB(redness, 255 - redness, 0);
    const output = _.map(log, function(entry) {
        const time = entry.time.replace('second', 'sec').replace('minute', 'min').replace('hour', 'hr')
        return _.padEnd(`${time} ${entry.event}`, 16)
    });
    _.forEach(output, function (entry, index) {
        lcd.setCursorPosition(0, index);
        lcd.write(entry);
    });
}, 100);
