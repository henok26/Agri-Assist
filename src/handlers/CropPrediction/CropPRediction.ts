// import prisma from "../../db";

// export const prodictCrop = async (req, res) => {
//     // extract the input values from the request body
//     const { n, p, k, ph, rainfall, wind } = req.body;
  
//     // insert the input values into the database
//     const newInput = await prisma.input.create({
//       data: {
//         n,
//         p,
//         k,
//         ph,
//         rainfall,
//         wind,
//       },
//     });
  
//     // call the Python script to predict the recommended crop
//     const { spawn } = require('child_process');
//     const python = spawn('python3', ['src/handlers/CropPrediction/predict_crop.py', n, p, k, ph, rainfall, wind]);
  
//     // capture the output from the Python script
//     let prediction = '';
//     python.stdout.on('data', (data) => {
//       prediction += data.toString();
//     });
  
//     // handle errors from the Python script
//     python.stderr.on('data', (data) => {
//       console.error(data.toString());
//     });
  
//     // handle the end of the Python script
//     python.on('close', async (code) => {
//       if (code !== 0) {
//         console.error(`Python script exited with code ${code}`);
//         return res.status(500).send('An error occurred');
//       }
  
//       // update the input record with the predicted crop
//       const updatedInput = await prisma.input.update({
//         where: {
//           id: newInput.id,
//         },
//         data: {
//           crop: prediction.trim(),
//         },
//       });
  
//       // return the predicted crop
//       return res.json({ crop: prediction.trim() });
//     });
//   }


// import prisma from "../../db";

// export const prodictCrop = async (req, res) => {
//   // extract the input values from the request body
//   // const { n, p, k, ph, rainfall, temperature, humidity } = req.body;
//   const { n,
//     p,
//     k,
//     temp,
//     hum,
//     ph,
//     rainfall,
//     // label, 
//    } = req.body;

//    try {
    
//      // insert the input values into the database
//   const newInput = await prisma.input.create({
//     data: {
//       n,
//       p,
//       k,
//       temperature:temp,
//       humidity:hum,
//       ph,
//       rainfall,},
//   });

//   // call the Python script to predict the recommended crop
//   const { spawn } = require('child_process');
//   const python = spawn('python3', [
//     'src/handlers/CropPrediction/predict_crop.py',
//     n,
//     p,
//     k,
//     temp,
//     hum,
//     ph,
//     rainfall,
//     // label,
//   ]);

//   // capture the output from the Python script
//   let prediction = '';
//   python.stdout.on('data', (data) => {
//     prediction += data.toString();
//   });

//   // handle errors from the Python script
//   python.stderr.on('data', (data) => {
//     console.error(data.toString());
//   });

//   // handle the end of the Python script
//   python.on('close', async (code) => {
//     if (code !== 0) {
//       console.error(`Python script exited with code ${code}`);
//       return res.status(409).send('An error occurred');
//     }

//     // update the input record with the predicted crop
//     const updatedInput = await prisma.input.update({
//       where: {
//         id: newInput.id,
//       },
//       data: {
//         crop: prediction.trim(),
//       },
//     });

//     // return the predicted crop
//     return res.json({ crop: prediction.trim() });
//   });
//    } catch (error) {
//     console.log(error.message)
//     res.status(500).json({ServerError:`Error With Internal Server or ${error.message}`})
//    }
 
// };

import prisma from "../../db";
import { spawn } from 'child_process';

export const prodictCrop = async (req, res) => {
  // extract the input values from the request body
  const { n, p, k, temp, hum, ph, rainfall } = req.body;

  try {
    // insert the input values into the database
    const newInput = await prisma.input.create({
      data: {
        n,
        p,
        k,
        temperature: temp,
        humidity: hum,
        ph,
        rainfall,
      },
    });

    // call the Python script to predict the recommended crop
    const python = spawn('python3', [
      'src/handlers/CropPrediction/predict_crop.py',
      n,
      p,
      k,
      temp,
      hum,
      ph,
      rainfall,
    ]);

    // capture the output from the Python script
    let prediction = '';
    python.stdout.on('data', (data) => {
      prediction += data.toString();
    });

    // handle errors from the Python script
    python.stderr.on('data', (data) => {
      console.error(data.toString());
    });

    // handle the end of the Python script
    python.on('close', async (code) => {
      if (code !== 0) {
        console.error(`Python script exited with code ${code}`);
        return res.status(409).send('An error occurred');
      }

      // update the input record with the predicted crop
      const updatedInput = await prisma.input.update({
        where: {
          id: newInput.id,
        },
        data: {
          crop: prediction.trim(),
        },
      });

      // return the predicted crop
      return res.json({ crop: prediction.trim() });
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ ServerError: `Error with internal server or ${error.message}` });
  }
};