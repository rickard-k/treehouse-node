const Profile = require("./profile.js");

function home(req, res) {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Header\n');
        res.write('Search\n');
        res.end('Footer\n');
    }
}

function user(req, res) {
    const username = req.url.replace('/', '');
    if (username.length > 0) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write('Header\n');
        const studentProfile = new Profile(username);
        studentProfile.on("end", (profileJSON) => {
            //show profile
            const values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                jspoints: profileJSON.points.JavaScript,
            };
            res.write(`${values.username} has ${values.badges} badges.\n`);
            res.end('Footer\n');
        });


        studentProfile.on("error", (err) => {
            //show error
            res.write(err.message + '\n');
            res.end('Footer\n');
        });

    }
}

module.exports.home = home;
module.exports.user = user;