export function random(len) {
    let options = "erdctfbghujmrdtfbghunjmrxctfvygbhun";
    let length = options.length;
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
}
//# sourceMappingURL=utils.js.map