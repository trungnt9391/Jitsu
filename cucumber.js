module.exports = {
    default: [
        '--require', 'step_definitions/*.js', // Load step definitions
        '--require', 'step_definitions/world.js', // Load custom world
    ].join(' ')
};