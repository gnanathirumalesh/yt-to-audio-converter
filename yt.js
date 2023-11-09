/*const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const cors = require('cors'); // Import cors module

const app = express();
const port = process.env.PORT || 3000;

// Use cors middleware, this will enable CORS for all routes
app.use(cors());

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);

    const videoStream = ytdl(videoUrl, { quality: 'highestaudio' });

    ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat('mp3')
      .on('end', () => {
        console.log('Conversion finished and the file has been downloaded.');
      })
      .on('error', (error) => {
        console.error('Error:', error);
        res.status(500).send('Error during conversion');
      })
      .pipe(res, { end: true });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

/*const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

app.use(cors());

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);

    const videoStream = ytdl(videoUrl, { quality: 'highestaudio' });

    const ffmpegCommand = ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat('mp3');

    ffmpegCommand.on('end', () => {
      console.log('Conversion finished and the file has been downloaded.');
    });

    ffmpegCommand.on('error', (error) => {
      console.error('Error:', error);
      res.status(500).send('Error during conversion');
    });

    // Pipe the output of ffmpeg to the response stream
    ffmpegCommand.pipe(res, { end: true });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing your request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
*/

 
const express = require('express');
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

app.use(cors());

app.get('/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl || !ytdl.validateURL(videoUrl)) {
    return res.status(400).send('Invalid YouTube URL');
  }

  try {
    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');

    res.setHeader('Content-Disposition', `attachment; filename="${title}.mp3"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    const videoStream = ytdl(videoUrl, { quality: 'highestaudio' });

    const ffmpegCommand = ffmpeg(videoStream)
      .audioBitrate(128)
      .toFormat('mp3');

    ffmpegCommand.on('end', () => {
      console.log('Conversion finished and the file has been downloaded.');
    });

    ffmpegCommand.on('error', (error) => {
      console.error('Error:', error);
      res.status(500).send('Error during conversion');
    });

    // Handle the client disconnecting prematurely
    req.on('close', () => {
      console.error('Client closed the connection prematurely.');
      ffmpegCommand.kill(); // Terminate the ffmpeg process
    });

    // Pipe the output of ffmpeg to the response stream
    ffmpegCommand.pipe(res, { end: true });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error processing your request');
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
 