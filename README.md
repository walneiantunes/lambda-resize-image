# lambda-resize-image

This is a lambda function that resizes an image when it is uploaded into a predetermined folder in a bucket.

**Attention:** The origin image is deleted from the bucket.

### Install and configure serverless framework

Type this

> npm install -g serverless

and this

> serverless -o config credentials --provider aws --key=\<your-aws-access-key\> --secret \<your-aws-secret-key\>

and finally

> npm install

### Prepare lambda-resize-image

Copy the _serverless.yml.sample_ and rename the copy to _serverless.yml_ and set the marked parameters

### Deploy lambda

> npm run deploy

**Attention:** If the images are large, it may be necessary to increase the memory and function timeout setting.
