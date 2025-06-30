/**
 * Converts uppercase title to file slug.
 * @param {*} msg 
 * @returns Lowercase string separated by dashes.
 */
function fn(msg) {
    return msg.replace(/\W+/g, '-').toLowerCase();
}
module.exports = fn;