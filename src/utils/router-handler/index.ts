import { HttpResponse } from '@/protocols/http';
import { NextApiRequest, NextApiResponse } from 'next';
import { NodeRouter } from 'next-connect/dist/types/node';

function routerHandler(router: NodeRouter<NextApiRequest, NextApiResponse<HttpResponse>>) {
  return router.handler({
    onError: (err, req, res) => {
      return res.status(500).json({
        error: 'Erro interno do servidor'
      });
    }
  });
}

export default routerHandler;