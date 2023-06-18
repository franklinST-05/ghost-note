import { HttpResponse } from '@/protocols/http';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse<HttpResponse>>();

router.get((req, res) => {
    return res.status(400).json({
        error: 'not implemented'
    });
});

export default router.handler({
    onError(err, req, res) {
        
    },
});