import client from '@/infra/prisma';
import { HttpResponse } from '@/protocols/http';
import routerHandler from '@/utils/router-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

const router = createRouter<NextApiRequest, NextApiResponse<HttpResponse>>();

router.get(async (req, res) => {

    const { identifier } = req.query;

    const note = await client.note.findUnique({
        where: { identifier: identifier as string }
    });

    if(!note) {
        return res.status(404).json({
            error: 'Not found'
        });
    }

    return res.status(201).json({
        data: { note }
    });
});


export default routerHandler(router);