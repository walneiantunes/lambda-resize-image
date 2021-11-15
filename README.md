# lambda-resize-image
This is a lambda function that resizes an image when it is uploaded into a predetermined folder in a bucket.

**Attencion:** The origin image is deleted from the bucket.

### Install and configure serverless framework
Type this

>npm install -g serverless

and this

>serverless -o config credentials --provider aws --key=\<your-aws-access-key\> --secret \<your-aws-secret-key\>
  


### Prepare lambda-resize-image
Copy the *serverless.yml.sample* and rename the copy to *serverless.yml* and set the marked parameters 

### Deploy lambda
>npm run deploy
