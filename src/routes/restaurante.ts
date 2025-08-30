import { Router, Request, Response } from 'express';
import pool from '../db/pool';

const router = Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await pool.query('SELECT * FROM Restaurante;');

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Nenhum restaurante foi encontrado.' });
    }

    return res.status(200).json(result.rows);

  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/catalogo', async (req: Request, res: Response): Promise<any> => {
  const id = req.query.id;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Id eh necessario para requisitar o catalogo do resturante.' });
    }
    const result = await pool.query('SELECT * FROM Lista_de_Pratos where id_restaurante = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Restaurante nao tem nenhum prato cadastrado.' });
    }

    return res.status(200).json(result.rows);

  } catch (e) {
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
