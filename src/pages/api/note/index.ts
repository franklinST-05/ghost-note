import client from '@/infra/prisma';
import { HttpResponse } from '@/protocols/http';
import routerHandler from '@/utils/router-handler';
import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import slugify from 'slugify';
import validator from 'validator';

const router = createRouter<NextApiRequest, NextApiResponse<HttpResponse>>();

router.post(async (req, res) => {

    const { identifier, body } = req.body;

    const validIdentifier = validator.isLength(identifier, { min: 3 })
    if (!validIdentifier) {
        return res.status(400).json({
            error: 'Invalid identifier',
        });
    }

    const suggestIdentifier = slugify(identifier, {
        lower: true,
        trim: true,
    });

    if (identifier != suggestIdentifier) {
        return res.status(400).json({
            error: 'Invalid identifier',
            data: {
                suggest: suggestIdentifier,
            }
        });
    }

    const note = await client.note.create({
        data: { identifier, body }
    });

    return res.status(201).json({
        data: { note }
    });
});

router.put(async (req, res) => {

    const { identifier, body } = req.body;

    const existsNote = await client.note.findUnique({
        where: { identifier }
    });

    if (!existsNote) {
        return res.status(404).json({
            error: 'Not found'
        });
    }

    const updatedNote = await client.note.update({
        where: { identifier },
        data: { body }
    });

    return res.status(200).json({
        data: { note: updatedNote }
    });
});

export default routerHandler(router);