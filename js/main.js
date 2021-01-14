import awsConfigData from './awsConfig.js';
import imageManagement  from './imageManager.js';

const awsConfig  = new awsConfigData();
const bucketName = awsConfig.getbucketName();

// AWS認証情報設定
AWS.config.update({
    region: awsConfig.getRegion(),
    credentials: {
        "accessKeyId": awsConfig.getAccessKeyId(),
        "secretAccessKey": awsConfig.getSecretAccessKey(),
    }
});

// オブジェクト初期化
const s3 = new AWS.S3({
    apiVersion: awsConfig.getS3ApiVersion(),
});

// バケット名設定
const bucketParams = {
    Bucket: bucketName
}

// 画像操作機能の本体クラスインスタンス生成
const imageManager = new imageManagement();

//アップロード済画像の配置ディレクトリ名表示
imageManager.createDirectoryHeading(s3, bucketParams);
//アップロード済画像表示
imageManager.createImageThumbnales(s3, bucketParams);

// 画像アップロード事前処理
const uploadBtn  = document.getElementById("upload-btn"); // アップロードボタン取得
const uploadFiles = document.getElementById("upload-image-file"); // アップロード画像ファイル取得
const targetDirElm  = document.getElementById("upload-dir"); // アップロード先ディレクトリセレクタ取得

// 画像をアップロード処理
// サムネイル表示
uploadFiles.addEventListener('change', (e) => {
  const reader = new FileReader();
  const files = e.target.files;
  reader.readAsDataURL(files[0])
  reader.onload = (e) => {
    const dataUrl = reader.result;
    document.getElementById('upload-pre-image').innerHTML = "<img src='" + dataUrl + "'>";
  }
})

// アップロード処理
uploadBtn.addEventListener('click', (e) => {
  e.preventDefault();
  imageManager.upload(bucketName, uploadFiles, targetDirElm);
})
