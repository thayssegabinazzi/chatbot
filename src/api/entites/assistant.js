"use strict";

import { Schema, model } from 'mongoose';
const timeZone = require('mongoose-timezone');

const colection = new Schema({
    assistantId: { type: String },
    session_id: { type: String },
    input: { type: Object },
    output: { type: Object },
    context: { type: Object },
    date_system: { type: Date, required: true, index: true },
    tz: { type: String, default: "America/Sao_Paulo" },
    aplication: { type: String, default: "AFIRMANET" }
});
colection.plugin(timeZone)

const apps = model('dialogo', colection);
module.exports = apps;

