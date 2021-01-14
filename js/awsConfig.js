export default class awsConfigData {
    constructor() {
        this.accessKeyId     = "YOUR_ACCESS_KEY_ID";
        this.secretAccessKey = "YOUR_SECRET_ACCESS_KEY";
        this.region          = "ap-northeast-1";
        this.bucketName      = "YOUR_IMAGE_BUCKET_NAME";
        this.s3ApiVersion    = "2006-03-01";
        this.imageBucketEndpoint = "IMAGE_BUCKET_CLOUDFRONT_URL";
    }

    getAccessKeyId() {
        return this.accessKeyId;
    }

    getSecretAccessKey() {
        return this.secretAccessKey;
    }

    getRegion() {
        return this.region;
    }

    getS3ApiVersion() {
        return this.s3ApiVersion;
    }

    getbucketName() {
        return this.bucketName;
    }

    getImageBucketEndpoint() {
        return this.imageBucketEndpoint;
    }
}
