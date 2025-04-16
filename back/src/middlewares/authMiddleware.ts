import { Response } from "express";

const jwt = require('jsonwebtoken');

function authenticate(req: any, res: Response, next: any) {
    const token = req.header('Authorization');
    
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

module.exports = authenticate;