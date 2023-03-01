'use strict';
const pulumi = require('@pulumi/pulumi');
const gcp = require('@pulumi/gcp');

// Create a GCP resource (Storage Bucket)
const bucket = new gcp.storage.Bucket('hobbyplace_images', {
    location: 'US-WEST1',
    cors: [
        {
            methods: ['POST'],
            origins: ['*'],
            responseHeaders: ['*'],
        },
    ],
    forceDestroy: true,
});

// Export the DNS name of the bucket
exports.bucketName = bucket.url;
