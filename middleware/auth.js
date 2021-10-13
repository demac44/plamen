import jwt from 'jsonwebtoken'


const auth = (req, res, next) => {
    const token = req.headers['x-access-token']

    console.log(token);

    if (!token) console.log('No token');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        console.log('passed');
        next()   
    } catch (error) {
        console.log(error);
    }
}


export default auth