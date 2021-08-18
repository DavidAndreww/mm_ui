const express = require('express');
const router = express.Router();
const { defaultParamsController } = require('./controllers/defaultParamsController')
const { snowflakeController } = require('./controllers/snowflakeController')
const { moleculaController } = require('./controllers/moleculaController')

// Snowflake Default Values Router
router.get('/', defaultParamsController)

// Snowflake Router
router.post('/', snowflakeController)

// Molecula Router
router.post('/qe2', moleculaController)


module.exports = router;

