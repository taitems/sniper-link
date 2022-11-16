const buildUrl = require("./buildUrl")

const sniperLink = ({
    email,
    from
}) => {
    return buildUrl({ email, from })
}

module.exports = sniperLink