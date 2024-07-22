import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';


export const getDataFromToken = (request : NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || '';
        const dedcodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return dedcodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }
}