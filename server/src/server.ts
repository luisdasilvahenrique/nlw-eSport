import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minute';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

// List games
app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return res.json(games)
})
// Create ads
app.post('/games/:id/ads', async (req, res) => {
    const gameId  = req.params.id;
    const body = req.body;

    //validações zod

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying, 
            discord: body.discord,  
            weekDays: body.weekDays.join(','),       
            hourStart: convertHourStringToMinutes(body.hourStart),     
            hourEnd: convertHourStringToMinutes(body.hourEnd),      
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return res.status(201).json(ad)
})
// List discord by ads
app.get('/games/:id/discord', async (req, res) => {
    const adID = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adID,
        }
    })

    return res.json({
        discord: ad.discord,
    });

});
// List ads by games
app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId,
        },
        orderBy: {
            createdAt: 'desc',
        },
    })

    return res.json(ads.map(ad => {
        return {
            ...ads,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
});



app.listen(3333);