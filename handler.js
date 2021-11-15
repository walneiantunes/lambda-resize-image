"use strict";

const AWS = require("aws-sdk");

const S3 = new AWS.S3();

const sharp = require("sharp");

const { basename, extname } = require("path");

module.exports.handle = async (event) => {
  try {
    await Promise.all(
      event.Records.map(async (record) => {
        console.log("RECORD", record);

        const { key } = record.s3.object;

        console.log("KEY", key);

        const image = await S3.getObject({
          Bucket: process.env.bucket,
          Key: key,
        }).promise();

        console.log("image", image);

        const imageBuffer = await sharp(image.Body)
          .resize(parseInt(process.env.width), parseInt(process.env.height), {
            fit: "inside",
            withoutEnlargement: true,
          })
          .toFormat("jpeg", {
            progressive: true,
            quality: parseInt(process.env.quality),
          })
          .toBuffer();

        console.log("BUFFER", imageBuffer);

        await S3.putObject({
          Body: imageBuffer,
          Bucket: process.env.bucket,
          ContentType: "image/jpeg",
          Key: `${process.env.target}/${process.env.prefix}${basename(
            key,
            extname(key)
          )}${process.env.suffix}.jpg`,
        }).promise();

        await S3.deleteObject({
          Bucket: process.env.bucket,
          Key: key,
        }).promise();
      })
    );

    return true;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
