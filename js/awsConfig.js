export default class awsConfigData {
    constructor() {
        this.accessKeyId     = "XXXXX";
        this.secretAccessKey = "XXXXX";
        this.region          = "ap-northeast-1";
        this.bucketName      = "image-upload-20210113";
        this.s3ApiVersion    = "2006-03-01";
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
}
