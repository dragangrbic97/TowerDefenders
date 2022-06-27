import * as express from 'express'
import * as bodyParser from 'body-parser'
import {createPlayer} from '../db/create_user'
import { createTower } from '../db/create_tower'

const router = express.Router()

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/defender', async (request, response) => {
    const data = await createPlayer(request.body.nickname);
    response.send(data);
});

module.exports = router