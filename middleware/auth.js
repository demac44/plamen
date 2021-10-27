import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    try {
        const token = req.cookies["x-auth-token"];
        if (!token) return res.status(403).send("Access denied.");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send("Invalid token");
    }
};


export default auth